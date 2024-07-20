output "this_security_group_id" {
    description = "SG ID"
    value       = concat(
                aws_security_group.this_sg.*.id,
                [""],
    )[0]
}
