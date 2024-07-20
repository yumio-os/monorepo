variable "create_s3_policy" {
  description = "Whether to create the bucket"
  type        = bool
  default     = true
}

variable "bucket" {
  description = "the name of the bucket"
  type        = string
}

variable "policy" {
  description = "the policy of the bucket"
  type        = string
}

variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}