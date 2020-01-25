$resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"
$location = Read-Host -Prompt "Enter the location (i.e. centralus)"
$iotHubName= Read-Host -Prompt "Enter the storage account name"

# Create the IotHub account.
$iotHub = New-AziotHubAccount -ResourceGroupName $resourceGroupName `
  -Name $iotHubName `
  -Location $location `
  -SkuName "Standard_LRS"

# Retrieve the context.
$ctx = $iotHub.Context