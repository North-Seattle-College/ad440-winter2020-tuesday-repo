import logging
import json, random, string
import base64
import azure.functions as func
import os, uuid, sys 
from azure.storage.blob import BlockBlobService, BlobPermissions

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # checking for a POST request.
    if (req.method == "POST"):
        try:
            # check JSON body request that carries the encoded image base64 info
            req_body = req.get_json()
            logging.info("Getting the json body." + str(req_body))

            # Storage connection string
            connect_str = os.getenv('StorageConnStr')
            accuntName = os.getenv('StorageName')
            accuntKey = os.getenv('StorageConnectionKey')
            block_blob_service = BlockBlobService(account_name=accuntName, account_key=accuntKey)

            # blob name
            blobName='machineimages'
            BlobPermissions(read=False, add=False, create=False, write=False, delete=False, _str=None)
            logging.info("Successful connection to blob storage.")

            #changing the req_body json as a tring so it can be proccess in the 
            # block_blob_service.create_blob_from_text
            my_list = str(req_body)

            #creating random string for naming the blobs.
            def randomword(length):
                letters = string.ascii_lowercase
                return ''.join(random.choice(letters) for i in range(length))

            #Creating the blob as text 
            block_blob_service.create_blob_from_text(blobName, randomword(8) + '.jpeg', ','.join(my_list))

            return func.HttpResponse(f"successful request")
        except ValueError as e:
            logging.error("Invalid json format " + str(e))
            logging.info("Storage account connection failed")
            pass
    return func.HttpResponse(
        "Please pass a name on the query string or in the request body",
        status_code=400
    )
