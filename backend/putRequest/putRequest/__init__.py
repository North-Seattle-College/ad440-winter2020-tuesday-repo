import logging
import azure.functions as func
import os
import pyodbc
import time

# main method takes an Http request as parameter.
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    # This stament checks for a PUT request.
    if (req.method == "PUT"):
        try:
            # check JSON body request
            req_body = req.get_json()
            logging.info("Getting the json body.")
            logging.debug(req_body)

            # Setting connection to the database via key vault connection string.
            conn = pyodbc.connect(os.environ['ConnString'])
            logging.debug(conn)
            logging.info("Connection complete")
            cursor = conn.cursor()

            #updates a Machine
            cursor.execute(''' UPDATE [dbo].[Machines]
            SET Model = ?, ModelNum = ?, ModelPhoto = ?, SerialNum = ?, VendorID = ?, LocationID = ?  WHERE MachineID = ? ''',
            (req_body['Model'], req_body['ModelNum'], req_body['ModelPhoto'], req_body['SerialNum'], req_body['VendorID'], req_body['LocationID'], req_body['MachineID']))
            conn.commit()
            conn.close()
            return func.HttpResponse(f"successful request")
        except ValueError as e:
            logging.error("Invalid json format " + str(e))
            pass # invalid json
        except Exception as err:
            logging.error("String connection to the database failed " + str(err))
            pass
        except pyodbc.DatabaseError as em:
            logging.error("Something went wrong with the database " + str(em))
            cursor.rollback()
            pass
        finally:
            logging.info("record successfuly updated")
            logging.info("Closing connection to the database ...")
            
    # retuerns a Http 400 status.
    return func.HttpResponse(
        "Please pass a PUT request on the query string or in the request body",
        status_code=400
    )