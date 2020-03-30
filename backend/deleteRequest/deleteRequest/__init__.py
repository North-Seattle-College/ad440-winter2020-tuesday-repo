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
            logging.debug("")
            cursor.close()
            conn.close()

            return func.HttpResponse(f"successful request")
        except pyodbc.DatabaseError as e:
            logging.error("Something went wrong with the database")
            
        except pyodbc.InterfaceError as e:
            logging.error("Database connection failed")
            
        except pyodbc.DataError as e:
            logging.error("Problem processing the data")
            
        except pyodbc.InputError as e:
            logging.error("MachineID not found", str(e))
            return func.HttpResponse("MachineID not found: ", status_code=400)

        except pyodbc.InternalError as e:
            logging.error("Internal error with the database")
            return func.HttpResponse("MachineID not found: ", status_code=500)
            
        except pyodbc.OperationalError as e:
            logging.error("Unexpected disconnect, memory allocation, or selected database may not exist")
            
        except pyodbc.NotSupportedError as e:
            logging.error("Api or method is not supported")
            
        except pyodbc.ProgrammingError as e:
            logging.error("Programming errort, check database inputs")
            
        except Exception as e:
            logging.error("Unknown error occurred")
        
        logging.info("Machine successfuly deleted")
        logging.info("Closing connection to the database...")
    
    # returns a Http 400 status bad request. 
    return func.HttpResponse(
        "Please pass a DELETE request on the query string or in the request body",
        status_code=400
    )
