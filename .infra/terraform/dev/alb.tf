module "sg_alb" {
  source                        = "../modules/aws-security-groups"
  providers = {
    aws = aws.use2
  }
  environment = var.environment

  name                          = "secg-${var.project}-${var.environment}-alb"
  description                   = "SG for the ${var.project} ${var.environment} ALB"
  vpc_id                        = module.vpc.vpc_id
  ports_to_source               = {}
  ports_to_ip                   = { 80 = "0.0.0.0/0"
                                    443 = "0.0.0.0/0"
                                  }
}

module "alb" {
  source             = "../modules/aws-elb/aws-alb"
  providers = {
    aws = aws.use2
  }
  environment = var.environment

  name               = "${var.project}-${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = module.sg_alb.this_security_group_id
  subnets            = module.vpc.public_subnets
  vpc_id                = module.vpc.vpc_id

  certificate_arn    = [
    "arn:aws:acm:es-west-2:111111111:certificate/a5fcb253-3e1c-4059-892e-485160bfd1e4",
    "arn:aws:acm:es-west-2:111111111:certificate/f1195908-4c2c-45e1-b3ed-8d4278f9483b"
  ]

  enable_deletion_protection = true
  default_tg_name    = "tg-default-${var.project}-${var.environment}"
  logs_bucket        = "${var.project}-infra"
  logs_prefix        = "logs/${var.environment}/alb"
}
