Add-Type -Path "C:\Program Files (x86)\Citrix\ICA Client\WfIcaLib.dll"

$ICA = New-Object WFICALib.ICAClientClass
$SessionsEnum = $ICA.EnumerateCCMSessions()
$SessionsCount = $ICA.GetEnumNameCount($SessionsEnum)

#$SessionNames = @()

#for ($index = 0; $index -lt $SessionsCount; $index++) {
#  $SessionId = $ICA.GetEnumNameByIndex($SessionsEnum, $index)
#  $ICA.StartMonitoringCCMSession($SessionId, $true)
#  $SessionNames += $ICA.GetSessionString(0)
#  $ICA.StopMonitoringCCMSession($SessionId)
#}

$ICA.CloseEnumHandle($EnumSessions) >$null 2>&1

$obj = New-Object PSObject
Add-Member -InputObject $obj -MemberType NoteProperty -Name count -Value $SessionsCount
#Add-Member -InputObject $obj -MemberType NoteProperty -Name names -Value $SessionNames
Write-Host ($obj | ConvertTo-JSON)
