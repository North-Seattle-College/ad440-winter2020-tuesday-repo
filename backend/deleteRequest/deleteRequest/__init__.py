import logging
import azure.functions as func
import os
import pyodbc

# main method takes an Http request as parameter.
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info(req.__dict__)

    try:
        # Setting connection to the database via key vault connection string.
        conn = pyodbc.connect(os.environ['ConnString'])
        logging.info("Connection complete")
        cursor = conn.cursor()
    except Exception as e:
        logging.error("Connection to db failed" + str(e))
        print(e)
        pass
    
    # This stament checks for a PUT request.
    if (req.method == "DELETE"):
        try:
            # check JSON body request
            req_body = req.get_json()
            logging.info(req_body)
            print(req_body)

            # updates a Machine 
            cursor.execute(''' DELETE [dbo].[Machines] 
            SET Model = ?, ModelNum = ?, ModelPhoto = ?, SerialNum = ?, VendorID = ?, LocationID = ?  WHERE MachineID = ? ''', 
            (req_body['Model'], req_body['ModelNum'], req_body['ModelPhoto'], req_body['SerialNum'], req_body['VendorID'], req_body['LocationID'], req_body['MachineID'])
            )               
            conn.commit()
            logging.info("record successfuly updated") 
                
            return func.HttpResponse(f"successful request")
        except Exception as e:
            logging.error("Connecting to the database failed" + str(e))
            print(str(e))
            pass
    # it returns an error Http code that is not a PUT request.
    else:
        logging.info("Not a DELETE request...")
        # returns a Http 400 status bad request.
        return func.HttpResponse(
            'Request was not a DELETE',
            status_code=400
            )
    
    # retuerns a Http 400 status bad request. 
    return func.HttpResponse(
        "Please pass a DELETE request on the query string or in the request body",
        status_code=400
    )