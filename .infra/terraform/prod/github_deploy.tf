resource "aws_iam_policy" "github" {
  provider    = aws.use2

  name        = "github-deploy-${var.project}-${var.environment}"
  description = "Allow Github actions to push to ECR, read task-definition from S3 and deploy to ECS"

  policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "GetAuthorizationToken",
        Effect: "Allow",
        Action: [
          "ecr:GetAuthorizationToken"
        ],
        Resource: "*"
      },
      {
        Sid: "AllowPushPull",
        Effect: "Allow",
        Action: [
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ],
        Resource: "arn:aws:ecr:${var.default_region}:${var.aws_account_id}:repository/${var.project}/*"
      },
      {
        Sid: "S3ListBucket",
        Effect: "Allow",
        Action: [
          "s3:ListBucket"
        ],
        Resource: [
          "arn:aws:s3:::${var.project}-infra"
        ]
      },
      {
        Sid: "S3GetObject",
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "s3:GetObjectVersion"
        ],
        Resource: [
          "arn:aws:s3:::${var.project}-infra/task_definitions/*"
        ]
      },
      {
        Sid: "RegisterOrDescribeTaskDefinition",
        Effect: "Allow",
        Action: [
          "ecs:RegisterTaskDefinition"
        ],
        Resource: "*"
      },
      {
        Sid: "PassRolesInTaskDefinition",
        Effect: "Allow",
        Action: [
          "iam:PassRole"
        ],
        Resource: [
          "arn:aws:iam::${var.aws_account_id}:role/${var.project}-service-task-role-${var.environment}",
          "arn:aws:iam::${var.aws_account_id}:role/${var.project}-service-task-execution-role-${var.environment}"
        ]
      },
      {
        Sid: "DeployService",
        Effect: "Allow",
        Action: [
          "ecs:UpdateService",
          "ecs:DescribeServices"
        ],
        Resource: [
          "arn:aws:ecs:${var.default_region}:${var.aws_account_id}:service/${var.project}-${var.environment}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role" "this" {
  provider    = aws.use2

  name        = "github-deploy-${var.project}-${var.environment}"
  description = "Allow Github actions to push to ECR and deploy to ECS"
  managed_policy_arns = [ aws_iam_policy.github.arn ]
  assume_role_policy  = jsonencode({
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Principal": {
					"Federated": "arn:aws:iam::${var.aws_account_id}:oidc-provider/token.actions.githubusercontent.com"
				},
				"Action": "sts:AssumeRoleWithWebIdentity",
				"Condition": {
					"StringEquals": {
						"token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
					},
					"StringLike": {
						"token.actions.githubusercontent.com:sub": "repo:nvrwhr/yumio:*"
					}
				}
			}
		]
	})
}

