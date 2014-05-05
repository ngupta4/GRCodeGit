/********************************
 * GR_Video v1.01
 * 
 * ***************
 * Embed HTML5 video on a page 
 * with Flash and Image fallbacks.
 * ***************
 * 
 * @author dsweeney
 * 
 * ******************************
 * @revision v1.0  - initial version
 * @revision v1.01 - fixed poster image for Internet Explorer 9 
 * 
 ********************************/

/***
 * @constructor
 * @param element 	   : html ID selector to insert video
 * @param name    	   : name to be used for video ID
 * @param videos  	   : array of video URLs. must be in the following order: 0->mp4, 1->webm, 2->ogv
 * @param thumb   	   : thumbnail URL
 * @param showControls : hides video controls. best left set to true
 */
function GR_Video(element, name, width, height, videos, thumb, autoplay, showControls) {
	var m_elementId  = document.getElementById(element),
		m_videoId    = name,
		m_width      = width,
		m_height     = height,
		ma_videos    = videos,
		m_thumbnail  = thumb;
		m_autoplay	 = autoplay;
		m_playButton = false; //hacking this in because the dom is creating 2 buttons for some reason
	
	var m_tempImg = null; // temp thumbnail holder for IE @TODO should probably just insert this image no matter what.
	
	var createPlayButton = function() {
		if (!document.getElementById(name) && !m_playButton)
			return false;
		
		//create embedded <img> for poster image in IE
		var isIE = (window.navigator.appName.indexOf('Microsoft Internet Explorer') != -1);
		
		
		if (isIE && !m_autoplay) {
			m_tempImg = document.createElement("img");
			m_tempImg.src = m_thumbnail;
			m_tempImg.width = m_width;
			m_tempImg.height = m_height;
			
			m_videoId.style.display = 'none';
			
			m_elementId.appendChild(m_tempImg);
		}
		
		m_videoId.removeAttribute("controls"); 
		
		var playButton = document.createElement("div");
		playButton.className = "playButton";
		
		playButton.style.display = "none";
		
		
		playButton.onclick = function() { 
			if (m_tempImg) {
				m_elementId.removeChild(m_tempImg);
				m_videoId.style.display = "block";
				delete m_tempImg;
				m_tempImg = null;
			}
			
			m_elementId.removeChild(this); 
			m_videoId.play(); 
			m_playButton=false;
			
			
			
			if (showControls) 
				m_videoId.setAttribute("controls","controls"); 
		};
		
		m_elementId.appendChild(playButton);
		
		var w = parseInt(document.defaultView.getComputedStyle(playButton, "").getPropertyValue("width")),//playButton.style.width,
	    h = parseInt(document.defaultView.getComputedStyle(playButton, "").getPropertyValue("height"))//playButton.style.height;
		    
		//alert(w); alert(h);
		
		playButton.style.margin = -(m_height/2 + h/2) + 'px 0 0 ' + (m_width/2 - w/2) + 'px';
		
		playButton.style.display = "block";
		
		m_playButton=true;
		
		return playButton;
	}
	
	var createSpinner = function() {
		//@TODO: could be implemented later, was not removing from DOM correctly.
		//		 not even really needed with fadein transition on the video
//		/*var spinner = document.createElement("div");
//		spinner.className = "spinner";
//		spinner.style.margin = (m_height/2) + 'px 0 0 ' + (m_width/2 - 16) + 'px';
//		
//		m_elementId.appendChild(spinner);*/
//		
//		//m_videoId.onload = function() { m_elementId.removeChild(spinner); alert("hey!"); };
//		
//		//return spinner;		
	};
	
	var playVideo = function() { m_videoId.play(); };
	
	var pauseVideo = function() { m_videoId.pause(); };
	
	
	if (m_elementId) {
		//var theVideo = document.createElement("video");
		var html = '<video id="' + m_videoId + '" width="' + m_width + '" height="' + m_height + '" poster="' + m_thumbnail + '" preload="' + ((m_autoplay) ? 'start' : 'none') + '">' +
				'<source src="' + ma_videos[0] + '" type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">' +
				'<source src="' + ma_videos[1] + '" type="video/webm; codecs=&quot;vp8, vorbis&quot;">' +
				'<source src="' + ma_videos[2] + '" type="video/ogg; codecs=&quot;theora, vorbis&quot;">' +
				'<!-- Flash Fallback. Use any flash video player here. Make sure to keep the vjs-flash-fallback class. -->' +
				'<object id="flash_fallback_1" width="' + m_width + '" height="' + m_height + '" type="application/x-shockwave-flash" data="http://fpdownload.adobe.com/strobe/FlashMediaPlayback.swf">' +
				'<param name="movie" value="http://fpdownload.adobe.com/strobe/FlashMediaPlayback.swf">' +
				'<param name="allowfullscreen" value="true">' +
				'<param name="wmode" value="opaque">' +
				'<param name="flashvars" value="src=' + ma_videos[0] + '&amp;poster=' + m_thumbnail + '&amp;m_autoplay=' + m_autoplay + '">' +
				'<!-- Image Fallback. Typically the same as the poster image. -->' +
				'<img src="' + m_thumbnail + '" />' +
				'</object>' +
				'</video>';
	
		m_elementId.innerHTML = html;
		
		var id;
		if (id = document.getElementById(m_videoId)) {
			//html5 video has been created. place Play button if not set to autoplay
			//alert("html5");
			//m_elementId.onmouseover = m_elementId.onmousemove = function() {return false;};
			//first actually store the element
			m_videoId = id;
			
			//show spinner
			if (m_autoplay)
				m_videoId.setAttribute("autoplay","true");
			
			
			m_videoId.className = "loading";
			//createSpinner();
			
			var launch = function() { 
				//m_elementId.removeChild(theSpinner);
				m_videoId.className = '';
				
				//if (spinner)
				//	m_elementId.removeChild(spinner);
				
				if (!m_autoplay)
					createPlayButton();
				else
				if (showControls)
					m_videoId.setAttribute("controls","controls");
			
			};
			
			if (m_videoId.AddEventListener) {
				
				m_videoId.AddEventListener("onload","launch");
			} else
			if (m_videoId.AttachEvent) {
				
				m_videoId.AddEventListener("onload","launch");
			} else {
				
				m_videoId.onload = launch();
			}
			
			//m_videoId.click = function() { createPlayButton(); }
		
			return { 
						theElement : m_elementId,
						playVideo : playVideo,
						pauseVideo : pauseVideo 
				   };
		} else 
			//flash fallback
			return false;
		
	} // end if m_elementId
	
} //end GR_Video