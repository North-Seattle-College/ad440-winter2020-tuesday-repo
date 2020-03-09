import json
import logging
import requests

import azure.functions as func 


def main(event: func.EventGridEvent):

    result = json.dumps({
        'id': event.id,
        'data': event.get_json(),
        'topic': event.topic,
        'subject': event.subject,
        'event_type': event.event_type,
        'event_test' : 'test string'
            
    }) 

    url = 'https://san-zg-fun-usw2-task61.azurewebsites.net/api/machineid'
    if requests.get(url) != 404: 
        
        r = requests.get(url)
        logging.info(r.text)


        if r == 500: 
            r= requests.put('https://jos-rg-fun-usw2-task62.azurewebsites.net/api/machineid')
            logging.info(r.text)

    else: 
        r = requests.post('https://ken-fun-feat-usw2-task60.azurewebsites.net/api/machineid')





    logging.info('Python EventGrid trigger processed an event: %s', result)