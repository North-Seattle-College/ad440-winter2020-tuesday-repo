<#
 .SYNOPSIS
    Deploys a template to Azure
 .DESCRIPTION
    Deploys an Azure Stream Analytics Template
 .PARAMETER owner
    The name of the owner that created the stream.
 .PARAMETER email
    The email of the owner that created the stream.
 .PARAMETER jobName
    The number of the current job this template reflects
 .PARAMETER app
    The name of the App this template is for
 .PARAMETER storage
    The storage used for the streaming.
 .PARAMETER resourceGroupName
    The current feature this stream satisfies
 .PARAMETER task
    The current task this stream satisfies
 .PARAMETER templateFilePath
    Optional, path to the template file. Defaults to template.json
 .PARAMETER parametersFilePath
    Optional, path to the parameters file. Defaults to parameters.json. If file is not found, will prompt for parameter values based on template.
#>

#Queries all of the entries necessary to deploy the Stream Job
param(
 [Parameter(Mandatory=$True)]
 [string]$owner,

 [Parameter(Mandatory=$True)]
 [string]$email,

 [Parameter(Mandatory=$True)]
 [string]$jobName = "job1",

 [Parameter(Mandatory=$True)]
 [string]$app = "Pot-O-Gold",

 [Parameter(Mandatory=$True)]
 [string]$storage = "kiastrfeatusw2task3",

 [Parameter(Mandatory=$True)]
 [string]$resourceGroupName = "bet-rg-feat-usw2",

 [Parameter(Mandatory=$True)]
 [string]$task = "task2",

 [Parameter(Mandatory=$True)]
 [string]$templateFilePath = ".\template.json",

 [Parameter(Mandatory=$True)]
 [string]$parametersFilePath = ".\parameters.json"

 [Parameter(Mandatory=$True)]
 [string]$parametersFilePath = ".\parameters.json"
)

#******************************************************************************
# Script body
# Execution begins here
#******************************************************************************

$owner = Read-Host -Prompt "Enter owner name: "
$email = Read-Host -Prompt "Enter email: "
# $jobname = Read-Host -Prompt "Enter job name: "
# $location = ""
# $resourceGroupName = Read-Host -Prompt "Enter resource group name: "

# Create the streaming job
New-AzStreamAnalyticsJob -ResourceGroupName $resourceGroupName `
  -ResourceGroupName $resourceGroupName `
  -File $jobDefinitionFile `
  -Name $jobName `
  -Force
