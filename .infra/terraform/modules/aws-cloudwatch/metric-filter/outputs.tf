output "name" {
  description = "log metric filter name"
  value = concat(
    aws_cloudwatch_log_metric_filter.this.*.name,
    [""],
  )[0]
}

output "metric_name" {
  description = "log metric filter metric_name"
  value       = aws_cloudwatch_log_metric_filter.this.metric_transformation[0].name

}


output "metric_namespace" {
  description = "log metric filter metric_namespace"
  value       = aws_cloudwatch_log_metric_filter.this.metric_transformation[0].namespace

}
