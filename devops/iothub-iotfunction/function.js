module.exports = function (context, IoTHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array: ${IoTHubMessages}`);

    var count = 0;
    var totalTemperature = 0.0;
    var totalHumidity = 0.0;
    var deviceId = "";

    IoTHubMessages.forEach(message => {
        context.log(`Processed message: ${message}`);
        count++;
        totalTemperature += message.temperature;
        totalHumidity += message.humidity;
        deviceId = message.deviceId;
    });

    var output = {
        "deviceId": deviceId,
        "measurementsCount": count,
        "averageTemperature": totalTemperature/count,
        "averageHumidity": totalHumidity/count
    };

    context.log(`Output content: ${output}`);

    context.bindings.outputDocument = output;

    context.done();
};