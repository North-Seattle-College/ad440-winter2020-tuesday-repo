# Peter Soukup
# Feb 2020

import time
from azure.iot.device import IoTHubDeviceClient, Message

# az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id {my device name} --output table
CONNECTION_STRING = "HostName=Iot-Hub-S3.azure-devices.net;DeviceId=MyPythonDevice;SharedAccessKey=yqvcDSXJsggGj6Sj+dDMglFhZ0MLlHEFBpnoxQ2BIp4="

# Varibles for machine info for upload 
MACHINEID = 123456
MODEL = '"Virtu 90"'
MODELNUM = '"Virtu 10|35 instant/997 130"'
SERIALNUM = '"2010099044001"'
VENDORNUM = 789
LOCATIONID = 10

# text formating
MSG_TXT = '{{"MachineId": {machineId}, "Model": {model}, "ModelNum": {modelNum}, "SerialNum": {serialNum}, "VendorNum": {vendorNum}, "LocationId": {locationId}}}'

def iothub_client_init():
  # create client from connection string
    client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)
    return client
def iothub_client_telemetry_sample_run():
  # put message together and send sample information
    try:
        client = iothub_client_init()
        print ( "IoT Hub device sending periodic messages, press Ctrl-C to exit" )
        while True:
            # format message
            machineId = MACHINEID
            model = MODEL
            modelNum = MODELNUM
            serialNum = SERIALNUM
            vendorNum = VENDORNUM
            locationId = LOCATIONID
            msg_txt_formatted = MSG_TXT.format(machineId=machineId, model=model, modelNum=modelNum, serialNum=serialNum, vendorNum=vendorNum, locationId=locationId)
            message = Message(msg_txt_formatted)

            # send  message.
            print( "Sending message: {}".format(message) )
            client.send_message(message)
            print ( "Message successfully sent" )
            time.sleep(5)
    except KeyboardInterrupt:
        print ( "IoTHubClient sample stopped" )
if __name__ == '__main__':
    print ( "IoT Hub Quickstart #1 - Simulated device" )
    print ( "Press Ctrl-C to exit" )
    iothub_client_telemetry_sample_run()