var AWS = require('aws-sdk'); 

AWS.config.region = 'us-east-1'
var queueUrl = 'https://sqs.us-east-1.amazonaws.com/854757141155/tictactoe'
var sqs = new AWS.SQS()

setInterval(function () {
  var params = {
      QueueUrl: queueUrl, /* required */
      MaxNumberOfMessages : 1
  };

  sqs.receiveMessage(params, function(err, data) {
    // an error occurred
    if (err) { console.log(err, err.stack); }    
    if (!data.Messages) { console.log('no messages'); return; }    

    var message = data.Messages[0];

    try {
      HandleMessage(message);
      DeleteMessage(queueUrl, message);
    }
    catch (e) {
      console.log(e)
    }
    
  });

}, 2000)

function HandleMessage(m) {
    var body = JSON.parse(m.Body);
    var command = require('./' + body.command);
    command.execute(body.data);
}

function DeleteMessage(q,m) {

  var params = {
        QueueUrl: q, /* required */
        ReceiptHandle: m.ReceiptHandle /* required */
      };

      sqs.deleteMessage(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
      });
}