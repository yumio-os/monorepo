terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.41.0"
    }
  }
}

data "template_file" "template_file_task_definition_container_definitions" {
  template = <<-DEFINITION
    [{
      "name": "${var.container_name}",
      "image": "${var.task_container_image}",
      "essential": true,
      "portMappings": [
        {
          "hostPort": ${var.task_host_port},
          "containerPort": ${var.task_host_port},
          "protocol":"tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${var.aws_cloudwatch_log_group_name}",
          "awslogs-region": "${var.aws_logs_region}",
          "awslogs-stream-prefix": "container"
        }
      },
      "environmentFiles": ${var.environment_files},
      "secrets": ${var.secrets},
      "command": [],
      "cpu": 0,
      "mountPoints": []
    }]
DEFINITION
}

data "template_file" "template_file_task_definition" {
  template = <<-DEFINITION
    {
      "requiresCompatibilities": [
          "FARGATE"
      ],
      "containerDefinitions": ${data.template_file.template_file_task_definition_container_definitions.rendered},
      "volumes": [],
      "networkMode": "awsvpc",
      "memory": "${var.task_definition_memory}",
      "cpu": "${var.task_definition_cpu}",
      "executionRoleArn": "${var.execution_role_arn}",
      "taskRoleArn": "${var.task_role_arn}",
      "family": "${var.name}"
    }
DEFINITION
}

resource "aws_ecs_task_definition" "this" {
  #count = var.create_ecs_task ? 1 : 0

  family                   = var.name
  execution_role_arn       = var.execution_role_arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.task_definition_cpu
  memory                   = var.task_definition_memory
  task_role_arn            = var.task_role_arn

  container_definitions = "${data.template_file.template_file_task_definition_container_definitions.rendered}"

  tags = {
    Terraform   = "True"
    Environment = var.environment
  }
  skip_destroy = true
}

resource "aws_s3_object" "s3_bucket_object" {
  bucket = var.s3_infra_bucket_name
  key    = "task_definitions/${var.name}.json"
  content = "${data.template_file.template_file_task_definition.rendered}"
}
