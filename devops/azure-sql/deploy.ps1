# Connect-AzAccount
# Log into Azure
$subscriptionId = Read-Host -Prompt "enter your subscription ID"
Select-AzSubscription -SubscriptionId $subscriptionId

# Managed Instance properties
$resourceGroup = Read-Host -Prompt "resource group name"
$location = "Westus2"
$name = Read-Host -Prompt "Enter Server Name"
$user = Read-Host -Prompt "Enter Sql Admin Login"
$secpasswd = ConvertTo-SecureString "<Put some strong password here>" -AsPlainText -Force

# Network configuration
$vNetName = "my_vnet"
$vNetResourceGroup = "rg_mi_vnet"
$subnetName = "ManagedInstances"
$vNet = Get-AzVirtualNetwork -Name $vNetName -ResourceGroupName $vNetResourceGroup
$subnet = Get-AzVirtualNetworkSubnetConfig -Name $SubnetName -VirtualNetwork $vNet
$subnetId = $subnet.Id

# Deploy Instance using Azure Resource Manager template:
New-AzResourceGroupDeployment  -Name MyDeployment -ResourceGroupName $resourceGroup  `
                                    -TemplateUri -https://raw.githubusercontent.com/Yozelinm/yoz-repo/master/sql-arm-template `
                                    -instance $name -user $user -pwd $secpasswd -subnetId $subnetId

# Clean up deployment 
# Remove-AzResourceGroup -ResourceGroupName $resourceGroupName