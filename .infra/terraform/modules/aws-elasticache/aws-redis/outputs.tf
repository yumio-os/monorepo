output "redis_node_hostname" {
  description = "Hostname for the first Redis node"
  value       = aws_elasticache_cluster.this.cache_nodes[0].address
}
