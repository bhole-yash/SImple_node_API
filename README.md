# SImple_node_API
Simple Node api performing CRUD operations

The application is expected to use a JSON file locally to store and retrieve the data. The JSON file should be a simple key-value store where the user's name will be the
key, and the phone number will be the value. Example:
```
$ cat ./users.json
{"john":9876543210,"mary":6549873210,"adam":3216549870}
```
Following is the base case expected output for each of the above API calls:
## GET
```
$ curl -X GET http://localhost/?name=john
{"status":200,"message":"Found user john with phone number 9876543210"}
```
## POST
```
$ curl -X POST http://localhost -H 'Content-Type: application/json' -d '{"name": "john", "phone": 9876543210}'
{"status":201,"message":"Success: Added user john with phone number 9876543210"}
```
## PUT
```
$ curl -X PUT http://localhost -H 'Content-Type: application/json' -d '{"name": "john", "phone": 7651234980}'
{"status":201,"message":"Success: Updated user john with phone number 7651234980"}
```
## DELETE
```
$ curl -X DELETE http://localhost/?name=john
{"status":200,"message":"Successfully deleted user john"}
```
The output is expected to be in JSON format with two properties, status and message :
1. status - This is the HTTP response status code. Make sure that you return a response code that makes sense based on the message context.
2. message - This is the response message for the request. You are free to construct the message any way you like, but make sure that it makes sense
