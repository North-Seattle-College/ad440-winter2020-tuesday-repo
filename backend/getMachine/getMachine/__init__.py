import logging
import azure.functions as func
import pyodbc
import os
import json

def logmain(logger):
    logger.setLevel(logging.DEBUG)
    logger.setLevel(logging.ERROR)


def main(req: func.HttpRequest) -> func.HttpResponse:
    #logging.Logger.root.level = 10
    logging.info('Starting Python HTTP trigger function request')
    #logger = logging.getLogger(__name__)


    try:
        #database connection 
        conct = pyodbc.connect(os.environ['ConnString'])
        cursor = conct.cursor()
        logging.debug("Database connection successful")
        #query to select everything from the Machines table and put results in a tuple then convert tuples into dictionary
        qry = cursor.execute('''SELECT * FROM [dbo].[Machines] INNER JOIN [dbo].[Vendors] ON [dbo].[Machines].VendorId = [dbo].[Vendors].VendorId INNER JOIN [dbo].[Locations] ON [dbo].[Machines].LocationId = [dbo].[Locations].LocationId''').fetchall()
        logging.debug("Database query successful")
        column_names = [column[0] for column in cursor.description]
        rows = [dict(zip(column_names, row)) for row in qry]

        #commit and close connection
        conct.commit()
        conct.close()
        
        #logging 
        logging.info("Python HTTP trigger function request successful")
        return func.HttpResponse(json.dumps(rows)) #json.dumps to create JSON string
    except pyodbc.interfaceerror as connerr:
        logging.error("Database connection failed" + str(connerr))
        return func.HttpResponse('Connection failed',status_code=500)
    except pyodbc.operationalerror as synerr:
        logging.error("Database query failed" + str(synerr))
        return func.HttpResponse('Database query failed: ',status_code=500)
    except pyodbc.Error as err:
        logging.info("Python HTTP trigger function request unsuccessful" +  str(err))    
        return func.HttpResponse('Unsuccessful request',status_code=500)
    except Exception as eerr:
        logging.error("String connection to the database failed " + str(eerr))
        return func.HttpResponse('Connection failed',status_code=500)

    
