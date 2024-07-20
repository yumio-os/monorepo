data "aws_availability_zones" "available" {}

locals {
  region    = var.default_region
  vpc_cidr  = "10.0.0.0/16"
  azs       = slice(data.aws_availability_zones.available.names, 0, var.number_of_azs)
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.6.0"
  
  providers = {
    aws = aws.use2
  }
  
  name = "${var.project}-${var.environment}-vpc"
  cidr = local.vpc_cidr

  azs             = local.azs
  private_subnets = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k)]
  public_subnets  = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 8)]

  enable_nat_gateway    = true
  single_nat_gateway    = true
}
