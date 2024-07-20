variable "metric_filter_name" {
  description = "The name of the metric filter"
  type        = string
}
variable "metric_filter_pattern" {
  description = "The pattern to which filter the log group"
  type        = string
}
variable "log_group_name" {
  description = "The log group to create metric from"
  type        = string
}
variable "metric_name" {
  description = "The metric to raise data into"
  type        = string
}
variable "namespace" {
  description = "The name space of the metric"
  type        = string
}
variable "metric_transformation_value" {
  description = "Transformation value of the metric"
  type        = string
}
