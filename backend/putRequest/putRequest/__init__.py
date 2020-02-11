import logging
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    headers = {"my-http-header": "some-value"}
    logging.info('Python HTTP trigger function processed a request.')
    logging.info(req.__dict__)

    #method = req.method
    machineId = req.params.get('machineId')
    if (req.method == "PUT"):
        try:
            req_body = req.get_json()
            logging.info(req_body)
            return func.HttpResponse(f"successful request")
        except ValueError:
            pass
        else:
            machineId = req_body.get('machineId')
    else:
        logging.info("Not a PUT request...")
        return func.HttpResponse(
            'Request was not a PUT',
            status_code=400
            )

    if machineId:
        return func.HttpResponse(f"Your machineId is: {machineId}!", headers=headers)
    else:
        return func.HttpResponse(
            "Please pass a PUT request on the query string or in the request body",
            status_code=400
        )