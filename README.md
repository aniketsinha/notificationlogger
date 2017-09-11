# notificationlogs
AWS Lambda function which is triggered by SNS notification, and logs it's content to DynamoDB table

Prerequisite:
1. Ensure that Lambda has role configured to write to DynamoDB table.
2. This lambda function is subscribed to SNS Topic as endpoint.
3. SNS topic is set as trigger for this function.
4. Input for DynamoDB matches it's schema.
