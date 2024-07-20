output "this_tg_arn" {
    description = "lb arn"
    value       = concat(
                aws_lb_target_group.this_tg.*.arn,
                [""],
    )[0]
}

