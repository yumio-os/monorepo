module "redis" {
  source                  = "../modules/aws-elasticache/aws-redis"
  providers = {
    aws = aws.use2
  }

  sec_group_name    = "secg-${local.service_name_yumio}-redis-${var.environment}"
  vpc_id            = module.vpc.vpc_id
  subnet_group_name = "snetg-${local.service_name_yumio}-redis-${var.environment}"
  subnet_ids        = module.vpc.private_subnets
  cluster_name      = "${local.service_name_yumio}-redis-${var.environment}"
  node_type         = "cache.t4g.micro"
  node_count        = 1
}
