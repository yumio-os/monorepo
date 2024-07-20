terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_lb" "this" {
  count = var.create_lb ? 1 : 0

  name               = var.name
  internal           = var.internal
  load_balancer_type = var.load_balancer_type
  security_groups    = split(",", var.security_groups)
  subnets            = var.subnets

  enable_deletion_protection = var.enable_deletion_protection

  access_logs {
    bucket  = var.logs_bucket
    prefix  = var.logs_prefix
    enabled = true
  }

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
}

resource "aws_lb_listener" "this" {
  count = var.create_lb ? 1 : 0

  load_balancer_arn = aws_lb.this[0].arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
}

#########################################
# ALB TG default rule
#########################################

#Default rule
resource "aws_lb_target_group" "default" {
  count = var.create_lb ? 1 : 0

  name     = var.default_tg_name
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
}

resource "aws_lb_listener" "default" {
  count = var.create_lb ? 1 : 0

  load_balancer_arn = aws_lb.this[0].arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-Ext-2018-06"
  certificate_arn   = var.certificate_arn[0]

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.default[0].arn
  }

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
}

resource "aws_lb_listener_certificate" "additional_certs" {
  for_each     = toset(slice(var.certificate_arn, 1, length(var.certificate_arn)))
  listener_arn = aws_lb_listener.default[0].arn
  certificate_arn = each.value
}
