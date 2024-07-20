terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-arm64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "this" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t4g.nano"
 
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.sg_bastion.id]
  associate_public_ip_address = true

  key_name  = var.ssh_key_name

  user_data = <<-SCRIPT
    #!/usr/bin/bash
    export DEBIAN_FRONTEND=noninteractive
    apt update -y
    apt install -y redis-tools postgresql-client
    echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDWZgLt6G1mNhbctW6if0dRenNaOnnaCfFJ7V3x6JNKwwf4tVEoGN0DAsRHzC6Qfg/nuaR9OL4cldBptn+gBzMo22tX3qFz1inaryUJKua6ZixvpVv0t5jH0dL/KbQYluywxNIJYcA0h1KNtN2O7bhFBsfXKjSLpd4Pnb1Tuts1Q1FcwZYfG/QQkydx4/pZqjMQhwnxfXVGu9P8alahN75RF8OchPWwPhz66kN8QcfR8KSzoO2cKIE5A5UJFBXdjjqdA7HA7tpFCrcM9VM7KHALokHhK93SyN4mHhHurVLcoZgF0baOxCdbk01q2mjfM3r8y/okvnVZkP5uhMr7dHmn sp3c1@DESKTOP-H8J9UBR' >> /home/ubuntu/.ssh/authorized_keys
    SCRIPT

  tags = {
    Name = "${var.identifier}-bastion"
  }
  lifecycle {
    ignore_changes  = [ ami ]
  }
}

resource "aws_security_group" "sg_bastion" {
  name          = "secg-${var.identifier}-bastion"
  description   = "Bastion security group"
  vpc_id        = var.vpc_id
 
  dynamic "ingress" {
    for_each = var.ssh_access_cidrs
    content {
      from_port     = 22
      to_port       = 22
      protocol      = "tcp"
      cidr_blocks   = [ingress.value]
      description   = ingress.key
    }
  }
 
  egress {
    from_port     = 0
    to_port       = 0
    protocol      = "-1"
    cidr_blocks   = ["0.0.0.0/0"]
  }
}
