import logging
import base64

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(f"Hello {name}!")
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )

    req_body = req.get_json()
    base64str = req_body.get('base64String')
    if base64Str:
        base64decoded = base64.b64decode(base64str)
        logging.info('Base64 Decoded: ' + base64decoded)
        return func.HttpResponse(f"Decoded base64 output: {base64decoded}")
    else:
        return func.HttpResponse(
            "Base64 String not found.",
            status_code=400
        )
