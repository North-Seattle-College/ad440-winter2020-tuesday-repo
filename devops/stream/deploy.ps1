<#
  Finds all of the parameters
#>

param(
    [Parameter(Mandatory = $True)]
    [string]
    $location,
​
    [Parameter(Mandatory = $True)]
    [string]
    $owner,
​
    [Parameter(Mandatory = $True)]
    [string]
    $email
)


<#
  Creates the resource group being used
#>

#variable names
$resourceGroupName = "tho-sag-usw2-test"

#create new resource group if it does not exist
Get-AzResourceGroup -Name $resourceGroupName -ErrorVariable notPresent -ErrorAction SilentlyContinue
if ($notPresent) {
  #create new resource group
  New-AzResourceGroup -Name $resourceGroupName -Location $location
}

<#
  Finds the template in order to begin making the stream analytics resource
#>

#local file paths
$templateFilePath = "C:\Users\tcodu\Documents\github\ad440-winter2020-tuesday-repo\devops\stream\template.json"
$parameterFilePath = "C:\Users\tcodu\Documents\github\ad440-winter2020-tuesday-repo\devops\stream\parameters.json"
#remote file path
#$templateUriPath = "https://raw.githubusercontent.com/North-Seattle-College/ad440-winter2020-tuesday-repo/feature-thomas-3/devops/stream/template.json"
#$parameterUriPath = "https://raw.githubusercontent./North-Seattle-College/ad440-winter2020-tuesday-repo/feature-thomas-3/devops/stream/template.json"

#Tests local deployment
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName `
  -TemplateFile $templateFilePath `
  -TemplateParameterFile $parameterFilePath

#Deletes newly created resource group
#Remove-AzResourceGroup -Name $resourceGroupName
