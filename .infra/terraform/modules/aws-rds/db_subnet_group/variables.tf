variable "create_subnet_group" {
  description = "Whether to create this resource or not?"
  type        = bool
  default     = true
}

variable "subnet_ids" {
  description = "List of subnet ids"
  type        = list(string)
  default     = []
}


variable "name" {
  description = "Name of the db subnet group"
  type        = string
}


variable "environment" {
  description = "Which environment"
  type        = string
  default     = "dev"
}
