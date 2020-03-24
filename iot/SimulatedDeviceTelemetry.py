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
CONNECTION_STRING = "HostName=Iot-Hub-S3.azure-devices.net;DeviceId=MyPythonDeviceTelemetry;SharedAccessKey=R/EayW1azIx4GonFt/ROyFPsB/HMPVR4e1n8dOgUtME="

# Define the JSON message to send to IoT Hub.
MACHINEID = 123
VALVE_STATUS = ["LEAKING", "GOOD", "EXCELLENT"]
HOSE_PRESSURE = ["LOW", "MEDIUM", "HIGH"]
MSG_TXT = '{{"Machine Id": {machineId},"Valve Status": {valve_status},"Hose Pressure": {hose_status}}}'

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
            valve = str(random.choices(VALVE_STATUS)).strip('[]')
            hose = str(random.choices(HOSE_PRESSURE)).strip('[]')
            machineId = MACHINEID
            msg_txt_formatted = MSG_TXT.format(machineId=machineId, valve_status=valve, hose_status=hose)
            message = Message(msg_txt_formatted)


            # Send the message.
            print( "Sending message: {}".format(message) )
            client.send_message(message)
            print ( "Message successfully sent" )
            time.sleep(10)

    except KeyboardInterrupt:
        print ( "IoTHubClient sample stopped" )

if __name__ == '__main__':
    print ( "IoT Hub Quickstart #1 - Simulated device" )
    print ( "Press Ctrl-C to exit" )
    iothub_client_telemetry_sample_run()