#Peter Soukup
#February 2020

#Import statements
import random
import time

#this code connects to device-specific endpoint on your IoT Hub
from azure.iot.device import IoTHubDeviceClient, Message


#connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
CONNECTION_STRING = "HostName=bet-rg-feat-usw2-task2.azure-devices.net;DeviceId=MyPythonDevice;SharedAccessKey=zE2n/B8ve+AFz1DjDLNMT7oyoiwLCUuO7ChRD7RVmVI="


# Define the JSON message to send to IoT Hub.
BROKEN_WATER = ['All Okay', 'Failed']
WATER_FLOW_ISSUE = ['Failed', 'Bad', 'Okay', 'Good', 'Excelent']
MISSING_COFFEE = ['Coffee Okay', 'Out Of Coffee']
weights1 = [0.8, 0.2]
weights2 = [0.05, 0.05, 0.2, 0.3, 0.4]

#Define text message format
MSG_TXT = '{{ "Broken Water": {broken_water}, "Water Flow Issue": {water_flow_issue} "Missing Coffee": {missing_coffee}}}'

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
            broken_water = str(random.choices(BROKEN_WATER, weights1)).strip('[]')
            water_flow_issue = str(random.choices(WATER_FLOW_ISSUE, weights2)).strip('[]')
            missing_coffee = str(random.choices(MISSING_COFFEE, weights1)).strip('[]')

            #message formatting and message
            msg_txt_formatted = MSG_TXT.format(broken_water=broken_water,  missing_coffee=missing_coffee, water_flow_issue=water_flow_issue)
            message = Message(msg_txt_formatted)

            # Send the message.
            print( "Sending message: {}".format(message) )
            client.send_message(message)
            print ( "Message successfully sent" )

            #time between messages
            time.sleep(60)

    except KeyboardInterrupt:
      #quits with control/c
        print ( "IoTHubClient sample stopped" )

if __name__ == '__main__':
  #initiates and runs program to send sample data
    print ( "IoT Hub Quickstart #1 - Simulated device" )
    print ( "Press Ctrl-C to exit" )
    iothub_client_telemetry_sample_run()