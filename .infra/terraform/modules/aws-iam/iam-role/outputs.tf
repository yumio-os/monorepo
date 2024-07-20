output "this_iam_role_id" {
    description = "role name"
    value       = concat(
                aws_iam_role.this.*.id,
                [""],
    )[0]
}

output "this_iam_role_arn" {
    description = "role arn"
    value       = concat(
                aws_iam_role.this.*.arn,
                [""],
    )[0]
}
