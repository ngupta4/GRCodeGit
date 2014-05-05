/********************************
 * GR_Popup v1
 * 
 * ***************
 * Simple class that builds graphical popup windows on the page 
 * and lets you move or close them. 
 * ***************
 * 
 * @author dsweeney
 * 
 ********************************/

function GR_Popup(content, useAjax, fadeBG, options) {
	var m_content = content;
	var m_ajax    = useAjax;
	var m_fade    = fadeBG;
	var m_elementId   = null, //dom parent element containing popup
	    m_closeButton = null,
		m_titleBar    = null,
		m_contentPane = null,
		m_border      = null;
	var m_windowHeight = 0,
		m_windowWidth  = 0,
		m_maxHeight    = 100;
	    m_maxWidth     = 100;
	var m_windowX = 0,
		m_windowY = 0;
	var m_dragging = false;
	var m_xStart = 0,
		m_yStart = 0,
		m_dX = 0,
		m_dY = 0;
	
	
	var onclose = function() { void(0); }
	
	var _openedNotify = function() {
		if (m_windowWidth >= m_maxWidth && m_windowHeight >= m_maxHeight) {
			m_xStart = m_yStart = m_dX = m_dY = 0;
			_update.rest();
			m_closeButton.onclick = closeWindow;
			//bind escape key as well
			window.onkeyup = function (e) { if (e.keyCode == 27) { closeWindow(); window.onkeyup=null; } }; 
			drawWindow();
		}
	};
	var _closedNotify = function() {
		if (m_windowWidth <= 0 || m_windowHeight <= 0) {
			if (document.getElementById("content"))
				document.getElementById("content").removeChild(m_elementId)
			else
				document.getElementsByTagName("body")[0].removeChild(m_elementId);
			
			_update.rest();
			onclose();
		}
	};
	
	var _closeAnim = function() {
		var dy = Math.abs(m_windowHeight - (m_windowHeight-=Math.ceil(50*Math.cos(m_windowHeight/m_maxHeight))));
		var dx = Math.abs(m_windowWidth - (m_windowWidth-=Math.ceil(50*Math.cos(m_windowWidth/m_maxWidth))));
		m_windowX += dx/2;
		m_windowY += dy/2;
		_closedNotify();
	};
	var _openAnim = function() {
		//alert(m_windowHeight);
		
		var dy = Math.abs(m_windowHeight - (m_windowHeight+=Math.ceil(30*Math.cos(m_windowHeight/m_maxHeight))));
		var dx = Math.abs(m_windowWidth - (m_windowWidth+=Math.ceil(30*Math.cos(m_windowWidth/m_maxWidth)))); 
		m_windowX -= dx/2;
		m_windowY -= dy/2;
		
		if (m_windowWidth  > m_maxWidth) m_windowWidth = m_maxWidth;
		if (m_windowHeight > m_maxHeight) m_windowHeight = m_maxHeight;
	
		
		_openedNotify();
	};
	var _sizedNotify = function () {
		if (m_windowWidth >= m_maxWidth && m_windowHeight >= m_maxHeight) {
			m_xStart = m_yStart = m_dX = m_dY = 0;
			_update.rest();
			m_closeButton.onclick = closeWindow;
			m_contentPane.style.visibility = "visible";
		}
	}	
	var _sizeAnim = function () {
		var dy = Math.abs(m_windowHeight - (m_windowHeight+=Math.ceil(50*Math.cos(m_windowHeight/m_maxHeight))));
		var dx = Math.abs(m_windowWidth - (m_windowWidth+=Math.ceil(50*Math.cos(m_windowWidth/m_maxWidth)))); 
		m_windowX -= dx/2;
		m_windowY -= dy/2;
		
		if (m_windowWidth  > m_maxWidth) m_windowWidth = m_maxWidth;
		if (m_windowHeight > m_maxHeight) m_windowHeight = m_maxHeight;
		
		_sizedNotify();
	}
	
	var _getMouseCoords = function(event) {
		var tempX, tempY;
		event = event || window.event;
		//alert(event.clientX);
		var IE = document.all?true:false;
		if (IE) { // grab the x-y pos.s if browser is IE
			if (event) {
				//alert(event.clientX);
				tempX = ((event.clientX  && event.clientX  > 0) ? event.clientX  : 1) + document.body.scrollLeft;
				tempY = ((event.clientY && event.clientY > 0) ? event.clientY : 1) + document.body.scrollTop;
				//alert(tempX);
			}
		}
		else {  // grab the x-y pos.s if browser is NS
			tempX = event.pageX;
			tempY = event.pageY;
		}  
		if (tempX < 0){tempX = 0;}
		if (tempY < 0){tempY = 0;}  
		
		
		//m_windowX = tempX;
		//m_windowY = tempY;
		//_update.tick();
		return { x : tempX, y : tempY };
	}
	
	
	var _update = (function() { 	
		var m_animSpeed = 20; //~50 fps
		var m_animTimer = null;
		var anim_stack = new Array();
		var rest = function() { /*alert("stop " + m_animTimer);*/ clearInterval(m_animTimer); current=function() { void(0); }; };
		var trigger = function() { m_animTimer = setInterval(tick, m_animSpeed); /*alert("start " + m_animTimer);*/ return m_animTimer; };
		var current = function() { void(0); };
		var onclose = function() { void(0); };
		var tick = function() {
			current();
			m_elementId.style.width  = '' + ((m_windowWidth && m_windowWidth > 0) ? m_windowWidth : 0) + 'px';
			m_elementId.style.height = '' + ((m_windowHeight && m_windowHeight > 0) ? m_windowHeight : 0) + 'px';
			
			m_elementId.style.left = ((m_windowX) ? m_windowX : 0) + 'px';
			m_elementId.style.top  = ((m_windowY) ? m_windowY : 0) + 'px';
			
			
			//alert(m_windowWidth);
			/*document.getElementById("debug").innerHTML = "h:" + m_windowHeight + "  w:" + m_windowWidth + "<br/>"
			+ "y:" + m_windowY + "  x:" + m_windowX + "<br/>"
			+ "sY:" + m_yStart + "  sX:" + m_xStart + "<br/>"
			+ "dY:" + m_dY + "  dX:" + m_dX;*/
		}
		
		return { 
			current : function(s) { current = s; },
			onclose : function(s) { onclose = s; },
			rest : rest, 
			trigger : trigger,
			tick : tick
		}
			
	})();
	
	var resize = function() {
		_update.current(_sizeAnim);
		_update.trigger();
	}
	var openWindow = function() {
		
		m_elementId = document.createElement("div");
		m_elementId.className = "gr_popup"; // this style should be used entirely to define window appearance
		
		m_closeButton = document.createElement("div");
		m_closeButton.className = "gr_popup_close";
		//m_closeButton.onclick = closeWindow();
		m_elementId.appendChild(m_closeButton);
		
		m_border = document.createElement("div");
		m_border.className = "gr_popup_border";
		m_border.onmousedown = function(event) { m_dragging = true; var c = _getMouseCoords(event); m_xStart = c.x; m_yStart = c.y; return false; };
		m_border.onmouseup   = function() { m_dragging = false; return false; };
		m_border.onmousemove = function(event) { 
			if (m_dragging) {
				
				var c = _getMouseCoords(event);
				
				m_dX = (c.x - m_xStart);
				m_dY = (c.y - m_yStart);
				
				m_windowX += m_dX;
				m_windowY += m_dY;
				
				m_xStart = c.x;
				m_yStart = c.y;
				
				/*document.getElementById("debug").innerHTML = "h:" + m_windowHeight + "  w:" + m_windowWidth + "<br/>"
				+ "y:" + m_windowY + "  x:" + m_windowX + "<br/>"
				+ "sY:" + m_yStart + "  sX:" + m_xStart + "<br/>"
				+ "dY:" + m_dY + "  dX:" + m_dX;*/
				_update.tick();
				
				return false;
			}
		};
		m_border.onmouseout = function() { m_dragging=false; /*always stop dragging if mouse leaves client area*/ }
		
		m_contentPane = document.createElement("div");
		m_contentPane.className = "gr_popup_content";
	
		m_border.appendChild(m_contentPane);
		
		m_elementId.appendChild(m_border);
		
		if (document.getElementById("content"))
			document.getElementById("content").appendChild(m_elementId);
		else
			document.getElementsByTagName("body")[0].appendChild(m_elementId);
		
		
		//var c = _getMouseCoords(event);
		
		var scrolled = (window.pageYOffset) ? window.pageYOffset : document.getElementsByTagName("html").scrollTop;
		if (typeof(scrolled) === 'undefined') scrolled = 0;
		
		if (window.innerWidth) {
			m_windowX = window.innerWidth/2;
			m_windowY = window.innerHeight/2 + scrolled/2;
		} else {
			m_windowX = document.body.offsetWidth/2;
			m_windowY = document.body.offsetHeight/4 + scrolled/2;
		}
		
		_update.current(_openAnim);
		_update.trigger();
		
		m_elementId.onunload = function() { alert("dtor called"); };
		m_elementId.onbeforeunload = function() { alert("dtor2 called"); };
		m_elementId.unload = function() { alert("dtor3 called"); };
			// = setInterval(_update(), m_animSpeed);
		
		
	};
	
	var closeWindow = function() {
		m_contentPane.innerHTML = '';
		_update.current(_closeAnim);
		_update.trigger();
	};
	
	var drawWindow = function() {
		
		if (useAjax) {
			var req;
			
			var spinner = document.createElement("div");
			spinner.className="spinner"
			m_elementId.appendChild(spinner);
			
			if (window.XMLHttpRequest)
				req = new XMLHttpRequest();
			else
				req=new ActiveXObject("Microsoft.XMLHTTP");
			  
			req.onreadystatechange = function() {
				if (req.readyState==4) {
					if (req.status==200) {
						m_elementId.removeChild(spinner);
						
						m_contentPane.innerHTML=req.responseText;
						//m_elementId.style.width="auto";
						//m_elementId.style.height="auto";
						m_maxWidth = m_contentPane.clientWidth;
						m_maxHeight = m_contentPane.clientHeight;
						
						var s = m_contentPane.getElementsByTagName("script");   
						for(var i=0; i < s.length; i++)  
					       eval(s[i].text);
						
						m_contentPane.style.visibility="hidden";
						
						resize();
					}
					else
					if (req.status==404)
						alert("Could not find resource " + content);
			    }
			}
			
			req.open("POST",content,true);
			req.send();
		} else {
			//just dump content into the thing
			m_contentPane.innerHTML=content;
			//m_elementId.style.width="auto";
			//m_elementId.style.height="auto";
			m_maxWidth = m_contentPane.clientWidth;
			m_maxHeight = m_contentPane.clientHeight;
			
			var s = m_contentPane.getElementsByTagName("script");   
			for(var i=0; i < s.length; i++)  
		       eval(s[i].text);
			
			m_contentPane.style.visibility="hidden";
			
			resize();
		}
	};
	
	
	openWindow();
	
	return { onclose : function(s) { onclose = s; } };
	
} //end GR_Popup