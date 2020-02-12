#Requires -Module Az.Resources

[CmdletBinding()]

param (
# ID of the Azure Subscription for the lab
[string] [Parameter(Mandatory=$true)] $SubscriptionId,

# Name of the existing lab in which to create the environment
[string] [Parameter(Mandatory=$true)] $LabName,

# Name of the connected repository in the lab
[string] [Parameter(Mandatory=$true)] $RepositoryName,

# Name of the template (folder name in the Git repository)
[string] [Parameter(Mandatory=$true)] $TemplateName,

# Name of the environment to be created in the lab
[string] [Parameter(Mandatory=$true)] $EnvironmentName,

# The parameters to be passed to the template. Each parameter is prefixed with "-param_".
# For example, if the template has a parameter named "TestVMName" with a value of "MyVMName",
# the string in $Params will have the form: -param_TestVMName MyVMName.
# This convention allows the script to dynamically handle different templates.
[Parameter(ValueFromRemainingArguments=$true)]
    $Params
)

# Sign in to Azure.
# Comment out the following statement to completely automate the environment creation.
Connect-AzAccount

# Select the subscription that has the lab.
Set-AzContext -SubscriptionId $SubscriptionId | Out-Null

# Get information about the user, specifically the user ID, which is used later in the script.
$UserId = $((Get-AzADUser -UserPrincipalName (Get-AzContext).Account).Id.Guid)

# Get information about the lab, such as lab location.
$lab = Get-AzResource -ResourceType "Microsoft.DevTestLab/labs" -Name $LabName -ResourceGroupName $ResourceGroupName
if ($lab -eq $null) { throw "Unable to find lab $LabName in subscription $SubscriptionId." }

# Get information about the repository in the lab.
$repository = Get-AzResource -ResourceGroupName $lab.ResourceGroupName `
    -ResourceType 'Microsoft.DevTestLab/labs/artifactsources' `
    -ResourceName $LabName `
    -ApiVersion 2016-05-15 `
    | Where-Object { $RepositoryName -in ($_.Name, $_.Properties.displayName) } `
    | Select-Object -First 1
if ($repository -eq $null) { throw "Unable to find repository $RepositoryName in lab $LabName." }

# Get information about the Resource Manager template base for the environment.
$template = Get-AzResource -ResourceGroupName $lab.ResourceGroupName `
    -ResourceType "Microsoft.DevTestLab/labs/artifactSources/armTemplates" `
    -ResourceName "$LabName/$($repository.Name)" `
    -ApiVersion 2016-05-15 `
    | Where-Object { $TemplateName -in ($_.Name, $_.Properties.displayName) } `
    | Select-Object -First 1
if ($template -eq $null) { throw "Unable to find template $TemplateName in lab $LabName." }

# Build the template parameters with parameter name and values.
$parameters = Get-Member -InputObject $template.Properties.contents.parameters -MemberType NoteProperty | Select-Object -ExpandProperty Name
$templateParameters = @()

# Extract the custom parameters from $Params and format as name/value pairs.
$Params | ForEach-Object {
    if ($_ -match '^-param_(.*)' -and $Matches[1] -in $parameters) {
        $name = $Matches[1]
    } elseif ( $name ) {
        $templateParameters += @{ "name" = "$name"; "value" = "$_" }
        $name = $null #reset name variable
    }
}

# Once name/value pairs are isolated, create an object to hold the necessary template properties.
$templateProperties = @{ "deploymentProperties" = @{ "armTemplateId" = "$($template.ResourceId)"; "parameters" = $templateParameters }; }

# Now, create or deploy the environment in the lab by using the New-AzResource command.
New-AzResource -Location $Lab.Location `
    -ResourceGroupName $lab.ResourceGroupName `
    -Properties $templateProperties `
    -ResourceType 'Microsoft.DevTestLab/labs/users/environments' `
    -ResourceName "$LabName/$UserId/$EnvironmentName" `
    -ApiVersion '2016-05-15' -Force

Write-Output "Environment $EnvironmentName completed."
