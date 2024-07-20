terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_rds_cluster" "this" {
  cluster_identifier = var.identifier
  engine             = "aurora-postgresql"
  engine_mode        = "provisioned"
  engine_version     = var.engine_version
  #allocated_storage  = var.allocated_storage
  port               = var.port
  
  serverlessv2_scaling_configuration {
    min_capacity = var.min_capacity
    max_capacity = var.max_capacity
  }
  
  database_name      = var.db_create_name
  master_username    = var.username
  master_password    = var.password

  vpc_security_group_ids = var.vpc_security_group_ids
  db_subnet_group_name   = var.db_subnet_group_name
  #option_group_name      = var.option_group_name

  availability_zones  = var.availability_zones
  #multi_az            = var.multi_az
  #iops                = var.iops

  snapshot_identifier   = var.snapshot_identifier
  copy_tags_to_snapshot = var.copy_tags_to_snapshot
  skip_final_snapshot   = var.skip_final_snapshot
  final_snapshot_identifier = var.skip_final_snapshot ? null : "${var.final_snapshot_identifier_prefix}-snapshot-${var.identifier}"

  backup_retention_period = var.backup_retention_period
  preferred_backup_window = var.backup_window

  enabled_cloudwatch_logs_exports = var.enabled_cloudwatch_logs_exports

  allow_major_version_upgrade = var.allow_major_version_upgrade
  deletion_protection      = var.deletion_protection
  #delete_automated_backups = var.delete_automated_backups

  tags = {
    Terraform   = "True"
  }

}

resource "aws_rds_cluster_instance" "this" {
  cluster_identifier = aws_rds_cluster.this.id
  instance_class     = "db.serverless"
  engine             = aws_rds_cluster.this.engine
  engine_version     = aws_rds_cluster.this.engine_version
  
  db_parameter_group_name   = var.parameter_group_name
  publicly_accessible = var.publicly_accessible
  ca_cert_identifier  = var.ca_cert_identifier

  auto_minor_version_upgrade  = var.auto_minor_version_upgrade
  apply_immediately           = var.apply_immediately
  preferred_maintenance_window          = var.maintenance_window

  performance_insights_enabled          = var.performance_insights_enabled
  performance_insights_retention_period = var.performance_insights_enabled ? var.performance_insights_retention_period : null
  performance_insights_kms_key_id       = var.performance_insights_enabled ? var.performance_insights_kms_key_id : null

  monitoring_interval     = var.monitoring_interval
  monitoring_role_arn     = var.monitoring_interval > 0 ? var.monitoring_role_arn : null
}
