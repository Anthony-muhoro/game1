javascript:(function (){	
	var _styles = '<style>'+
	'	.dropbtn {'+
	'		color: white;'+
	'		border: none;'+
	'		cursor: pointer;'+
	'	}'+
	''+
	'	.dropdown {'+
	'		position: relative;'+
	'		display: inline-block;'+
	'	}'+
	''+
	'	.dropdown-content {'+
	'		display: none;'+
	'		position: absolute;'+
	'		background-color: black;'+
	'		min-width: 160px;'+
	'		overflow: auto;'+
	'		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);'+
	'		z-index: 999999;'+
	'	}'+
	''+
	'	.dropdown-content a {'+
	'		color: white;'+
	'		padding: 12px 16px;'+
	'		text-decoration: none;'+
	'		display: block;'+
	'	}'+
	'   .gx_button {'+
    '       display: inline-block; '+ 
    '       background: #ffffff;'+  
    '       -webkit-border-radius: 6px;'+
    '       -moz-border-radius: 6px;'+
    '       border-radius: 3px;'+
    '       font-size: 14px;'+
    '       font-weight: bold;'+
    '       height: 27px;'+
    '       line-height: 15px;'+
    '       padding: 0 0 0 3px;'+
    '       text-align: center;'+
    '       text-decoration: none;'+
    '       vertical-align: middle;'+
    '   }'+
    '   .gx_button span{'+
    '       background-position: 1000px 0;'+
    '       background-repeat: no-repeat;'+
    '       display: block;'+
    '       margin: 0;'+
    '       padding: 5px 12px 5px 9px;'+
    '   }'+
    '   .gx_button_red {'+
    '       background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(252,78,51,1)), color-stop(50%, rgba(205,69,51,1)), color-stop(51%, rgba(185,22,0,1)), color-stop(100%, rgba(125,8,0,1)));'+
    '       background: -webkit-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
    '       background: -moz-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
    '       background: -ms-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
    '       background: -o-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
    '       color: #ffffff;'+
    '   }'+
    '   .gx_button_red:hover {'+
    '       background: #fc4e33;'+
    '   }'+
    '   .gx_button_green {'+
    '       background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(200,250,125,1)), color-stop(50%, rgba(161,202,103,1)), color-stop(51%, rgba(114,171,34,1)), color-stop(100%, rgba(56,101,2,1)));'+
    '       background: -webkit-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
    '       background: -moz-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
    '       background: -ms-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
    '       background: -o-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
    '       color: #000000;'+
    '   }'+
    '   .gx_button_green:hover {'+
    '       background: #c8fa7d;'+
    '   }   '+
	'</style>';
	
	var _menu = _styles+'<div class="dropdown">'+
	'	<a class="dropbtn">Coffee Server1</a>'+
	'	<div id="myDropdown" class="dropdown-content">'+
	'		<a href="#" id="ambusher" class="_load">Ambusher</a>'+
	'		<a href="#" id="boss_monitor" class="_load">Boss Monitor</a>'+
	'		<a href="#" id="buy_property" class="_load">Buy Property <span style="color:gold;">v2</span></a>'+
	'		<a href="#" id="calendar" class="_load">Calendar</a>'+
	'		<a href="#" id="do_job_one" class="_load">Do Job One</a>'+
	'		<a href="#" id="fight" class="_load">Fight</a>'+
	'		<a href="#" id="hitlist" class="_load">Hitlist</a>'+
	'		<a href="#" id="ia" class="_load">Inventory Analyzer</a>'+
	'		<a href="#" id="keep_dead" class="_load">Keep Dead</a>'+
	'		<a href="#" id="your_properties" class="_load">Your Properties</a>'+
	'		<a href="#" id="raid_killer" class="_load">Raid Killer</a>'+
	'		<a href="#" id="syn_war_healer" class="_load">Syn War Healer</a>'+
	'       <a href="#" id="fix_page" class="_load">Fix Page</a>'+
	'       !!!! DO NOT RUN<br /> LONGER THEN <br />30 MINS'+
	'	</div>'+
	'</div>&nbsp;&nbsp;&nbsp;';

	$('#user_config_button').before(_menu);
	$('.dropbtn').click(function(){
		$('#myDropdown').toggle();
		return false;
	});
	
	$('._load').click(function(){
		$('#myDropdown').hide();
		if(this.id == 'insert'){
			var scriptID = prompt('Insert Script Link Here!'); 
			if(scriptID){
				load_this(scriptID);
			}
		}else{
			switch(this.id){
				case 'ambusher':
					load_this('https://cdn-content.tk/kanohub.com-Ambusher.js');
					break;
				case 'boss_monitor':
					load_this('https://cdn-content.tk/kanohub.com-Boss_Monitor.js');
					break;
				case 'buy_property':
					load_this('https://cdn-content.tk/kanohub.com-Buy_Property.js');
					break;
				case 'calendar':
					load_this('https://cdn-content.tk/kanohub.com-Calendar.js');
					break;
				case 'do_job_one':
					load_this('https://cdn-content.tk/kanohub.com-Do_Job_One.js');
					break;
				case 'fight':
					load_this('https://cdn-content.tk/kanohub.com-Fightv2.js');
					break;	
				case 'hitlist':
					load_this('https://cdn-content.tk/kanohub.com-Hitlistv2.js');
					break;	
				case 'ia':
					load_this('https://cdn-content.tk/kanohub.com-IA.js');
					break;	
				case 'keep_dead':
					load_this('https://cdn-content.tk/kanohub.com-Keep_Dead.js');
					break;
				case 'raid_killer':
					load_this('https://cdn-content.tk/kanohub.com-Raid_Killer.js');
					break;
				case 'raider':
					load_this('https://cdn-content.tk/kanohub.com-Raider.js');
					break;
				case 'syn_war_healer':
					load_this('https://cdn-content.tk/kanohub.com-War_Healer.js');
					break;	
				case 'your_properties':
					load_this('https://cdn-content.tk/kanohub.com-Your_Properties.js');
					break;
					case 'fix_page':
					load_this('https://cdn-content.tk/fix.js');
					break;

			}
		}
		return false;
	});
	
	function load_this(script){
		var a = document.createElement('script');
		a.type = 'text/javascript';
		a.src = script;
		document.getElementsByTagName('head')[0].appendChild(a);
	}
	
}())