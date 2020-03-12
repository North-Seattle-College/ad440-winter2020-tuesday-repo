import logging
import azure.functions as func
import pyodbc
import os
import json


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s')
    #logging.Logger.root.level = 10
    logging.info('Starting Python HTTP trigger function request')
    #logger = logging.getLogger(__name__)


    try:
        #database connection 
        conct = pyodbc.connect(os.environ['ConnString'])
        cursor = conct.cursor()
        logging.debug("Database connection successful")
        #query to select everything from the Machines table and put results in a tuple then convert tuples into dictionary
        qry = cursor.execute('''SELECT * FROM [dbo].[Machines]''').fetchall()
        logging.debug("Database query successful")
        column_names = [column[0] for column in cursor.description]
        rows = [dict(zip(column_names, row)) for row in qry]

        conct.commit()
        
        #logging 
        logging.info("Python HTTP trigger function request successful")
        return func.HttpResponse(json.dumps(rows)) #json.dumps to create JSON string
    except ConnectionError as connerr:
        logging.error("Database connection failed" + str(connerr))
    except SyntaxError as synerr:
        logging.error("Database query failed" + str(synerr))
    except Exception as ex:
        logging.info("Python HTTP trigger function request unsuccessful" + str(ex))    


    
