#lists all current IoT Hubs resources
Get-AzIotHub

$resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"
$templateFile = Read-Host -Prompt "Enter file path to your template"
$location = Read-Host -Prompt "Enter the location (i.e. centralus)"

New-AzIotHub `
-resourceGroupName $resourceGroupName
-Location $location
-TemplateUri $templateFile


