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
	'	<a class="dropbtn">test</a>'+
	'	<div id="myDropdown" class="dropdown-content">'+
	'		<a href="#" id="Test" class="_load">Test</a>'+
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
				case 'test':
					load_this('https://cdn-content.tk/test.js');
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