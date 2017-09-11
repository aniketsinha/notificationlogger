'use strict';
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    const snsObj = event.Records[0].Sns;
    console.log("SNS Object = "+JSON.stringify(event.Records[0].Sns));  //log to logstream
    const message = snsObj.Message;
    const subject = snsObj.Subject;
    
    AWS.config.update({
        region: 'ap-south-1',
        endpoint: "http://dynamodb.ap-south-1.amazonaws.com"
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: "NotificationLogs",
        Item:{
            "Subject": subject,
            "Message": message,
            "Timestamp": (new Date).getTime()
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("ERROR: DynamoDB: Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("SUCCESS: DynamoDB: Added item:", JSON.stringify(data, null, 2) , params.Item);
        }
    });
};
