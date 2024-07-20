variable "create_redis" {
  description = "Whether to create the Redis Cluster"
  type        = bool
  default     = true
}

variable "vpc_id" {
  description = "The VPC id in which to deploy the Redis Cluster"
  type        = string
}

variable "cluster_name" {
  description = "The name/id of the Redis Cluster"
  type        = string
}

variable "sec_group_name" {
  description = "The security group name for use by the Redis Cluster"
  type        = string
}

variable "subnet_group_name" {
  description = "Name of the subnet group used by the Redis Cluster"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet ids for use by the Redis Cluster"
  type        = list
}

variable "node_type" {
  description = "The node type (class of instance) to use for the Redis Cluster"
  type        = string
  default     = "cache.t2.micro"
}

variable "node_count" {
  description = "Number of nodes to deploy in the Redis Cluster"
  type        = number
  default     = 2
}
