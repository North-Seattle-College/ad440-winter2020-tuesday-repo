import logging
import azure.functions as func

#a function to create a GET request for machines and machines id
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Python HTTP trigger function processed a request.")
    
    # GET method function
    if (req.method == "GET"):
        
        try:
            req_body = req.get_json()
            #paramater for machine
            machine= req.params.get("machine")
            #parameter for machine id
            machineId = req.params.get("machineId")
            #message to print out with outputs
            message=f"Machine: {machine}, machineId: {machineId}"
            #log the outputs
            logging.info(f'Python HTTP triggered function processed machine: {machine}')
            logging.info(f'Python HTTP triggered function processed machineId: {machineId}')
            return func.HttpResponse(message)
        
        except ValueError:
           pass
       
    else:
        #log if not a GET request
        logging.info("Not a GET request")
  
    #if not a GET request pass a message
    return func.HttpResponse(
        "Please pass a GET request",
             status_code=400
        )
