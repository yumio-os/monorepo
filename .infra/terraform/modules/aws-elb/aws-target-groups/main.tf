terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_lb_target_group" "this_tg" {
  count = var.create_tg ? 1 : 0

  name                 = var.name
  port                 = var.port
  protocol             = "HTTP"
  vpc_id               = var.vpc_id
  target_type          = "ip"
  deregistration_delay = "60"
  health_check {
    path                = var.health_check_path
    healthy_threshold   = 5
    unhealthy_threshold = 2
  }
}

resource "aws_lb_listener_rule" "this_tg" {
  listener_arn = var.listener_arn
  priority     = var.priority
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this_tg[0].arn
  }
  condition {
    host_header {
      values = ["${var.host_header}"]
    }
  }
  # condition {
  #   path_pattern {
  #     values = ["${var.path_pattern}"]
  #   }
  # }
}
