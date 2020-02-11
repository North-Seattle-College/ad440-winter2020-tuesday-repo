import logging

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    # check that it is a POST request
    if req.method == "POST":
        try:
            # check JSON file
            req_body = req.get_json()
            logging.info(req_body)
            #POST request sucessful
            return func.HttpResponse(f"Successful request")
        except ValueError:
            pass
    else:
        # request was not a POST
        logging.info("Request was not a POST")
        return func.HttpResponse(
            'Request was not a POST',
            status_code=400
            )

     # no POST request was made
    logging.info("No POST request was made")
    return func.HttpResponse(
        "Please pass a POST request in the request body",
        status_code=400
        )
