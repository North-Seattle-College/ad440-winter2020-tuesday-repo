$resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"
$location = Read-Host -Prompt "Enter the location (i.e. centralus)"
$iotHubName= Read-Host -Prompt "Enter the IoT Hub name"

# Create the IotHub account.
$iotHubName = New-AzIotHub -ResourceGroupName $resourceGroupName `
  -Name $iotHubName `
  -Location $location `

# Retrieve the context.
$ctx = $iotHub.Context