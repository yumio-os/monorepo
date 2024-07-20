resource "random_password" "db_password" {
  length  = 32
  special = false
}

locals {
  service_name_db      = "yumio"
}

module "db_postgres" {
  source  = "../modules/aws-rds/cluster"
  providers = {
    aws = aws.use2
  }
  environment = var.environment

  identifier = "${local.service_name_db}-${var.environment}-db"

  engine            = "aurora-postgresql"
  engine_version    = "15.4"
  storage_type      = "gp2"
  storage_encrypted = true
  license_model     = "postgresql-license"

  min_capacity = 1.0
  max_capacity = 6.0

  username          = "postgres"
  #TODO: Dont forget to change
  password          = random_password.db_password.result
  port              = "5432"

  vpc_security_group_ids = [module.sg_db_postgres.this_security_group_id]
  db_subnet_group_name   = module.aws_db_subnet_group.this_db_subnet_group_name
  parameter_group_name   = "default.aurora-postgresql15"

  availability_zones  = slice(data.aws_availability_zones.available.names, 0, 3)
  publicly_accessible = false
  ca_cert_identifier  = "rds-ca-rsa2048-g1"

  allow_major_version_upgrade = false
  auto_minor_version_upgrade  = true
  apply_immediately           = false
  maintenance_window          = "wed:06:45-wed:08:15"

  copy_tags_to_snapshot = true
  skip_final_snapshot   = false

  backup_retention_period = 30
  backup_window           = "08:56-09:26"
  monitoring_interval     = 60
  monitoring_role_arn     = "arn:aws:iam::${var.aws_account_id}:role/rds-monitoring-role"

  enabled_cloudwatch_logs_exports = ["postgresql"]

  deletion_protection      = true

  tags = {
    Terraform   = "True"
  }
}

module "aws_db_subnet_group" {
  source                        = "../modules/aws-rds/db_subnet_group"
  providers = {
    aws = aws.use2
  }
  environment = var.environment
  
  name = "sng-${var.project}-${local.service_name_db}${var.environment}-db"
  subnet_ids = module.vpc.private_subnets
}

module "sg_db_postgres" {
  source                        = "../modules/aws-security-groups"
  providers = {
    aws = aws.use2
  }
  environment = var.environment

  name                          = "secg-rds-db-${var.project}-${local.service_name_db}-${var.environment}"
  description                   = "SG for ${var.project}-${local.service_name_db} postgres ${var.environment}"
  vpc_id                        = module.vpc.vpc_id
  ports_to_source               = { 5432 = "${module.yumio_graphql_fargate_service.security_id},${module.bastion_host.security_group_id}" }
  ports_to_ip                   = {}
}

#resource "aws_ssm_parameter" "db_pass" {
#  provider    = aws.use2
#
#  name  = "/${var.project}/${var.environment}/postgresql_password"
#  type  = "SecureString"
#  value = "${random_password.db_password.result}"
#}
