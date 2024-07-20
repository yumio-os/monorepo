module "bastion_host" {
  source                        = "../modules/aws-ec2/bastion-host"
  providers = {
    aws = aws.use2
  }

  identifier    = "${var.project}-${var.environment}"
  vpc_id        = module.vpc.vpc_id
  subnet_id     = module.vpc.public_subnets[0]

  ssh_key_name      = "bart-key"
  ssh_access_cidrs  = {
    "Bart Airbnb" =       "188.213.137.73/32"
  }
}
