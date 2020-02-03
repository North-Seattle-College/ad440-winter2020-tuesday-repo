$resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"

$location = Read-Host -Prompt "Enter the location (i.e. centralus)"

$templateUri = "https://github.com/North-Seattle-College/ad440-winter2020-tuesday-repo/blob/feature-azurefunction-wenbin-task1/devops/template.json"

New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateUri $templateUri -Location $location
