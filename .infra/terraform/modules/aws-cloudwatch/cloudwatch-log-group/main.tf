terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_cloudwatch_log_group" "this" {
  count = var.create_log_group ? 1 : 0

  name              = var.log_group_name
  retention_in_days = var.retention_in_days
  kms_key_id        = var.logs_kms_key

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
}
