output "security_group_id" {
    description = "SG ID"
    value       = aws_security_group.sg_bastion.id
}
