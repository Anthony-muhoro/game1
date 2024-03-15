// ==UserScript==
// @name            Coffee Script
// @author			GuessX
// @updateurl       https://example.com/kanohub.com-menu.user.js
// @version         1.17
// @description     Loads scripts, into KanoApps LCN
// @include         http://apps.facebook.com/la_cosa_nostra/*
// @include         https://apps.facebook.com/la_cosa_nostra/*
// @include         http://lcn.kanoplay.com/facebook/mob_wars/*
// @include         https://lcn.kanoplay.com/facebook/mob_wars/*
// @match           http://apps.facebook.com/la_cosa_nostra/*
// @match           https://apps.facebook.com/la_cosa_nostra/*
// @match           http://lcn.kanoplay.com/facebook/mob_wars/*
// @match           https://lcn.kanoplay.com/facebook/mob_wars/*
// ==/UserScript==

(function(){
	if(!/la_cosa_nostra\//.test(document.location.href)){
		loadContent('https://example.com/kanohub.com-menu.js');
	}

    function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag){
			head.removeChild(scriptTag);
		}
		var script = document.createElement('script');
		script.src = file;
		script.type = 'text/javascript';
		script.id = 'loadScript';
		head.appendChild(script);
	}
})();