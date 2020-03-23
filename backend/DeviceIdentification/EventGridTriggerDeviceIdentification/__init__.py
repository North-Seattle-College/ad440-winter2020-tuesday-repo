# Laila Chavez
# Event Grid code
import json
import logging
import requests
import azure.functions as func 

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s')

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
    #Decide what function (GET/PUT/POST) the info goes to
    url = 'https://san-fun-usw2-task156.azurewebsites.net/api/machines/{MachineID}?code=0QZ7re1VjAXWcYWew1lSfKQWIqEHoE4nVMjoQNyXiajBryooiiz3ZQ=='
    if requests.get(url) != 404: 
        #If URL doesn't give back a 404, make a GET request
        response = requests.get(url)
        logging.info(response.text)
        

        #If URL gives a 500 response, make an update/PUT request
        if response == 500: 
            response= requests.put('https://jos-rg-fun-usw2-task62.azurewebsites.net/api/putRequest', json= result)
            logging.info(response.text)
        logging.debug("Got response 404.")
    #Otherwise, create a message with a POST request
    else: 
        response = requests.post('https://ken-fun-feat-usw2-task60.azurewebsites.net', json= result)
        logging.info(response.text)
        

    logging.info('Python EventGrid trigger processed an event: %s', result)