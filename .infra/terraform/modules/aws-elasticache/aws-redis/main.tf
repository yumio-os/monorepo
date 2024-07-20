terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

data "aws_vpc" "this_vpc" {
  id = var.vpc_id
}

resource "aws_security_group" "this_secg" {

  name    = var.sec_group_name
  vpc_id  = var.vpc_id

  ingress {
    from_port   = "6379"
    to_port     = "6379"
    protocol    = "tcp"
    cidr_blocks = ["${data.aws_vpc.this_vpc.cidr_block}"]
  }
  egress {
    from_port = "0"
    to_port = "0"
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elasticache_subnet_group" "this_sng" {

  name        = var.subnet_group_name
  subnet_ids  = var.subnet_ids
}

resource "aws_elasticache_cluster" "this" {
  #count = var.create_redis ? 1 : 0
  
  cluster_id           = var.cluster_name
  engine               = "redis"
  node_type            = var.node_type    # "cache.t2.micro"
  port                 = 6379
  num_cache_nodes      = var.node_count   # 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.1"
 #snapshot_name        = var.snapshot_name
  subnet_group_name    = "${aws_elasticache_subnet_group.this_sng.name}"
  maintenance_window   = "mon:09:00-mon:10:00"
  snapshot_retention_limit = 7
  snapshot_window      = "00:00-01:00"
  security_group_ids   = ["${aws_security_group.this_secg.id}"]

  tags = {
    Terraform = "True"
  }
}

