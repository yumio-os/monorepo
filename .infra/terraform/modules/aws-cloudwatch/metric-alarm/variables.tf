variable "name" {
  description = "name of the alarm"
}

variable "comparison_operator" {
  description = "comparison operator (e.g. GreaterThanOrEqualToThreshold)"
}

variable "evaluation_periods" {
  description = "evalution period of the metric"
  default = "1"
}

variable "metric_name" {
  description = "the metric to create alarms from"
}

variable "metric_namespace" {
  description = "the namespace of the metric to create alarms from"
}

variable "period" {
  description = "period of checking for the metric"
}

variable "statistic" {
  description = "how to aggregate the data (e.g. Maximum)"
}

variable "threshold" {
  description = "alarm threshold"
}

variable "description" {
  description = "alarm description"
}

variable "sns_arn" {
  description = "the sns topic to send the alarm to"
}

