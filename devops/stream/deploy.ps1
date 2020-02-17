<#
  This deployment uses powershell in order to create a stream analytics job

  Here is what is created:
  ### IotHubs
  ### Blob storage
  ### Azure streaming analytics job

  You need all of these elements in order to suceessfully launch a stream analytics resource
#>

param (
# Name of the current user
[string] [Parameter(Mandatory=$true)] $owner,

# Name of the current user email
[string] [Parameter(Mandatory=$true)] $email,

# Name of the resource group being created
[string] [Parameter(Mandatory=$true)] $resourceGroupName,
)

#Test-AzResourceGroupDeployment ` #use this line to test and comment out line below
New-AzResourceGroupDeployment `
  -Name $owner -ResourceGroupName $resourceGroupName `
  -TemplateUri https://raw.githubusercontent.com/North-Seattle-College/ad440-winter2020-tuesday-repo/feature-thomas-3/devops/stream/template.json `
  -TemplateParameterUri https://raw.githubusercontent.com/North-Seattle-College/ad440-winter2020-tuesday-repo/feature-thomas-3/devops/stream/parameters.json `
