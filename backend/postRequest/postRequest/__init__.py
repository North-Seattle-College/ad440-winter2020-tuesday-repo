import logging
import pyodbc
import azure.functions as func
import os


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    # connect to database
    try:
        conn = pyodbc.connect(os.environ['ConnString'])
        cursor = conn.cursor()
        logging.info('Connect to database complete')  
    except:
        #connection failed
        logging.exception("Database connection failed")

    try:
        # check JSON file
        req_body = req.get_json()
        logging.info(req_body)
        
        #check for duplicate Models
        cursor.execute('SELECT COUNT (*) FROM [dbo].[Machines] WHERE MachineID= ?', (req_body['MachineID']))
        result = cursor.fetchone()
        found = result[0]
        if found == 0:                 
            # no duplicate Model was found
            # insert data into SQL
            cursor.execute(
                '''INSERT INTO [dbo].[Machines] (Model, ModelNum, ModelPhoto, SerialNum, VendorID, LocationID)
                VALUES (?,?,?,?,?,?)''', (req_body['Model'], req_body['ModelNum'], req_body['ModelPhoto'], req_body['SerialNum'], req_body['VendorID'], req_body['LocationID'])
                )
            conn.commit()
            logging.info("Data inserted into SQL complete.")
        
        #POST request successful
        return func.HttpResponse(f"Successful request. Data inserted into database")
    except ValueError:
        pass

     # no POST request was made
    logging.info("No POST request was made")
    return func.HttpResponse(   
        "Please pass a POST request in the request body",   
        status_code=400 
        )



