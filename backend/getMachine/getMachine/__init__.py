import logging
import azure.functions as func
import pyodbc
import os
import json


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        #database connection 
        conct = pyodbc.connect(os.environ['ConnString'])
        cursor = conct.cursor()
        #query to select everything from the Machines table and put results in a tuple then convert tuples into dictionary
        rows = cursor.execute('''SELECT * FROM [dbo].[Machines]''').fetchall()
        column_names = [column[0] for column in cursor.description]
        rows = [dict(zip(column_names, row)) for row in rows]

        conct.commit()

        #json.dumps to create JSON string
        return func.HttpResponse(json.dumps(rows))
    except:
        logging.exception("Database connection failed")    

    
    try:
       
        req_body = req.get_json()
        logging.info(req_body) 
        #if request is successful this success message will show
        return func.HttpResponse(f"Successful request")
    except ValueError:
        pass
    #if request is not successful this error will show
    logging.info("No GET request was made")
    return func.HttpResponse(
        "Please pass a name on the query string or in the request body",
        status_code=400
        )       
