import logging
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Python HTTP trigger function processed a request.")
   
    if (req.method == "GET"):
        
        try:
            req_body = req.get_json()
            machine= req.params.get("machine")
            machineId = req.params.get("machineId")
            message=f"Machine: {machine}, machineId: {machineId}"
            logging.info(f'Python HTTP triggered function processed machine: {machine}')
            logging.info(f'Python HTTP triggered function processed machineId: {machineId}')
            return func.HttpResponse(message)
        
        except ValueError:
           pass
       
    else:
        logging.info("Not a GET request")
  
    return func.HttpResponse(
        "Please pass a GET request",
             status_code=400
        )
