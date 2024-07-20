output "db_cluster_endpoint" {
  description = "Database Cluster Endpoint (writer)"
  value       = aws_rds_cluster.this.endpoint
}
