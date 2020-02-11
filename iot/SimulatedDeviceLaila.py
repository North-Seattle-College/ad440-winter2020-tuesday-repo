# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project root for full license information.
import random
import time
# Using the Python Device SDK for IoT Hub:
#   https://github.com/Azure/azure-iot-sdk-python
# The sample connects to a device-specific MQTT endpoint on your IoT Hub.
from azure.iot.device import IoTHubDeviceClient, Message
# The device connection string to authenticate the device with your IoT hub.
# Using the Azure CLI:
# az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
CONNECTION_STRING = "HostName=bet-rg-feat-usw2-task2.azure-devices.net;DeviceId=MyPythonDevice;SharedAccessKey=zE2n/B8ve+AFz1DjDLNMT7oyoiwLCUuO7ChRD7RVmVI="
# Define the JSON message to send to IoT Hub.
TEMPERATURE = 20.0
HUMIDITY = 60
MSG_TXT = '{{"general info": {generalInformation},"Incoming info": {incomingInformation}}}'
def iothub_client_init():
    # Create an IoT Hub client
    client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)

    return client
def iothub_client_telemetry_sample_run():
    try:
        client = iothub_client_init()
        print ( "IoT Hub device sending periodic messages, press Ctrl-C to exit" )
        while True:
            # Build the message with simulated telemetry values.
            generalInformation = "It's a beautiful day" 
            incomingInformation = "Coffe machine is working great!" 
            msg_txt_formatted = MSG_TXT.format(generalInformation=generalInformation, incomingInformation=incomingInformation)
            message = Message(msg_txt_formatted)
            # Add a custom application property to the message.
            # An IoT hub can filter on these properties without access to the message body.
            
            print( "Sending message: {}".format(message) )
            client.send_message(message)
            print ( "Message successfully sent" )
            time.sleep(300)
    except KeyboardInterrupt:
        print ( "IoTHubClient sample stopped" )
if __name__ == '__main__':
    print ( "IoT Hub Quickstart #1 - Simulated device" )
    print ( "Press Ctrl-C to exit" )
    iothub_client_telemetry_sample_run()
