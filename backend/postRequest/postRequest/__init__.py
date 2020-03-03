import logging
import pyodbc
import azure.functions as func
import os


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    # connect to database
    try:
        logging.info('Starting connectiong to database...')
        conn = pyodbc.connect(os.environ['ConnString'])
        cursor = conn.cursor()
        logging.info('Connected to database complete')  
    except:
        #connection failed
        logging.exception("Database connection failed")

    try:
        # check JSON file
        req_body = req.get_json()
        logging.info('Content of JSON body: ' + str(req_body))
        
        #check for duplicate MachineID
        logging.info('Checking for duplicate machine...')
        cursor.execute('SELECT COUNT (*) FROM [dbo].[Machines] WHERE MachineID= ?', (req_body['MachineID']))
        result = cursor.fetchone()
        found = result[0]
        if found == 0:                 
            # no duplicate MachineID was found
            # insert data into SQL
            logging.info('No duplicate found.\n Inserting new Machine...')
            try:
                cursor.execute(
                    '''INSERT INTO [dbo].[Machines] (Model, ModelNum, ModelPhoto, SerialNum, VendorID, LocationID)
                    VALUES (?,?,?,?,?,?)''', (req_body['Model'], req_body['ModelNum'], req_body['ModelPhoto'], req_body['SerialNum'], req_body['VendorID'], req_body['LocationID'])
                    )
            except:
                logging.exception('Failed to insert new Machine')

            try:
                conn.commit()
            except:
                logging.exception('Failed to commit new machine')

            logging.info("Data inserted into SQL complete.")
        else:
            logging.info('Data already exists in database')

        #POST request successful
        return func.HttpResponse(f"Successful request.")
    except ValueError:
        pass

     # no POST request was made
    logging.info("No POST request was made")
    return func.HttpResponse(   
        "Please pass a POST request in the request body",   
        status_code=400 
        )



