import logging
import base64

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    base64str = req.params.get('base64Decode')
    if not base64str:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            base64str = req_body.get('base64Decode')

    if base64str:
        dataDecode=base64.b64decode(base64str)
        logging.info('Base64 decode complete. Output: ' + str(dataDecode))
        return func.HttpResponse(f"Output: {dataDecode}")
    else:
        logging.warning('Missing input')
        return func.HttpResponse(
             "Please pass a base64str on the query string or in the request body",
             status_code=400
        )