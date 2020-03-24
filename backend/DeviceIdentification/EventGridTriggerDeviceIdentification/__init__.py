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
    #Parse json string from simulated device to get only the information needed
    test= json.loads(result)
    test2= test['data']['body']['MachineID']
    test3=test['data']['body']
    logging.info(test2)

    #Decide what function (GET/PUT/POST) the info goes to
    #GetEndpoint replaces the GET URL which is hidden in Cloud, test2 takes the place of {MachineID} in URL
    getURL = os.environ["GetEndpoint"]
    if requests.get(getURL) == 200 or 202: 
        logging.debug("If response is not successful, check GET URL function to make sure it's working properly")
        #If URL doesn't give back a 404, make a GET request
        response = requests.get(getURL)
        logging.info(response.text)
        
        #PutEndpoints replaces the PUT URL and json=test3 is passed in after URL
        putURL = os.environ["PutEndpoint"]
        #If URL gives a 500 response, make an update/PUT request
        if response == 200 or 202: 
            logging.info(test3)
            response= requests.put(putURL, json= test3)
            logging.info(response.text)
        logging.debug("Got response 404.")
    #Otherwise, create a message with a POST request
    else: 
        #PostEndpoint replaces the POST URL and json=test3 is passed in after URL
        postURL = os.environ["PostEndpoint"]
        response = requests.post(postURL, json= test3)
        logging.info(response.text)
        

    logging.info('Python EventGrid trigger processed an event: %s', result)