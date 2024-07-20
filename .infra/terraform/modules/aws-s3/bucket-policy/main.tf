terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}



resource "aws_s3_bucket_policy" "this" {
  count = var.create_s3_policy ? 1 : 0

  bucket = var.bucket
  policy = var.policy
}
