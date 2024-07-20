variable "create" {
  description = "Whether to create the bucket"
  type        = bool
  default     = true
}

variable "bucket_name" {
  description = "the name of the bucket"
  type        = string
}

variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}