javascript:(function(){
    
    var f;
    try {
        if(localStorage["getItem"]){
            f = localStorage
        }else{
            if(window["localStorage"]["getItem"]){
                f = window["localStorage"]
            }
        }
    } catch(g){};
    var h = '<style>' + 
	'	.menu_tab {' + 
	'		margin-right: 3px; ' +
'		cursor: pointer; ' +
'		padding-top: 8px;' +
'	}' +
'	.tab {' +
'		float: left;' +
'	}' +
'	.tab_active {' +
'		opacity: 1;' +
'	}' +
'	.tab_inactive {' +
'		opacity: 0.7;' +
'	}' +
'	.tab_start {' +
'		background: url("data:image/png;base64,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") no-repeat scroll 0 0 rgba(0, 0, 0, 0);' + 
"		float: left;" +
"		height: 28px;" +
"		width: 3px;" +
"	}" +
"	.tab_middle {" +
'		background: url("data:image/png;base64,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") repeat scroll 0 0 rgba(0, 0, 0, 0);' +
"		color: #FFFFFF;" +
"		float: left;" +
"		font-size: 14px;" +
"		height: 28px;" +
"		padding-left: 5px;" +
"		padding-right: 10px;" +
"		padding-top: 5px;" +
"	}" +
"	.tab_end {" +
'		background: url("data:image/png;base64,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") no-repeat scroll 0 0 rgba(0, 0, 0, 0);' +
"		float: left;" +
"		height: 28px;" +
"		width: 3px;" +
"	}" +
"	.tab_content {" +
"		background-color: transparent;" +
"		border: 1px solid #666666;" +
"		overflow: hidden;" +
"		margin-bottom:15px;" +
"		width:737px;" +
"	}" +
"	.tab_contents {" +
"		margin-right:0px; " +
"		overflow-x:hidden; " +
"		min-height:0;" +
"		height: auto;" +
"		overflow: auto;" +
"	}" +
"	.main_div {" +
"		margin: 0 auto; " +
"		overflow-x:hidden; " +
"		min-height:0;" +
"		height:auto;" +
"		width:740px;" +
"	}" +
"	.gx_button {" +
"		display: inline-block; " +
"		background: #ffffff;" +
"		-webkit-border-radius: 6px;" +
"		-moz-border-radius: 6px;" +
"		border-radius: 3px;" +
"		font-size: 14px;" +
"		font-weight: bold;" +
"		height: 27px;" +
"		line-height: 15px;" +
"		padding: 0 0 0 3px;" +
"		text-align: center;" +
"		text-decoration: none;" +
"		vertical-align: middle;" +
"	}" +
"	.gx_button span{" +
"		background-position: 1000px 0;" +
"		background-repeat: no-repeat;" +
"		display: block;" +
"		margin: 0;" +
"		padding: 5px 12px 5px 9px;" +
"	}" +
"	.gx_button_red {" +
"		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(252,78,51,1)), color-stop(50%, rgba(205,69,51,1)), color-stop(51%, rgba(185,22,0,1)), color-stop(100%, rgba(125,8,0,1)));" +
"		background: -webkit-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);" +
"		background: -moz-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);" +
"		background: -ms-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);" +
"		background: -o-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);" +
"		color: #ffffff;" +
"	}" +
"	.gx_button_red:hover {" +
"		background: #fc4e33;" +
"	}" +
"	.gx_button_green {" +
"		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(200,250,125,1)), color-stop(50%, rgba(161,202,103,1)), color-stop(51%, rgba(114,171,34,1)), color-stop(100%, rgba(56,101,2,1)));" +
"		background: -webkit-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);" +
"		background: -moz-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);" +
"		background: -ms-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);" +
"		background: -o-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);" +
"		color: #000000;" +
"	}" +
"	.gx_button_green:hover {" +
"		background: #c8fa7d;" +
"	}	" +
"	.gx_button_black {" +
"		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(89,89,89,1)), color-stop(50%, rgba(60,60,60,1)), color-stop(51%, rgba(34,34,34,1)), color-stop(100%, rgba(2,2,2,1)));" +
"		background: -webkit-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);" +
"		background: -moz-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);" +
"		background: -ms-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);" +
"		background: -o-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);" +
"		color: #ffffff;" +
"	}" +
"	.gx_button_black:hover {" +
"		background: #595959;" +
"	}" +
"	.gx_button_white {" +
"		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(248,248,248,1)), color-stop(50%, rgba(235,235,235,1)), color-stop(51%, rgba(199,199,199,1)), color-stop(100%, rgba(156,156,156,1)));" +
"		background: -webkit-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(235,235,235,1) 50%, rgba(199,199,199,1) 51%, rgba(156,156,156,1) 100%);" +
"		background: -moz-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(235,235,235,1) 50%, rgba(199,199,199,1) 51%, rgba(156,156,156,1) 100%);" +
"		background: -ms-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(235,235,235,1) 50%, rgba(199,199,199,1) 51%, rgba(156,156,156,1) 100%);" +
"		background: -o-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(235,235,235,1) 50%, rgba(199,199,199,1) 51%, rgba(156,156,156,1) 100%);" +
"		color: #000000;				" +
"	}" +
"	.gx_button_white:hover {" +
"		background: #EBEBEB;" +
"	}	" +
"	.gx_button_orange {" +
"		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,230,128,1)), color-stop(50%, rgba(255,219,128,1)), color-stop(51%, rgba(255,183,0,1)), color-stop(100%, rgba(255,153,0,1)));" +
"		background: -webkit-linear-gradient(top, rgba(255,230,128,1) 0%, rgba(255,219,128,1) 50%, rgba(255,183,0,1) 51%, rgba(255,153,0,1) 100%);" +
"		background: -moz-linear-gradient(top, rgba(255,230,128,1) 0%, rgba(255,219,128,1) 50%, rgba(255,183,0,1) 51%, rgba(255,153,0,1) 100%);" +
"		background: -ms-linear-gradient(top, rgba(255,230,128,1) 0%, rgba(255,219,128,1) 50%, rgba(255,183,0,1) 51%, rgba(255,153,0,1) 100%);" +
"		background: -o-linear-gradient(top, rgba(255,230,128,1) 0%, rgba(255,219,128,1) 50%, rgba(255,183,0,1) 51%, rgba(255,153,0,1) 100%);" +
"		color: #000000;" +
"	}" +
"	.gx_button_orange:hover {" +
"		background: #ffe680;" +
"	}" +
"	.highlight {" +
"		color: #ffd927;" +
"	}" +
"	.tinted {" +
"		color: #898989;" +
"	}" +
"	#syn_stamm::-webkit-inner-spin-button {" +
"		-webkit-appearance: none;" +
"	}" +
"	.btn_sunken {" +
"		opacity:0.8;" +
"		top:0;" +
"		background-repeat: no-repeat;" +
"		-webkit-background-size: 31px 31px;" +
"		-moz-background-size: 31px 31px;" +
"		-o-background-size: 31px 31px;" +
"		background-size: 31px 31px;" +
"		height: 25px;" +
"		border-top: 1px solid #363535;" +
"		border-left: 1px solid #2B2A2A;" +
"		border-bottom: 1px solid #464646;" +
"		border-right: 1px solid #464646;" +
"		border-radius: 5px;" +
"		width: 30px;" +
"		text-decoration: none;" +
"		overflow:hidden;" +
"	}" +
"	.btn_sunken:hover {" +
"		opacity:1;" +
"		cursor:pointer;" +
"		border-top: 1px solid #464646;" +
"		border-left: 1px solid #464646;" +
"		border-bottom: 1px solid #494949;" +
"		border-right: 1px solid #4D4D4D;" +
"	}" +
"	.input_special {" +
"		width:20px;" +
"	}" +
"	.input_super_special {" +
"		width:40px;" +

"	}" +
"	#log_opts label input[type="checkbox"]{" +
"		opacity: 0;" +
"		position: absolute;" +
"	}" +
"	#log_opts label input[type="checkbox"] + span::before{" +
"		content: "";" +
"		width: 12px;" +
"		height: 12px;" +
"		text-align: center;" +
"		background: black;" +
"		vertical-align: baseline;" +
"	}" +
"	#log_opts label input[type="checkbox"]:checked + span::before{" +
"		content: "X";" +
"		color: #52E259;" +
"		vertical-align: baseline;" +
"	}" +
"</style>";
    var k = "";
    if(navigator["appVersion"].indexOf("Chrome/") != -1){
        k = "<style>" +
"	.input_special {" +
"		width:50px;" +
"	}" +
"	.input_super_special {" +
"		width:80px;" +
"	}" +
"	::placeholder {" +
"		color: #52E259;" +
"		opacity: 0.54;" +
"	}" +
"</style>"
    };
    var o = "1.08";
    var p = "" +
"<span style="color:green;">[v1.08]</span> <span class="tinted">[22 April 2018]</span> - Added in Inventory.. <br>" +
"<span style="color:green;">[v1.07]</span> <span class="tinted">[27 March 2018]</span> - Rewrite.. <br>" +
"<span style="color:green;">[v1.06]</span> <span class="tinted">[17 March 2018]</span> - Added in Basic Raids. <br>" +
"<span style="color:green;">[v1.05]</span> <span class="tinted">[16 March 2018]</span> - Added in filters and options for fight/hitlist/synwars. <br>" +
"<span style="color:green;">[v1.04]</span> <span class="tinted">[10 March 2018]</span> - Added Synwars. <br>" +
"<span style="color:green;">[v1.03]</span> <span class="tinted">[10 March 2018]</span> - Big UI Change. <br>" +
"<span style="color:green;">[v1.02]</span> <span class="tinted">[10 March 2018]</span> - Hitlist code written and added in. <br>" +
"<span style="color:green;">[v1.01]</span> <span class="tinted">[05 March 2018]</span> - Added UI, because people needed to be able to work it. <br>" +
"<span style="color:green;">[v1.00]</span> <span class="tinted">[01 March 2018]</span> - March madness begins! Fightlist code written. <br>";
    var r = "<div>" +
"	<div id="coffee" style="display:none;background-color:#000000; border-radius:3px 3px 3px 3px; width:753px; position:absolute;z-index:999999;height: auto;margin-left:3px;">" +
"		<div id="BGS" style="background-color:#000000; border:2px solid #666666; border-radius:3px 3px 3px 3px; color:#FFFFFF; width:750px; height: auto; background:url('https://facebook-xframe.tk/imgs/wallpaper.jpg');  background-repeat: no-repeat; background-size:100%;">" +
"			<div style="background:url(data:image/gif;base64,R0lGODlhAQAhAMQAAAcHBxgYGBISEh4eHiQkJCIiIjExMS4uLgQEBCwsLBQUFA4ODigoKDc3NhwcHDk5NQwMDDY2NiYmJhYWFgYGBjAwMCAgIAMDAxAQECoqKhoaGgoKCjQ0NDg4NgkJCTMzMyH5BAAAAAAALAAAAAABACEAAAUb4NM1EfcZ1ZFkjEQU1uBowaQI2AJtHkAhF08IADs=) repeat-x scroll 0 0; height:33px; width:750px;">" +
"				<span style="float:left; color:#FFCF01; font-size:19px; font-weight:bold; margin:6px 0px 0px 9px;">" +
"					<span alt="Bop them on the snot box" title="Bop them on the snot box" class="highlight">Coffee.&#12324; v" + o +
"</span>" +
"				</span>" +
"				<span style="float:right; margin:2px 2px 0px 0px;">" +
"					<a href="#" id="coffee_close" class="gx_button gx_button_orange">" +
"						<span>" +
'							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoVJREFUeNpi/P//PwMMsOxmZATRIJETTFBBkMhpgABihCmDKfkMkhYAYl6AAGLcBVHzD6oWBJSZoKZIQOn7QPwAIIAYke1CthMk+h6IhaBimSxAYhMQqwLxFyDmBpkNEvSHWpQGxJogpTCLJIF4Dsg4IOYBCCCQk2D+YEByFjK4CcTqMD8yMyA0IDuxB4jVQGIwhTBPgvAZqGKQWAkQC4PEmZB0gzy9A4hNoRpAjs8CYl2wm4BuNATS5xlwA2UgDgYIIKyhhg2AQrIKSLcCcScQV6DJVwLxCpCzQG40ggqWA3EkmsJ2IM4DGQgKzHogfg7EOUC8DIg5gHg+EHMC8Veox3aATLwKxDpALA81ZR7UGd+AGBQfIKftZIFKOkJpPiD+BMRl0OABRbotLF5hYAVU0UEgfgfEG6HipxigEQ4CAUAcDk0VN6BiZdAYYoQpBIW+ARCzAfFvJBu6gPgHEN8CxTcoZkCeeIgnrJVAIQEQYLBkBjLeD4j1oYliGwNxwBeIPYE4F4j/wpwIwtegSR8Z2AHxYQIGboYmumggXgQLxT9AHALE+9EUHwLlYiCOxWOgORAvBuKF0IC0hUWLGBCnALEMELsD8R2oOA/U5t9IBoOS/zFYqQKNgNtQb5+GGbgHmsvZoKkF5H1+IO4A4u/QYFkENeQUNFcmQMNeDRqDU0CxyILk/Mto3rEAYh9o2kUHy6DeZIAGy22YBHJKBNmmB02mIJfsBGIRIK6BGgqSD4SmI1kg/ggNnhfQ1IthoDc0YnSghQ0jtChrhSZIENgAKqmAeBUQr4b64hVSFgYb2AotKcWhBREogS7FkreRwXIgLgBiBWhhUQ3EC2BlE7UALyhzAAA/2IuI/o0g0AAAAABJRU5ErkJggg==" />' +
"						</span>" +
"					</a>" +
"				</span>" +
"			</div>" +
"			<div class="main_div">" +
"				<div style="display: none;" id="coffee_stats"></div>" +
"				<div style="border-bottom:1px solid #333; height:27px; overflow:hidden;">" +
"					<div class="menu_tab tab tab_active" id="coffee_tab_fight">" +
"						<div class="tab_start">&nbsp; </div>" +
"						<div class="tab_middle">Fightlist</div>" +
"						<div class="tab_end">&nbsp; </div>" +
"					</div>" +
"					<div class="menu_tab tab tab_inactive" id="coffee_tab_hitlist">" +
"						<div class="tab_start">&nbsp; </div>" +
"						<div class="tab_middle">Hitlist</div>" +
"						<div class="tab_end">&nbsp; </div>" +
"					</div>" +
"					<div class="menu_tab tab tab_inactive" id="coffee_tab_syn">" +
"						<div class="tab_start">&nbsp; </div>" +
"						<div class="tab_middle">Synwars</div>" +
"						<div class="tab_end">&nbsp; </div>" +
"					</div>" +
"					<div class="menu_tab tab tab_inactive" id="coffee_tab_raid">" +
"						<div class="tab_start">&nbsp; </div>" +
"						<div class="tab_middle">Raids</div>" +
"						<div class="tab_end">&nbsp; </div>" +
"					</div>" +
"					<div class="menu_tab tab tab_inactive" id="coffee_tab_ia">" +
"						<div class="tab_start">&nbsp; </div>" +
"						<div class="tab_middle">Inventory</div>" +
"						<div class="tab_end">&nbsp; </div>" +
"					</div>" +
"				</div>" +
"				<div class="tab_content">" +
"					<div class="tab_contents">" +
"						<div id="coffee_html_fight">" +
"							<section>" +
"								<fieldset style="border: 1px solid #666666; border-radius: 3px; width:710px;margin-top:5px;margin-left:10px;">" +
"									<legend style="margin-left:10px;padding: 0.2em 0.5em; padding-left:10px; border: 1px solid #666666; border-radius: 3px; font-size:90%;  text-align:left;  ">Fightlist Options</legend>" +
"									<div style="width:350px;margin-bottom:25px;">" +
"										<span style="float:left;"><p>Stamina Boost[<span id="experimental_attack_slider_amount_text">1</span> Stamina]</p></span>" +
"										<span class="kanoslider" style="float:right;margin-top:7px;">" +
"											<div id="experimental_attack_slider" style="margin-left:5px;width:150px;">" +
"												<div style="width: 0%;"></div>" +
"												<span tabindex="0" style="left: 0%;"></span>" +
"											</div>" +
"										</span>" +
"									</div>" +
"									<p>" +
"										Skip if Level is higher than:<input required="" class="input_super_special" id="fight_lvl" min="1" max="25000" value="25000" style="-moz-appearance: textfield;border: 0px; background-color: black; color:#52E259;" placeholder="25000" type="number" name="_storage"><br>" +
"										Skip if Mobsize is higher than:<input required="" class="input_super_special" id="fight_mobsize" min="1" max="2000" value="2000" style="-moz-appearance: textfield;border: 0px; background-color: black; color:#52E259;" placeholder="2000" type="number" name="_storage">" +
"									</p>" +
"									<table style="margin-left:5px;margin-bottom:5px;">" +
"										<tr>" +
"											<td rowspan=2 valign="top">Ignore Names with Characters<br>Seperate by newline<br><span id="coffee_fight_empty">(empty)<span></td>" +
"											<td rowspan=2 valign="top">:</td>" +
"											<td rowspan=2 valign="top" colspan=4><textarea id="fight_SpecialChars" name="_storage" style="border: 0px; background-color: black; color:#52E259;" placeholder="PUB&#10;FIJF"></textarea></td>" +
"										</tr>" +
"									</table>" +
"								</fieldset>" +
"							</section>" +
"							<p>" +
"								<a href="#" id="coffee_fight_start" class="gx_button gx_button_green">" +
"									<span style="color:black">" +
"										Run" +
"									</span>" +
"								</a>" +
"								<a href="#" id="coffee_fight_stop" style="display:none;" class="gx_button gx_button_red">" +
"									<span>" +
"										Stop" +
"									</span>" +
"								</a>" +
"							</p>" +
"						</div>" +
"						<div style="display:none;" id="coffee_html_hitlist">" +
"							<section>" +
"								<fieldset style="border: 1px solid #666666; border-radius: 3px; width:710px;margin-top:5px;margin-left:10px;">" +
"									<legend style="margin-left:10px;padding: 0.2em 0.5em; padding-left:10px; border: 1px solid #666666; border-radius: 3px; font-size:90%;  text-align:left;  ">Hitlist Options</legend>" +
"									<table style="margin-left:5px;margin-bottom:5px;">" +
"										<tr>" +
"											<td rowspan=2 valign="top">Ignore Names with Characters<br>Seperate by newline<br><span id="coffee_hl_empty">(empty)<span></td>" +
"											<td rowspan=2 valign="top">:</td>" +
"											<td rowspan=2 valign="top" colspan=4><textarea id="hitlist_SpecialChars" name="_storage" style="border: 0px; background-color: black; color:#52E259;" placeholder="PUB&#10;FIJF"></textarea></td>" +
"										</tr>" +
"									</table>" +
"								</fieldset>" +
"							</section>" +
"							<p>" +
"								<a href="#" id="coffee_hl_start" class="gx_button gx_button_green">" +
"									<span style="color:black">" +
"										Run" +
"									</span>" +
"								</a>" +
"								<a href="#" id="coffee_hl_stop" style="display:none;" class="gx_button gx_button_red">" +
"									<span>" +
"										Stop" +
"									</span>" +
"								</a>" +
"							</p>" +
"						</div>" +
"						<div style="display:none;" id="coffee_html_syn">" +
"							<section>" +
"								<fieldset style="border: 1px solid #666666; border-radius: 3px; width:710px;margin-top:5px;margin-left:10px;">" +
"									<legend style="margin-left:10px;padding: 0.2em 0.5em; padding-left:10px; border: 1px solid #666666; border-radius: 3px; font-size:90%;  text-align:right;  ">Synwar Options</legend>" +
"									<p>" +
"										Tokens per Attack:<input required="" id="syn_stamm" min="1" max="3" value="1" style="-moz-appearance: textfield;width:25px;" type="number" name="_storage"><br>	" +
"										Attack <select id="syn_class" name="_storage">" +
"											<option value="any">Any Class</option>" +
"											<option value="same">Same Class</option>" +
"											<option value="A">A Class</option>" +
"											<option value="B">B Class</option>" +
"											<option value="C">C Class</option>" +
"											<option value="D">D Class</option>" +
"											<option value="E">E Class</option>" +
"										</select>" +
"									</p>" +
"								</fieldset>" +
"							</section>" +
"							<p>" +
"								<a href="#" id="coffee_syn_start" class="gx_button gx_button_green">" +
"									<span style="color:black">" +
"										Run" +
"									</span>" +
"								</a>" +
"								<a href="#" id="coffee_syn_stop" style="display:none;" class="gx_button gx_button_red">" +
"									<span>" +
"										Stop" +
"									</span>" +
"								</a>" +
"							</p>" +
"						</div>" +
"						<div style="display:none;" id="coffee_html_raid">" +
"							<section>" +
"								<fieldset style="border: 1px solid #666666; border-radius: 3px; width:710px;margin-top:5px;margin-left:10px;">" +
"									<legend style="margin-left:10px;padding: 0.2em 0.5em; padding-left:10px; border: 1px solid #666666; border-radius: 3px; font-size:90%;  text-align:right;  ">Raid Options</legend>" +
"									<p>" +
"										List of Raids:<span id="list_raids">Please click button below</span><br>" +
"										Check/Refresh Raid List <a href="#" id="coffee_getraids" class="gx_button gx_button_black">" +
"											<span style="color:black">" +
'												<img src="https://facebook-xframe.tk/imgs/action_box_icon_refresh.gif" />' +
"											</span>" +
"										</a><br>" +
"										Stamina Boost:<input required="" id="raid_stamm" min="1" max="20" value="1" style="-moz-appearance: textfield;width:25px;" type="number" name="_storage"><br>" +
"										Heal party under:<input required="" id="raid_heall" min="30" max="100" value="70" style="-moz-appearance: textfield;width:25px;" type="number" name="_storage">% <span class="tinted">(minimum of 30%)</span>" +
"									</p>" +
"								</fieldset>" +
"							</section>" +
"							<p>" +
"								<a href="#" id="coffee_raid_start" class="gx_button gx_button_green">" +
"									<span style="color:black">" +
"										Run" +
"									</span>" +
"								</a>" +
"								<a href="#" id="coffee_raid_stop" style="display:none;" class="gx_button gx_button_red">" +
"									<span>" +
"										Stop" +
"									</span>" +
"								</a>" +
"							</p>" +
"						</div>" +
"						<div style="display:none;" id="coffee_html_ia">" +
"							<center>" +
"								<h2>Top Attack and Defense items</h2>" +
"								<p>Sort by: <a href="#" id="coffee_ia_sortby_attack">Attack</a> | <a href="#" id="coffee_ia_sortby_defense">Defense</a> <br>Show: <a href="#" id="coffee_ia_show_Weapons">Weapons</a> | <a href="#" id="coffee_ia_show_Armor">Armor</a> | <a href="#" id="coffee_ia_show_Vehicles">Vehicles</a></p>" +
"		<span id="coffee_ia_tog" style="display:none;"><a href="#" id="ia_table">Show Results</a>|<a href="#" id="ia_sugg">Show Suggestions</a></span>" +
"								<br><a href="#" id="coffee_ia_analyse">Click to Analyse</a>" +
"							</center>" +
"							<div id="coffee_ia_sug" style="display:none;"></div>" +
"							<div id="coffee_ia_table"></div>" +
"						</div>" +
"					</div>" +
"				</div>" +
"           	<div>" +
"					<span style="font-weight:bold;display:none;">Stats:<span id="stats"></span></span><br>" +
"					<span style="font-weight:bold;">Status:</span> <span id="status" style="font-weight: bold;">n/a</span>" +
"					<div style="border-bottom:1px solid #333; height:27px; overflow:hidden;">	" +
"						<div class="menu_tab tab tab_active" id="coffee_log_main">" +
"							<div class="tab_start">&nbsp;</div>" +
"							<div class="tab_middle">Log</div>" +
"							<div class="tab_end">&nbsp;</div>" +
"						</div>" +
"						<div class="menu_tab tab tab_inactive" id="coffee_log_kills">" +
"							<div class="tab_start">&nbsp;</div>" +
"							<div class="tab_middle">Kill Log <span id="kill_count"></span></div>" +
"							<div class="tab_end">&nbsp;</div>" +
"						</div>" +
"						<div class="menu_tab tab tab_inactive" id="coffee_log_change">" +
"							<div class="tab_start">&nbsp;</div>" +
"							<div class="tab_middle">Changes</div>" +
"							<div class="tab_end">&nbsp;</div>" +
"						</div>" +
"					</div>" +
"					<div class="tab_content">" +
"						<div class="tab_contents" style="overflow-x:hidden;">" +
"							<div style="border-bottom: 1px solid #666666; width:737px;" id="log_opts">" +
"								<span id="l_size">Log Size:<input id="log_size" value="15" class="input_special" style="height:15px;border: 0px; background-color: black; color:#52E259;" placeholder="15" type="text" name="_storage"></span>" +
"								<span id="kl_size" style="display:none;">Log Size:<input id="Klog_size" value="15" class="input_special" style="height:15px;border: 0px; background-color: black; color:#52E259;" placeholder="15" type="text" name="_storage"></span>" +
"								<label>Show Timestamp <input type="checkbox" checked="checked" id="coffee_timestamp" name="_storage"/><span></span></label>" +
"							</div>" +
"							<div id="coffee_logging_main" style="overflow-x:hidden;overflow-y: hidden; min-height: 41px; height: auto;">" +
"								<table>" +
"									<tr>" +
"										<td id="log" valign="baseline" colspan="2" style="font-weight:bold;">N/A</td>" +
"									</tr>" +
"								</table>" +
"							</div>" +
"							<div id="coffee_logging_kills" style="display: none; overflow-x: hidden; overflow-y: hidden; min-height: 41px; height: auto;">" +
"								<table>" +
"									<tr>" +
"										<td id="kills_log" valign="baseline" colspan="2" style="font-weight:bold;">N/A</td>" +
"									</tr>" +
"								</table>" +
"							</div>" +
"							<div id="coffee_logging_change" style="display: none; overflow-x: hidden; overflow-y: hidden; min-height: 41px; height: auto; font-weight:bold;">" +
"								" + p +
"							</div>" +
"						</div>" +
"					</div>" +
"				</div>" +
"			</div>" +
"		</div>" +
"		<div style="clear:both"></div>" +
"	</div>" +
"</div>";
    var s = [{
        "name": "Riot Shield",
        "id": "800",
        "location": "New York",
        "desc": "loot drop "
    }, {
        "name": "Wesson PPC",
        "id": "500",
        "location": "New York",
        "desc": "loot drop "
    }, {
        "name": "Police Motorcycle",
        "id": "1396",
        "location": "New York",
        "desc": "loot drop "
    }, {
        "name": "Police Car",
        "id": "501",
        "location": "Chicago",
        "desc": "loot drop "
    }, {
        "name": "Blinder Beam",
        "id": "1397",
        "location": "Chicago",
        "desc": "loot drop "
    }, {
        "name": "Race Horse",
        "id": "503",
        "location": "Chicago",
        "desc": "loot drop "
    }, {
        "name": "MMA Fighter",
        "id": "502",
        "location": "Chicago",
        "desc": "loot drop "
    }, {
        "name": "Bluesnarfing Device",
        "id": "504",
        "location": "Chicago",
        "desc": "loot drop "
    }, {
        "name": "Shield Dome",
        "id": "1398",
        "location": "London",
        "desc": "loot drop "
    }, {
        "name": "Incriminating Photos",
        "id": "505",
        "location": "London",
        "desc": "loot drop "
    }, {
        "name": "Royal Palace Blueprints",
        "id": "506",
        "location": "London",
        "desc": "loot drop "
    }, {
        "name": "Mighty 500 Magnum",
        "id": "507",
        "location": "London",
        "desc": "loot drop "
    }, {
        "name": "Safe Buster",
        "id": "508",
        "location": "London",
        "desc": "loot drop "
    }, {
        "name": "Limo Tank",
        "id": "1399",
        "location": "Las Vegas",
        "desc": "loot drop "
    }, {
        "name": "Casino All Access Pass",
        "id": "509",
        "location": "Las Vegas",
        "desc": "loot drop "
    }, {
        "name": "Chainsaw",
        "id": "700",
        "location": "Las Vegas",
        "desc": "loot drop "
    }, {
        "name": "Russian Mob Intel",
        "id": "510",
        "location": "Moscow",
        "desc": "loot drop "
    }, {
        "name": "ADS Pain Gun",
        "id": "1400",
        "location": "Moscow",
        "desc": "loot drop "
    }, {
        "name": "Rocket Launcher",
        "id": "511",
        "location": "Moscow",
        "desc": "loot drop "
    }, {
        "name": "AK-47 Grenade Launcher",
        "id": "512",
        "location": "Moscow",
        "desc": "loot drop "
    }, {
        "name": "Double Barrel 45",
        "id": "513",
        "location": "Moscow",
        "desc": "loot drop "
    }, {
        "name": "Saudi Business Intel",
        "id": "514",
        "location": "Dubai",
        "desc": "loot drop "
    }, {
        "name": "Arctic Panther",
        "id": "1401",
        "location": "Dubai",
        "desc": "loot drop "
    }, {
        "name": "Tactical Shotgun",
        "id": "515",
        "location": "Dubai",
        "desc": "loot drop "
    }, {
        "name": "Ninja Bracers",
        "id": "1402",
        "location": "Shanghai",
        "desc": "loot drop "
    }, {
        "name": "Border Patrol Schedule",
        "id": "516",
        "location": "Shanghai",
        "desc": "loot drop "
    }, {
        "name": "Triad Intel",
        "id": "517",
        "location": "Shanghai",
        "desc": "loot drop "
    }, {
        "name": "Sumo Wrestler",
        "id": "518",
        "location": "Shanghai",
        "desc": "loot drop "
    }, {
        "name": "Nissan GTR",
        "id": "519",
        "location": "Tokyo",
        "desc": "loot drop "
    }, {
        "name": "Samurai Helm",
        "id": "1403",
        "location": "Tokyo",
        "desc": "loot drop "
    }, {
        "name": "Helicopter",
        "id": "520",
        "location": "Tokyo",
        "desc": "loot drop "
    }, {
        "name": "RAH-66 Commanche",
        "id": "521",
        "location": "Tokyo",
        "desc": "loot drop "
    }, {
        "name": "Samurai Katana",
        "id": "522",
        "location": "Tokyo",
        "desc": "loot drop "
    }, {
        "name": "Armored Bentley",
        "id": "523",
        "location": "Tokyo",
        "desc": "loot drop "
    }, {
        "name": "Glock",
        "id": "554",
        "location": "Tijuana",
        "desc": "loot drop "
    }, {
        "name": "Magpulse Rifle",
        "id": "1404",
        "location": "Tijuana",
        "desc": "loot drop "
    }, {
        "name": "Ingram Mac 10",
        "id": "555",
        "location": "Tijuana",
        "desc": "loot drop "
    }, {
        "name": "Dynamite",
        "id": "556",
        "location": "Tijuana",
        "desc": "loot drop "
    }, {
        "name": "RPG",
        "id": "557",
        "location": "Tijuana",
        "desc": "loot drop "
    }, {
        "name": "18 Wheeler",
        "id": "558",
        "location": "Tijuana",
        "desc": "loot drop "
    }, {
        "name": "Circular Saw",
        "id": "559",
        "location": "Medellin",
        "desc": "loot drop "
    }, {
        "name": "Crystal Pistol",
        "id": "1405",
        "location": "Medellin",
        "desc": "loot drop "
    }, {
        "name": "All Terrain Jeep",
        "id": "560",
        "location": "Medellin",
        "desc": "loot drop "
    }, {
        "name": "Police Uniform",
        "id": "561",
        "location": "Medellin",
        "desc": "loot drop "
    }, {
        "name": "Double Barrel Shotgun",
        "id": "562",
        "location": "Medellin",
        "desc": "loot drop "
    }, {
        "name": "Cessna Airplane",
        "id": "563",
        "location": "Medellin",
        "desc": "loot drop "
    }, {
        "name": "Harley Davidson",
        "id": "572",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "CEO Limo",
        "id": "571",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "Utility Belt",
        "id": "1406",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "Wire Cutters",
        "id": "574",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "Ram",
        "id": "1555",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "Heckler-Koch USP",
        "id": "575",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "Spike Helmet",
        "id": "1556",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "Ski Mask & Gloves",
        "id": "569",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "Extreme Commuter",
        "id": "1557",
        "location": "Johannesburg",
        "desc": "loot drop "
    }, {
        "name": "Gravity Cannon",
        "id": "1558",
        "location": "Johannesburg",
        "desc": "loot drop "
    }];
    var u = [{
        "name": "Combat Dogsled",
        "type": "Vehicle",
        "attack": 121,
        "defense": 108,
        "location": "Antarctic Commando",
        "desc": "boss loot drop from "
    }, {
        "name": "Ice Commando Gear",
        "type": "Armor",
        "attack": 103,
        "defense": 97,
        "location": "Antarctic Commando",
        "desc": "boss loot drop from ",
        "id": "2963"
    }, {
        "name": "Glacial Carrier",
        "type": "Vehicle",
        "attack": 91,
        "defense": 97,
        "location": "Antarctic Commando",
        "desc": "boss loot drop from ",
        "id": "2964"
    }, {
        "name": "Glacier Grenade",
        "type": "Weapon",
        "attack": 95,
        "defense": 97,
        "location": "Antarctic Commando",
        "desc": "boss loot drop from "
    }, {
        "name": "Gravedigger Shovel",
        "type": "Weapon",
        "attack": 18,
        "defense": 18,
        "location": "The 86ers",
        "desc": "boss loot drop from ",
        "id": "2726"
    }, {
        "name": "86er Balaclava",
        "type": "Armor",
        "attack": 22,
        "defense": 22,
        "location": "The 86ers",
        "desc": "boss loot drop from ",
        "id": "2727"
    }, {
        "name": "Kidnapper Van",
        "type": "Vehicle",
        "attack": 33,
        "defense": 33,
        "location": "The 86ers",
        "desc": "boss loot drop from "
    }, {
        "name": "Beltbuckle Knife",
        "type": "Weapon",
        "attack": 42,
        "defense": 42,
        "location": "The 86ers",
        "desc": "boss loot drop from "
    }, {
        "name": "Desert Nightvision",
        "type": "Armor",
        "attack": 28,
        "defense": 28,
        "location": "The 86ers",
        "desc": "boss loot drop from "
    }, {
        "name": "86er Desert Truck",
        "type": "Vehicle",
        "attack": 45,
        "defense": 45,
        "location": "The 86ers",
        "desc": "boss loot drop from "
    }, {
        "name": "86er Bonesaw",
        "type": "Weapon",
        "attack": 69,
        "defense": 69,
        "location": "The 86ers",
        "desc": "boss loot drop from "
    }, {
        "name": "Chloroform",
        "type": "Armor",
        "attack": 49,
        "defense": 49,
        "location": "The 86ers",
        "desc": "boss loot drop from "
    }, {
        "name": "Cop Copter",
        "type": "Vehicle",
        "attack": 59,
        "defense": 59,
        "location": "The 86ers",
        "desc": "boss loot drop from "
    }, {
        "name": "86er Rifle",
        "type": "Weapon",
        "attack": 75,
        "defense": 75,
        "location": "The 86ers",
        "desc": "boss loot drop from "
    }, {
        "name": "Double Sawn-Offs",
        "type": "Weapon",
        "attack": 18,
        "defense": 18,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from ",
        "id": "1663"
    }, {
        "name": "Golden Pocket Watch",
        "type": "Armor",
        "attack": 18,
        "defense": 22,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from ",
        "id": "1664"
    }, {
        "name": "MPS Riot Vehicle",
        "type": "Vehicle",
        "attack": 37,
        "defense": 37,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from "
    }, {
        "name": "Corncob Pipe Bomb",
        "type": "Weapon",
        "attack": 54,
        "defense": 49,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from "
    }, {
        "name": "Magnifying Glass",
        "type": "Armor",
        "attack": 26,
        "defense": 31,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from "
    }, {
        "name": "MPS Helicopter",
        "type": "Vehicle",
        "attack": 45,
        "defense": 45,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from "
    }, {
        "name": "Cane Gun",
        "type": "Weapon",
        "attack": 62,
        "defense": 52,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from "
    }, {
        "name": "Deerstalker Hat",
        "type": "Armor",
        "attack": 30,
        "defense": 54,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from "
    }, {
        "name": "MPS Police Lamborghini",
        "type": "Vehicle",
        "attack": 56,
        "defense": 56,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from "
    }, {
        "name": "Laser Monocle",
        "type": "Weapon",
        "attack": 69,
        "defense": 58,
        "location": "Scotland Yard Detective",
        "desc": "boss loot drop from "
    }, {
        "name": "Plymouth Duster",
        "type": "Vehicle",
        "attack": 5,
        "defense": 15,
        "location": "Moretti Family",
        "desc": "boss loot drop from the ",
        "id": "528"
    }, {
        "name": "Briefcase Gun",
        "type": "Weapon",
        "attack": 15,
        "defense": 5,
        "location": "Moretti Family",
        "desc": "boss loot drop from the ",
        "id": "527"
    }, {
        "name": "Handcuffs",
        "type": "Weapon",
        "attack": 10,
        "defense": 1,
        "location": "Moretti Family",
        "desc": "boss loot drop from the ",
        "id": "526"
    }, {
        "name": "1930 Cadillac",
        "type": "Vehicle",
        "attack": 7,
        "defense": 17,
        "location": "De Luca Family",
        "desc": "boss loot drop from the ",
        "id": "529"
    }, {
        "name": "Deluca Family Pistol",
        "type": "Weapon",
        "attack": 17,
        "defense": 7,
        "location": "De Luca Family",
        "desc": "boss loot drop from the ",
        "id": "525"
    }, {
        "name": "Hidden Cane Blade",
        "type": "Weapon",
        "attack": 12,
        "defense": 5,
        "location": "De Luca Family",
        "desc": "boss loot drop from the ",
        "id": "524"
    }, {
        "name": "Abbott Family Shotgun",
        "type": "Weapon",
        "attack": 18,
        "defense": 8,
        "location": "Abbott Family",
        "desc": "boss loot drop from the ",
        "id": "532"
    }, {
        "name": "Electroshock Baton",
        "type": "Weapon",
        "attack": 8,
        "defense": 18,
        "location": "Abbott Family",
        "desc": "boss loot drop from the ",
        "id": "531"
    }, {
        "name": "Fillet Knife",
        "type": "Weapon",
        "attack": 15,
        "defense": 7,
        "location": "Abbott Family",
        "desc": "boss loot drop from the ",
        "id": "530"
    }, {
        "name": "Derringer Pistol",
        "type": "Weapon",
        "attack": 20,
        "defense": 10,
        "location": "Black Mambas",
        "desc": "boss loot drop from the ",
        "id": "536"
    }, {
        "name": "Champagne Bottle",
        "type": "Weapon",
        "attack": 10,
        "defense": 20,
        "location": "Black Mambas",
        "desc": "boss loot drop from the ",
        "id": "534"
    }, {
        "name": "Penn Arms 1837",
        "type": "Weapon",
        "attack": 22,
        "defense": 11,
        "location": "Black Mambas",
        "desc": "boss loot drop from the ",
        "id": "535"
    }, {
        "name": "Lead Pipe",
        "type": "Weapon",
        "attack": 17,
        "defense": 9,
        "location": "Black Mambas",
        "desc": "boss loot drop from the ",
        "id": "533"
    }, {
        "name": "M4A1 Carbine",
        "type": "Weapon",
        "attack": 25,
        "defense": 12,
        "location": "Ivanov Family",
        "desc": "boss loot drop from the ",
        "id": "540"
    }, {
        "name": "Cyanide Cigars",
        "type": "Weapon",
        "attack": 24,
        "defense": 11,
        "location": "Ivanov Family",
        "desc": "boss loot drop from the ",
        "id": "538"
    }, {
        "name": "Semtex Explosive",
        "type": "Weapon",
        "attack": 26,
        "defense": 13,
        "location": "Ivanov Family",
        "desc": "boss loot drop from the ",
        "id": "539"
    }, {
        "name": "Smoking Jacket",
        "type": "Armor",
        "attack": 8,
        "defense": 16,
        "location": "Ivanov Family",
        "desc": "boss loot drop from the ",
        "id": "537"
    }, {
        "name": "Smoke Grenades",
        "type": "Weapon",
        "attack": 20,
        "defense": 25,
        "location": "Nazim Family",
        "desc": "boss loot drop from the ",
        "id": "542"
    }, {
        "name": "Armed Dune Buggy",
        "type": "Vehicle",
        "attack": 20,
        "defense": 25,
        "location": "Nazim Family",
        "desc": "boss loot drop from the ",
        "id": "544"
    }, {
        "name": "MK11 Sniper Rifle",
        "type": "Weapon",
        "attack": 27,
        "defense": 16,
        "location": "Nazim Family",
        "desc": "boss loot drop from the ",
        "id": "543"
    }, {
        "name": "Gas Grenade",
        "type": "Weapon",
        "attack": 20,
        "defense": 15,
        "location": "Nazim Family",
        "desc": "boss loot drop from the ",
        "id": "541"
    }, {
        "name": "Triad Machete",
        "type": "Weapon",
        "attack": 28,
        "defense": 21,
        "location": "Lo Pan Family",
        "desc": "boss loot drop from the ",
        "id": "546"
    }, {
        "name": "Triad Desert Dragon",
        "type": "Weapon",
        "attack": 30,
        "defense": 23,
        "location": "Lo Pan Family",
        "desc": "boss loot drop from the ",
        "id": "548"
    }, {
        "name": "Triad Uzi",
        "type": "Weapon",
        "attack": 29,
        "defense": 22,
        "location": "Lo Pan Family",
        "desc": "boss loot drop from the ",
        "id": "547"
    }, {
        "name": "Triad Cleaver",
        "type": "Weapon",
        "attack": 26,
        "defense": 20,
        "location": "Lo Pan Family",
        "desc": "boss loot drop from the ",
        "id": "545"
    }, {
        "name": "Yakuza Nunchuku",
        "type": "Weapon",
        "attack": 31,
        "defense": 25,
        "location": "Kosugi Family",
        "desc": "boss loot drop from the ",
        "id": "553"
    }, {
        "name": "Yakuza Supra",
        "type": "Vehicle",
        "attack": 27,
        "defense": 29,
        "location": "Kosugi Family",
        "desc": "boss loot drop from the ",
        "id": "552"
    }, {
        "name": "Yakuza Ninja",
        "type": "Vehicle",
        "attack": 28,
        "defense": 20,
        "location": "Kosugi Family",
        "desc": "boss loot drop from the ",
        "id": "551"
    }, {
        "name": "Yakuza Armor",
        "type": "Armor",
        "attack": 12,
        "defense": 17,
        "location": "Kosugi Family",
        "desc": "boss loot drop from the ",
        "id": "549"
    }, {
        "name": "Honda CRX",
        "type": "Vehicle",
        "attack": 22,
        "defense": 27,
        "location": "Kosugi Family",
        "desc": "boss loot drop from the ",
        "id": "550"
    }, {
        "name": "Chavez Speed Boat",
        "type": "Vehicle",
        "attack": 30,
        "defense": 31,
        "location": "Chávez Family",
        "desc": "boss loot drop from the ",
        "id": "1033"
    }, {
        "name": "Chavez Shotgun",
        "type": "Weapon",
        "attack": 27,
        "defense": 37,
        "location": "Chávez Family",
        "desc": "boss loot drop from the ",
        "id": "1016"
    }, {
        "name": "Chavez FX-05 Xiuhcoatl",
        "type": "Weapon",
        "attack": 42,
        "defense": 32,
        "location": "Chávez Family",
        "desc": "boss loot drop from the ",
        "id": "1018"
    }, {
        "name": "Chavez Garrotte",
        "type": "Weapon",
        "attack": 34,
        "defense": 21,
        "location": "Chávez Family",
        "desc": "boss loot drop from the ",
        "id": "1015"
    }, {
        "name": "Ramirez Audi A7 Sportback",
        "type": "Vehicle",
        "attack": 31,
        "defense": 32,
        "location": "Ramírez Family",
        "desc": "boss loot drop from the ",
        "id": "1013"
    }, {
        "name": "Ramirez Military Tactical Suit",
        "type": "Armor",
        "attack": 18,
        "defense": 22,
        "location": "Ramírez Family",
        "desc": "boss loot drop from the ",
        "id": "1030"
    }, {
        "name": "Ramirez Rocket Launcher RPG",
        "type": "Weapon",
        "attack": 43,
        "defense": 33,
        "location": "Ramírez Family",
        "desc": "boss loot drop from the ",
        "id": "1020"
    }, {
        "name": "Ramirez Assault Rifle",
        "type": "Weapon",
        "attack": 36,
        "defense": 25,
        "location": "Ramírez Family",
        "desc": "boss loot drop from the ",
        "id": "1019"
    }, {
        "name": "Maponga Armscor BXP",
        "type": "Weapon",
        "attack": 44,
        "defense": 34,
        "location": "Maponga Family",
        "desc": "boss loot drop from the ",
        "id": "1022"
    }, {
        "name": "Maponga Armored Truck",
        "type": "Vehicle",
        "attack": 32,
        "defense": 33,
        "location": "Maponga Family",
        "desc": "boss loot drop from the ",
        "id": "1014"
    }, {
        "name": "Maponga AK-47",
        "type": "Weapon",
        "attack": 29,
        "defense": 39,
        "location": "Maponga Family",
        "desc": "boss loot drop from the ",
        "id": "1021"
    }, {
        "name": "Maponga Machete",
        "type": "Weapon",
        "attack": 24,
        "defense": 32,
        "location": "Maponga Family",
        "desc": "boss loot drop from the ",
        "id": "1023"
    }];
    var v = false;
    var z = false;
    var A = false;
    var B = false;
    var C = false;
    var D = false;
    var E = false;
    var F;
    var G = "fight";
    var H = 0;
    var I = "";
    var J = [];
    var K = [];
    var L =(function(){
        return(30 / 100) * parseInt($("#health_menu_value").text().split("/")[1])
    });
    var M =(function(){
        return parseInt($("#generals-reload").text())
    });
    var N = 0;
    var O = 0;
    var P = [];
    var Q = [];
    var R = 0;
    var S = 0;
    var T = [];
    var U = 0;
    var V = 0;
    var W = 70;
    var X = 0;
    var Y = [];
    var Z = {
        health: 0,
        energy: 0,
        stamina: 0,
        exp_have: 0,
        exp_needed: 0
    };
    var aa = {
        fightlist: {
            wins: 0,
            losses: 0,
            kills: 0,
            dead: 0
        },
        hitlist: {
            wins: 0,
            kills: 0,
            losses: 0,
            mathQ: 0,
            hl_refreshes: 0
        },
        shared: {
            heals: 0,
            spent_stamina: 0,
            totalxp: 0,
            totalcash: 0,
            levelup: 0
        },
        syn: {
            wps: 0,
            tokens: 0
        }
    };
    var ab = {
        inventory_table: "",
        analyze: [],
        analyze_dupecheck: "",
        read_pages: 1,
        pages_read: 1,
        equip: ["soldier", "vehicle"],
        weapons: [],
        soldier: [],
        vehicles: []
    };
    var ac = {
        heal_x: 0,
        heal_y: 0,
        button_x: 0,
        button_y: 0,
        button_hitlist_x: 0,
        button_hitlist_y: 0,
        pos0_x: 0,
        pos0_y: 0,
        pos1_x: 0,
        pos1_y: 0,
        pos2_x: 0,
        pos2_y: 0,
        pos3_x: 0,
        pos3_y: 0,
        pos4_x: 0,
        pos4_y: 0,
        pos5_x: 0,
        pos5_y: 0,
        pos6_x: 0,
        pos6_y: 0,
        pos7_x: 0,
        pos7_y: 0,
        pos8_x: 0,
        pos8_y: 0,
        pos9_x: 0,
        pos9_y: 0,
        pos10_x: 0,
        pos10_y: 0,
        pos11_x: 0,
        pos11_y: 0,
        pos12_x: 0,
        pos12_y: 0,
        pos13_x: 0,
        pos13_y: 0,
        pos14_x: 0,
        pos14_y: 0
    };
   (function(){
        $("#user_config_button").parent().parent().append(h + k + '<li><div id="coffee_tunnel" class="btn_sunken" style="background-image:url(data:image/png;base64,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);"></div></li>');
        $("#fight_SpecialChars, #hitlist_SpecialChars").blur(function(_0xdcd5x2a){
            _0xdcd5x2a.preventDefault();
            _0xdcd5x2a.stopPropagation();
            return false
        });
        $("#coffee_tunnel").click(function(){
            if($("#coffee").css("display") != "none"){
                $("#coffee").slideUp("slow")
            }else{
                $("#coffee").slideDown("slow")
            };
            return false
        });
        $(".metal-bar-repeater:first").after(r);
        $("#experimental_attack_slider").slider({
            range: "min",
            value: 1,
            min: 1,
            max: 10,
            step: 1,
            slide: function(_0xdcd5x2b, _0xdcd5x2c){
                $("#experimental_attack_slider_amount_text").text(_0xdcd5x2c["value"]);
                aT("_cookie", "_storage")
            }
        });
        aU("_cookie", "_storage");
        $("div[id^="coffee_tab_"]").click(function(){
            $("div[id^="coffee_tab_"]").removeClass("tab_active").addClass("tab_inactive");
            $("#" + $(this).attr("id")).removeClass("tab_inactive").addClass("tab_active");
            $("div[id^="coffee_html_"]").hide();
            $("#coffee_html_" + $(this).attr("id").split("_")[2]).show()
        });
        $("div[id^="coffee_log_"]").click(function(){
            $("div[id^="coffee_log_"]").removeClass("tab_active").addClass("tab_inactive");
            $("#" + $(this).attr("id")).removeClass("tab_inactive").addClass("tab_active");
            if($(this).attr("id") == "coffee_log_main"){
                $("#l_size").show();
                $("#kl_size").hide()
            }else{
                if($(this).attr("id") == "coffee_log_kills"){
                    $("#kl_size").show();
                    $("#l_size").hide()
                }else{
                    $("#kl_size").hide();
                    $("#l_size").hide()
                }
            };
            $("div[id^="coffee_logging_"]").hide();
            $("#coffee_logging_" + $(this).attr("id").split("_")[2]).show()
        });
        $("#coffee_fight_start, #coffee_fight_stop").click(function(){
            if(B){
                alert("Please stop the hitlist first!");
                return
            }else{
                if(C){
                    alert("Please stop synwars first!");
                    return
                }else{
                    if(D){
                        alert("Please stop Raids first!");
                        return
                    }
                }
            };
            aT("_cookie", "_storage");
            if(v == true){
                v = false;
                A = false;
                $("#coffee_fight_stop").hide();
                $("#coffee_fight_start").show();
                $("#status").html("Stopped")
            }else{
                v = true;
                A = true;
                G = "fight";
                $("#coffee_fight_start").hide();
                $("#coffee_fight_stop").show();
                $("#status").html("Runing");
                if(!z){
                    ae()
                }else{
                    af()
                }
            };
            clearInterval(F);
            $("#stats").html(aN());
            return false
        });
        $("#coffee_hl_start, #coffee_hl_stop").click(function(){
            if(A){
                alert("Please stop the fightlist first!");
                return
            }else{
                if(C){
                    alert("Please stop synwars first!");
                    return
                }else{
                    if(D){
                        alert("Please stop Raids first!");
                        return
                    }
                }
            };
            aT("_cookie", "_storage");
            if(v == true){
                v = false;
                B = false;
                $("#coffee_hl_stop").hide();
                $("#coffee_hl_start").show();
                $("#status").html("Stopped")
            }else{
                v = true;
                B = true;
                G = "hitlist";
                $("#coffee_hl_start").hide();
                $("#coffee_hl_stop").show();
                $("#status").html("Runing");
                if(!z){
                    ae()
                }else{
                    af()
                }
            };
            clearInterval(F);
            $("#stats").html(aN());
            return false
        });
        $("#coffee_syn_start, #coffee_syn_stop").click(function(){
            if(A){
                alert("Please stop the fightlist first!");
                return
            }else{
                if(B){
                    alert("Please stop the hitlist first!");
                    return
                }else{
                    if(D){
                        alert("Please stop Raids first!");
                        return
                    }
                }
            };
            if(v == true){
                v = false;
                C = false;
                $("#coffee_syn_stop").hide();
                $("#coffee_syn_start").show();
                $("#status").html("Stopped")
            }else{
                v = true;
                C = true;
                G = "synwar";
                $("#coffee_syn_start").hide();
                $("#coffee_syn_stop").show();
                $("#status").html("Runing");
                ap()
            };
            clearInterval(F);
            $("#stats").html(aN());
            return false
        });
        $("#coffee_raid_start, #coffee_raid_stop").click(function(){
            if(A){
                alert("Please stop the fightlist first!");
                return
            }else{
                if(B){
                    alert("Please stop the hitlist first!");
                    return
                }else{
                    if(C){
                        alert("Please stop the Synwar first!");
                        return
                    }
                }
            };
            if(v == true){
                v = false;
                D = false;
                $("#coffee_raid_stop").hide();
                $("#coffee_raid_start").show();
                $("#status").html("Stopped")
            }else{
                v = true;
                D = true;
                G = "raid";
                $("#coffee_raid_start").hide();
                $("#coffee_raid_stop").show();
                $("#status").html("Runing");
                av()
            };
            clearInterval(F);
            $("#stats").html(aN());
            return false
        });
        $("#coffee_close").click(function(){
            v = false;
            clearInterval(F);
            aT("_cookie", "_storage");
            $("#coffee").parent().remove();
            $("#coffee_tunnel").parent().remove()
        });
        $("#fight_lvl").bind("change keyup click", aL(function(){
            var _0xdcd5x2c = $("#fight_lvl").val();
            if(_0xdcd5x2c > 25000 | _0xdcd5x2c < 1 | isNaN(_0xdcd5x2c)){
                _0xdcd5x2c = 25000;
                $("#fight_lvl").val(_0xdcd5x2c)
            };
            aT("_cookie", "_storage")
        }, 1000));
        $("#fight_mobsize").bind("change keyup click", aL(function(){
            var _0xdcd5x2c = $("#fight_mobsize").val();
            if(_0xdcd5x2c > 2000 | _0xdcd5x2c < 1 | isNaN(_0xdcd5x2c)){
                _0xdcd5x2c = 2000;
                $("#fight_mobsize").val(_0xdcd5x2c)
            };
            aT("_cookie", "_storage")
        }, 1000));
        $("#log_size").bind("change keyup click", aL(function(_0xdcd5x2c){
            var _0xdcd5x2d = $("#log_size").val();
            if(_0xdcd5x2d > 99 | _0xdcd5x2d < 1 | isNaN(_0xdcd5x2d)){
                _0xdcd5x2d = 20;
                $("#log_size").val(_0xdcd5x2d)
            };
            aT("_cookie", "_storage")
        }, 1000));
        $("#Klog_size").bind("change keyup click", aL(function(_0xdcd5x2c){
            var _0xdcd5x2d = $("#Klog_size").val();
            if(_0xdcd5x2d > 99 | _0xdcd5x2d < 1 | isNaN(_0xdcd5x2d)){
                _0xdcd5x2d = 20;
                $("#Klog_size").val(_0xdcd5x2d)
            };
            aT("_cookie", "_storage")
        }, 1000));
        $("#fight_SpecialChars, #hitlist_SpecialChars, #coffee_timestamp").bind("change keyup click", function(){
            aT("_cookie", "_storage")
        });
        U = $("#syn_stamm").val();
        V = $("#raid_stamm").val();
        W = $("#raid_heall").val();
        $("#syn_stamm").bind("change keyup click", aL(function(){
            at();
            aT("_cookie", "_storage")
        }, 500));
        $("#raid_stamm").bind("change keyup click", aL(function(){
            var _0xdcd5x2c = $("#raid_stamm").val();
            if(_0xdcd5x2c > 20 | _0xdcd5x2c < 1 | isNaN(_0xdcd5x2c)){
                _0xdcd5x2c = 1;
                $("#raid_stamm").val(_0xdcd5x2c)
            };
            V = $("#raid_stamm").val();
            aT("_cookie", "_storage")
        }, 500));
        $("#raid_heall").bind("change keyup click", aL(function(){
            var _0xdcd5x2c = $("#raid_heall").val();
            if(_0xdcd5x2c > 100 | _0xdcd5x2c < 30 | isNaN(_0xdcd5x2c)){
                _0xdcd5x2c = 70;
                $("#raid_heall").val(_0xdcd5x2c)
            };
            W = $("#raid_heall").val();
            aT("_cookie", "_storage")
        }, 500));
        $("#coffee_getraids").click(function(){
            if(!v){
                E = true;
                v = true
            };
            au();
            return false
        });
        $("#coffee_fight_empty").click(function(){
            $("#fight_SpecialChars").val("");
            return false
        });
        $("#coffee_hl_empty").click(function(){
            $("#hitlist_SpecialChars").val("");
            return false
        });
        $("#syn_stamm, #syn_class, #raid_stamm").bind("change keyup click", function(){
            aT("_cookie", "_storage")
        });
        Z["health"] = /(\d+)\/(\d+)/ .exec($("#health_menu_value").text());
        Z["energy"] = /(\d+)\/(\d+)/ .exec($("#energy_menu_value").text());
        Z["stamina"] = /(\d+)\/(\d+)/ .exec($("#stamina_menu_value").text());
        Z["exp_have"] = $("#hdr_level_xp").text();
        Z["exp_needed"] = $("#hdr_level_total_xp").text();
        $("#stats").html(aN());
        aP("Please note you are running this at your own risk and you could permanently lose your account as scripts are against the TOS")
    })();

    function ad(){
        if(G == "fight"){
            $("#coffee_fight_stop").click()
        }else{
            if(G == "synwar"){
                $("#coffee_syn_stop").click()
            }else{
                if(G == "raid"){
                    $("#coffee_raid_stop").click()
                }else{
                    if(G == "hitlist"){
                        $("#coffee_hl_stop").click()
                    }else{
                        aP(aO() + "s_mode not set?!")
                    }
                }
            }
        }
    }

    function ae(){
        if(v){
            aR({
                page: "battle"
            }, function(_0xdcd5x28){
                $("#inner-container").html(_0xdcd5x28);
                ac["heal_x"] = $("#heal").offset()["left"].toFixed();
                ac["heal_y"] = $("#heal").offset()["top"].toFixed();
                ac["button_hitlist_x"] = $(".header-main-submenu").find(".submenu-button:contains("HITLIST")").offset()["left"].toFixed();
                ac["button_hitlist_y"] = $(".header-main-submenu").find(".submenu-button:contains("HITLIST")").offset()["top"].toFixed();
                if(/No mobs available in your range/ .test(_0xdcd5x28)){
                    aP(aO() + "Please restart script when fightlist isnt on cooldown..");
                    ad();
                    return
                };
                if($(".stamina-icon:contains("Attack")")["length"] > 1){
                    var _0xdcd5x29 = $(".stamina-icon:contains("Attack"):eq(0)");
                    var _0xdcd5x2c = $(".stamina-icon:contains("Attack"):eq(1)");
                    var _0xdcd5x2d = 0 -(parseInt(_0xdcd5x2c.offset()["top"].toFixed() - _0xdcd5x29.offset()["top"].toFixed()));
                    var _0xdcd5x30 = Math.abs(_0xdcd5x2d);
                    for(var _0xdcd5x31 = 0; _0xdcd5x31 < 15; _0xdcd5x31++){
                        ac["pos" + _0xdcd5x31 + "_x"] = parseInt(_0xdcd5x29.offset()["left"].toFixed());
                        ac["pos" + _0xdcd5x31 + "_y"] = parseInt(_0xdcd5x2c.offset()["top"].toFixed()) + _0xdcd5x2d;
                        _0xdcd5x2d += _0xdcd5x30
                    }
                }else{
                    aP(aO() + "Error detecting more than 1 fightlist button, Please restart script when fightlist has more targets..");
                    ad();
                    return
                };
                ac["button_x"] = parseInt(ac["pos0_x"]);
                ac["button_y"] = parseInt(ac["pos0_y"]);
                z = true;
                if(G == "fight"){
                    ag(_0xdcd5x28)
                }else{
                    if(G == "hitlist"){
                        af()
                    }
                }
            })
        }
    }

    function af(){
        if(v){
            if(G == "fight"){
                aR({
                    page: "battle"
                }, function(_0xdcd5x29){
                    ag(_0xdcd5x29)
                })
            }else{
                if(G == "hitlist"){
                    var _0xdcd5x33 = parseInt(ac["button_hitlist_x"]) + aK(10, 80);
                    var _0xdcd5x34 = parseInt(ac["button_hitlist_y"]) + aK(1, 10);
                    var _0xdcd5x28 = "a_c_x=" + _0xdcd5x33 + "&a_c_y=" + _0xdcd5x34;
                    aR({
                        page: "battle/bounty",
                        data: _0xdcd5x28
                    }, function(_0xdcd5x29){
                        aa["hitlist"]["hl_refreshes"]++;
                        al(_0xdcd5x29)
                    })
                }
            }
        }
    }

    function ag(_0xdcd5x28){
        if(v){
            H = 0;
            J = [];
            aM(_0xdcd5x28);
            if(/No mobs available in your range/ .test(_0xdcd5x28)){
                var _0xdcd5x29 = 10 * 60;
                aQ(_0xdcd5x29, "No mob available, refreshing in ", function(){
                    af()
                });
                return
            }else{
                $(_0xdcd5x28).find(".stamina-icon:contains("Attack")").not(":contains("Attack Again")").each(function(_0xdcd5x2c){
                    var _0xdcd5x2d = false;
                    var _0xdcd5x30 = $(this).parent().parent().parent().parent();
                    var _0xdcd5x36 = _0xdcd5x30.find("td:eq(0) > a").text();
                    if(document.getElementById("fight_SpecialChars")["value"] != ""){
                        var _0xdcd5x37 = document.getElementById("fight_SpecialChars")["value"].split("
");
                        for(var _0xdcd5x31 = 0; _0xdcd5x31 < _0xdcd5x37["length"]; _0xdcd5x31++){
                            if(_0xdcd5x36.toLowerCase().indexOf(_0xdcd5x37[_0xdcd5x31].toLowerCase()) != -1){
                                aP(aO() + "Skipping " + _0xdcd5x36 + " because of character filter..");
                                return true
                            }
                        }
                    };
                    var _0xdcd5x38 = _0xdcd5x30.find("td:eq(0) > a").attr("href").replace(/[^0-9]/g, "");
                    var _0xdcd5x39 = _0xdcd5x30.find("td:eq(0) > p > span").text().replace(/[^0-9]/g, "").trim();
                    if(parseInt(_0xdcd5x39) >= $("#fight_lvl").val()){
                        aP(aO() + "Skipping " + _0xdcd5x36 + " because of level filter..");
                        return true
                    };
                    var _0xdcd5x3a = _0xdcd5x30.find("td:eq(1)").text().trim();
                    if(parseInt(_0xdcd5x3a) > $("#fight_mobsize").val()){
                        aP(aO() + "Skipping " + _0xdcd5x36 + " because of mobsize filter..");
                        return true
                    };
                    var _0xdcd5x3b = 0;
                    if(_0xdcd5x30.find(".dead-icon")["length"]){
                        _0xdcd5x2d = true
                    }else{
                        _0xdcd5x3b = _0xdcd5x30.find("td:eq(2) > div > span").attr("style").replace(/[^0-9]/g, "")
                    };
                    var _0xdcd5x3c = --_0xdcd5x2c;
                    if(_0xdcd5x3c < 0){
                        _0xdcd5x3c = 0
                    }else{
                        if(_0xdcd5x3c > 14){
                            _0xdcd5x3c = 14
                        }
                    };
                    J.push({
                        name: _0xdcd5x36,
                        pid: _0xdcd5x38,
                        level: _0xdcd5x39,
                        size: _0xdcd5x3a,
                        health: _0xdcd5x3b,
                        pos: _0xdcd5x3c,
                        isDead: _0xdcd5x2d
                    })
                });
                J.sort(function(_0xdcd5x3d, _0xdcd5x3e){
                    return _0xdcd5x3e["size"] - _0xdcd5x3d["size"]
                });
                for(var _0xdcd5x31 = 0; _0xdcd5x31 < J["length"]; _0xdcd5x31++){
                    if(parseInt(J[0]["health"]) < 20){
                        J.shift()
                    }else{
                        if(aH(J[0]["pid"], "pid", K)){
                            J.shift()
                        }
                    }
                };
                if(!J["length"]){
                    aP(aO() + "No targets, grabbing more..");
                    O++;
                    if(O > 9){
                        O = 0;
                        aP(aO() + "<span style="color:red;">Unable to get targets 10x in a row, stopping..</span>");
                        ad()
                    }else{
                        setTimeout(function(){
                            af()
                        }, 2500)
                    };
                    return
                }else{
                    O = 0;
                    ah()
                }
            }
        }
    }

    function ah(){
        if(v){
            if(parseInt(Z["health"][1]) <= L()){
                aP(aO() + "Needing to heal..");
                N++;
                ao(ah);
                return
            };
            N = 0;
            if(parseInt(Z["stamina"][1]) < parseInt($("#experimental_attack_slider_amount_text").text())){
                aP(aO() + "No stamina... stopping");
                ad();
                return
            };
            if(!J["length"]){
                aP(aO() + "No targets, grabbing more..");
                O++;
                if(O > 9){
                    O = 0;
                    aP(aO() + "<span style="color:red;">Unable to get targets 10x in a row, stopping..</span>");
                    ad()
                }else{
                    af()
                };
                return
            };
            O = 0;
            H++;
            aP("Attacking " + az() + "(Attack #" + H + ")", true);
            var _0xdcd5x33 = parseInt(ac["pos" + J[0]["pos"] + "_x"]) + aK(10, 80);
            var _0xdcd5x34 = parseInt(ac["pos" + J[0]["pos"] + "_y"]) + aK(1, 10);
            if(J[0]["isDead"]){
                var _0xdcd5x28 = "a_c_x=" + _0xdcd5x33 + "&a_c_y=" + _0xdcd5x34 + "&user_id=" + J[0]["pid"];
                aR({
                    page: "battle/attack_dead",
                    data: _0xdcd5x28
                }, function(_0xdcd5x2c){
                    aj(_0xdcd5x2c)
                })
            }else{
                var _0xdcd5x29 =(parseInt($("#experimental_attack_slider_amount_text").text()) - 1);
                var _0xdcd5x28 = "a_c_x=" + _0xdcd5x33 + "&a_c_y=" + _0xdcd5x34 + "&user_id=" + J[0]["pid"] + "&stamina_boost=" + _0xdcd5x29;
                aR({
                    page: "battle/attack",
                    data: _0xdcd5x28
                }, function(_0xdcd5x2c){
                    aj(_0xdcd5x2c)
                })
            }
        }
    }

    function ai(){
        if(v){
            if(!J["length"]){
                aP(aO() + "No targets, grabbing more..");
                af()
            }else{
                H++;
                aP("Attacking " + az() + "(Attack #" + H + ")", true);
                aR({
                    page: "battle/again_attack/",
                    data: I
                }, function(_0xdcd5x28){
                    aj(_0xdcd5x28)
                })
            }
        }
    }

    function aj(_0xdcd5x28){
        if(v){
            aM(_0xdcd5x28);
            if(/has awarded you with/ .test(_0xdcd5x28)){
                aa["shared"]["levelups"]++
            };
            if(/You are too weak to/ .test(_0xdcd5x28)){
                aP(aO() + "Not enough health to fight..");
                N++;
                ao(ai);
                return
            };
            N = 0;
            if(/has just been attacked and/ .test(_0xdcd5x28)){
                aP(aO() + "Too slow! " + az() + " has already been killed!");
                ag(_0xdcd5x28);
                return
            };
            if(/You do not have enough stamina/ .test(_0xdcd5x28)){
                aP(aO() + "Not enough stamina to fight..");
                ad();
                return
            };
            if(/battleV2-result-box-default default-dark-box/ .test(_0xdcd5x28)){
                var _0xdcd5x29 = _0xdcd5x28.split(/battleV2-result-box-default default-dark-box/);
                var _0xdcd5x2c = /You have killed/ .test(_0xdcd5x28);
                if(_0xdcd5x2c){
                    aa["fightlist"]["kills"]++
                };
                var _0xdcd5x2d = /in the hospital/ .test(_0xdcd5x28);
                aa["shared"]["spent_stamina"] += parseInt($("#experimental_attack_slider_amount_text").text());
                if(/WON/ .test(_0xdcd5x29[0])){
                    aa["fightlist"]["wins"]++;
                    var _0xdcd5x42 = /(\d+)  XP/ .exec(_0xdcd5x28);
                    var _0xdcd5x43 = /ld">([()+-])\$([\d,]+)(\$([\d,]+))?<\/sp/ .exec(_0xdcd5x28);
                    aa["shared"]["totalxp"] += parseInt(_0xdcd5x42[1]);
                    aa["shared"]["totalcash"] += parseInt(_0xdcd5x43[2].replace(/[^0-9]/g, ""));
                    var _0xdcd5x30 = "<span style="color:green;">Won!</span>";
                    _0xdcd5x30 +=(parseInt(_0xdcd5x42[1].replace(/[^0-9]/g, "")) > 0 ? " <span class="exp-icon bold attribute-title">" + _0xdcd5x42[1] + "xp</span>" : "");
                    _0xdcd5x30 +=(parseInt(_0xdcd5x43[2].replace(/[^0-9]/g, "")) > 0 ? " <span class="cash-icon bold attribute-title">$" + _0xdcd5x43[2] + "</span>" : "");
                    if(parseInt(_0xdcd5x43[2].replace(/[^0-9]/g, "")) > 0 || parseInt(_0xdcd5x42[1].replace(/[^0-9]/g, "")) > 0){
                        _0xdcd5x30 += ", "
                    }else{
                        _0xdcd5x30 += " "
                    };
                    if(/Attack Again/ .test(_0xdcd5x28)){
                        I = "";
                        var _0xdcd5x37 = _0xdcd5x28.split("data:'");
                        for(var _0xdcd5x31 = 0; _0xdcd5x31 < _0xdcd5x37["length"]; _0xdcd5x31++){
                            if(_0xdcd5x37[_0xdcd5x31].includes("user_id")){
                                I = _0xdcd5x37[_0xdcd5x31].split(/',top:/)[0];
                                break
                            }
                        };
                        if(I == ""){
                            aP(aO() + "something wrong with attack again url, stopping..");
                            ad();
                            return
                        };
                        if(parseInt(Z["health"][1]) <= L()){
                            aP(aO() + _0xdcd5x30 + "<span style="color:red;">but need to heal..</span>");
                            N++;
                            ao(ai);
                            return
                        }else{
                            if(parseInt(Z["stamina"][1]) < parseInt($("#experimental_attack_slider_amount_text").text())){
                                aP(aO() + _0xdcd5x30 + "<span style="color:red;">but ran out of stamina... stopping</span>");
                                ad();
                                return
                            }else{
                                aP(aO() + _0xdcd5x30 + "Attacking " + az() + " again...");
                                ai()
                            }
                        }
                    }else{
                        if(_0xdcd5x2c){
                            _0xdcd5x30 += "Killing " + az();
                            aP(aO() + "Killed " + az(), "kill")
                        }else{
                            if(_0xdcd5x2d){
                                _0xdcd5x30 += "Putting " + az() + " in hospital"
                            }else{
                                if(/dead.png/ .test(_0xdcd5x28)){
                                    var _0xdcd5x38 = "";
                                    aa["fightlist"]["dead"]++;
                                    if(/You can attack(\d+) more Whacked Mobsters/ .test(_0xdcd5x28)){
                                        var _0xdcd5x44 = /can attack(\d+) more Whacked/ .exec(_0xdcd5x28)[1];
                                        _0xdcd5x38 = _0xdcd5x44 + " dead capos left"
                                    }else{
                                        if(/You can no longer attack/ .test(_0xdcd5x28)){
                                            _0xdcd5x38 = "no more dead capos left"
                                        }
                                    };
                                    _0xdcd5x30 += "Fought dead capo " + az() + ", " + _0xdcd5x38
                                }
                            }
                        };
                        aP(aO() + _0xdcd5x30);
                        ag(_0xdcd5x28)
                    }
                }else{
                    var _0xdcd5x30 = "<span style="color:red;">Lost!</span> ";
                    aa["fightlist"]["losses"]++;
                    var _0xdcd5x43 = /ld">([()+-])\$([\d,]+)(\$([\d,]+))?<\/sp/ .exec(_0xdcd5x28);
                    _0xdcd5x30 +=(parseInt(_0xdcd5x43[2].replace(/[^0-9]/g, "")) > 0 ? "<span class="cash-icon bold attribute-title">-$" + _0xdcd5x43[2] + "</span> " : "");
                    if(_0xdcd5x2c){
                        _0xdcd5x30 += "Killing " + az();
                        aP(aO() + "Killed " + az(), "kill")
                    }else{
                        if(_0xdcd5x2d){
                            _0xdcd5x30 += "Putting " + az() + " in hospital"
                        }else{
                            _0xdcd5x30 += "Added " + az() + " to blacklist, skipping"
                        }
                    };
                    aA();
                    aP(aO() + _0xdcd5x30);
                    ag(_0xdcd5x28)
                }
            }else{
                aP(aO() + "Unsure on fight result..?");
                ad()
            }
        }
    }

    function ak(_0xdcd5x28){
        if(v){
            var _0xdcd5x29 = $(_0xdcd5x28).find(".x-large").text();
            var _0xdcd5x42 = /(\d+)([()+-])(\d+)/ .exec(_0xdcd5x29);
            var _0xdcd5x2c;
            if(_0xdcd5x42[2] == "+"){
                _0xdcd5x2c =(parseInt(_0xdcd5x42[1]) + parseInt(_0xdcd5x42[3]))
            }else{
                _0xdcd5x2c =(parseInt(_0xdcd5x42[1]) - parseInt(_0xdcd5x42[3]))
            };
            var _0xdcd5x2d = $(_0xdcd5x28).find("form input[name=bounty_captcha]").val();
            var _0xdcd5x30 = $(_0xdcd5x28).find("form input[name=ts]").val();
            var _0xdcd5x37 = $(_0xdcd5x28).find("form input[name=captcha_response]").val();
            var _0xdcd5x38 = $(_0xdcd5x28).find("form input[name=hash]").val();
            aP(aO() + "Doing math question");
            var _0xdcd5x39 = "bounty_captcha=" + _0xdcd5x2d + "&ts=" + _0xdcd5x30 + "&captcha_response=" + _0xdcd5x37 + "&hash=" + _0xdcd5x38 + "&answer=" + _0xdcd5x2c;
            aR({
                page: "battle/bounty_captcha/",
                data: _0xdcd5x39
            }, function(_0xdcd5x3a){
                aa["hitlist"]["mathQ"]++;
                aP(aO() + "Done math question hopefully..");
                af()
            })
        }
    }

    function al(_0xdcd5x28){
        if(v){
            J = [];
            aM(_0xdcd5x28);
            if(/answer the simple math/ .test(_0xdcd5x28)){
                ak(_0xdcd5x28);
                return
            };
            if(!/No hits available/ .test(_0xdcd5x28)){
                $(_0xdcd5x28).find(".stamina-icon").each(function(){
                    if($(this)[0]["nextSibling"]["nodeValue"] == "Attack"){
                        if($(this).parent().parent().parent().parent().find(".lock-icon")["length"]){
                            return true
                        }else{
                            if($(this).parent().parent().css("display") == "none"){
                                return true
                            }else{
                                var _0xdcd5x29 = $(this).parent().parent().parent().parent();
                                var _0xdcd5x36 = _0xdcd5x29.find("td:eq(0) > a").text();
                                if(document.getElementById("hitlist_SpecialChars")["value"] != ""){
                                    var _0xdcd5x2c = document.getElementById("hitlist_SpecialChars")["value"].split("
");
                                    for(var _0xdcd5x31 = 0; _0xdcd5x31 < _0xdcd5x2c["length"]; _0xdcd5x31++){
                                        if(_0xdcd5x36.toLowerCase().indexOf(_0xdcd5x2c[_0xdcd5x31].toLowerCase()) != -1){
                                            aP(aO() + "Skipping " + _0xdcd5x36 + " because of character filter..");
                                            return true
                                        }
                                    }
                                };
                                var _0xdcd5x2d = _0xdcd5x29.find("td:eq(0) > a").attr("href").replace(/[^0-9]/g, "");
                                var _0xdcd5x30 = _0xdcd5x29.find("td:eq(0) > p").text().replace(/[^0-9]/g, "").trim();
                                var _0xdcd5x37 = _0xdcd5x29.find("td:eq(2)").text().trim();
                                var _0xdcd5x38 = _0xdcd5x29.find("td:eq(4) > a").attr("onclick").split(/bounty_attack\//)[1].split(/',form_id:/)[0];
                                J.push({
                                    name: _0xdcd5x36,
                                    pid: _0xdcd5x2d,
                                    level: _0xdcd5x30,
                                    amount: _0xdcd5x37,
                                    s_key: _0xdcd5x38
                                })
                            }
                        }
                    }
                });
                if(parseInt(Z["health"][1]) <= L()){
                    aP(aO() + "Needing to heal..");
                    N++;
                    ao(am);
                    return
                };
                N = 0;
                if(parseInt(Z["stamina"][1]) < 1){
                    aP(aO() + "No stamina... stopping");
                    ad();
                    return
                }else{
                    if(!J["length"]){
                        aP(aO() + "can't attack current target as they are a fellow mobster!")
                    }else{
                        am();
                        return
                    }
                }
            };
            aP("no targets, refreshing..", true);
            setTimeout(function(){
                af()
            }, 500 + aK(1, 450))
        }
    }

    function am(){
        if(v){
            if(!J["length"]){
                aP(aO() + "No targets?", true);
                setTimeout(function(){
                    af()
                }, 500 + aK(1, 450))
            }else{
                var _0xdcd5x33 = parseInt(ac["button_hitlist_x"]) + aK(10, 80);
                var _0xdcd5x34 = parseInt(ac["button_hitlist_y"]) + aK(3, 10);
                var _0xdcd5x28 = "battle/bounty_attack/" + J[0]["s_key"];
                var _0xdcd5x29 = "a_c_x=" + _0xdcd5x33 + "&a_c_y=" + _0xdcd5x34 + "&user_id=" + J[0]["pid"];
                aP("Attempting " + az() + " level " + J[0]["level"] + " whos bounty is " + aI(J[0]["amount"]), true);
                aR({
                    page: _0xdcd5x28,
                    data: _0xdcd5x29
                }, function(_0xdcd5x2c){
                    an(_0xdcd5x2c)
                })
            }
        }
    }

    function an(_0xdcd5x28){
        if(v){
            aM(_0xdcd5x28);
            if(/has awarded you with/ .test(_0xdcd5x28)){
                aa["shared"]["levelup"]++
            };
            if(/has just been attacked and/ .test(_0xdcd5x28)){
                aP(aO() + "Too slow! " + az() + " has already been killed!");
                ag(_0xdcd5x28);
                return
            };
            if(/User Hit is no longer/ .test(_0xdcd5x28)){
                aP(aO() + "" + az() + " no longer available");
                af();
                return
            };
            if(/Selected opponent is already in a/ .test(_0xdcd5x28)){
                aP(aO() + "Someone else is fighting " + az());
                am();
                return
            };
            if(/You are too weak to/ .test(_0xdcd5x28)){
                aP(aO() + "Too weak to of fought, healing..");
                N++;
                ao(am);
                return
            };
            N = 0;
            if(/battleV2-result-box-default default-dark-box/ .test(_0xdcd5x28)){
                var _0xdcd5x29 = _0xdcd5x28.split(/battleV2-result-box-default default-dark-box/);
                var _0xdcd5x2c = /You have killed/ .test(_0xdcd5x28);
                if(_0xdcd5x2c){
                    aa["hitlist"]["kills"]++;
                    aa["shared"]["totalcash"] += parseInt(J[0]["amount"].replace(/[^0-9]/g, ""))
                };
                aa["shared"]["spent_stamina"]++;
                if(/WON/ .test(_0xdcd5x29[0])){
                    aa["hitlist"]["wins"]++;
                    var _0xdcd5x2d = "<span style="color:green;">Won!</span> ";
                    if(/Attack Again/ .test(_0xdcd5x28)){
                        if(parseInt(Z["health"][1]) <= L()){
                            aP(aO() + _0xdcd5x2d + "<span style="color:red;">but need to heal..</span>");
                            ao(am);
                            return
                        }else{
                            if(parseInt(Z["stamina"][1]) < 1){
                                aP(aO() + _0xdcd5x2d + "<span style="color:red;">but ran out of stamina... stopping</span>");
                                ad();
                                return
                            }else{
                                aP(aO() + _0xdcd5x2d + "Attacking " + az() + " again...");
                                am()
                            }
                        }
                    }else{
                        if(_0xdcd5x2c){
                            _0xdcd5x2d += "You have killed " + az() + " and collected their reward of " + J[0]["amount"] + ".";
                            aP(aO() + "You have killed " + az() + " and collected their reward of " + J[0]["amount"] + " " +(parseInt(J[0]["amount"].replace(/[^0-9]/g, "")) >= 1000000000 ? aI(J[0]["amount"], true) : ""), "kill")
                        };
                        aP(aO() + _0xdcd5x2d);
                        af()
                    }
                }else{
                    aa["hitlist"]["losses"]++;
                    var _0xdcd5x2d = "<span style="color:red;">Lost!</span> ";
                    if(/Attack Again/ .test(_0xdcd5x28)){
                        if(parseInt(Z["health"][1]) <= L()){
                            aP(aO() + _0xdcd5x2d + "<span style="color:red;">but need to heal..</span>");
                            ao(am);
                            return
                        }else{
                            if(parseInt(Z["stamina"][1]) < 1){
                                aP(aO() + _0xdcd5x2d + "<span style="color:red;">but ran out of stamina... stopping</span>");
                                ad();
                                return
                            }else{
                                aP(aO() + _0xdcd5x2d + "Attacking " + az() + " again...");
                                am()
                            }
                        }
                    }else{
                        if(_0xdcd5x2c){
                            _0xdcd5x2d += "You have killed " + az() + " and collected their reward of " + J[0]["amount"] + ".";
                            aP(aO() + "You have killed " + az() + " and collected their reward of " + J[0]["amount"] + " " +(parseInt(J[0]["amount"].replace(/[^0-9]/g, "")) >= 1000000000 ? aI(J[0]["amount"], true) : ""), "kill")
                        };
                        aP(aO() + _0xdcd5x2d);
                        af()
                    }
                }
            }else{
                aP(aO() + "unknown hitlist result!! stoppping");
                ad()
            }
        }
    }

    function ao(_0xdcd5x28){
        if(v){
            if(N > 2){
                N = 0;
                var _0xdcd5x29 = 20;
                aQ(_0xdcd5x29, "Trying to shake incoming attacks, Pausing for ", function(){
                    ao(_0xdcd5x28)
                });
                return
            };
            var _0xdcd5x33 = parseInt(ac["heal_x"]) + aK(10, 80);
            var _0xdcd5x34 = parseInt(ac["heal_y"]) + aK(2, 10);
            var _0xdcd5x2c = "heal/oneclick/" + healCode_global + "/";
            var _0xdcd5x2d = "ajax_response_type=modal&modal_id=heal_response_modal&a_c_x=" + _0xdcd5x33 + "&a_c_y=" + _0xdcd5x34;
            aP(aO() + "Healing..");
            aR({
                page: _0xdcd5x2c,
                data: _0xdcd5x2d
            }, function(_0xdcd5x30){
                aM(_0xdcd5x30);
                if(/doctor will not heal you/ .test(_0xdcd5x30)){
                    aP(aO() + "The doctor will not heal you right now!");
                    _0xdcd5x28();
                    return
                }else{
                    if(/The doctor healed you/ .test(_0xdcd5x30)){
                        aa["shared"]["heals"]++;
                        aP(aO() + "<span style="color:green;">The doctor healed you..</span>");
                        _0xdcd5x28()
                    }else{
                        if(parseInt(Z["health"][1]) <= L()){
                            aP(aO() + "Issue with healing, retrying..");
                            ao(_0xdcd5x28)
                        }else{
                            aP(aO() + "Get new hospital message");
                            ad()
                        }
                    }
                }
            })
        }
    }

    function ap(){
        if(v){
            aR({
                page: "war"
            }, function(_0xdcd5x28){
                if(/War but it has not started yet/ .test(_0xdcd5x28)){
                    aP(aO() + "<span style="color:red;">No synwars in progress, stoppping..</span>");
                    ad();
                    return
                };
                T = [];
                aa["syn"]["wps"] = $(_0xdcd5x28).find("#point_value").text().replace(/[^0-9]/g, "");
                aa["syn"]["tokens"] = $(_0xdcd5x28).find("#token_value").text().split("/")[0];
                aM(_0xdcd5x28);
                var _0xdcd5x29 = /(\s[A-E]\s)/ .exec($(_0xdcd5x28).find("span[style="color:#CACACA;"]:first").text());
                $(_0xdcd5x28).find("#saved_target_container").find(".war-list-table > tbody > tr").each(function(){
                    var _0xdcd5x2c = $(this).find("a:last").attr("onclick");
                    var _0xdcd5x2d = _0xdcd5x2c.split(/eu_id=/)[1].split(/',update_id/)[0];
                    var _0xdcd5x30 = $(this).find("span").text().trim();
                    var _0xdcd5x37 = $("#syn_class").val();
                    var _0xdcd5x38 = $(this).find("span")[0]["nextSibling"]["nodeValue"];
                    if($("#syn_class").val() == "any" || $("#syn_class").val() == "same" && _0xdcd5x29[1].trim() == _0xdcd5x30 || $("#syn_class").val() == "A" && _0xdcd5x30 == "A" || $("#syn_class").val() == "B" && _0xdcd5x30 == "B" || $("#syn_class").val() == "C" && _0xdcd5x30 == "C" || $("#syn_class").val() == "D" && _0xdcd5x30 == "D" || $("#syn_class").val() == "E" && _0xdcd5x30 == "E"){
                        T.push({
                            their_class: _0xdcd5x30,
                            name: _0xdcd5x38,
                            war_id: _0xdcd5x2d
                        })
                    }
                });
                if(!T["length"]){
                    aP(aO() + "<span style="color:red;">No saved war targets that meet criteria, stoppping..</span>");
                    ad()
                }else{
                    aq()
                }
            })
        }
    }

    function aq(){
        if(v){
            if(!T["length"]){
                X++;
                if(X > 2){
                    X = 0;
                    aP(aO() + "<span style="color:red;">Cycled the saved target list 3x in a row, stopping...</span>");
                    ad();
                    return
                };
                aP(aO() + "<span style="color:lightgreen;">Reached last saved war, restarting..</span>");
                ap();
                return
            };
            X = 0;
            aP("Attacking " + T[0]["name"] + "..", true);
            var _0xdcd5x28 = "eu_id=" + T[0]["war_id"] + "&token_amount=" + U;
            aR({
                page: "war/attack",
                data: _0xdcd5x28
            }, function(_0xdcd5x29){
                ar(_0xdcd5x29)
            })
        }
    }

    function ar(_0xdcd5x28){
        if(v){
            aM(_0xdcd5x28);
            if(/Your opponent is dead and cannot be/ .test(_0xdcd5x28)){
                aP(aO() + "" + T[0]["name"] + " <span style="color:lightgreen;">is currently dead, skipping to next war..</span>");
                T.shift();
                aq();
                return
            };
            if(/You have been killed and must wait/ .test(_0xdcd5x28)){
                aP(aO() + "<span style="color:red;">You are dead and need to wait to respawn</span>");
                aR({
                    page: "war"
                }, function(_0xdcd5x2d){
                    var _0xdcd5x30 = $(_0xdcd5x2d).find("#respawn_timer").text();
                    if(_0xdcd5x30 == "0:00"){
                        ap()
                    }else{
                        var _0xdcd5x37 = _0xdcd5x30.split(":");
                        _0xdcd5x37 =((parseInt(_0xdcd5x37[0]) * 60) +(parseInt(_0xdcd5x37[1])));
                        aQ(_0xdcd5x37 + 1, "Respawning in ", function(){
                            ap()
                        })
                    }
                });
                return
            };
            if(/You need at least/ .test(_0xdcd5x28)){
                aP(aO() + "<span style="color:red;">You need more tokens, stopping..</span>");
                ad();
                return
            };
            if(/war-win/ .test(_0xdcd5x28) | /war-lose/ .test(_0xdcd5x28)){
                aa["syn"]["wps"] = /point_value'\).text\('(\b\d[\d,.]*\b)'\);/ .exec(_0xdcd5x28)[1];
                aa["syn"]["tokens"] = /token_value"\).text\("(\d+)\/(\d+)"\);/ .exec(_0xdcd5x28)[1];
                var _0xdcd5x29 = $(_0xdcd5x28).find(".progress-bar-inner:first").attr("style").replace(/[^0-9]/g, "");
                aP(aO() + "You attacked <span class="highlight">" + T[0]["name"] + "</span>	they have <span style="color:lightgreen;">" + $(_0xdcd5x28).find(".progress-bar-inner-text:last").text() + "</span> health remaining..");
                if(parseInt(_0xdcd5x29) < 70){
                    if(parseInt(aa["syn"]["tokens"]) >= parseInt(U) && parseInt(Z["stamina"][1]) >= parseInt(U)){
                        aP(aO() + "<span style="color:red;">Need to heal the crew</span>");
                        aR({
                            page: "war/heal"
                        }, function(_0xdcd5x2d){
                            as(_0xdcd5x2d)
                        })
                    }else{
                        var _0xdcd5x2c =(parseInt(aa["syn"]["tokens"]) >= parseInt(U) ? "stamina" : "tokens");
                        aP(aO() + "<span style="color:red;">Needing to heal, but no " + _0xdcd5x2c + ", stopping..</span>");
                        ad()
                    }
                }else{
                    if(parseInt(aa["syn"]["tokens"]) >= parseInt(U) && parseInt(Z["stamina"][1]) >= parseInt(U)){
                        aq()
                    }else{
                        var _0xdcd5x2c =(parseInt(aa["syn"]["tokens"]) > 0 ? "stamina" : "tokens");
                        aP(aO() + "<span style="color:red;">Ran out of " + _0xdcd5x2c + ", stopping..</span>");
                        ad()
                    }
                }
            }
        }
    }

    function as(_0xdcd5x28){
        if(v){
            aM(_0xdcd5x28);
            if(/Your Syndicate has(\d+) heals remaining/ .test(_0xdcd5x28)){
                aP(aO() + "<span style="color:lightgreen;">Your syn was healed..</span>");
                aq()
            }else{
                aP(aO() + "<span style="color:red;">healing error i havent picked up yet</span>");
                ad()
            }
        }
    }

    function at(){
        var _0xdcd5x28 = $("#syn_stamm").val();
        if(_0xdcd5x28 > 3 | _0xdcd5x28 < 1 | isNaN(_0xdcd5x28)){
            _0xdcd5x28 = 1;
            $("#syn_stamm").val(_0xdcd5x28)
        };
        U = $("#syn_stamm").val()
    }

    function au(){
        $("#list_raids").html("Checking Raid Page...");
        aR({
            page: "raid"
        }, function(_0xdcd5x28){
            Y = [];
            aM(_0xdcd5x28);
            $(_0xdcd5x28).find("#raid_items > div").each(function(){
                var _0xdcd5x36 = $(this).find(".boss-prev-hd").children().text().slice(0, -11).trim();
                var _0xdcd5x2c = $(this).find("a").attr("onclick");
                var _0xdcd5x2d = _0xdcd5x2c.split(/page:'/)[1].split(/',form_id/)[0];
                var _0xdcd5x42 = /(\d+)\/(\d+)\/(\d+)/ .exec(_0xdcd5x2c);
                var _0xdcd5x30 = _0xdcd5x42[2];
                var _0xdcd5x37 = _0xdcd5x42[1];
                var _0xdcd5x38 = _0xdcd5x42[3];
                var _0xdcd5x39 = $(this).prev().find("input[name="raid_boss_collect_id"]").val();
                Y.push({
                    name: _0xdcd5x36,
                    bid: _0xdcd5x30,
                    buid: _0xdcd5x37,
                    bts: _0xdcd5x38,
                    cid: _0xdcd5x39,
                    url: _0xdcd5x2d
                })
            });
            if(!Y["length"]){
                $("#list_raids").html("None detected, try refreshing later..")
            }else{
                var _0xdcd5x29 = "<select>";
                for(var _0xdcd5x31 = 0; _0xdcd5x31 < Y["length"]; _0xdcd5x31++){
                    _0xdcd5x29 += "<option value="" + _0xdcd5x31 + "">" + Y[_0xdcd5x31]["name"] + "</option>"
                };
                _0xdcd5x29 += "</select>";
                $("#list_raids").html(_0xdcd5x29)
            };
            if(E){
                v = false;
                E = false
            }
        })
    }

    function av(){
        if(v){
            if(!Y["length"]){
                aP(aO() + "<span style="color:red;">No Raids selected, stopping..</span>");
                ad();
                return
            };
            var _0xdcd5x28 = Y[$("#list_raids > select").val()];
            var _0xdcd5x29 = "boss_id=" + _0xdcd5x28["bid"] + "&boss_user_id=" + _0xdcd5x28["buid"] + "&raid_boss_collect_id=" + _0xdcd5x28["cid"] + "&boss_start_ts=" + _0xdcd5x28["bts"];
            aR({
                page: _0xdcd5x28["url"],
                data: _0xdcd5x29
            }, function(_0xdcd5x2c){
                if(/Time Left To Defeat/ .test(_0xdcd5x2c)){
                    var _0xdcd5x2d = $(_0xdcd5x2c).find(".boss-attack-button").parent().prev();
                    var _0xdcd5x30 = _0xdcd5x2d.find("input[name="boss_user_id"]").val();
                    var _0xdcd5x37 = _0xdcd5x2d.find("input[name="boss_id"]").val();
                    var _0xdcd5x38 = _0xdcd5x2d.find("input[name="boss_start_ts"]").val();
                    var _0xdcd5x39 = "boss_user_id=" + _0xdcd5x30 + "&boss_id=" + _0xdcd5x37 + "&boss_start_ts=" + _0xdcd5x38 + "&stamina_amount=" + V;
                    var _0xdcd5x3a = "boss/attack/" + _0xdcd5x37;
                    if(V > 4){
                        _0xdcd5x3a = "boss/boost_attack/" + _0xdcd5x37
                    };
                    aR({
                        page: _0xdcd5x3a,
                        data: _0xdcd5x39
                    }, function(_0xdcd5x3b){
                        ay(_0xdcd5x3b)
                    })
                }
            })
        }
    }

    function aw(_0xdcd5x28){
        if(v){
            var _0xdcd5x29 = $(_0xdcd5x28).find(".boss-attack-button").parent().prev();
            var _0xdcd5x2c = _0xdcd5x29.find("input[name="boss_user_id"]").val();
            var _0xdcd5x2d = _0xdcd5x29.find("input[name="boss_id"]").val();
            var _0xdcd5x30 = _0xdcd5x29.find("input[name="boss_start_ts"]").val();
            var _0xdcd5x29 = "boss_user_id=" + _0xdcd5x2c + "&boss_id=" + _0xdcd5x2d + "&boss_start_ts=" + _0xdcd5x30 + "&stamina_amount=" + V;
            var _0xdcd5x37 = "boss/attack/" + _0xdcd5x2d;
            if(V > 4){
                _0xdcd5x37 = "boss/boost_attack/" + _0xdcd5x2d
            };
            aR({
                page: _0xdcd5x37,
                data: _0xdcd5x29
            }, function(_0xdcd5x38){
                ay(_0xdcd5x38)
            })
        }
    }

    function ax(_0xdcd5x28){
        var _0xdcd5x29 = $(_0xdcd5x28).find(".boss-heal-button").parent().prev();
        var _0xdcd5x2c = _0xdcd5x29.find("input[name="boss_user_id"]").val();
        var _0xdcd5x2d = _0xdcd5x29.find("input[name="boss_id"]").val();
        var _0xdcd5x30 = _0xdcd5x29.find("input[name="boss_start_ts"]").val();
        var _0xdcd5x37 = _0xdcd5x29.find("input[name="energy_amount"]").val();
        var _0xdcd5x38 = _0xdcd5x29.find("input[name="power_attack"]").val();
        if(parseInt(Z["energy"][1]) >= 20){
            var _0xdcd5x29 = "boss_user_id=" + _0xdcd5x2c + "&boss_id=" + _0xdcd5x2d + "&boss_start_ts=" + _0xdcd5x30 + "&energy_amount=" + _0xdcd5x37 + "&power_attack=" + _0xdcd5x38;
            aR({
                page: "boss/raid_heal/" + req["bid"],
                data: _0xdcd5x29
            }, function(_0xdcd5x39){
                ay(_0xdcd5x39)
            })
        }else{
            aP(aO() + "<span style="color:red;">Party needs to heal, not enough energy, stopping..</span>");
            ad()
        }
    }

    function ay(_0xdcd5x28){
        if(v){
            aM(_0xdcd5x28);
            var _0xdcd5x29 = $(_0xdcd5x28).find(".boss-attack-button").parent().prev();
            var _0xdcd5x2c = _0xdcd5x29.find("input[name="boss_user_id"]").val();
            var _0xdcd5x2d = _0xdcd5x29.find("input[name="boss_id"]").val();
            var _0xdcd5x30 = _0xdcd5x29.find("input[name="boss_start_ts"]").val();
            if(/raid is already at maximum health/ .test(_0xdcd5x28)){
                aP("Raid is already at maximum health");
                aw(_0xdcd5x28);
                return
            };
            if(/do not have enough Stamina to/ .test(_0xdcd5x28)){
                aP("Not enough stamina, stopping");
                ad();
                return
            };
            if(/Boss is currently being attacked/ .test(_0xdcd5x28)){
                aP("Boss is currently being attacked by someone else");
                aw(_0xdcd5x28);
                return
            };
            if(/green bold/ .test(_0xdcd5x28) || /-(\d+) Stamina/ .test(_0xdcd5x28) || /- 20 Energy/ .test(_0xdcd5x28)){
                var _0xdcd5x37 = $(_0xdcd5x28).find(".progress-bar-inner-text:first").text();
                var _0xdcd5x38 = $(_0xdcd5x28).find(".progress-bar-inner:first").attr("style").replace(/[^0-9]/g, "");
                var _0xdcd5x39 = $(_0xdcd5x28).find(".progress-bar-inner-text:eq(1)").text();
                var _0xdcd5x3a = $(_0xdcd5x28).find(".progress-bar-inner:eq(1)").attr("style").replace(/[^0-9]/g, "");
                aP(aO() + "Party Health: " + _0xdcd5x37 + "(" + _0xdcd5x38 + "%) remaining snakes <span style="color:green;">" + _0xdcd5x39 + "(" + _0xdcd5x3a + "%)</span>");
                if(parseInt(_0xdcd5x38) < W || /Careful, the Raid is at low/ .test(_0xdcd5x28)){
                    aP(aO() + "Force heal as party below " + $("#raid_heall").val() + "%");
                    ax(_0xdcd5x28);
                    return
                };
                if(parseInt(Z["stamina"][1]) > V && parseInt(Z["energy"][1]) >= 20){
                    aw(_0xdcd5x28)
                }else{
                    var _0xdcd5x3b =(parseInt(Z["stamina"][1]) > V ? "health" : "stamina");
                    aP(aO() + "<span style="color:red;">Not enough " + _0xdcd5x3b + ", stopping..</span>");
                    ad()
                }
            }
        }
    }

    function az(){
        return '<a href="https://apps.facebook.com/la_cosa_nostra/profile/user/' + J[0]["pid"] + '">' + J[0]["name"] + '</a>';
    }

    function aA(){
        if(!aH(J[0]["pid"], "pid", K)){
            K.push(J[0])
        }
    }
    $("#ia_table").click(function(){
        $("#coffee_ia_sug").hide();
        $("#coffee_ia_table").show();
        return false
    });
    $("#ia_sugg").click(function(){
        $("#coffee_ia_sug").show();
        $("#coffee_ia_table").hide();
        return false
    });
    $("a[id^="coffee_ia_show_"]").click(function(){
        $("#coffee_ia_Weapons, #coffee_ia_Armor, #coffee_ia_Vehicles").hide();
        $("div[id=coffee_ia_" + $(this).attr("id").split("_")[3]).show();
        return false
    });
    $("a[id^="coffee_ia_sortby_"]").click(function(){
        ab["inventory_table"] = "";
        ab["analyze_dupecheck"] = "";
        ab["analyze"] = [];
        aF(ab["weapons"], $(this).attr("id").split("_")[3], "Weapons", M());
        aF(ab["soldier"], $(this).attr("id").split("_")[3], "Armor", M());
        aF(ab["vehicles"], $(this).attr("id").split("_")[3], "Vehicles", M());
        $("#coffee_ia_table").html(ab["inventory_table"]);
        $("#coffee_ia_Weapons").show();
        $("#coffee_ia_tog").show();
        return false
    });
    $("#coffee_ia_analyse").click(function(){
        v = true;
        $(this).hide();
        $("#coffee_ia_tog").hide();
        $("#coffee_ia_table").html("<center>Reading pages to gather info..</center>");
        ab["read_pages"] = 1;
        ab["pages_read"] = 1;
        ab["equip"] = ["soldier", "vehicle"];
        ab["weapons"] = [];
        ab["soldier"] = [];
        ab["vehicles"] = [];
        aR({
            page: "inventorymanager"
        }, function(_0xdcd5x28){
            $(_0xdcd5x28).find(".invmng-page-links:first > a").each(function(){
                if($(this).text() == "Next" || $(this).text() == "Previous"){
                    return true
                };
                ab["read_pages"]++
            });
            var _0xdcd5x29 = $(_0xdcd5x28).find("#menu_root").text().toLowerCase().replace("", "").trim();
            if(_0xdcd5x29 == "weapons"){
                aB(_0xdcd5x28, _0xdcd5x29)
            }
        });
        return false
    });

    function aB(_0xdcd5x28, _0xdcd5x29){
        $(_0xdcd5x28).find(".inv-mng-item-limited").each(function(){
            var _0xdcd5x2c = false;
            if($(this).find("a[id^="buying_item_"]")["length"] > 0){
                if(/Favor/ .test($(this).find("a[id^="buying_item_"]").text())){
                    _0xdcd5x2c = "favor"
                }
            };
            var _0xdcd5x36 = $(this).find("p[class="bold medium"]").text().trim();
            var _0xdcd5x2d = parseInt($(this).find("p[class="bold medium"]").next().text()) | 0;
            var _0xdcd5x30 = parseInt($(this).find("p[class="bold medium"]").next().next().text()) | 0;
            if(_0xdcd5x36 == ""){
                _0xdcd5x36 = $(this).find("p[class="bold medium raid-text-highlight"]").text().trim();
                _0xdcd5x2d = parseInt($(this).find("p[class="bold medium raid-text-highlight"]").next().text());
                _0xdcd5x30 = parseInt($(this).find("p[class="bold medium raid-text-highlight"]").next().next().text())
            };
            var _0xdcd5x37 = parseInt($(this).find("p[class="large bold"]").text().replace(/[^0-9]/g, "")) | 0;
            var _0xdcd5x38 = $(this).find("form input[name=inventory_id]").val();
            var _0xdcd5x39 = {
                name: _0xdcd5x36,
                attack: _0xdcd5x2d,
                defense: _0xdcd5x30,
                amount: _0xdcd5x37,
                type: _0xdcd5x29,
                id: _0xdcd5x38,
                buy: _0xdcd5x2c
            };
            if(_0xdcd5x29 == "weapons"){
                ab["weapons"].push(_0xdcd5x39)
            }else{
                if(_0xdcd5x29 == "armor"){
                    ab["soldier"].push(_0xdcd5x39)
                }else{
                    if(_0xdcd5x29 == "vehicle"){
                        ab["vehicles"].push(_0xdcd5x39)
                    }
                }
            }
        });
        $(_0xdcd5x28).find(".inv-mng-item").each(function(){
            var _0xdcd5x2c = false;
            if($(this).find("a[id^="buying_item_"]")["length"] > 0){
                if(/Loyalty/ .test($(this).find("a[id^="buying_item_"]").text())){
                    _0xdcd5x2c = "loyalty"
                }else{
                    _0xdcd5x2c = "Purchasable"
                }
            };
            var _0xdcd5x36 = $(this).find("p[class="bold medium"]").text().trim();
            var _0xdcd5x2d = parseInt($(this).find("p[class="bold medium"]").next().text()) | 0;
            var _0xdcd5x30 = parseInt($(this).find("p[class="bold medium"]").next().next().text()) | 0;
            if(_0xdcd5x36 == ""){
                _0xdcd5x36 = $(this).find("p[class="bold medium raid-text-highlight"]").text().trim();
                _0xdcd5x2d = parseInt($(this).find("p[class="bold medium raid-text-highlight"]").next().text());
                _0xdcd5x30 = parseInt($(this).find("p[class="bold medium raid-text-highlight"]").next().next().text())
            };
            if(_0xdcd5x36 == ""){
                _0xdcd5x36 = $(this).find("p[class="bold medium loot-chest-text-highlight"]").text().trim();
                _0xdcd5x2d = parseInt($(this).find("p[class="bold medium loot-chest-text-highlight"]").next().text());
                _0xdcd5x30 = parseInt($(this).find("p[class="bold medium loot-chest-text-highlight"]").next().next().text())
            };
            var _0xdcd5x37 = parseInt($(this).find("p[class="large bold"]").text().replace(/[^0-9]/g, "")) | 0;
            var _0xdcd5x38 = $(this).find("form input[name=inventory_id]").val();
            var _0xdcd5x39 = {
                name: _0xdcd5x36,
                attack: _0xdcd5x2d,
                defense: _0xdcd5x30,
                amount: _0xdcd5x37,
                type: _0xdcd5x29,
                id: _0xdcd5x38,
                buy: _0xdcd5x2c
            };
            if(_0xdcd5x29 == "weapons"){
                ab["weapons"].push(_0xdcd5x39)
            }else{
                if(_0xdcd5x29 == "armor"){
                    ab["soldier"].push(_0xdcd5x39)
                }else{
                    if(_0xdcd5x29 == "vehicle"){
                        ab["vehicles"].push(_0xdcd5x39)
                    }
                }
            }
        });
        ab["read_pages"]--;
        if(ab["read_pages"] > 1){
            aE(_0xdcd5x29)
        }else{
            if(!ab["equip"]["length"]){
                aR({
                    page: "inventory/special_items"
                }, function(_0xdcd5x2c){
                    aC(_0xdcd5x2c)
                })
            }else{
                aD()
            }
        }
    }

    function aC(_0xdcd5x28){
        $(_0xdcd5x28).find(".filter-container").children().each(function(){
            if(/weapon/ .test($(this).attr("class"))){
                var _0xdcd5x36 = $(this).find("p[class="bold white large"]").text().trim();
                var _0xdcd5x29 = parseInt($(this).find("p[class="bold white large"]").next().text().replace(/[^0-9]/g, ""));
                var _0xdcd5x2c = parseInt($(this).find("p[class="bold white large"]").next().next().text().replace(/[^0-9]/g, ""));
                var _0xdcd5x2d = parseInt($(this).find("span[class="bold large"]").text().replace(/[^0-9]/g, ""));
                var _0xdcd5x30 = $(this).find("form input[name=remove_id]").val();
                var _0xdcd5x37 = {
                    name: _0xdcd5x36,
                    attack: _0xdcd5x29,
                    defense: _0xdcd5x2c,
                    amount: _0xdcd5x2d,
                    type: "weapons",
                    id: _0xdcd5x30,
                    buy: false
                };
                var _0xdcd5x38 = false;
                for(var _0xdcd5x31 = 0; _0xdcd5x31 < ab["weapons"]["length"]; _0xdcd5x31++){
                    if(ab["weapons"][_0xdcd5x31]["id"] == _0xdcd5x30){
                        _0xdcd5x38 = true;
                        break
                    }
                };
                if(!_0xdcd5x38){
                    ab["weapons"].push(_0xdcd5x37)
                }
            }else{
                if(/armor/ .test($(this).attr("class"))){
                    var _0xdcd5x36 = $(this).find("p[class="bold white large"]").text().trim();
                    var _0xdcd5x29 = parseInt($(this).find("p[class="bold white large"]").next().text().replace(/[^0-9]/g, ""));
                    var _0xdcd5x2c = parseInt($(this).find("p[class="bold white large"]").next().next().text().replace(/[^0-9]/g, ""));
                    var _0xdcd5x2d = parseInt($(this).find("span[class="bold large"]").text().replace(/[^0-9]/g, ""));
                    var _0xdcd5x30 = $(this).find("form input[name=remove_id]").val();
                    var _0xdcd5x37 = {
                        name: _0xdcd5x36,
                        attack: _0xdcd5x29,
                        defense: _0xdcd5x2c,
                        amount: _0xdcd5x2d,
                        type: "armor",
                        id: _0xdcd5x30,
                        buy: false
                    };
                    var _0xdcd5x38 = false;
                    for(var _0xdcd5x31 = 0; _0xdcd5x31 < ab["soldier"]["length"]; _0xdcd5x31++){
                        if(ab["soldier"][_0xdcd5x31]["id"] == _0xdcd5x30){
                            _0xdcd5x38 = true;
                            break
                        }
                    };
                    if(!_0xdcd5x38){
                        ab["soldier"].push(_0xdcd5x37)
                    }
                }else{
                    if(/vehicle/ .test($(this).attr("class"))){
                        var _0xdcd5x36 = $(this).find("p[class="bold white large"]").text().trim();
                        var _0xdcd5x29 = parseInt($(this).find("p[class="bold white large"]").next().text().replace(/[^0-9]/g, ""));
                        var _0xdcd5x2c = parseInt($(this).find("p[class="bold white large"]").next().next().text().replace(/[^0-9]/g, ""));
                        var _0xdcd5x2d = parseInt($(this).find("span[class="bold large"]").text().replace(/[^0-9]/g, ""));
                        var _0xdcd5x30 = $(this).find("form input[name=remove_id]").val();
                        var _0xdcd5x37 = {
                            name: _0xdcd5x36,
                            attack: _0xdcd5x29,
                            defense: _0xdcd5x2c,
                            amount: _0xdcd5x2d,
                            type: "vehicle",
                            id: _0xdcd5x30,
                            buy: false
                        };
                        var _0xdcd5x38 = false;
                        for(var _0xdcd5x31 = 0; _0xdcd5x31 < ab["vehicles"]["length"]; _0xdcd5x31++){
                            if(ab["vehicles"][_0xdcd5x31]["id"] == _0xdcd5x30){
                                _0xdcd5x38 = true;
                                break
                            }
                        };
                        if(!_0xdcd5x38){
                            ab["vehicles"].push(_0xdcd5x37)
                        }
                    }
                }
            }
        });
        for(var _0xdcd5x31 = 0; _0xdcd5x31 < s["length"]; _0xdcd5x31++){
            for(var _0xdcd5x58 = 0; _0xdcd5x58 < ab["weapons"]["length"]; _0xdcd5x58++){
                if(s[_0xdcd5x31]["id"] == ab["weapons"][_0xdcd5x58]["id"]){
                    ab["weapons"][_0xdcd5x58]["buy"] = s[_0xdcd5x31]["desc"] + s[_0xdcd5x31]["location"]
                }
            }
        };
        for(var _0xdcd5x31 = 0; _0xdcd5x31 < s["length"]; _0xdcd5x31++){
            for(var _0xdcd5x58 = 0; _0xdcd5x58 < ab["soldier"]["length"]; _0xdcd5x58++){
                if(s[_0xdcd5x31]["id"] == ab["soldier"][_0xdcd5x58]["id"]){
                    ab["soldier"][_0xdcd5x58]["buy"] = s[_0xdcd5x31]["desc"] + s[_0xdcd5x31]["location"]
                }
            }
        };
        for(var _0xdcd5x31 = 0; _0xdcd5x31 < s["length"]; _0xdcd5x31++){
            for(var _0xdcd5x58 = 0; _0xdcd5x58 < ab["vehicles"]["length"]; _0xdcd5x58++){
                if(s[_0xdcd5x31]["id"] == ab["vehicles"][_0xdcd5x58]["id"]){
                    ab["vehicles"][_0xdcd5x58]["buy"] = s[_0xdcd5x31]["desc"] + s[_0xdcd5x31]["location"]
                }
            }
        };
        for(var _0xdcd5x31 = 0; _0xdcd5x31 < u["length"]; _0xdcd5x31++){
            if(u[_0xdcd5x31]["type"] == "Weapon"){
                for(var _0xdcd5x58 = 0; _0xdcd5x58 < ab["weapons"]["length"]; _0xdcd5x58++){
                    if(u[_0xdcd5x31]["name"] == ab["weapons"][_0xdcd5x58]["name"]){
                        ab["weapons"][_0xdcd5x58]["buy"] = u[_0xdcd5x31]["desc"] + u[_0xdcd5x31]["location"]
                    }
                }
            }else{
                if(u[_0xdcd5x31]["type"] == "Armor"){
                    for(var _0xdcd5x58 = 0; _0xdcd5x58 < ab["soldier"]["length"]; _0xdcd5x58++){
                        if(u[_0xdcd5x31]["name"] == ab["soldier"][_0xdcd5x58]["name"]){
                            ab["soldier"][_0xdcd5x58]["buy"] = u[_0xdcd5x31]["desc"] + u[_0xdcd5x31]["location"]
                        }
                    }
                }else{
                    if(u[_0xdcd5x31]["type"] == "Vehicle"){
                        for(var _0xdcd5x58 = 0; _0xdcd5x58 < ab["vehicles"]["length"]; _0xdcd5x58++){
                            if(u[_0xdcd5x31]["name"] == ab["vehicles"][_0xdcd5x58]["name"]){
                                ab["vehicles"][_0xdcd5x58]["buy"] = u[_0xdcd5x31]["desc"] + u[_0xdcd5x31]["location"]
                            }
                        }
                    }
                }
            }
        };
        $("#coffee_ia_sortby_attack").trigger("click");
        $("#coffee_ia_analyse").show();
        v = false
    }

    function aD(){
        var _0xdcd5x28 = ab["equip"].shift();
        var _0xdcd5x29 = "inventory_type=" + _0xdcd5x28 + "&inventory_sort_field=attack&inventory_sort_direction=DESC&inventory_own_filter&inventory_filter&highlight_item_id&page=1";
        aR({
            page: "inventorymanager/load_inventory",
            data: _0xdcd5x29
        }, function(_0xdcd5x2c){
            ab["read_pages"] = 1;
            ab["pages_read"] = 1;
            $(_0xdcd5x2c).find(".invmng-page-links:first > a").each(function(){
                if($(this).text() == "Next" || $(this).text() == "Previous"){
                    return true
                };
                ab["read_pages"]++
            });
            aB(_0xdcd5x2c, _0xdcd5x28)
        })
    }

    function aE(_0xdcd5x28){
        ab["pages_read"]++;
        var _0xdcd5x29 = "page=" + ab["pages_read"] + "&inventory_type=" + _0xdcd5x28 + "&inventory_sort_field=attack&inventory_sort_direction=DESC&inventory_own_filter&inventory_filter&highlight_item_id";
        aR({
            page: "inventorymanager/load_inventory",
            data: _0xdcd5x29
        }, function(_0xdcd5x2c){
            aB(_0xdcd5x2c, _0xdcd5x28)
        })
    }

    function aF(_0xdcd5x28, _0xdcd5x29, _0xdcd5x2c, _0xdcd5x2d){
        if(_0xdcd5x29 == "attack"){
            _0xdcd5x28.sort(function(_0xdcd5x3d, _0xdcd5x3e){
                return parseInt(_0xdcd5x3e["attack"]) - parseInt(_0xdcd5x3d["attack"])
            })
        };
        if(_0xdcd5x29 == "defense"){
            _0xdcd5x28.sort(function(_0xdcd5x3d, _0xdcd5x3e){
                return parseInt(_0xdcd5x3e["defense"]) - parseInt(_0xdcd5x3d["defense"])
            })
        };
        var _0xdcd5x30 = 0;
        var _0xdcd5x37 = 0;
        ab["inventory_table"] += "<div id="coffee_ia_" + _0xdcd5x2c + "" style="display:none;">";
        ab["inventory_table"] += "<table>";
        ab["inventory_table"] += "<tr><th><h2>Top " + _0xdcd5x2c + "</h2></th><th>Attack:</th><th>Defense:</th><th>Using:</th><th>Purchasable:</th></tr>";
        for(w in _0xdcd5x28){
            _0xdcd5x28[w]["equipped_offense"] = 0;
            _0xdcd5x28[w]["equipped_defense"] = 0
        };
        for(x in _0xdcd5x28){
            if(parseInt(_0xdcd5x28[x]["amount"]) == 0){
                continue
            };
            var _0xdcd5x38 =((_0xdcd5x30 + parseInt(_0xdcd5x28[x]["amount"])) > parseInt(_0xdcd5x2d) ? parseInt(_0xdcd5x2d) - parseInt(_0xdcd5x30) : parseInt(_0xdcd5x28[x]["amount"]));
            ab["inventory_table"] += "<tr>" + "<td>" + _0xdcd5x28[x]["name"] + "</td>" + "<td><center>" + _0xdcd5x28[x]["attack"] + "</center></td>" + "<td><center>" + _0xdcd5x28[x]["defense"] + "</center></td>";
            ab["inventory_table"] += "<td><center>" + _0xdcd5x38 + "/" + _0xdcd5x28[x]["amount"] + "</center></td>" + "<td><center>" +(_0xdcd5x28[x]["buy"] != false ? _0xdcd5x28[x]["buy"] : "") + "</center></td>" + "</tr>";
            _0xdcd5x37 += _0xdcd5x38;
            _0xdcd5x30 += _0xdcd5x38;
            _0xdcd5x28[x]["equipped_offense"] = _0xdcd5x38;
            _0xdcd5x28[x]["equipped_defense"] = _0xdcd5x38;
            if(_0xdcd5x30 >= _0xdcd5x2d){
                break
            }
        };
        _0xdcd5x30 = 0;
        for(y in _0xdcd5x28){
            var _0xdcd5x39 = [];
            _0xdcd5x39 = aG(_0xdcd5x28, _0xdcd5x28[y][_0xdcd5x29], _0xdcd5x29, _0xdcd5x28[y]["type"]);
            if(ab["analyze_dupecheck"].search(_0xdcd5x28[y]["name"]) < 0 && _0xdcd5x28[y]["buy"] != false && _0xdcd5x39[0] > 0){
                ab["analyze"][ab["analyze"]["length"]] = "<td>[" + _0xdcd5x28[y]["type"] + "]</td>" + "<td>" + _0xdcd5x39[0] + "x " + _0xdcd5x28[y]["name"] + " for a " + _0xdcd5x29 + " increase of around: " + aJ(_0xdcd5x39[1]) + "</td>";
                ab["analyze_dupecheck"] += _0xdcd5x28[y]["name"] + "|"
            };
            _0xdcd5x30 +=((_0xdcd5x30 + parseInt(_0xdcd5x28[y]["amount"])) > parseInt(_0xdcd5x2d) ? parseInt(_0xdcd5x2d) - parseInt(_0xdcd5x30) : _0xdcd5x28[y]["amount"]);
            if(_0xdcd5x30 >= _0xdcd5x2d){
                break
            }
        };
        if(ab["analyze"]["length"] > 0){
            _0xdcd5x30 = 0;
            var _0xdcd5x3a = "<table>";
            for(i = 0; i < ab["analyze"]["length"]; i++){
                _0xdcd5x3a += "<tr>";
                _0xdcd5x3a += ab["analyze"][i];
                _0xdcd5x3a += "</tr>";
                _0xdcd5x30++
            };
            _0xdcd5x3a += "</table>";
            $("#coffee_ia_sug").html(_0xdcd5x3a)
        };
        ab["inventory_table"] += "<tr><td>Equipped Total " + _0xdcd5x37 + "/" + _0xdcd5x2d + "</td></tr>";
        ab["inventory_table"] += "</table>";
        ab["inventory_table"] += "</div>"
    }

    function aG(_0xdcd5x28, _0xdcd5x29, _0xdcd5x2c, _0xdcd5x2d){
        var _0xdcd5x30 = 0;
        var _0xdcd5x37 = 0;
        var _0xdcd5x38 = 0;
        var _0xdcd5x39 = 0;
        for(var _0xdcd5x5d = 0; _0xdcd5x5d < _0xdcd5x28["length"]; _0xdcd5x5d++){
            if(_0xdcd5x28[_0xdcd5x5d]["type"] == _0xdcd5x2d &&((_0xdcd5x2c == "attack" && _0xdcd5x28[_0xdcd5x5d]["equipped_offense"] > 0 && _0xdcd5x28[_0xdcd5x5d]["attack"] < _0xdcd5x29) ||(_0xdcd5x2c == "defense" && _0xdcd5x28[_0xdcd5x5d]["equipped_defense"] > 0 && _0xdcd5x28[_0xdcd5x5d]["defense"] < _0xdcd5x29))){
                if(_0xdcd5x2c == "attack"){
                    _0xdcd5x30 = parseInt(_0xdcd5x28[_0xdcd5x5d]["equipped_offense"]);
                    _0xdcd5x37 = parseInt(_0xdcd5x28[_0xdcd5x5d]["attack"])
                };
                if(_0xdcd5x2c == "defense"){
                    _0xdcd5x30 = parseInt(_0xdcd5x28[_0xdcd5x5d]["equipped_defense"]);
                    _0xdcd5x37 = parseInt(_0xdcd5x28[_0xdcd5x5d]["defense"])
                };
                _0xdcd5x38 = _0xdcd5x38 + _0xdcd5x30;
                _0xdcd5x39 = _0xdcd5x39 +(_0xdcd5x30 *(_0xdcd5x29 - _0xdcd5x37))
            }
        };
        return [_0xdcd5x38, _0xdcd5x39]
    }

    function aH(_0xdcd5x28, _0xdcd5x29, _0xdcd5x2c){
        for(var _0xdcd5x33 in _0xdcd5x2c){
            if(_0xdcd5x28 == _0xdcd5x2c[_0xdcd5x33][_0xdcd5x29]){
                return _0xdcd5x2c[_0xdcd5x33]
            }
        };
        return false
    }

    function aI(_0xdcd5x28, _0xdcd5x29){
        var _0xdcd5x2c = _0xdcd5x28;
        if(isNaN(_0xdcd5x28)){
            _0xdcd5x2c = _0xdcd5x28.replace(/[^0-9]/g, "")
        };
        _0xdcd5x2c = parseInt(_0xdcd5x2c);
        var _0xdcd5x60 = "";
        if(_0xdcd5x2c >= 1000000000000000){
            _0xdcd5x2c = _0xdcd5x2c / 1000000000000000;
            _0xdcd5x60 = " qufiguredrillion"
        }else{
            if(_0xdcd5x2c >= 1000000000000){
                _0xdcd5x2c = _0xdcd5x2c / 1000000000000;
                _0xdcd5x60 = " trillion"
            }else{
                if(_0xdcd5x2c >= 1000000000){
                    _0xdcd5x2c = _0xdcd5x2c / 1000000000;
                    _0xdcd5x60 = " billion"
                }
            }
        };
        if(_0xdcd5x60 !== ""){
            if(_0xdcd5x29){
                return "($" + _0xdcd5x2c.toFixed(3) + _0xdcd5x60 + ")"
            };
            return "$" + _0xdcd5x2c.toFixed(3) + _0xdcd5x60
        };
        if(_0xdcd5x29){
            return "($" + aJ(_0xdcd5x2c) + ")"
        };
        return "$" + aJ(_0xdcd5x2c)
    }

    function aJ(_0xdcd5x28){
        return("" + _0xdcd5x28).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function aK(_0xdcd5x28, _0xdcd5x29){
        return _0xdcd5x28 + Math.floor(Math.round((Math.random() *(_0xdcd5x29 - _0xdcd5x28))))
    }

    function aL(_0xdcd5x28, _0xdcd5x29){
        var _0xdcd5x2c;
        return function(){
            clearTimeout(_0xdcd5x2c);
            _0xdcd5x2c = setTimeout(_0xdcd5x28, _0xdcd5x29)
        }
    }

    function aM(_0xdcd5x28){
        Z["health"] = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/ .exec(_0xdcd5x28);
        Z["energy"] = /energy_menu_value"\).text\('(\d+)\/(\d+)'\);/ .exec(_0xdcd5x28);
        Z["stamina"] = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/ .exec(_0xdcd5x28);
        Z["exp_have"] = /hdr_level_xp"\).text\('(-?)(\d+)'\);/ .exec(_0xdcd5x28)[2];
        if(/hdr_level_xp"\).text\('(-?)(\d+)'\);/ .exec(_0xdcd5x28)[1] == "-"){
            var _0xdcd5x29 = 0 - parseInt(Z["exp_have"]);
            Z["exp_have"] = _0xdcd5x29
        };
        Z["exp_needed"] = /hdr_level_total_xp"\).text\('(\d+)'\);/ .exec(_0xdcd5x28)[1]
    }

    function aN(){
        var _0xdcd5x28 = {
            health_min: parseInt(Z["health"][1]),
            health_max: parseInt(Z["health"][2]),
            energy_min: parseInt(Z["energy"][1]),
            energy_max: parseInt(Z["energy"][2]),
            stamina_min: parseInt(Z["stamina"][1]),
            stamina_max: parseInt(Z["stamina"][2]),
            exp_min: parseInt(Z["exp_have"]),
            exp_max: parseInt(Z["exp_needed"])
        };
        var _0xdcd5x29 = Math.floor((_0xdcd5x28["health_min"] / _0xdcd5x28["health_max"]) * 100);
        var _0xdcd5x2c =(100 - parseInt(_0xdcd5x29));
        var _0xdcd5x2d = Math.floor((_0xdcd5x28["energy_min"] / _0xdcd5x28["energy_max"]) * 100);
        var _0xdcd5x30 =(100 - parseInt(_0xdcd5x2d));
        var _0xdcd5x37 = Math.floor((_0xdcd5x28["stamina_min"] / _0xdcd5x28["stamina_max"]) * 100);
        var _0xdcd5x38 =(100 - parseInt(_0xdcd5x37));
        var _0xdcd5x39 = Math.floor((_0xdcd5x28["exp_min"] / _0xdcd5x28["exp_max"]) * 100);
        var _0xdcd5x3a =(100 - parseInt(_0xdcd5x39));
        var _0xdcd5x3b = "<div style="display: inline-block;height: 23px;vertical-align: top;"><span class="health-icon bold attribute-title">" + aJ(_0xdcd5x28["health_min"]) + "/" + aJ(_0xdcd5x28["health_max"]) + " </span><br><span style="display:block;width:" + _0xdcd5x29 + "%;height:2px;background-color:rgb(255,60,51);float:left;"></span><span style="display:block;width:" + _0xdcd5x2c + "%;height:2px;background-color:rgba(255,60,51,0.35);float:right;"></span></div>" + "<span> </span>" + "<div style="display: inline-block;height: 23px;vertical-align: top;"><span class="energy-icon bold attribute-title">" + aJ(_0xdcd5x28["energy_min"]) + "/" + aJ(_0xdcd5x28["energy_max"]) + " </span><br><span style="display:block;width:" + _0xdcd5x2d + "%;height:2px;background-color:rgb(255,60,51);float:left;"></span><span style="display:block;width:" + _0xdcd5x30 + "%;height:2px;background-color:rgba(255,60,51,0.35);float:right;"></span></div>" + "<span> </span>" + "<div style="display: inline-block;height: 23px;vertical-align: top;"><span class="stamina-icon bold attribute-title">" + aJ(_0xdcd5x28["stamina_min"]) + "/" + aJ(_0xdcd5x28["stamina_max"]) + " </span><br><span style="display:block;width:" + _0xdcd5x37 + "%;height:2px;background-color:rgb(255,165,0);float:left;"></span><span style="display:block;width:" + _0xdcd5x38 + "%;height:2px;background-color:rgba(255,165,0,0.35);float:right;"></span></div>" + "<span> </span>" + "<div style="display: inline-block;height: 23px;vertical-align: top;"><span class="exp-icon bold attribute-title">" + aJ(_0xdcd5x28["exp_min"]) + "/" + aJ(_0xdcd5x28["exp_max"]) + " </span><br><span style="display:block;width:" + _0xdcd5x39 + "%;height:2px;background-color:rgb(57,137,186);float:left;"></span><span style="display:block;width:" + _0xdcd5x3a + "%;height:2px;background-color:rgba(57,137,186,0.35);float:right;"></span></div>";
        $("#coffee_stats").html(_0xdcd5x3b).show();
        var _0xdcd5x3c = "";
        if(parseInt(aa["fightlist"]["wins"]) > 0){
            _0xdcd5x3c += "Fight Wins: " + aJ(aa["fightlist"]["wins"])
        };
        if(parseInt(aa["fightlist"]["losses"]) > 0){
            _0xdcd5x3c += " | Fights Lost: " + aJ(aa["fightlist"]["losses"])
        };
        if(parseInt(aa["fightlist"]["kills"]) > 0){
            _0xdcd5x3c += " | Fight Kills: " + aJ(aa["fightlist"]["kills"])
        };
        if(parseInt(aa["fightlist"]["dead"]) > 0){
            _0xdcd5x3c += " | Dead Capo: " + aJ(aa["fightlist"]["dead"])
        };
        if(parseInt(aa["hitlist"]["wins"]) > 0){
            _0xdcd5x3c += " | Hitlist Wins: " + aJ(aa["hitlist"]["wins"])
        };
        if(parseInt(aa["hitlist"]["losses"]) > 0){
            _0xdcd5x3c += " | Hitlist Losses: " + aJ(aa["hitlist"]["losses"])
        };
        if(parseInt(aa["hitlist"]["kills"]) > 0){
            _0xdcd5x3c += " | Hitlist Kills: " + aJ(aa["hitlist"]["kills"])
        };
        if(parseInt(aa["shared"]["heals"]) > 0){
            _0xdcd5x3c += " | Heals: " + aJ(aa["shared"]["heals"])
        };
        if(parseInt(aa["shared"]["spent_stamina"]) > 0){
            _0xdcd5x3c += " | Stamina Spent: " + aJ(aa["shared"]["spent_stamina"])
        };
        if(parseInt(aa["shared"]["totalxp"]) > 0){
            _0xdcd5x3c += " | Total Exp: " + aJ(aa["shared"]["totalxp"])
        };
        if(parseInt(aa["shared"]["totalcash"]) > 0){
            _0xdcd5x3c += " | Total Cash: $" + aJ(aa["shared"]["totalcash"]) +(parseInt(aa["shared"]["totalcash"]) >= 1000000000 ? " " + aI(aa["shared"]["totalcash"], true) : "")
        };
        if(parseInt(aa["hitlist"]["hl_refreshes"]) > 0){
            _0xdcd5x3c += " | Hitlist Refresh #: " + aJ(aa["hitlist"]["hl_refreshes"])
        };
        if(parseInt(aa["hitlist"]["mathQ"]) > 0){
            _0xdcd5x3c += " | Math Questions: " + aJ(aa["hitlist"]["mathQ"])
        };
        if(parseInt(aa["syn"]["wps"]) > 0){
            _0xdcd5x3c += " | Syn WPs: " + aJ(aa["syn"]["wps"]);
            _0xdcd5x3c += " | Syn Tokens: " + aJ(aa["syn"]["tokens"])
        };
        if(_0xdcd5x3c.charAt(1) == "|"){
            _0xdcd5x3c = _0xdcd5x3c.substring(3)
        };
        if(_0xdcd5x3c != ""){
            $("#stats").parent().show()
        };
        return _0xdcd5x3c
    }

    function aO(){
        if(!$("#coffee_timestamp").is(":checked")){
            return ""
        };
        var _0xdcd5x28 = new Date();
        var _0xdcd5x29 = _0xdcd5x28.getHours();
        var _0xdcd5x2c = _0xdcd5x28.getMinutes();
        var _0xdcd5x2d = _0xdcd5x28.getSeconds();
        if(_0xdcd5x2c < 10){
            _0xdcd5x2c = "0" + _0xdcd5x2c
        };
        if(_0xdcd5x2d < 10){
            _0xdcd5x2d = "0" + _0xdcd5x2d
        };
        var _0xdcd5x30 = _0xdcd5x29 + ":" + _0xdcd5x2c + ":" + _0xdcd5x2d + " ";
        return "<span class="tinted">" + _0xdcd5x30 + "</span>"
    }

    function aP(_0xdcd5x28, _0xdcd5x68){
        if(_0xdcd5x68 == true){
            $("#status").html(_0xdcd5x28)
        }else{
            if(_0xdcd5x68 == "kill"){
                Q.unshift(_0xdcd5x28);
                var _0xdcd5x29 = Q["length"];
                var _0xdcd5x2c = parseInt($("#Klog_size").val());
                Q["length"] =(_0xdcd5x29 < _0xdcd5x2c) ? _0xdcd5x29 : _0xdcd5x2c;
                document.getElementById("kills_log")["innerHTML"] = "";
                var _0xdcd5x2d = "";
                for(var _0xdcd5x31 = 0; _0xdcd5x31 < Q["length"]; _0xdcd5x31++){
                    _0xdcd5x2d += Q[_0xdcd5x31] + "<br>"
                };
                if(parseInt(aa["fightlist"]["kills"]) > 0 | parseInt(aa["hitlist"]["kills"]) > 0){
                    var _0xdcd5x30 =(parseInt(aa["fightlist"]["kills"]) + parseInt(aa["hitlist"]["kills"]));
                    $("#kill_count").html("(" + _0xdcd5x30 + ")")
                };
                $("#kills_log").html(_0xdcd5x2d)
            }else{
                P.unshift(_0xdcd5x28);
                var _0xdcd5x29 = P["length"];
                var _0xdcd5x2c = parseInt($("#log_size:first").val());
                P["length"] =(_0xdcd5x29 < _0xdcd5x2c) ? _0xdcd5x29 : _0xdcd5x2c;
                document.getElementById("log")["innerHTML"] = "";
                var _0xdcd5x2d = "";
                for(var _0xdcd5x31 = 0; _0xdcd5x31 < P["length"]; _0xdcd5x31++){
                    _0xdcd5x2d += P[_0xdcd5x31] + "<br>"
                };
                $("#log").html(_0xdcd5x2d)
            }
        };
        $("#stats").html(aN())
    }

    function aQ(_0xdcd5x28, _0xdcd5x29, _0xdcd5x2c){
        var _0xdcd5x2d =(_0xdcd5x28 > 0) ? _0xdcd5x2d = 1000 : _0xdcd5x2d = 100;
        if(typeof _0xdcd5x29 == "function"){
            _0xdcd5x2c = _0xdcd5x29;
            _0xdcd5x29 = null
        };
        if(_0xdcd5x29){
            _0xdcd5x29 = _0xdcd5x29
        }else{
            _0xdcd5x29 = "Pausing"
        };
        var _0xdcd5x30 =(parseInt(_0xdcd5x28 / 60) == 1) ? 0 : parseInt(_0xdcd5x28 / 60);
        if(_0xdcd5x30 > 0){
            aP(_0xdcd5x29 + " <span id="minutes">" + _0xdcd5x30 + " minutes</span> <span id="seconds">" +(_0xdcd5x28 % 60) + " second" +(_0xdcd5x28 == 1 ? "" : "s") + "</span>...", true)
        }else{
            aP(_0xdcd5x29 + " <span id="minutes"></span><span id="seconds">" +(_0xdcd5x28 % 60) + " second" +(_0xdcd5x28 == 1 ? "" : "s") + "</span>...", true)
        };
        F = setInterval(function(){
            if(_0xdcd5x28 % 60 == 0){
                _0xdcd5x30--
            };
            _0xdcd5x28--;
            if(document.getElementById("minutes")){
                document.getElementById("minutes")["innerHTML"] =(_0xdcd5x30 > 0) ? _0xdcd5x30 + " minute" +(_0xdcd5x30 == 1 ? "" : "s") : ""
            };
            if(document.getElementById("seconds")){
                document.getElementById("seconds")["innerHTML"] =(_0xdcd5x28 % 60) + " second" +(_0xdcd5x28 == 1 ? "" : "s")
            }else{
                clearInterval(F)
            };
            if(_0xdcd5x28 <= 0){
                clearInterval(F);
                if(typeof _0xdcd5x2c == "function"){
                    _0xdcd5x2c()
                }
            }
        }, _0xdcd5x2d)
    }

    function aR(_0xdcd5x28, _0xdcd5x29){
        if(v){
            var _0xdcd5x2c = $.extend({
                "page": "",
                "data": "",
                "a_c_x": "",
                "a_c_y": "",
                "user_id": "",
                "stamina_boost": "",
                "data_type": "html",
                "type": "POST"
            }, _0xdcd5x28);
            if(linkCode_global !== undefined){
                if(_0xdcd5x2c["data"]["length"] > 0){
                    _0xdcd5x2c["data"] = _0xdcd5x2c["data"] + "&"
                };
                _0xdcd5x2c["data"] = _0xdcd5x2c["data"] + "lc=" + linkCode_global
            };
            var _0xdcd5x6b = {
                document_height: $(document).height(),
                window_height: $(window).height(),
                document_body_height: $(document["body"]).height()
            };
            var _0xdcd5x31 = new TimeTracker();
            _0xdcd5x2c["success_callback"] = function(_0xdcd5x2d){
                _0xdcd5x31._recordEndTime();
                resize_canvas(_0xdcd5x6b);
                _0xdcd5x2d = _0xdcd5x2d.replace(/<img/ig, "<noimg");
                try {
                    pageLoadTime_global = /pageLoadTime_global = "(\d+.[0-9]+)";/ .exec(_0xdcd5x2d)[1];
                    travelController_global = /travelController_global = '(\w+)';/ .exec(_0xdcd5x2d)[1];
                    travelUpdateId_global = /travelUpdateId_global = '(?=\S*['-])([a-zA-Z'-]+)';/ .exec(_0xdcd5x2d)[1];
                    healCode_global = /healCode_global='([\w\d]+)';/ .exec(_0xdcd5x2d)[1];
                    linkCode_global = /linkCode_global='([\w\d]+)';/ .exec(_0xdcd5x2d)[1];
                    var _0xdcd5x30 = /updateChatHandshake\('([\w\d\=]+)'\)/ .exec(_0xdcd5x2d)[1];
                    updateChatHandshake(_0xdcd5x30)
                } catch(bc){
                    aP(aO() + aO() + "Error updating page variables");
                    aP(aO() + aO() + "Error: " + bc["lineNumber"])
                };
                _0xdcd5x29(_0xdcd5x2d)
            };
            _0xdcd5x2c["failure_callback"] = function(){
                _0xdcd5x31._recordEndTime();
                aP(aO() + aO() + "something failed!")
            };
            _0xdcd5x31._recordStartTime();
            setTimeout(function(){
                R = parseInt((new Date()).getTime());
                aS(_0xdcd5x2c)
            }, S)
        }
    }

    function aS(_0xdcd5x28){
        if(v){
            $.ajax({
                url: APP_CONFIG["http_base_url"] + "facebook/mob_wars/" + _0xdcd5x28["page"],
                type: _0xdcd5x28["type"],
                data: getAjaxData(_0xdcd5x28["data"]),
                dataType: _0xdcd5x28["data_type"],
                success: function(_0xdcd5x29){
                    var _0xdcd5x2c = parseInt((new Date()).getTime()) - R;
                    if(_0xdcd5x2c < 200){
                        S = 200 - _0xdcd5x2c
                    }else{
                        S = 0
                    };
                    _0xdcd5x28.success_callback(_0xdcd5x29)
                },
                error: function(){
                    _0xdcd5x28.failure_callback()
                }
            })
        }
    }

    function aT(_0xdcd5x28, _0xdcd5x29){
        var _0xdcd5x2c = new Object();
        var _0xdcd5x2d = $(":input[name="" + _0xdcd5x29 + ""]");
        for(var _0xdcd5x31 = 0; _0xdcd5x31 < _0xdcd5x2d["length"]; _0xdcd5x31++){
            switch(_0xdcd5x2d[_0xdcd5x31]["type"]){
                case "select-one":
                    _0xdcd5x2c[_0xdcd5x2d[_0xdcd5x31]["id"]] = _0xdcd5x2d[_0xdcd5x31]["selectedIndex"];
                    break;
                case "text":
                    _0xdcd5x2c[_0xdcd5x2d[_0xdcd5x31]["id"]] = _0xdcd5x2d[_0xdcd5x31]["value"];
                    break;
                case "number":
                    _0xdcd5x2c[_0xdcd5x2d[_0xdcd5x31]["id"]] = _0xdcd5x2d[_0xdcd5x31]["value"];
                    break;
                case "checkbox":
                    _0xdcd5x2c[_0xdcd5x2d[_0xdcd5x31]["id"]] = _0xdcd5x2d[_0xdcd5x31]["checked"];
                    break;
                case "textarea":
                    _0xdcd5x2c[_0xdcd5x2d[_0xdcd5x31]["id"]] = escape(_0xdcd5x2d[_0xdcd5x31]["value"])
            }
        };
        _0xdcd5x2c["experimental_attack_slider"] = $("#experimental_attack_slider").slider("option", "value");
        f.setItem(_0xdcd5x28, JSON.stringify(_0xdcd5x2c))
    }

    function aU(_0xdcd5x28, _0xdcd5x29){
        if(!f.getItem(_0xdcd5x28)){
            aT(_0xdcd5x28, _0xdcd5x29)
        }else{
            var _0xdcd5x2c = JSON.parse(f.getItem(_0xdcd5x28));
            for(name in _0xdcd5x2c){
                try {
                    var _0xdcd5x2d = $(":input[id="" + name + ""]")[0];
                    if(_0xdcd5x2d){
                        switch(_0xdcd5x2d["type"]){
                            case "select-one":
                                _0xdcd5x2d["selectedIndex"] = _0xdcd5x2c[name];
                                break;
                            case "text":
                                _0xdcd5x2d["value"] = _0xdcd5x2c[name];
                                break;
                            case "number":
                                _0xdcd5x2d["value"] = _0xdcd5x2c[name];
                                break;
                            case "checkbox":
                                _0xdcd5x2d["checked"] = _0xdcd5x2c[name];
                                break;
                            case "textarea":
                                _0xdcd5x2d["value"] = unescape(_0xdcd5x2c[name])
                        }
                    }else{
                        $("#" + name).slider("value", _0xdcd5x2c[name]);
                        $("#" + name + "_amount_text").text(_0xdcd5x2c[name])
                    }
                } catch(e){}
            }
        }
    }

}())