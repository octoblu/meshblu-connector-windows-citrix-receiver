Add-Type -Path "C:\Program Files (x86)\Citrix\ICA Client\WfIcaLib.dll"

$ICA = New-Object WFICALib.ICAClientClass
$SessionsEnum = $ICA.EnumerateCCMSessions()
$SessionsCount = $ICA.GetEnumNameCount($SessionsEnum)
$ICA.CloseEnumHandle($EnumSessions) >$null 2>&1

$obj = New-Object PSObject
Add-Member -InputObject $obj -MemberType NoteProperty -Name sessionsCount -Value $SessionsCount
Write-Host ($obj | ConvertTo-JSON)
