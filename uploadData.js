

//script to update models info database 
// one aws config info json and another for the actual model information
var AWS = require('aws-sdk');
var configs = require('./config.json');
var modelData = require('./modelArray.json');

//config AWS
 AWS.config.update(config.aws);
    
let docClient = new AWS.DynamoDB.DocumentClient();
var params = {
  TableName : "users_names",
  Key: {
    "user": "stephen",
  }
};
