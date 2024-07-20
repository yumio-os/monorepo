variable "create_log_group" {
  description = "Whether to create the log group"
  type        = bool
  default     = true
}

variable "log_group_name" {
  description = "wanted rule name (string)"
}

variable "retention_in_days" {
  description = "retention days (int)"
}

variable "logs_kms_key" {
  type        = string
  description = "The KMS key ARN to use to encrypt container logs."
  default     = ""
}

variable "environment" {
  description = "Which environment"
  type        = string
  default     = null
}