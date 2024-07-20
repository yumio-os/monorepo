terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_iam_role" "this" {
  count = var.create_iam_role ? 1 : 0

  name               = var.name
  assume_role_policy = var.assume_role_policy

  tags = {
    Terraform   = "True"
    #Environment = var.environment
  }
}
