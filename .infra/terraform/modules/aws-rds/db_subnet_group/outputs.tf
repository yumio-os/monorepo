output "this_db_subnet_group_name" {
  description = "subnet group name"
  value = concat(
    aws_db_subnet_group.this_db_subnet_group.*.name,
    [""],
  )[0]
}


output "this_db_subnet_group_id" {
  description = "subnet group id"
  value = concat(
    aws_db_subnet_group.this_db_subnet_group.*.id,
    [""],
  )[0]
}
