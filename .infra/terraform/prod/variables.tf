variable "environment" {
  description = "environment name"
  type        = string
  default     = "prod"
}

variable "project" {
  description = "project name"
  type        = string
  default     = "yumioos"
}

variable "aws_account_id" {
  description = "aws_account_id"
  type        = string
  default     = "111111111111111"
}

variable "default_region" {
  description = "environment default region"
  type        = string
  default     = "es-west-2"
}

variable "number_of_azs" {
  description = "environment default region"
  type        = number
  default     = 3
}

variable "ecr_repo_base" {
  description = "ECR Repo path for project base"
  type        = string
  default     = "1111111111111111.dkr.ecr.es-west-2.amazonaws.com/yuimioos"
}
