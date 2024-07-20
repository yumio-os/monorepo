
variable "create_iam_role" {
  description = "Whether to create the iam role"
  type        = bool
  default     = true
}

variable "name" {
  description = "Desired name"
  type        = string
}

variable "assume_role_policy" {
  description = "Wanter policy for role"
}

variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}