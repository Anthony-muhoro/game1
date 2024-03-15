// ==UserScript==
// @name            UI+
// @author          GuessX
// @version         1.01
// @description     Loads "UI+" by GuessX, into KanoApps LCN, Pirate Clan & Viking Clan
// @downloadURL    https://cdn-content.tk/kanohub.com-UI.user.js
// @include         https://apps.facebook.com/la_cosa_nostra/*
// @include         https://lcn.kanoplay.com/facebook/mob_wars/*
// @match           https://apps.facebook.com/la_cosa_nostra/*
// @match           https://lcn.kanoplay.com/facebook/mob_wars/*
// @include         https://apps.facebook.com/pirateclan/*
// @include         https://pc.kanoplay.com/facebook/pirate_clan/*
// @match           https://apps.facebook.com/pirateclan/*
// @match           https://pc.kanoplay.com/facebook/pirate_clan/*
// @include         https://apps.facebook.com/vikingclan/*
// @include         https://vc.kanoplay.com/facebook/viking_clan/*
// @match	        https://apps.facebook.com/vikingclan/*
// @match           https://vc.kanoplay.com/facebook/viking_clan/*
// ==/UserScript==

//setTimeout(function(){location.reload();},42*60*1000); // 42 minutes delay for page refreshing..

(function(){
    if(/la_cosa_nostra\//.test(document.location.href)||/pirateclan\//.test(document.location.href)||/vikingclan\//.test(document.location.href)){
		hide_fb_ad();
        window.onscroll = function(){scrollFunction();};
    }else{
        loadContent('https://cdn-content.tk/kanohub.com-UI.js');
    }
	function hide_fb_ad(){
		var faux_unframe = window.localStorage.faux_unframe;
        if(faux_unframe && faux_unframe != "false"){
            try{
                document.getElementById('pagelet_canvas_content').style.maxWidth = "100%";
                document.getElementById('rightCol').style.display = "none";
            }catch(err){}
            try{
                document.getElementById('contentArea').style.backgroundColor = "black";
            }catch(err1){}
        }
        var button = document.createElement("a");
        button.innerHTML = "Enable/Disable Faux Unframe";
        button.className = "_42ft _4jy0 _3a01 _p _4jy4 _517h _51sy";
        button.style.width = "180px";
        button.style.marginLeft = "42%";
        button.addEventListener("click",function(){
            if(!faux_unframe||faux_unframe == "false"){
                window.localStorage.faux_unframe = true;
                faux_unframe = true;
                try{
                    document.getElementById('pagelet_canvas_content').style.maxWidth = "100%";
                    document.getElementById('rightCol').style.display = "none";
                    document.getElementById('contentArea').style.backgroundColor = "black";
                }catch(err2){}
            }else{
                window.localStorage.faux_unframe = false;
                faux_unframe = false;
                try{
                    document.getElementById('pagelet_canvas_content').style.maxWidth = "";
                    document.getElementById('rightCol').style.display = "block";
                    document.getElementById('contentArea').style.backgroundColor = "white";
                }catch(err3){}
            }
        });
        var frame_button = document.createElement("a");
        frame_button.id = "myBtn";
        frame_button.innerHTML = "Expand Iframe";
        frame_button.className = "_42ft _4jy0 _3a01 _p _4jy4 _517h _51sy";
        frame_button.style.backgroundColor = "gray";
        frame_button.style.color = "white";
        frame_button.style.display = "none";
        frame_button.style.position = "fixed";
        frame_button.style.bottom = "20px";
        frame_button.style.right = "30px";
        frame_button.style.border = "none";
        frame_button.style.outline = "none";
        frame_button.style.cursor = "pointer";
        frame_button.style.padding = "15px";
        frame_button.addEventListener("click",function(){
            var current_height = parseInt(document.getElementById('iframe_canvas').style.height);
            document.getElementById('iframe_canvas').style.height = current_height+1000+'px';
        });
        try{
            document.getElementById("contentArea").appendChild(button);
            document.getElementById("contentArea").appendChild(frame_button);
        }catch(err4){}
	}
    function scrollFunction(){
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
            document.getElementById("myBtn").style.display = "block";
        }else{
            document.getElementById("myBtn").style.display = "none";
        }
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