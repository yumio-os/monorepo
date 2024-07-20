terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}



resource "aws_s3_bucket" "this_s3_bucket" {
  count = var.create ? 1 : 0

  bucket = var.bucket_name

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
}
