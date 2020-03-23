import logging
import azure.functions as func
import os, uuid, sys
from azure.storage.blob import BlockBlobService, BlobPermissions


# main method takes an Http request as parameter.
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # Check for a DELETE request.
    if (req.method == "DELETE"):
        try:
            # check url parameter for machineID
            machineID = req.params.get('MachineID')
            logging.info("Getting machine id from url.")
            logging.debug(machineID) 
            
            # storage connection string
            connect_str = os.getenv('StorageConnStr')
            accuntName = os.getenv('StorageName')
            accuntKey = os.getenv('StorageConnectionKey')
            block_blob_service = BlockBlobService(account_name=accuntName, account_key=accuntKey)
            logging.info("Successful connection to blob storage.")
            
            # blob name
            blobName='machineimages'
            BlobPermissions(read=False, add=False, create=False, write=False, delete=True, _str=None)

            # delete an image from storage
            block_blob_service.delete_blob(blobName, machineID)
            logging.info('Image deleted successfully') 

            # clean up               
            connect_str.close() 
            logging.info("Machine successfully deleted") 

            return func.HttpResponse(f"Image successfully deleted")
        
        except ValueError as e:
            logging.error("Invalid json format " + str(e))
            logging.info("Storage account connection failed")
            pass
        
        finally:
            logging.info("Image successfuly deleted")
            logging.info("Closing connection to the storage...")
    
    # returns a Http 400 status bad request. 
    return func.HttpResponse(
        "Please pass a DELETE request on the query string or in the request body",
        status_code=400
    )