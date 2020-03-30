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
            logging.debug(req_body)

            # Setting connection to the database via key vault connection string.
            conn = pyodbc.connect(os.environ['ConnString'])
            logging.info(conn)
            logging.info("Connection complete")
            logging.debug(conn)
            cursor = conn.cursor()

            #updates a Machine
            cursor.execute(''' UPDATE [dbo].[Machines]
            SET Model = ?, ModelNum = ?, SerialNum = ?, VendorID = ?, LocationID = ?, 
            ModelPhoto = ?, Status = ?, StatusDescription = ?  WHERE MachineID = ? ''',
            (req_body['Model'], 
            req_body['ModelNum'], 
            req_body['SerialNum'], 
            req_body['VendorID'], 
            req_body['LocationID'],
            req_body['ModelPhoto'],
            req_body['Status'],
            req_body['StatusDescription'],
            req_body['MachineID']))
            conn.commit()
            conn.close()
            return func.HttpResponse(f"successful request")
        except ValueError as e:
            logging.error("Invalid json format " + str(e))
            pass # invalid json
        except pyodbc.DatabaseError as e:
            logging.error("Something went wrong with the database")
            pass
        except pyodbc.InterfaceError as e:
            logging.error("Database connection failed")
            pass
        except pyodbc.DataError as e:
            logging.error("Problem processing the data")
            pass
        except pyodbc.InternalError as e:
            logging.error("Internal error with the database")
            pass
        except pyodbc.OperationalError as e:
            logging.error("Unexpected disconnect, memory allocation, or selected database may not exist")
            pass
        except pyodbc.NotSupportedError as e:
            logging.error("Api or method is not supported")
            pass
        except pyodbc.ProgrammingError as e:
            logging.error("Programming errort, check database inputs")
            pass
        except Exception as e:
            logging.error("Unknown error occurred")
            pass
        finally:
            logging.info("Machine successfuly deleted")
            logging.info("Closing connection to the database...")

    # retuerns a Http 400 status.
    return func.HttpResponse(
        "Please pass a PUT request on the query string or in the request body",
        status_code=400
    )
