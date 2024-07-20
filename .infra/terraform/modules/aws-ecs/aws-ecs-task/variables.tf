
variable "create_ecs_task" {
  description = "Whether to create the task"
  type        = bool
  default     = true
}

variable "name" {
  description = "Desired name for the ecs task"
  type        = string
}

variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}

#variable "db_hostname" {
#  description = "The hostname of the database"
#  type        = string
#}
#
#variable "redis_hostname" {
#  description = "The hostname of redis"
#  type        = string
#}

variable "s3_infra_bucket_name" {
  description = "The S3 bucket name for infra files"
  type        = string
}

variable "execution_role_arn" {
  description = "IAM Execution Role"
  type        = string
}

variable "task_role_arn" {
  description = "IAM Task Role"
  type        = string
}

variable "container_name" {
  description = "Name for the container (Should be the same as the microservice name)"
  type        = string
}

variable "task_container_image" {
  description = "The image used to start a container."
  type        = string
}

variable "task_host_port" {
  description = "The port number on the container instance to reserve for your container."
  type        = number
  default     = 0
}

variable "aws_cloudwatch_log_group_name" {
  description = "The log group for the service"
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

variable "aws_logs_region" {
  description = "Region of log group"
  type        = string
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
