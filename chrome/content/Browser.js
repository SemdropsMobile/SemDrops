/**
 * It contains information about the browser and is in charge, among other things, 
 * of refreshing and updating the web pages and of  returning the URL to where the 
 * user currently is.
 */

function Browser()
{
	this._actualUri;
	this._interface;
	this._localDom
	this._lastmousebutton;
	this._timer;
	
	this.initialize = function ()
									{
										_timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
										var windowManager = (Components.classes[ "@mozilla.org/appshell/window-mediator;1" ]).getService();
										var windowManagerInterface = windowManager.QueryInterface( Components.interfaces.nsIWindowMediator);	
										_interface = ( windowManagerInterface.getMostRecentWindow( "navigator:browser" ) ).getBrowser();
										_localDom = ( windowManagerInterface.getMostRecentWindow( "navigator:browser" ) ).window;
										for (var i=1;i<_localDom.length;i++) 
										{
											_localDom[i].document.onmousemove = compare;
											_localDom[i].document.focus = compare;
										}
										_actualUri = _interface.currentURI.asciiSpec;
									}
							
	this.refresh = function (uri)
									{
										_interface.loadURI(uri);
									}
									
	this.compare = function ()
									{
										var restu = false;
										if (_actualUri != _interface.currentURI.asciiSpec){restu = true;}
										return (restu);
									}
									
	this.getActualUri = function() 
									{
										return (_actualUri);
									}
									
	this.refreshPageSelected = function (event,sel)
									{
										var uri = sel.getAttribute('label','dependent');
										var pre = uri[0] + uri[1] + uri[2] + uri[3] + uri[4] + uri[5] + uri[6];
										if (pre == 'http://' || pre == 'https:/'){_interface.loadURI(uri);}
									}
	
	this.disablemouseoption = function ()
	{
			for (var i=1;i<_localDom.length;i++) 
			{									
				_localDom[i].document.onmousemove = compare;	
				_localDom[i].document.focus = compare;
			}
	}
	
	
	this.publish = function(core,labelid)
	{
		/**
		*  New process in which the Textbox is uploaded with the Drag and Drop reversed.
		*/
		this.disablemouseoption();
		for (var i=1;i<_localDom.length;i++)
		{
			var form = _localDom[i].document.forms["editform"];
			if (form == "[object HTMLFormElement]")
			{
				var textarea = form['wpTextbox1'];
				var value = core.selected();
				if (labelid == 1)
				{
					textarea.value += "[[Category:"+value.getAttribute('label')+"]] ";
				}
				else
				{
					var padre = value.parentNode;
					var bro = padre.childNodes[1];
					textarea.value += "[["+value.getAttribute('label')+"::"+bro.getAttribute('label')+"]] ";
				}
				_localDom[i].document.forms["editform"].submit();
			}
		}
		var event = { notify : function(timer) {window.location.reload();}}
		_timer.initWithCallback(event,1000,Components.interfaces.nsITimer.TYPE_ONE_SHOT);
	}
	
	this.addInUserSpace = function(value,attribute,idlabel,auxuri,auxdom)
	{
		this.disablemouseoption();
		var j = _auxdom.wrappedJSObject.document.forms["editform"];
		if (j == "[object HTMLFormElement]")
		{
			var textarea = j['wpTextbox1'];
			if (idlabel == 1)
			{
				value = value.toLowerCase();
				value = value.replace(/_/gi,"¬");
				textarea.value += "[[Category:"+value+"]] ";
			}
			else
			{
				if (idlabel == 2)
				{
					value = value.toLowerCase();
					value = value.replace(/_/gi,"¬");
					attribute = attribute.toLowerCase();
					attribute = attribute.replace(/_/gi,"¬");
					textarea.value += "[["+value+"::"+attribute+"]]";
				}
				else
				{
					value = value.toLowerCase();
					value = value.replace(/_/gi,"¬");
					attribute = attribute.toLowerCase();
					attribute = attribute.replace(/_/gi,"¬");
					textarea.value += "[["+value+":="+attribute+"]]";
				}
			}
			textarea.value  = textarea.value.replace("*["+auxuri+" "+"page]","");
			textarea.value += "*["+auxuri+" "+"page]";
			_auxdom.wrappedJSObject.document.forms["editform"].submit();
			_auxdom.close();
		}
	}
	
	this.delInUserSpace = function(value,attribute,auxuri,auxdom)
	{
		/**
		 * It reads a whole string from the texbox and deletes the selected word.
		 */
		this.disablemouseoption();
		var j = _auxdom.wrappedJSObject.document.forms["editform"];
		if (j == "[object HTMLFormElement]")
		{
			var textarea = j['wpTextbox1'];
			if (attribute == ' ')
			{
				value = value.toLowerCase();
				textarea.value = textarea.value.replace("[[Category:IDisagreeª"+value+"]]"," ");
				textarea.value = textarea.value.replace("[[Category:"+value+"]]","[[Category:IDisagreeª"+value+"]]");
			}
			else
			{
				value = value.toLowerCase();
				attribute = attribute.toLowerCase();
				textarea.value = textarea.value.replace("[["+value+"::IDisagreeª"+attribute+"]]"," ");
				textarea.value = textarea.value.replace("[["+value+"::"+attribute+"]]","[["+value+":=IDisagreeª"+attribute+"]]");
				textarea.value = textarea.value.replace("[["+value+":=IDisagreeª"+attribute+"]]"," ");
				textarea.value = textarea.value.replace("[["+value+":="+attribute+"]]","[["+value+":=IDisagreeª"+attribute+"]]");
			}
			textarea.value  = textarea.value.replace("*["+auxuri+" "+"page]","");
			textarea.value += "*["+auxuri+" "+"page]";
			_auxdom.wrappedJSObject.document.forms["editform"].submit();
			_auxdom.close();
		}
	}
	
	this.modInUserSpace = function(value,attribute,newvalue,newattribute,auxuri,auxdom)
	{
		/**
		 * It reads a whole string from the texbox and modifies the selected word.
		 */
		
		var j = _auxdom.wrappedJSObject.document.forms["editform"];
		if (j == "[object HTMLFormElement]")
		{
			var textarea = j['wpTextbox1'];
			if (attribute == ' ')
			{
				value = value.toLowerCase();
				newvalue = newvalue.toLowerCase();
				textarea.value = textarea.value.replace("[[Category:"+value+"]]","[[Category:"+newvalue+"]]");
			}
			else
			{
				value = value.toLowerCase();
				newvalue = newvalue.toLowerCase();
				attribute = attribute.toLowerCase();
				newattribute = newattribute.toLowerCase();
				textarea.value = textarea.value.replace("[["+value+"::"+attribute+"]]","[["+newvalue+"::"+newattribute+"]]");
				textarea.value = textarea.value.replace("[["+value+":="+attribute+"]]","[["+newvalue+":="+newattribute+"]]");
			}
			_auxdom.wrappedJSObject.document.forms["editform"].submit();
			_auxdom.close();
		}
	}
}

function compare()
{
	core.comparar();
}

function createXMLHTTPobject() {

	var xmlhttp;

	if (window.XMLHttpRequest) 
	{ // Mozilla, Safari,...
		xmlhttp = new XMLHttpRequest();
		if (xmlhttp.overrideMimeType) 
		{
			xmlhttp.overrideMimeType('text/xml');
		}
	} 
	else 
		if (window.ActiveXObject) 
		{ // IE
		try 
			{
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} 
			catch (e) 
					{
					try {
							xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
						} 
						catch (e) {}
					}
		}
	return xmlhttp;
	}
