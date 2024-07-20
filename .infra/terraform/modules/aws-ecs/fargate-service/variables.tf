
variable "environment" {
  description = "Which environment"
  type        = string
}

variable "project" {
  description = "The Name of the project"
  type        = string
}

variable "vpc_id" {
  description = "The Amazon Resource Name (ARN) that identifies the VPC."
  type        = string
}

variable "cluster_id" {
  description = "The Amazon Resource Name (ARN) that identifies the ECS cluster."
  type        = string
}

variable "service_name" {
  description = "The Name of the service"
  type        = string
}

variable "service_port" {
  description = "The port number the service listens on."
  type        = number
}

variable "execution_role_arn" {
  description = "IAM Execution Role"
  type        = string
}

variable "task_role_arn" {
  description = "IAM Task Role"
  type        = string
}

variable "environment_files" {
  description = "Text version of list of environemntFiles"
  type        = string
  default     = "[]"
}

variable "secrets" {
  description = "Text version of list of secrets"
  type        = string
  default     = "[]"
}

variable "task_definition_cpu" {
  description = "Amount of CPU to reserve for the task."
  default     = 256
  type        = number
}

variable "task_definition_memory" {
  description = "The soft limit (in MiB) of memory to reserve for the task."
  default     = 512
  type        = number
}

variable "desired_count" {
  description = "The number of instances of the task definitions to place and keep running."
  default     = 1
  type        = number
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

variable "private_subnet_ids" {
  description = "A list of private subnets inside the VPC"
  type        = list
}

variable "host_header" {
  description = "Hostname on incoming requests"
  type        = string
}

variable "health_check_path" {
  description = "Path for health check requests"
  type        = string
}

variable "ecr_repo" {
  description = "ECR Repo for Service's images"
  type        = string
}

variable "alb_security_group_id" {
  description = "Security Group ID of the ALB"
  type        = string
}

variable "alb_listener_arn" {
  description = "ARN of the ALB Listener"
  type        = string
}

variable "log_retention_in_days" {
  description = "The number of days to retain logs."
  default     = 14
  type        = number
}

variable "tg_priority" {
  description = "Priority number for target group on ALB."
  default     = 101
  type        = number
}
