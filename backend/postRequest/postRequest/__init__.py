import logging
import pyodbc
import azure.functions as func
import os


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    try:
        # connect to database
        logging.info('Starting connection to database...')
        conn = pyodbc.connect(os.environ['ConnString'])
        cursor = conn.cursor()
        logging.info('Connected to database')  
    except:
        # connection failed
        logging.exception("Database connection failed")

    try:
        # read JSON body
        req_body = req.get_json()
        logging.info('Content of JSON body: ' + str(req_body))
        
        try:
            # check for duplicate MachineID
            logging.info('Checking for duplicate machine...')
            cursor.execute('SELECT COUNT (*) FROM [dbo].[Machines] WHERE MachineID= ?', (req_body['MachineID']))
            result = cursor.fetchone()
            found = result[0]
        except:
            #Duplicate check failed
            logging.exception('Duplicate check failed')

        if found == 0:                 
            # no duplicate MachineID was found
            logging.info('No duplicate found. \nInserting new Machine...')

            try:
                # insert data into SQL
                cursor.execute(
                    '''INSERT INTO [dbo].[Machines] (Model, ModelNum, ModelPhoto, SerialNum, VendorID, LocationID)
                    VALUES (?,?,?,?,?,?)''', (req_body['Model'], req_body['ModelNum'], req_body['ModelPhoto'], req_body['SerialNum'], req_body['VendorID'], req_body['LocationID'])
                    )
            except:
                # data insert failed
                logging.exception('Failed to insert new Machine')

            try:
                # commit data to database
                conn.commit()
            except:
                # data commit failed
                logging.exception('Failed to commit new machine')
                
        else:
            # duplicate found in database
            logging.info('Machine already exists in database')

        # POST request successful
        logging.info('Http trigger request complete')
        return func.HttpResponse(f"Successful request")
    except ValueError:
        pass

     # no POST request was made
    logging.info("No POST request was made")
    return func.HttpResponse(   
        "Please pass a POST request in the request body",   
        status_code=400 
        )