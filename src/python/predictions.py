"""

Lambda function that handles API requests from the Relationship Editor page,
which manually adds a relationship between 2 existing offerings,
(logs entry into DynamoDB) and is used to help improve the predictions model.

@Author: Miffy Chen (miffyche@)

# https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logStream:group=/aws/lambda/proserveportfolio_log_predictions
# https://console.aws.amazon.com/dynamodb/home?region=us-east-1#tables:selected=OfferingPredictions;tab=items

"""

import boto3
from boto3.dynamodb.conditions import Key
import json

# Global data object, constants and basic references
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table_name = "OfferingPredictions"
table_desc = boto3.client('dynamodb').describe_table(TableName = table_name)
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        # variables declaration
        headers = event['headers']
        predictor_name_type = headers['predictor_name_type']
        predictee_name_type = headers['predictee_name_type']
        
        # print to check
        print("Received event: " + json.dumps(event))
        print("predictor: " + predictor_name_type)
        print("predictee: " + predictee_name_type)
        
        # put item in table, if item already exists, new entry will NOT be created
        table.put_item(
            Item = {
                'predictor_name_type': predictor_name_type,
                'predictee_name_type': predictee_name_type,
            }
        )
        
        # get first item with given predictor
        first_item = get_first_item(table, predictor_name_type, predictee_name_type)
        print("First item match in DB: ")
        print(first_item)

        # return all items with given predictor
        all_queries = query_with_index(table, predictor_name_type)
        print("Query returned the following entries: ")
        print(all_queries)

        # add notes to offering relationship
        notes_to_add = "Add this as my notes"
        append_notes_to_item(table, predictor_name_type, predictee_name_type, notes_to_add)

    # if anything goes wrong, show error code
    except Exception as error:
    	return {
    		"statusCode": 400,
    		"body": json.dumps("Write to DB Failed! " + str(error)),
    		"headers":{
    			"Access-Control-Allow-Origin": "*",
    			"Access-Control-Allow-Credentials": True
    		}
        }
    # write to DynamoDB is successful
    return {
        'statusCode': 200,
        'body': json.dumps('Succesfully logged prediction to DynamoDB.'),
        'headers':{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True
        }
    }

# returns first item that match the given params
# do NOT use
def get_first_item(table, predictor, predictee):
    item = table.get_item(Key={"predictor_name_type": predictor, "predictee_name_type": predictee})
    return(item['Item'])

# returns all items that match the given params
def query_with_index(table, predictor):
    all_items = []
    response = table.query(KeyConditionExpression=Key("predictor_name_type").eq(predictor))
    for item in response['Items']:
        all_items.append(item)
    return(all_items)

# add new "Notes" column and notes to existing relationship entries
def append_notes_to_item(table, predictor, predictee, note):
    # print item before update
    response = table.get_item(Key={"predictor_name_type": predictor, "predictee_name_type": predictee})
    print("Item before update: ")
    print(response['Item'])
    # add Notes column to item
    response = table.update_item(
        Key={"predictor_name_type": predictor, "predictee_name_type": predictee},
        ExpressionAttributeNames={"#notes": "Notes"},
        ExpressionAttributeValues={":note": note},
        UpdateExpression="SET #notes = :note",
    )
    # print item after update
    response = table.get_item(Key={"predictor_name_type": predictor, "predictee_name_type": predictee})
    print("Item after update: ")
    print(response['Item'])
