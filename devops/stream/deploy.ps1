<#
  This deployment uses powershell in order to create a stream analytics job

  Here is what is created:
  ### IotHubs
  ### Blob storage
  ### Azure streaming analytics job

  You need all of these elements in order to suceessfully launch a stream analytics resource
#>

#Creates the resource group being used
$resourceGroupName = "tho-sag-usw2-test"

#create new resource group if it does not exist
Get-AzResourceGroup -Name $resourceGroupName -ErrorVariable notPresent -ErrorAction SilentlyContinue

if ($notPresent) {
  #create new resource group
  New-AzResourceGroup -Name $resourceGroupName -Location "westus2"
}

#Finds the template in order to begin making the stream analytics resource
$resourceGroupName = "tho-sag-usw2-test"

#local file paths
$templateFilePath = "C:\Users\tcodu\Documents\github\ad440-winter2020-tuesday-repo\devops\stream\template.json"
$parameterFilePath = "C:\Users\tcodu\Documents\github\ad440-winter2020-tuesday-repo\devops\stream\parameters.json"
#remote file path
#$templateUriPath = "https://raw.githubusercontent.com/North-Seattle-College/ad440-winter2020-tuesday-repo/feature-thomas-3/devops/stream/template.json"
#$parameterUriPath = "https://raw.githubusercontent./North-Seattle-College/ad440-winter2020-tuesday-repo/feature-thomas-3/devops/stream/template.json"

#Tests local deployment
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName `
  -TemplateFile $templateFilePath `
  -TemplateParameterFile $parameterFilePath `
#
# # -TemplateParameterUri https://raw.githubusercontent.com/North-Seattle-College/ad440-winter2020-tuesday-repo/feature-thomas-3/devops/stream/parameters.json `
# # -TemplateUri https://raw.githubusercontent.com/North-Seattle-College/ad440-winter2020-tuesday-repo/feature-thomas-3/devops/stream/template.json `
#
# $resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"
# $location = Read-Host -Prompt "Enter the location (i.e. centralus)"
#
# New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName `
#   -TemplateUri "https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/101-storage-account-create/azuredeploy.json"
