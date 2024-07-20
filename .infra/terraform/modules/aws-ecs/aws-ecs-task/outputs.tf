output "this_task_arn" {
    description = "Task ARN family:revision"
    value       = concat(
                aws_ecs_task_definition.this.*.id,
                [""],
    )[0]
}

output "family" {
    description = "Task family"
    value       = aws_ecs_task_definition.this.family
}
