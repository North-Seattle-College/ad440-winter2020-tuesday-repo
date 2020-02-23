import logging
import pyodbc
import azure.functions as func
import os


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    # connect to database
    # cnxn = pyodbc.connect(os.environ['DatabaseConnString'])
    # logging.info('Connect to database complete')
    # cursor = cnxn.cursor()

    # check that it is a POST request
    try:
        # check JSON file
        req_body = req.get_json()
        logging.info(req_body)

        # insert data into SQL
        # cursor.execute(
        #     "INSERT INTO [dbo].[Machines] ([Model], [ModelNum], [ModelPhoto], [SerialNum], [VendorID], [LocationID])\
        #         VALUES (req_body['Model'], req_body['ModelNum'], req_body['ModelPhoto'], req_body['SerialNum'], req_body['VendorID'], req_body['LocationID'])"
        #     )

        # logging.info("Data inserted into SQL complete.")
        #POST request successful
        return func.HttpResponse(f"Successful request")
    except ValueError:
        pass

     # no request was made
    logging.info("No POST request was made")
    return func.HttpResponse(
        "Please pass a POST request in the request body",
        status_code=400 
        )
