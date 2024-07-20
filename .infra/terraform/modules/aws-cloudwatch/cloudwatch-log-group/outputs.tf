output "this_log_group_arn" {
    description = "log group arn"
    value       = concat(
                aws_cloudwatch_log_group.this.*.arn,
                [""],
    )[0]
}

output "this_log_group_name" {
    description = "log group name"
    value       = concat(
                aws_cloudwatch_log_group.this.*.name,
                [""],
    )[0]
}