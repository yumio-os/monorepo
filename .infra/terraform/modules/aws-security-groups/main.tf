terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

##Run this when SG is with port to IP AND SGs###
resource "aws_security_group" "this_sg" {
  count = var.create_sg && var.ports_to_source != {} && var.ports_to_ip != {} ? 1 : 0

  name        = var.name
  description = var.description
  vpc_id      = var.vpc_id


  dynamic "ingress" {
    for_each = var.ports_to_source
    content {
      from_port       = ingress.key
      to_port         = ingress.key
      protocol        = "tcp"
      security_groups = split(",", ingress.value)
      description     = "Port ${ingress.key} Rule"
    }
  }

  dynamic "ingress" {
    for_each = var.ports_to_ip
    content {
      from_port   = ingress.key
      to_port     = ingress.key
      protocol    = "tcp"
      cidr_blocks = split(",", ingress.value)
      description = "Port ${ingress.key} Rule"
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Terraform   = "True"
    Environment = var.environment
    Name        = var.name
  }

}
