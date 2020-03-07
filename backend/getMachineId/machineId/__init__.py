import logging
import azure.functions as func
import os
import pyodbc
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    try:
        #connect to database
        conn = pyodbc.connect(os.environ['ConnString'])
        cursor = conn.cursor()
        logging.info('Connected to database')
        #req_body = req.get_json()
        #logging.info(req_body)
        #select specific machine by ID from machine table in database
        cursor.execute(" SELECT * FROM [dbo].[Machines] WHERE MachineID = ? ", ['MachineID'])
        logging.info('not correct format')
        result = cursor.fetchall()
        conn.commit()
        #return info about specific machine
        return func.HttpResponse(json.dumps(result))
        #return func.HttpResponse(f'successful request')
        
        
    except:
        #connection failed
        logging.exception("Connection failed")
        
    try:
        req_body = req.get_json()
        return func.HttpResponse(f'Successful Request')
      
    cursor.close()
    conn.close()
        
        
        
            
    #except ValueError:
        #pass
        
    #else:
    logging.info('Not a GET request')
    
    #return func.HttpResponse(
         #"Please pass a GET request",
            #status_code=400
    #)
