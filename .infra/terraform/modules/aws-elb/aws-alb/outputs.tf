output "this_lb_arn" {
    description = "lb arn"
    value       = concat(
                aws_lb.this.*.arn,
                [""],
    )[0]
}

output "this_lb_dns" {
    description = "lb dns"
    value       = concat(
                aws_lb.this.*.dns_name,
                [""],
    )[0]
}

output "this_lb_default_listener" {
    description = "lb arn default listener"
    value       = concat(
                aws_lb_listener.default.*.arn,
                [""],
    )[0]
}