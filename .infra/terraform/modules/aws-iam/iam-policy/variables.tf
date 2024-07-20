
variable "create_iam_policy" {
  description = "Whether to create the iam role policy"
  type        = bool
  default     = true
}

variable "name" {
  description = "Desired name "
}

variable "role" {
  description = "Desired role"
}

variable "policy" {
  description = "Wanter policy for role"
}

variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}