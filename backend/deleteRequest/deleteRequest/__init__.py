import logging
import azure.functions as func
import os
import pyodbc

# main method takes an Http request as parameter.
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # Check for a DELETE request.
    if (req.method == "DELETE"):
        try:
            # Get url parameter for machineID
            machineID = req.route_params.get('MachineID')
            logging.info("Getting machine id from url.")
            logging.debug(machineID)
            
            # Set connection to the database
            conn = pyodbc.connect(os.environ['ConnString'])
            logging.debug(conn)
            logging.info("Connection complete")
            cursor = conn.cursor()

            # deletes a Machine 
            cursor.execute(''' DELETE FROM [dbo].[Machines] WHERE MachineID = ? ''',
            (machineID)
            )

            # clean up               
            conn.commit()
            cursor.close()
            conn.close()
            logging.info("Machine successfully deleted") 

            return func.HttpResponse(f"successful request")
        except ValueError as e:
            logging.error("Incorrect value passed in the URL" + str(e))
            pass
        except Exception as err:
            logging.error("String connection to the database failed " + str(err))
            pass
        except pyodbc.DatabaseError as em:
            logging.error("Something went wrong with the database " + str(em))
            cursor.rollback()
            pass
        finally:
            logging.info("record successfuly deleted")
            logging.info("Closing connection to the database ...")
    
    # returns a Http 400 status bad request. 
    return func.HttpResponse(
        "Please pass a DELETE request on the query string or in the request body",
        status_code=400
    )
