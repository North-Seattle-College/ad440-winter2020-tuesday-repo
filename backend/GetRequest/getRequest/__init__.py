import logging
import json
import azure.functions as func
import requests


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    logging.info(req.__dict__)
    #logging.info(f"Params: {params}")
    
   
    method = req.method
    if(method == 'GET'):
        try:
            req_body = req.get_json()
            machine= req_body.get("machine")
            id=req_body.get("id")
            message=f"Machine: {machine}, ID: {id}"
            logging.info(req_body)
            logging.info(f'Python HTTP triggered function processed: {id}')
            return func.HttpResponse(message)
        except ValueError:
            pass
    else:
        logging.info("Not a GET request")
  
    return func.HttpResponse(
        "Please pass a GET request",
             status_code=400
        )
