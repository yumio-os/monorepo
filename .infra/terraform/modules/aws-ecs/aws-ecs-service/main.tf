terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

resource "aws_ecs_service" "this" {
  count = var.create_ecs_service ? 1 : 0

  name            = var.name
  cluster         = var.cluster_id
  task_definition = var.task_definition
  desired_count   = var.desired_count

  platform_version = var.platform_version

  force_new_deployment   = var.force_new_deployment
  wait_for_steady_state  = var.wait_for_steady_state
  enable_execute_command = var.enable_execute_command

  deployment_minimum_healthy_percent = var.deployment_minimum_healthy_percent
  deployment_maximum_percent         = var.deployment_maximum_percent
  health_check_grace_period_seconds  = var.load_balanced ? var.health_check_grace_period_seconds : null

  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    weight = "${var.fargate_capacity_weight}"
    base = "${var.fargate_capacity_base}"
  }

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight = "${var.fargate_spot_capacity_weight}"
    base = "${var.fargate_spot_capacity_base}"
  }


  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [var.security_group]
    assign_public_ip = var.task_container_assign_public_ip
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = var.container_name
    container_port   = var.container_port
  }

  lifecycle {
    ignore_changes = [
      task_definition
    ]
  }

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
}
