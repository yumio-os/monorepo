terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_route53_record" "all" {
  count = var.create_r53 ? 1 : 0

  zone_id = var.hosted_zone
  name    = var.name
  type    = var.type
  ttl     = var.ttl
  records = ["${var.record}"]
}
