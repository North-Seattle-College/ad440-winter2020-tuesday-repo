import logging
import azure.functions as func
#import pyodbc
#import os 

#HttpRequest parameter 
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    #cnxn = pyodbc.connect(os.environ['DatabaseConnString'])
    #cnxn = pyodbc.connect()

   # try:
        #req_body = req.get_json()
        #logging.info(req_body)
        #cursor = cnxn.cursor()
       #cursor.execute("SELECT * FROM [dbo].[Machines]")

        #return func.HttpResponse(f"Successful")
    #except ValueError:
        #pass

    #logging.info("Not a GET request")
    #return func.HttpResponse("Please pass GET request in body",
    #status_code=400)


#get request to find machines table
    name = req.params.get('machines')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('machines')

  #returns all data in machines table
  #if name is not returned shows error
    if name:
        return func.HttpResponse(f"{name}")
    else:
        return func.HttpResponse(
            "Please pass a name on the query string or in the request body",
            status_code=400
        )