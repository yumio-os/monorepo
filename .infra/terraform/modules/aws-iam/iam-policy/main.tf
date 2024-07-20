terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_iam_role_policy" "this" {
  count = var.create_iam_policy ? 1 : 0

  name   = var.name
  role   = var.role
  policy = var.policy
}
