locals {
  service_name_yumio      = "yumio-graphql"
}
module "yumio_graphql_fargate_service" {
  source    = "../modules/aws-ecs/fargate-service"
  providers = {
    aws = aws.use2
  }
  project       = var.project
  environment   = var.environment
  vpc_id        = module.vpc.vpc_id
  cluster_id    = aws_ecs_cluster.this.id

  service_name      = local.service_name_yumio
  service_port      = "4000"
  health_check_path = "/health"

  host_header       = "gql.yumio.io"

  desired_count          = "1"
  #TODO: Adjust after baseline usage and add autoscaling
  task_definition_cpu    = "1024"
  task_definition_memory = "2048"

  fargate_spot_capacity_base    = 1
  fargate_spot_capacity_weight  = 100
  fargate_capacity_base         = 0
  fargate_capacity_weight       = 1

  environment_files = <<-ENVFILES
    [
      {
        "value": "arn:aws:s3:::${var.project}-infra/service-vars/${var.environment}/${local.service_name_yumio}-terraform.env",
        "type":  "s3"
      },
      {
        "value": "arn:aws:s3:::${var.project}-infra/service-vars/${var.environment}/${local.service_name_yumio}.env",
        "type":  "s3"
      }
    ]
    ENVFILES

  secrets   = <<-SECRETS
    [
      {
        "name":  "DB_PASSWORD",
        "valueFrom": "arn:aws:ssm:${var.default_region}:${var.aws_account_id}:parameter/${var.project}/${local.service_name_yumio}/${var.environment}/postgresql_password"
      },
      {
        "name":  "AUTH_JWT_SECRET",
        "valueFrom": "arn:aws:ssm:${var.default_region}:${var.aws_account_id}:parameter/${var.project}/${local.service_name_yumio}/${var.environment}/auth_jwt_secret"
      },
      {
        "name":  "STRIPE_API_KEY",
        "valueFrom": "arn:aws:ssm:${var.default_region}:${var.aws_account_id}:parameter/${var.project}/${local.service_name_yumio}/${var.environment}/stripe_api_key"
      },
      {
        "name":  "TWILIO_AUTH_TOKEN",
        "valueFrom": "arn:aws:ssm:${var.default_region}:${var.aws_account_id}:parameter/${var.project}/${local.service_name_yumio}/${var.environment}/twilio_auth_token"
      },
      {
        "name":  "CONSUMER_API_ACCESS_TOKEN",
        "valueFrom": "arn:aws:ssm:${var.default_region}:${var.aws_account_id}:parameter/${var.project}/${local.service_name_yumio}/${var.environment}/consumer_api_access_token"
      },
      {
        "name":  "NEW_RELIC_LICENSE_KEY",
        "valueFrom": "arn:aws:ssm:${var.default_region}:${var.aws_account_id}:parameter/${var.project}/${local.service_name_yumio}/${var.environment}/new_relic_license_key"
      }
    ]
    SECRETS

  ecr_repo      = "${var.ecr_repo_base}/${local.service_name_yumio}"

  private_subnet_ids    = module.vpc.private_subnets
  alb_security_group_id = module.sg_alb.this_security_group_id
  alb_listener_arn      = module.alb.this_lb_default_listener
  tg_priority           = 101
 
  execution_role_arn     = module.service_execution_role.this_iam_role_arn
  task_role_arn          = module.service_task_role.this_iam_role_arn

  log_retention_in_days = "14"
}

resource "aws_s3_object" "yumio_graphql_terraform_env" {
  provider    = aws.use2

  bucket = "${var.project}-infra"
  key    = "service-vars/${var.environment}/${local.service_name_yumio}-terraform.env"
  content = <<-ENVFILE
    DB_HOSTNAME=${module.db_postgres.db_cluster_endpoint}
    AUTH_REDIS_HOST=${module.redis.redis_node_hostname}
    BULL_REDIS_HOST=${module.redis.redis_node_hostname}
    ENVFILE
}

resource "aws_s3_object" "yumio_graphql_env" {
  provider    = aws.use2

  bucket = "${var.project}-infra"
  key    = "service-vars/${var.environment}/${local.service_name_yumio}.env"
  source = "../../dot_envs/${local.service_name_yumio}-${var.environment}.env"
  etag   = filemd5("../../dot_envs/${local.service_name_yumio}-${var.environment}.env")
}
