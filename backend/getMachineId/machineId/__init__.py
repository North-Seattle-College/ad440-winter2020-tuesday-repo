import logging
import azure.functions as func
import os
import pyodbc
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    try:
        #connect to database
        # Setting connection to the database via key vault connection string.
        conn = pyodbc.connect(os.environ['ConnString'])
        logging.info("Connection complete")
        cursor = conn.cursor()
    
        req_body = req.get_json()
        machineId = req.route_params.get('MachineID')
        logging.info(req_body)
    
        #select specific machine by ID from machine table in database
        rows = cursor.execute('''SELECT * FROM [dbo].[Machines] WHERE MachineID = ? ''',
        (machineId['MachineID'])).fetchall()
        column_names = [column[0] for column in cursor.description]
        rows = [dict(zip(column_names, row)) for row in rows]
            
        conn.commit()
        conn.close()
        return func.HttpResponse(json.dumps(rows))
        #return func.HttpResponse(f’successful request’)
    except Exception as e:
        #connection failed
        logging.exception("Connection failed" + str(e))
        pass
    #except ValueError:
        #pass
    #else:
    logging.info('Not a GET request')
    #return func.HttpResponse(
         #“Please pass a GET request”,
            #status_code=400
    #)