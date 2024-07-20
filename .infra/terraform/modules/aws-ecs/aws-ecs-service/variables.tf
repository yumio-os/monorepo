
variable "create_ecs_service" {
  description = "Whether to create the service"
  type        = bool
  default     = true
}

variable "name" {
  description = "Desired name for the ecs service"
  type        = string
}

variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}

variable "cluster_id" {
  description = "The Amazon Resource Name (ARN) that identifies the cluster."
  type        = string
}

variable "desired_count" {
  description = "The number of instances of the task definitions to place and keep running."
  default     = 1
  type        = number
}

variable "platform_version" {
  description = "The platform version on which to run your service. Only applicable for launch_type set to FARGATE."
  default     = "LATEST"
}

variable "force_new_deployment" {
  type        = bool
  description = "Enable to force a new task deployment of the service. This can be used to update tasks to use a newer Docker image with same image/tag combination (e.g. myimage:latest), roll Fargate tasks onto a newer platform version."
  default     = false
}

variable "wait_for_steady_state" {
  type        = bool
  description = "If true, Terraform will wait for the service to reach a steady state (like aws ecs wait services-stable) before continuing."
  default     = false
}

variable "enable_execute_command" {
  type        = bool
  description = "Specifies whether to enable Amazon ECS Exec for the tasks within the service."
  default     = true
}

variable "deployment_minimum_healthy_percent" {
  default     = 100
  description = "The lower limit of the number of running tasks that must remain running and healthy in a service during a deployment"
  type        = number
}

variable "deployment_maximum_percent" {
  default     = 200
  description = "The upper limit of the number of running tasks that can be running in a service during a deployment"
  type        = number
}

variable "load_balanced" {
  type        = bool
  default     = true
  description = "Whether the task should be loadbalanced."
}

variable "health_check_grace_period_seconds" {
  default     = 300
  description = "Seconds to ignore failing load balancer health checks on newly instantiated tasks to prevent premature shutdown, up to 7200. Only valid for services configured to use load balancers."
  type        = number
}

variable "security_group" {
  description = "secg id for the service"
}

variable "task_container_assign_public_ip" {
  description = "Assigned public IP to the container."
  default     = false
  type        = bool
}

variable "private_subnet_ids" {
  description = "A list of private subnets inside the VPC"
}

variable "container_name" {
  description = "Optional name for the container to be used instead of name_prefix."
  type        = string
}

variable "container_port" {
  description = "The port number on the container that is bound to the user-specified or automatically assigned host port"
  type        = number
}

variable "target_group_arn" {
  description = "The target_group_arn to attach to the service"
  type        = string
}

variable "task_definition" {
  description = "task_definition arn for the service"
  type = string
}

variable "fargate_capacity_weight" {
  description = "Weight for FARGATE provider"
  type        = number
  default     = 1
}

variable "fargate_capacity_base" {
  description = "Base FARGATE tasks"
  type        = number
  default     = 1
}

variable "fargate_spot_capacity_weight" {
  description = "Weight for FARGATE_SPOT provider"
  type        = number
  default     = 100
}

variable "fargate_spot_capacity_base" {
  description = "Base FARGATE_SPOT tasks"
  type        = number
  default     = 0
}
