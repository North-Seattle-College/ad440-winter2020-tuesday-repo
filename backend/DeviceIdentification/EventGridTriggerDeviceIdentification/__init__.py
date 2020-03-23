# Laila Chavez
# Event Grid code
import json
import os
import logging
import requests
import azure.functions as func 

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s')
logging.info('laila test 319')
def main(event: func.EventGridEvent):
    #Trigger function with info coming in from simulated IoT device
    result = json.dumps({
        'id': event.id,
        'data': event.get_json(),
        'topic': event.topic,
        'subject': event.subject,
        'event_type': event.event_type,
        'event_test' : 'test string'
            
    }) 
    test= json.loads(result)
    test2= test['data']['body']['MachineID']
    test3=test['data']['body']
    logging.info(test2)

    #Decide what function (GET/PUT/POST) the info goes to
   # url = f'https://san-fun-usw2-task156.azurewebsites.net/api/machines/{test2}?code=0QZ7re1VjAXWcYWew1lSfKQWIqEHoE4nVMjoQNyXiajBryooiiz3ZQ=='
    getURL = os.environ["GetEndpoint"]   

    if requests.get(getURL) == 200 or 202: 
        #If URL doesn't give back a 404, make a GET request
        response = requests.get(getURL)
        logging.info(response.text)
        
    #url = requests.put('https://jos-rg-fun-usw2-task62.azurewebsites.net/api/putRequest', json=test2)
        putURL = os.environ["PutEndpoint"]
        #If URL gives a 500 response, make an update/PUT request
        if response == 200 or 202: 
            logging.info(test3)
            response= requests.put(putURL, json= test3)
            logging.info(response.text)
        logging.debug("Got response 404.")
    #Otherwise, create a message with a POST request
    else: 
        postURL = os.environ["PostEndpoint"]
        response = requests.post(postURL, json= test3)
        logging.info(response.text)
        

    logging.info('Python EventGrid trigger processed an event: %s', result)