# Peter Soukup
# March 17 2020

import time
import random
from azure.iot.device import IoTHubDeviceClient, Message

# az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id {my device name} --output table
CONNECTION_STRING = 'HostName=Iot-Hub-S3.azure-devices.net;DeviceId=MyPythonDeviceTelemetry;SharedAccessKey=R/EayW1azIx4GonFt/ROyFPsB/HMPVR4e1n8dOgUtME='

# CONNECTION_STRING = "HostName=Iot-Hub-S3.azure-devices.net;DeviceId=MyPythonDevice;SharedAccessKey=yqvcDSXJsggGj6Sj+dDMglFhZ0MLlHEFBpnoxQ2BIp4="

# Varibles for machine info for upload 
MODELNUM = '"HKU-144200-LP"'
SERIALNUM = '"123-456-789"'
VENDORID = 1
MODELPHOTO = '"null"'
# Location id can be changed as machine is moved
LOCATIONID = 1010

# text formating
MSG_TXT = '{{"MachineID": {machineId}, "Model": {model}, "ModelNum": {modelNum}, "SerialNum": {serialNum}, "VendorID": {vendorNum}, "LocationID": {locationId}, "ModelPhoto": {modelPhoto}, "Status": {status}, "StatusDescription": {statusDescription}}}'

# create client from connection string
def iothub_client_init():
    client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)
    return client

# put message together and send sample information
def iothub_client_telemetry_sample_run():
    try:
        client = iothub_client_init()
        print ( "IoT Hub device sending periodic messages, press Ctrl-C to exit" )
        while True:
          # format message
            machineId = 200
            model = '"Virtu Series"'
            modelNum = MODELNUM
            modelPhoto = MODELPHOTO
            serialNum = SERIALNUM
            vendorNum = VENDORID
            locationId = LOCATIONID
            status = '"green"' 
            statusDescription = '"Normal"'
            msg_txt_formatted = MSG_TXT.format(machineId=machineId, model=model, modelNum=modelNum, modelPhoto=modelPhoto, serialNum=serialNum, vendorNum=vendorNum, locationId=locationId, status=status, statusDescription=statusDescription)
            message = Message(msg_txt_formatted)

          # send  message.
            print( "Sending message: {}".format(message) )
            client.send_message(message)
            print ( "Message successfully sent" )
          # Pause time before next message
            time.sleep(60) #change per requirment / demo set for to send info every min. 
    except KeyboardInterrupt:
        print ( "IoTHubClient sample stopped" )

# Run program
if __name__ == '__main__':
    print ( "IoT Hub Quickstart #1 - Simulated device" )
    print ( "Press Ctrl-C to exit" )
    iothub_client_telemetry_sample_run()