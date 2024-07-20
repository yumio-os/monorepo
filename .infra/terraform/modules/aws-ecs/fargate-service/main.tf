terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

data "aws_region" "current" {}

module "service_lg" {
  source    = "../../aws-cloudwatch/cloudwatch-log-group"
  environment = var.environment

  log_group_name    = "/fargate/${var.project}-${var.service_name}-${var.environment}"
  retention_in_days = "14"
}

module "service_sg" {
  source    = "../../aws-security-groups"
  environment = var.environment

  name            = "secg-${var.project}-${var.service_name}-${var.environment}"
  description     = "SG for ${var.project} ${var.service_name} ${var.environment}"
  vpc_id          = var.vpc_id
  ports_to_source = {
    (var.service_port) = var.alb_security_group_id
  }
  ports_to_ip = {}
}

module "service_tg" {
  source    = "../../aws-elb/aws-target-groups"
  environment = var.environment

  name              = "tg-${var.project}-${var.service_name}-${var.environment}"
  vpc_id            = var.vpc_id
  port              = var.service_port
  listener_arn      = var.alb_listener_arn
  priority          = var.tg_priority # 101

  host_header       = var.host_header
  health_check_path = var.health_check_path
}

module "service_task_def" {
  source    = "../../aws-ecs/aws-ecs-task"
  environment = var.environment

  name                   = "${var.project}-${var.service_name}-${var.environment}-task-definition"
  execution_role_arn     = var.execution_role_arn
  task_role_arn          = var.task_role_arn
 
  task_definition_cpu    = var.task_definition_cpu
  task_definition_memory = var.task_definition_memory

  container_name                   = "${var.project}-${var.service_name}-${var.environment}-container"
  task_container_image             = "${var.ecr_repo}:${var.environment}-latest"
  task_host_port                   = var.service_port
  aws_cloudwatch_log_group_name    = module.service_lg.this_log_group_name
  aws_logs_region                  = data.aws_region.current.name

  #TODO - Tidy up
  environment_files                = var.environment_files
  secrets                          = var.secrets
  s3_infra_bucket_name             = "${var.project}-infra"
}

module "service" {
  source    = "../../aws-ecs/aws-ecs-service"
  environment = var.environment

  name            = "${var.project}-${var.service_name}-${var.environment}-service"
  cluster_id      = var.cluster_id
  task_definition = module.service_task_def.family
  desired_count   = var.desired_count

  fargate_spot_capacity_base    = var.fargate_spot_capacity_base
  fargate_spot_capacity_weight  = var.fargate_spot_capacity_weight
  fargate_capacity_base         = var.fargate_capacity_base
  fargate_capacity_weight       = var.fargate_capacity_weight

  private_subnet_ids = var.private_subnet_ids
  security_group     = module.service_sg.this_security_group_id

  target_group_arn = module.service_tg.this_tg_arn
  container_name   = "${var.project}-${var.service_name}-${var.environment}-container"
  container_port   = var.service_port
}
