module "service_execution_role" {
  source            = "../modules/aws-iam/iam-role"
  providers = {
    aws = aws.use2
  }
  environment       = var.environment

  name = "${var.project}-service-task-execution-role-${var.environment}"
  assume_role_policy = jsonencode(
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
})
}

module "service_execution_policy" {
  source            = "../modules/aws-iam/iam-policy"
  providers = {
    aws = aws.use2
  }
  environment       = var.environment

  name   = "${var.project}-service-task-execution-policy-${var.environment}"
  role   = module.service_execution_role.this_iam_role_id
  policy = jsonencode(
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "ssmmessages:CreateControlChannel",
        "ssmmessages:CreateDataChannel",
        "ssmmessages:OpenControlChannel",
        "ssmmessages:OpenDataChannel"
      ],
      "Resource": "*"
    },
		{
			"Effect": "Allow",
			"Action": [
				"s3:GetObject"
			],
			"Resource": [
				"arn:aws:s3:::${var.project}-infra/service-vars/${var.environment}/*"
			]
		},
		{
			"Effect": "Allow",
			"Action": [
				"s3:GetBucketLocation"
			],
			"Resource": [
				"arn:aws:s3:::${var.project}-infra"
			]
		},
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameters",
      ],
      "Resource": [
        "arn:aws:ssm:${var.default_region}:${var.aws_account_id}:parameter/${var.project}/*/${var.environment}/*",
      ]
    }
  ]
})
}

module "service_task_role" {
  source            = "../modules/aws-iam/iam-role"
  providers = {
    aws = aws.use2
  }
  environment       = var.environment

  name = "${var.project}-service-task-role-${var.environment}"
  assume_role_policy = jsonencode(
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
})
}

module "service_task_policy" {
  source            = "../modules/aws-iam/iam-policy"
  providers = {
    aws = aws.use2
  }
  environment       = var.environment

  name   = "${var.project}-service-task-policy-${var.environment}"
  role   = module.service_task_role.this_iam_role_id
  policy = jsonencode(
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssmmessages:CreateControlChannel",
        "ssmmessages:CreateDataChannel",
        "ssmmessages:OpenControlChannel",
        "ssmmessages:OpenDataChannel",
        "codeartifact:GetPackageVersionReadme",
        "codeartifact:GetAuthorizationToken",
        "codeartifact:DescribeRepository",
        "codeartifact:ReadFromRepository",
        "codeartifact:GetRepositoryEndpoint",
        "codeartifact:DescribeDomain",
        "codeartifact:DescribePackageVersion",
        "codeartifact:GetPackageVersionAsset",
        "codeartifact:GetRepositoryPermissionsPolicy",
        "sts:GetServiceBearerToken",
        "codeartifact:GetDomainPermissionsPolicy",
        "codeartifact:PublishPackageVersion",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "events:PutEvents"
      ],
      "Resource":[
        "arn:aws:events:${var.default_region}:${var.aws_account_id}:event-bus/${var.project}-${var.environment}"
      ]
    },
  ]
})
}
