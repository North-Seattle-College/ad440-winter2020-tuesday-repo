import logging
import azure.functions as func
import os
import pyodbc
import time

# main method takes an Http request as parameter.
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    #DEBUG
    #Detailed information, typically of interest only when diagnosing problems.
    #INFO
    #Confirmation that things are working as expected.
    #WARNING
    #An indication that something unexpected happened, or indicative of some problem in the near future (e.g. ‘disk space low’). The software is still working as expected.
    #ERROR
    #Due to a more serious problem, the software has not been able to perform some function.
    #CRITICAL
    #A serious error, indicating that the program itself may be unable to continue running
    for handler in logging.root.handlers[:]:
        logging.root.removeHandler(handler)
    logging.basicConfig(filename='functionLogs.log', level=logging.DEBUG, 
                        format='%(asctime)s:%(levelname)s:%(message)s')
                        

    # This stament checks for a PUT request.
    if (req.method == "PUT"):
        try:
            # check JSON body request
            req_body = req.get_json()
            logging.info("Getting the json body.")

            # Setting connection to the database via key vault connection string.
            conn = pyodbc.connect(os.environ['ConnString'])
            logging.info("Connection complete")
            cursor = conn.cursor()

            # updates a Machine
            cursor.execute(''' UPDATE [dbo].[Machines]
            SET Model = ?, ModelNum = ?, ModelPhoto = ?, SerialNum = ?, VendorID = ?, LocationID = ?  WHERE MachineID = ? ''',
            (req_body['Model'], req_body['ModelNum'], req_body['ModelPhoto'], req_body['SerialNum'], req_body['VendorID'], req_body['LocationID'], req_body['MachineID']))
            conn.commit()
            logging.error("record successfuly updated")
            conn.close()
            return func.HttpResponse(f"successful request")
        except ValueError as e:
            logging.error("Invalid json format " + str(e))
            pass # invalid json
        except pyodbc.DatabaseError as err:
            logging.error("Connection to the database failed " + str(err))
            pass
        except pyodbc.ProgrammingError as em:
            logging.debug("Your record coudln't be update " + str(em))

    # retuerns a Http 400 status bad request.
    return func.HttpResponse(
        "Please pass a PUT request on the query string or in the request body",
        status_code=400
    )