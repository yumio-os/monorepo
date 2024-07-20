variable "vpc_id" {
  description = "The VPC id"
  type        = string
}

variable "subnet_id" {
  description = "The subnet id"
  type        = string
}

variable "identifier" {
  description = "The identifier to use (in the form project-environment)"
  type        = string
}

variable "ssh_key_name" {
  description = "key_name for existing Key Pair to use for SSH access to instance"
  type        = string
}

variable "ssh_access_cidrs" {
  description = "List of CIDR addresses to allow SSH access from"
  type        = map
  default     = {}
  # Format Example: {  "Home" = "104.172.227.195/32" }
}

