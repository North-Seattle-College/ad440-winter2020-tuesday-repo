import logging
import azure.functions as func
import pyodbc
import os
import json


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s')
    logging.info('Starting Python HTTP trigger function request')
    logger = logging.getLogger(__name__)


    try:
        #database connection 
        conct = pyodbc.connect(os.environ['ConnString'])
        
        cursor = conct.cursor()
        #query to select everything from the Machines table and put results in a tuple then convert tuples into dictionary
        qry = cursor.execute('''SELECT * FROM [dbo].[Machines]''').fetchall()
        column_names = [column[0] for column in cursor.description]
        rows = [dict(zip(column_names, row)) for row in qry]

        conct.commit()
        
        #logging 
        logging.info("Database connection successful") 
        logging.info("Database query successful")    
        logging.info("Python HTTP trigger function request successful")
        return func.HttpResponse(json.dumps(rows)) #json.dumps to create JSON string
    except:
        #logging
        logger.error("Database connection failed")
        logger.debug("Database query unsuccessful")
        logger.info("Python HTTP trigger function request unsuccessful")


    
