terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}


resource "aws_db_subnet_group" "this_db_subnet_group" {
  count = var.create_subnet_group ? 1 : 0

  name       = var.name
  subnet_ids = var.subnet_ids

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
}
