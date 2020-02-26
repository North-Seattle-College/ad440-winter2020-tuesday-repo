
import logging
import azure.functions as func
import os
import pyodbc

# main method takes an Http request as parameter.
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info(req.__dict__)
    try:
        # Setting connection to the database via key vault connection string.
        #conn = pyodbc.connect( "Driver={ODBC Driver 11 for SQL Server};" "Server=tcp:yoz-sql-server-task2.database.windows.net,1433;" "Database=yoz-sql-feat-usw2-task2;Uid=devops-admin-t2;" "Pwd=Sparky2018!;" "Encrypt=yes;" "TrustServerCertificate=no;" "Connection Timeout=30;" )
        cnxn = pyodbc.connect(os.environ["ConnStringDB"])
        cursor = cnxn.cursor()
        
        logging.info("Connecting to the database...")
        return HttpResponse("Connection complete")
    except:
        logging.info("Connection to the database failed")
    # This stament checks for a PUT request.
    if (req.method == "PUT"):
        try:
            req_body = req.get_json()
            logging.info(req_body)
            
            return func.HttpResponse(f"successful request")
        except ValueError:
            pass
    # it returns an error Http code that is not a PUT request.
    else:
        logging.info("Not a PUT request...")
        # returns a Http 400 status bad request.
        return func.HttpResponse(
            'Request was not a PUT',
            status_code=400
            )
    
    # retuerns a Http 400 status bad request. 
    return func.HttpResponse(
        "Please pass a PUT request on the query string or in the request body",
        status_code=400
    )