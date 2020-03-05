import logging
import pyodbc
import azure.functions as func
import os
import mysql.connector 
from mysql.connector import errorcode


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    try:
        # connect to database
        logging.debug('Starting connection to database...')
        conn = pyodbc.connect(os.environ['ConnString'])
        cursor = conn.cursor()
        logging.info('Connected to database')  
    
        # read JSON body
        req_body = req.get_json()
        logging.info('Content of JSON body: ' + str(req_body))
        
        # insert data into SQL
        cursor.execute(
            '''INSERT INTO [dbo].[Machines] (Model, ModelNum, ModelPhoto, SerialNum, VendorID, LocationID)
            VALUES (?,?,?,?,?,?)''', (req_body['Model'], req_body['ModelNum'], req_body['ModelPhoto'], req_body['SerialNum'], req_body['VendorID'], req_body['LocationID'])
            )

        # commit data to database
        logging.info('Commiting new machine ID to database')
        conn.commit()
        logging.info('Commit complete')

        # POST request successful
        logging.info('Http trigger request complete')
        return func.HttpResponse(f"Successful request")

    # except mysql.connector.Error as err:
    #     if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    #         return func.HttpResponse('Something is wrong with user name or password')
    #     elif err.errno == errorcode.ER_BAD_DB_ERROR:
    #         return func.HttpResponse('Database does not exist')
    #     else:
    #         return func.HttpResponse('Connection failed: '+str(err))
    except ValueError:
        pass


     # no POST request was made
    logging.info("No POST request was made")
    return func.HttpResponse(   
        "Please pass a POST request in the request body",   
        status_code=400 
        )