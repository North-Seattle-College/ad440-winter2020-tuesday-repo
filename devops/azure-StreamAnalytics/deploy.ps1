<#
  This deploys a streaming analytics job without input and output
#>

Param(
    [Parameter(Mandatory = $True, HelpMessage = "Enter owner name: ")]
    [string] $owner,
    [Parameter(Mandatory = $True, HelpMessage = "Enter owner email: ")]
    [string] $email,
    [Parameter(Mandatory = $True, HelpMessage = "Enter job name: ")]
    [string] $jobName,
    [Parameter(Mandatory = $True, HelpMessage = "Enter location (i.e. westus2): ")]
    [string] $location,
    [Parameter(Mandatory = $True, HelpMessage = "Enter resource group name (i.e. {name}-rg-usw2-task#): ")]
    [string] $resourceGroupName
)

#Creates new resource group if it does not exist
Get-AzResourceGroup -Name $resourceGroupName -ErrorVariable notPresent -ErrorAction SilentlyContinue
if ($notPresent) {
  #create new resource group
  New-AzResourceGroup -Name $resourceGroupName -Location $location
}

#file paths
$templateFilePath = ".\template.json"
$parameterFilePath = ".\parameters.json"

#Tests local deployment
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName `
  -TemplateFile $templateFilePath `
  -owner $owner `
  -email $email `
  -jobName $jobName
  #uncomment below if using parameters.json file
  #-TemplateParameterFile $parameterFilePath

#Deletes newly created resource group
#Remove-AzResourceGroup -Name $resourceGroupName
