variable "create_r53" {
  description = "Whether to create the route"
  type        = bool
  default     = true
}

variable "hosted_zone" {
  description = "hosted_zone id. default: yumioos.dev's ID - -------------------------"
  type        = string 
  default     = "-----------------------"
}

variable "record" {
  description = "the alb record for cname"
  type        = string
}

variable "type" {
  description = "what type of record"
  type        = string
  default     = "CNAME"
}

variable "ttl" {
  description = "Route TTL, default: 5 minutes"
  type        = string
  default     = "300"
}

variable "name" {
  description = "Routes URL"
  type        = string
}