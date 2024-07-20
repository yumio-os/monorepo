
variable "create_lb" {
  description = "Whether to create the LB"
  type        = bool
  default     = true
}

variable "name" {
  description = "Desired name for the LB"
  type        = string
}

variable "default_tg_name" {
  description = "Desired name default TG"
  type        = string
}

variable "internal" {
  description = "If internal ALB "
  type        = bool
}

variable "load_balancer_type" {
  description = "Type of the LB"
  type        = string
}


variable "security_groups" {
  description = "Desired SG for the LB"
  type = string
  
}

variable "subnets" {
  description = "Desired SUBNETS for the LB"
  type = list
}

variable "vpc_id" {
  description = "vpc for alb rules tg"
  type = string
}

variable "enable_deletion_protection" {
  description = "deletion production"
  type        = bool
  default     = true
}

variable "certificate_arn" {
  type = list(string)
  description = "List of certificate ARNs for the listener"
}

variable "logs_prefix" {
  description = "logs_prefix for alb "
  type = string
}

variable "logs_bucket" {
  description = "logs_bucket for alb "
  type = string
}

variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}
