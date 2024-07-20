terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_cloudwatch_log_metric_filter" "this" {
  name           = var.metric_filter_name
  pattern        = var.metric_filter_pattern
  log_group_name = var.log_group_name

  metric_transformation {
    name      = var.metric_name
    namespace = var.namespace
    value     = var.metric_transformation_value
  }
}
