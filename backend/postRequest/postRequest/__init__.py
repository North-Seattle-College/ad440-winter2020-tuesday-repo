import logging

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    logging.info(req.__dict__)


    if req.method == "POST":
        # logging.info(req.body)
        try:
            req_body = req.get_json()
            logging.info(req_body)
            return func.HttpResponse(f"Sucess")
        except ValueError:
            pass
    else:
        logging.info("Not POST request")


    return func.HttpResponse(
             "Please pass a POST request on the query string or in the request body",
             status_code=400
        )
