
variable "create_tg" {
  description = "Whether to create the tg"
  type        = bool
  default     = true
}

variable "name" {
  description = "Desired name for the tg"
  type        = string
}

variable "port" {
  description = "port of the TG"
  type        = number
}

variable "listener_arn" {
  description = "listener_arn for the TG"
  type = string

}

variable "priority" {
  description = "Desired priority for the TG"
  type = number
}

variable "host_header" {
  description = "host_header for the tg"
  type = string
}

variable "vpc_id" {
  description = "vpc_id of alb"
  type = string
}

# variable "path_pattern" {
#   description = "path_pattern of target group"
#   type = string
# }
variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}

variable "health_check_path" {
  description = "health_check_path of target"
  type = string
  default = "/"
}
