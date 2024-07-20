output "this_bucket_arn" {
  description = "bucket arn"
  value = concat(
    aws_s3_bucket.this_s3_bucket.*.arn,
    [""],
  )[0]
}



output "this_bucket_id" {
  description = "bucket name"
  value = concat(
    aws_s3_bucket.this_s3_bucket.*.id,
    [""],
  )[0]
}
