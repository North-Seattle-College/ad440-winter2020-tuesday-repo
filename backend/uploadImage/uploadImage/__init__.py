import base64
import logging
import os, uuid, sys
import json, random, string
import azure.functions as func
from azure.common import AzureException
from azure.storage.blob import BlockBlobService, BlobPermissions, ContentSettings

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    # checking for a POST request.
    if (req.method == "POST"):
        try:
            # check JSON body request that carries the encoded image base64 info
            req_body = req.get_json()
            logging.info(req_body)
            image_name = req_body['name']
            image = req_body['image'].replace(' ', '+')

            #decoding base64 image from json body
            decoded_image = base64.b64decode(image)
            logging.info(decoded_image)
            
            # Storage connection string
            connect_str = os.getenv('StorageConnStr')
            accuntName = os.getenv('StorageName')
            accuntKey = os.getenv('StorageConnectionKey')
            BlobPermissions(read=False, add=False, create=False, write=False, delete=False, _str=None)
            logging.info("Successful connection to blob storage.")

            #upload to picture to blob storage
            block_blob_service = BlockBlobService(account_name=accuntName, account_key=accuntKey)
            container_name = 'machineimages'
            blob_name = image_name + '.jpeg'
            # Creating the blob
            block_blob_service.create_blob_from_bytes(container_name, blob_name, decoded_image,
            content_settings=ContentSettings(content_type='image/png'))
            logging.info("Successfull blob creating ")

            # Returning a succesful post request 
            return func.HttpResponse(f"successful request")
        except ValueError as e:
            logging.error("Invalid json format " + str(e))
            pass
        except Exception as err:
            logging.error("Something went wrong decoding json " + str(err))
            pass
        except AzureException as ae:
            logging.error("Something went wrong with azure connection " + str(ae))
            pass
    return func.HttpResponse(
        "Please pass a name on the query string or in the request body",
        status_code=400
    )
