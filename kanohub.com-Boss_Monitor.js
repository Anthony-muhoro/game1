	// https://dl.dropboxusercontent.com/s/s1kij0qp5t8zwvg/Boss_Monitor.js

	/*
	 * Boss Monitor - by GuessX
	 */
/*
//Boss Monitor
-Radio Button to switch between general settings & individual settings.
-Beep on/off
-silent assasin not being detected (maybe because of desert assasin??)
*/
javascript:(function(){	 
	var lastmsgID;
	var cityLevel = 100;
	var cityStamina = 100;
	var isRunning = true;
	var firstload = true;
	var boss_option = 1;
	var boss_levels = {
		boss_1: 0,
		boss_2: 0,
		boss_3: 0,
		boss_4: 0,
		boss_5: 0,
		boss_6: 0,
		boss_7: 0,
		boss_8: 0,
		boss_9: 0,
		boss_10: 0,
		boss_11: 0,
		boss_12: 0,
		boss_13: 0,
		boss_14: 0,
		boss_15: 0,
		boss_16: 0,
		boss_17: 0,
		boss_18: 0,
		boss_19: 0,
		boss_20: 0,
		boss_21: 0,
		boss_22: 0,
		boss_23: 0,
		boss_24: 0,
		boss_25: 0,
		boss_26: 0,
		boss_27: 0,
		boss_28: 0,
		boss_29: 0,
		boss_30: 0,
		boss_31: 0,
		boss_32: 0,
		boss_33: 0,
		boss_34: 0,
		boss_35: 0,
		boss_36: 0,
		boss_37: 0,
		boss_38: 0,
		boss_39: 0,
		boss_40: 0
	};	
	
	
	var storage;
	try{
		if(localStorage.getItem){
			storage = localStorage;
		}else if(window.localStorage.getItem){
			storage = window.localStorage;
		}
	}catch(storagefail){}

	if($('#boss_mon_close').length == 0){
		$('<div style="z-index:9999999999999;position:absolute;background:green;width:100%">'+
			'<div style="float:left;width:65%;text-align:right;" href="#" id="boss_mon_opts">Chat Monitor</div>'+
			'<div style="float:right;width:35%;text-align:right;" href="#" id="boss_mon_close">X</div>'+
		'</div>').insertBefore('#chat-msgs-box');
		$('.facebook-width:first').append('<div id="boss_mon_config" class="modal-window" style="top: 46.5px; left: 140px; width:800px; display: none;">'+
		'		<div class="modal_close_outer">'+
		'			<div class="modal_close_inner" onclick="closeModal(\'boss_mon_config\'); return false;">'+
		'				<div class="inlineblock">'+
		'					<a href="#" onclick="closeModal(\'boss_mon_config\'); return false;" class="bold text-highlight close-btn">Close</a>'+
		'				</div>'+
		'				<div class="inlineblock modal_close_x">&nbsp;</div>'+
		'			</div>'+
		'		</div>'+
		'		<div id="user_config_modal_callback">'+
		'		Options!'+
		'		<div>'+
		'		<label><input name="boss_mon_opt" value="1" type="radio"> General </label><label><input name="boss_mon_opt" value="2" type="radio"> Advanced</label>'+
		'		</div>'+
		'			<div id="boss_opt_1" style="margin-top:30px;">Only Alert for Bosses from these Cities:<br>'+
		'				<table>'+
		'					<tr>'+
		'						<td valign="top">'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Moretti"> New York</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="DeLuca"> Chicago</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Abbott"> London</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Black"> Las Vegas</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Ivanov"> Moscow</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Nazim"> Dubai</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Pan"> Shanghai</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Kosugi"> Tokyo</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="vez"> Tijuana</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Ramirez"> Medellin</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Maponga"> Johannesburg</label></nobr><br />'+
		'						</td>'+
		'						<td valign="top">'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Wongsawat"> Bangkok</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Silva"> Rio De Janeiro</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Reapers"> San Francisco</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Illuminati"> Palermo</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Hitmen"> Miami (Hitmen)</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Buena"> Miami (Buena Vista Bros)</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="ASIS"> Sydney</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Pirates"> Havana</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Assassin"> Paris</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Connell"> Dublin</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Soldier"> Prague</label></nobr><br />'+
		'						</td>'+
		'						<td valign="top">'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Driver"> Berlin</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Matador"> Madrid</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Gondolier"> Venice</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Nomads"> Tangier</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Mime"> Return to Paris</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Desert Assassin"> Istanbul</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Cyber"> Seoul</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Antarctic"> Antarctica</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Lunar"> Moon Base</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Horticulturists"> Victoria</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Warden"> Exham Penitentiary</label></nobr><br />'+
		'						</td>'+
		'						<td valign="top">'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Producer"> Los Angeles</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Accuser"> Port Haven</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="International"> Kuala Lumpur</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Bayek"> Cairo</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Sicario"> Mexico City</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="MC"> Auckland</label></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_boss_city" valueX="Bodyguard"> Washington</label></nobr><br />'+
		'						</td>'+
		'					</tr>'+
		'				</table><br>'+
		'				and if boss is under level <input type="text" id="chat_boss_level" name="chat_boss_" value="'+cityLevel+'"><br>'+
		'			</div>'+
		'			<div id="boss_opt_2" style="margin-top:30px;display:none;">'+
		'				NOT WORKING YET!!! advanced options will be going here, still writing it sorry, check back later!'+
		//'				advanced options will be going here, still writing it sorry, check back later!'+
		'				<table>'+
		'					<tr>'+
		'						<td valign="top">'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Moretti"> New York</label> <input type="text" name="boss_mon_advanced_1" value="'+boss_levels.boss_1+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="DeLuca"> Chicago</label> <input type="text" name="boss_mon_advanced_2" value="'+boss_levels.boss_2+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Abbott"> London</label> <input type="text" name="boss_mon_advanced_3" value="'+boss_levels.boss_3+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Black"> Las Vegas</label> <input type="text" name="boss_mon_advanced_4" value="'+boss_levels.boss_4+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Ivanov"> Moscow</label> <input type="text" name="boss_mon_advanced_5" value="'+boss_levels.boss_5+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Nazim"> Dubai</label> <input type="text" name="boss_mon_advanced_6" value="'+boss_levels.boss_6+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Pan"> Shanghai</label> <input type="text" name="boss_mon_advanced_7" value="'+boss_levels.boss_7+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Kosugi"> Tokyo</label> <input type="text" name="boss_mon_advanced_8" value="'+boss_levels.boss_8+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="vez"> Tijuana</label> <input type="text" name="boss_mon_advanced_9" value="'+boss_levels.boss_9+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Ramirez"> Medellin</label> <input type="text" name="boss_mon_advanced_10" value="'+boss_levels.boss_10+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Maponga"> Johannesburg</label> <input type="text" name="boss_mon_advanced_11" value="'+boss_levels.boss_11+'" style="width:35px;"></nobr><br />'+
		'						</td>'+
		'						<td valign="top">'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Wongsawat"> Bangkok</label> <input type="text" name="boss_mon_advanced_12" value="'+boss_levels.boss_12+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Silva"> Rio De Janeiro</label> <input type="text" name="boss_mon_advanced_13" value="'+boss_levels.boss_13+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Reapers"> San Francisco</label> <input type="text" name="boss_mon_advanced_14" value="'+boss_levels.boss_14+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Illuminati"> Palermo</label> <input type="text" name="boss_mon_advanced_15" value="'+boss_levels.boss_15+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Hitmen"> Miami (Hitmen)</label> <input type="text" name="boss_mon_advanced_16" value="'+boss_levels.boss_16+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Buena"> Miami (Buena Vista Bros)</label> <input type="text" name="boss_mon_advanced_17" value="'+boss_levels.boss_17+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="ASIS"> Sydney</label> <input type="text" name="boss_mon_advanced_18" value="'+boss_levels.boss_18+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Pirates"> Havana</label> <input type="text" name="boss_mon_advanced_19" value="'+boss_levels.boss_19+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Assassin"> Paris</label> <input type="text" name="boss_mon_advanced_20" value="'+boss_levels.boss_20+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Connell"> Dublin</label> <input type="text" name="boss_mon_advanced_21" value="'+boss_levels.boss_21+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Soldier"> Prague</label> <input type="text" name="boss_mon_advanced_22" value="'+boss_levels.boss_22+'" style="width:35px;"></nobr><br />'+
		'						</td>'+
		'						<td valign="top">'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Driver"> Berlin</label> <input type="text" name="boss_mon_advanced_23" value="'+boss_levels.boss_23+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Matador"> Madrid</label> <input type="text" name="boss_mon_advanced_24" value="'+boss_levels.boss_24+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Gondolier"> Venice</label> <input type="text" name="boss_mon_advanced_25" value="'+boss_levels.boss_25+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Nomads"> Tangier</label> <input type="text" name="boss_mon_advanced_26" value="'+boss_levels.boss_26+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Mime"> Return to Paris</label> <input type="text" name="boss_mon_advanced_27" value="'+boss_levels.boss_27+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Desert Assassin"> Istanbul</label> <input type="text" name="boss_mon_advanced_28" value="'+boss_levels.boss_28+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Cyber"> Seoul</label> <input type="text" name="boss_mon_advanced_29" value="'+boss_levels.boss_29+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Antarctic"> Antarctica</label> <input type="text" name="boss_mon_advanced_30" value="'+boss_levels.boss_30+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Lunar"> Moon Base</label> <input type="text" name="boss_mon_advanced_31" value="'+boss_levels.boss_31+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Horticulturists"> Victoria</label> <input type="text" name="boss_mon_advanced_32" value="'+boss_levels.boss_32+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Warden"> Exham Penitentiary</label> <input type="text" name="boss_mon_advanced_33" value="'+boss_levels.boss_33+'" style="width:35px;"></nobr><br />'+
		'						</td>'+
		'						<td valign="top">'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Producer"> Los Angeles</label> <input type="text" name="boss_mon_advanced_34" value="'+boss_levels.boss_34+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Accuser"> Port Haven</label> <input type="text" name="boss_mon_advanced_35" value="'+boss_levels.boss_35+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="International"> Kuala Lumpur</label> <input type="text" name="boss_mon_advanced_36" value="'+boss_levels.boss_36+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Bayek"> Cairo</label> <input type="text" name="boss_mon_advanced_37" value="'+boss_levels.boss_37+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Sicario"> Mexico City</label> <input type="text" name="boss_mon_advanced_38" value="'+boss_levels.boss_38+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="MC"> Auckland</label> <input type="text" name="boss_mon_advanced_39" value="'+boss_levels.boss_39+'" style="width:35px;"></nobr><br />'+
		'							<nobr> &nbsp; <label><input type="checkbox" name="chat_mon_advanced" valueX="Bodyguard"> Washington</label> <input type="text" name="boss_mon_advanced_40" value="'+boss_levels.boss_40+'" style="width:35px;"></nobr><br />'+
		'						</td>'+
		'					</tr>'+
		'				</table><br>'+
		'			</div>'+
		'			<div>'+
		'				Stop if stamina is below <input type="text" id="chat_boss_stamina" name="chat_boss_" value="'+cityStamina+'"><br>'+
		'				<label><input type="checkbox" name="chat_mon_beep"> Turn Beep On/Off</label>'+
		'			</div>'+
		'			<div style="padding:10px;" id="user_config_container">'+
		'				<div style="text-align: center;margin-top:5px;">'+
		'					<a href="#" onclick="closeModal(\'boss_mon_config\'); return false;" class="bold text-highlight close-btn">Close</a>'+
		'				</div>'+
		'			</div>'+
		'		</div>'+
		'	</div>');
		$('#chat_boss_level').val(JSON.parse(storage.getItem('boss_level')));
		$('#chat_boss_stamina').val(JSON.parse(storage.getItem('boss_stamina')));
		cityLevel = parseInt($('#chat_boss_level').val());
		cityStamina = parseInt($('#chat_boss_stamina').val());		
	}
	
	$('#boss_mon_close').click(function(){
		isRunning = false;
		if($('#boss_mon_config').length){
			$('#boss_mon_config').remove();
		}
		$(this).parent().remove();
		return false;
	})
	
	$('input[name="chat_mon_beep"]').change(function() {
		value = $(this).is(':checked');
		storage.setItem("boss_beep", value);
	});
	
	$('input[name="chat_boss_city"]').each(function() {
		var name = $(this).attr('valueX');
		if (storage.getItem(name) == "true") {
			$(this).prop('checked', true);
		}
	});

	$('input[name="chat_boss_city"]').change(function() {
		var name = $(this).attr('valueX');
		var value = $(this).is(':checked');
		storage.setItem(name, value);
	});
	
	$('input[name="chat_boss_"]').bind('change keyup click', function(){
		cityLevel = parseInt($('#chat_boss_level').val());
		cityStamina = parseInt($('#chat_boss_stamina').val());
		storage.setItem('boss_level', JSON.stringify(cityLevel));
		storage.setItem('boss_stamina', JSON.stringify(cityStamina));
	});
		
	$('#boss_mon_opts').click(function(){
		$('#boss_mon_config').toggle();
		return false;
	})
	
	$('input[name=boss_mon_opt]').change(function(){
		if($('input[name=boss_mon_opt]:checked').val() == 1){
			boss_option = 1;
			$('#boss_opt_1').show();
			$('#boss_opt_2').hide();		
		}else{
			boss_option = 2;
			$('#boss_opt_1').hide();
			$('#boss_opt_2').show();			
		}
		save_boss_option();
		return false;
	})
	
	if (storage.getItem('boss_opts')) {
		boss_option = storage.getItem('boss_opts');
		console.log('opt set to: '+boss_option);
		$("input[name=boss_mon_opt][value='"+boss_option+"']").prop("checked",true);
		$('input[name=boss_mon_opt]').trigger('change');
	}
	if(storage.getItem('boss_beep')){
		if (storage.getItem('boss_beep') == "true") {
			$('input[name="chat_mon_beep"]').prop('checked', true);
		}		
	}
	
	$('input[name="chat_mon_advanced"]').each(function() {
		var name = $(this).attr('valueX')+'_advanced';
		if (storage.getItem(name) == "true") {
			$(this).prop('checked', true);
		}
	});

	$('input[name="chat_mon_advanced"]').change(function() {
		var name = $(this).attr('valueX')+'_advanced';
		var value = $(this).is(':checked');
		storage.setItem(name, value);
	});
	
	$('input[name^="boss_mon_advanced_"]').bind('change keyup click', function(){
		var $id = this.name.split('_')[3];		
		boss_levels['boss_'+$id] = $(this).val();
		storage.setItem(this.name, $(this).val());
	});
	
	$('input[name^="boss_mon_advanced_"]').each(function() {
		var $id = this.name.split('_')[3];
		if (storage.getItem('boss_mon_advanced_'+$id)){
			$('input[name^="boss_mon_advanced_'+$id+'"]').val(JSON.parse(storage.getItem('boss_mon_advanced_'+$id)));
			boss_levels['boss_'+$id] = JSON.parse(storage.getItem('boss_mon_advanced_'+$id));		
		}
	});	
	
	function save_boss_option(){
		var name = 'boss_opts';
		storage.setItem(name, boss_option);
	}
	
	var x = new MutationObserver(function(e){
		if(isRunning){
			if(e[0].addedNodes){
				observe_chat();
			}
		}
	});

	x.observe(document.getElementById('chat-msgs-box'),{
		childList:true
	});
	
	function observe_chat(){
		var user_stam = /(\d+)\/(\d+)/.exec($('#stamina_menu_value').text());
		if(parseInt(user_stam[1]) <= cityStamina){
			$('#boss_mon_opts').parent().css('background-color', 'red');
			return;
		}
		$('#boss_mon_opts').parent().css('background-color', 'green');
		var currentID = $('#chat-msgs-box > .chatclient-msg:last').children().eq(1).attr('id');
		if(lastmsgID != currentID){
			lastmsgID = currentID;
			var msgText = $('#chat-msgs-box > .chatclient-msg:last').find('.chat-msg-txt').text().replace('BOSS', '');
			if(/RAID/.test(msgText) || /HELP/.test(msgText) || /RECRUIT/.test(msgText)){
				return;
			}
			var chkArray = [];
			$(':input[name="chat_boss_city"]:checked').each(function() {
				chkArray.push($(this).attr('valueX'));
			});
			var found = false;
			var which_boss;
			for(var i = 0; i<chkArray.length; i++){
				if (msgText.indexOf(chkArray[i]) != -1) {
					which_boss = chkArray[i];
					found = true;
					break;
				}
			}
			if(found){
				console.log('Boss Found is: '+which_boss);
				var m=/Level (\d+)/.exec(msgText)[1];
				if(parseInt(m) <= cityLevel){
					$('#'+currentID).parent().css('background-color', 'green');
					if($(':input[name="chat_mon_beep"]').is(':checked')){
						beep();
					}
				}
			}
		}	
	}

	function beep() {
		var beeep = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
		beeep.play();
	}

})()