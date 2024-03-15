// https://dl.dropboxusercontent.com/s/1fhxhultavedg61/Hitlist.js
/*
-save settings
-kill log
-timestamp on/off
-wildcards
-decrease speed needs random number added
-opening links kills the tab.
-if i heal X amount of times within X amount of minutes, pause script for X  minutes
*/
javascript:(function(){
	var storage;
	try{
		if(localStorage.getItem){
			storage = localStorage;
		}else if(window.localStorage.getItem){
			storage = window.localStorage;
		}
	}catch(storagefail){}
	var run = false;
	var pos_load = false;
	var logs = [];
	var targets = [];
	var s_mode = 'hitlist';
	var timer;
	var blacklist = [];
	var no_boosts = false;
	var que_boost = false;
	var max_boosted = false;
	var boosts_avail = [];
	var boost_loadTime;

	var base = {
		heal_x: 0,
		heal_y: 0,
		heal_pwr_x: 0,
		heal_pwr_y: 0,
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
	
	var stats = {
		'money_gained': 0,
		'stamina_used': 0,
		'exp_gained': 0,
		'attacks_done': 0,
		'levelup': 0,
		'pwr_att': 0,
		'won': 0,
		'lost': 0,
		'dead': 0,
		'kills': 0,
		'heals': 0,
		'blacklist': 0,
		'damage_dealt': 0,
		'hl_won': 0,
		'hl_lost': 0,
		'hl_kills': 0,
		'hl_refreshes': 0,
		'mathQ': 0
	};	
	
	var target = {
		'attacks': 0
	};
	
	var userStats = {
		health: 0,
		energy: 0,
		stamina: 0,
		exp_have: 0,
		exp_needed: 0
	};
	
	var coffee_html = '<div style="z-index: 99999;background:black;">'+
	'	<div>'+
	'		<a href="#" id="_play" class="gx_button gx_button_green">'+
	'			<span style="color:white" title="start/stop">'+
	'				Start'+
	'			</span>'+
	'		</a>'+
	'		<a href="#" id="_close" class="gx_button gx_button_red">'+
	'			<span style="color:white" title="close">'+
	'				Close'+
	'			</span>'+
	'		</a>'+
	'	</div>'+ 
	'	<button id="_adrenaline">Que Adrenaline Boost</button> <span id="boost_text" style="color:green;display:none;">Boost Active!</span><br />'+
	'	Auto Use Boosts:<input id="_auto_boost" style="width:20px;" type="checkbox" name="hitlist_option"/><br />'+
	'	Red hit:<input id="_red_hit" style="width:20px;" type="checkbox" name="hitlist_option"/><br />'+
	'	Use blacklist: <input id="_blacklist" style="width:20px;" type="checkbox" name="hitlist_option"/><br />'+
	'	Power heal:<input id="_power_heal" title="Use power heal" style="width:20px;" type="checkbox" name="hitlist_option"/><br />'+
	'	Skip if bounty under:<input id="_low_bounty" type="text" value="0" style="width:100px;" name="hitlist_text"/> <span id="_low_bounty_formated"></span><br />'+
	'	Max attacks per target:<input id="_maxattacks" type="text" value="0" maxlength="5" style="width:40px;" name="hitlist_text"/><br />'+
	'	Attack War targets only:<input id="_wm_only" style="width:20px;" type="checkbox" name="hitlist_option"/><br />'+
	'	Stop when <input id="_energy_remain" type="text" value="0" maxlength="6" style="width:50px;" name="hitlist_text"/> energy remaining<br />'+
	'	Stop when <input id="_stamina_remain" type="text" value="0" maxlength="6" style="width:50px;" name="hitlist_text"/> stamina remaining<br />'+
	'	Level range: <input id="_level_low" type="text" value="1" maxlength="5" style="width:40px;" name="hitlist_text"/>-<input id="_level_high" type="text" value="35000" maxlength="6" style="width:45px;" name="hitlist_text"/><br />'+
	'	Mob Size: <input id="_mob_low" type="text" value="1" maxlength="5" style="width:40px;" name="hitlist_text"/>-<input id="_mob_high" type="text" value="2000" maxlength="5" style="width:40px;" name="hitlist_text"/><br />'+
	'	<textarea id="_namefilter" rows="3" cols="40" name="hitlist_filter"></textarea><br />Separate characters with space or new line.<br />'+
	'	Random speed:<input id="_speed" title="Slow server request speed" type="checkbox" name="hitlist_option"/><br />'+
	'	<span id="coffee_stats" style="display:none;"></span><br /><br />'+
	'	Status: <span id="coffee_status"></span><br />'+
	'	<table>'+
	'		<tr>'+
	'			<td valign="top">'+
	'				Log: <input id="_logsize" type="text" value="20" maxlength="4" style="width:20px;" name="hitlist_text"/>&nbsp;'+
	'			</td>'+
	'			<td id="coffee_log" valign="top" colspan="2"></td>'+
	'		</tr>'+
	'	</table>'+
	//'	Log: <input id="_logsize" type="text" value="20" maxlength="4" style="width:20px;" /> <span id="coffee_log"></span>'+
	//'	Log: <input id="_logsize" type="text" value="20" maxlength="4" style="width:20px;" />'+
	//'	<table>'+
	//'		<tr>'+
	//'			<td id="coffee_log" valign="baseline" colspan="2" style="font-weight:bold;"></td>'+
	//'		</tr>'+
	//'	</table>'+
	'</div>';
	
	$('.metal-bar-repeater:first').after(coffee_html);	
	
	$('#_play').click(function(){
		if(!run){
			run = true;
			no_boosts = false;
			$(this).removeClass('gx_button_green').addClass('gx_button_red').children().text('Stop');
			if(!pos_load){
				load_bases();
			}else{
				if(s_mode == 'fight'){
					load_fightlist();
				}else if(s_mode == 'hitlist'){
					load_hitlist();
				}
			}
		}else{
			run = false;
			clearInterval(timer);
			$(this).removeClass('gx_button_red').addClass('gx_button_green').children().text('Start');
			coffee_status('Stopped...');
		}
		var currentTime = (new Date().getTime()) / 1000;
		if (currentTime - boost_loadTime >= 300) {
			$('#boost_text').hide();
		}
		if($('#_auto_boost').is(':checked') && !max_boosted){
			$('#_adrenaline').click();
		}
		return false;
	});
	
	$('#_close').click(function(){
		run = false;
		clearInterval(timer);
		$(this).parent().parent().remove();
		return false;
	});	
	
	$('input[name="hitlist_text"]').each(function() {
		var name = $(this).attr('id');
		if(storage.getItem(name)){
			$(this).val(JSON.parse(storage.getItem(name)));
		}
	});
	
	$('input[name="hitlist_text"]').bind('change keyup click', function(){
		var name = $(this).attr('id');
		var value = parseInt($(this).val());
		storage.setItem(name, value);
	});
	
	$('textarea[name="hitlist_filter"]').each(function() {
		var name = $(this).attr('id');
		if(storage.getItem(name)){
			$(this).val(unescape(storage.getItem(name)));
		}
	});
	
	$('textarea[name="hitlist_filter"]').bind('input propertychange change keyup click', function(){
		var name = $(this).attr('id');
		var value = escape($(this).val());
		storage.setItem(name, value);
	});
	
	$('input[name="hitlist_option"]').each(function() {
		var name = $(this).attr('id');
		if (storage.getItem(name) == "true") {
			$(this).prop('checked', true);
		}
	});
	
	$('input[name="hitlist_option"]').change(function() {
		var name = $(this).attr('id');
		var value = $(this).is(':checked');
		storage.setItem(name, value);
	});
	
	$('#_adrenaline').click(function(){
		if(run && !que_boost){
			no_boosts = false;
			que_boost = true;
			coffee_logger('queuing loading boost in when next target detected!');
		}
		return false;
	});

	function load_bases(){
		build_ajax({page:'battle'},function(resp){
			update_ourStats(resp);
			$('#inner-container').html(resp);
			base.heal_x = $('#heal').offset().left.toFixed();
			base.heal_y = $('#heal').offset().top.toFixed();
			if(userStats.health[2] >= 10000){
				base.heal_pwr_x = $('[id="heal"]').eq(1).offset().left.toFixed();
				base.heal_pwr_y = $('[id="heal"]').eq(1).offset().top.toFixed();
			}
			base.button_hitlist_x = $('.header-main-submenu').find('.submenu-button:contains("HITLIST")').offset().left.toFixed();
			base.button_hitlist_y = $('.header-main-submenu').find('.submenu-button:contains("HITLIST")').offset().top.toFixed();
			if(/No mobs available in your range/.test(resp)){
				coffee_status('Please restart script when fightlist isnt on cooldown..');
				coffee_logger('Please restart script when fightlist isnt on cooldown..');
				$('#_play').click();
				return;
			}
			if($('.stamina-icon:contains("Attack")').length > 1){
				var button1 = $('.stamina-icon:contains("Attack"):eq(0)');
				var button2 = $('.stamina-icon:contains("Attack"):eq(1)');
				var guess_offset = 0-(parseInt(button2.offset().top.toFixed()-button1.offset().top.toFixed()));
				var increm = Math.abs(guess_offset);
				for(var i = 0; i<15; i++){
					base['pos'+i+'_x'] = parseInt(button1.offset().left.toFixed());
					base['pos'+i+'_y'] = parseInt(button2.offset().top.toFixed())+guess_offset;
					guess_offset += increm
				}
			}else{
				coffee_logger('Error detecting more than 1 fightlist button, Please restart script when fightlist has more targets..');
				$('#_play').click();
				return;
			}
			pos_load = true;
			if(s_mode == 'fight'){
				parse_fightlist(resp);
			}else if(s_mode == 'hitlist'){
				load_hitlist();
			}
		});
	}
	
	function load_hitlist(){
		coffee_status('Loading hitlist...')
		var x = parseInt(base.button_hitlist_x)+myRandom(10,80);
		var y = parseInt(base.button_hitlist_y)+myRandom(1,10);
		var info = 'a_c_x='+x+'&a_c_y='+y;
		build_ajax({page:'battle/bounty',data:info},function(resp){
			stats.hl_refreshes++;
			build_hl_targets(resp);
		});
	}	
	
	function do_math(data){
		var math = $(data).find('.x-large').text();
		var m=/(\d+) ([()+-]) (\d+)/.exec(math);
		var answer;
		if(m[2] == '+'){
			answer = (parseInt(m[1]) + parseInt(m[3]));
		}else{
			answer = (parseInt(m[1]) - parseInt(m[3]));
		}
		var b_c = $(data).find('form input[name=bounty_captcha]').val();
		var ts = $(data).find('form input[name=ts]').val();
		var c_r = $(data).find('form input[name=captcha_response]').val();
		var hash = $(data).find('form input[name=hash]').val();
		coffee_logger('Doing math question');
		var info = 'bounty_captcha='+b_c+'&ts='+ts+'&captcha_response='+c_r+'&hash='+hash+'&answer='+answer;
		build_ajax({page:'battle/bounty_captcha/',data:info},function(resp){
			stats.mathQ++;
			coffee_logger('Done math question hopefully..');
			load_hitlist();
		});
	}

	function build_hl_targets(data){
		targets = [];
		update_ourStats(data);
		var low_bounty = parseInt($('#_low_bounty').val().replace(/[^0-9]/g, ''));
		if(low_bounty != 0){
			$('#_low_bounty_formated').html(format_money(low_bounty));			
		}		
		if(run){
			if(/answer the simple math/.test(data)){
				do_math(data);
				return;
			}
			if(!/No hits available/.test(data)){
				$(data).find('.stamina-icon').each(function(){
					if($(this)[0].nextSibling.nodeValue == 'Attack'){
						if($(this).parent().parent().parent().parent().find('.lock-icon').length){
							return true;
						}else if($(this).parent().parent().css('display') == 'none'){
							return true;
						}else{
							var info = $(this).parent().parent().parent().parent();
							if($('#_wm_only').is(':checked')){
								if(!info.find('.war_target_icon').length){
									return true;
								}
							}
							var clan = '';
							var name = info.find('td:eq(0) > a').text();
							if(name.charAt(0) == '['){
								clan = /\[[^.*]*?\]/.exec(name)[0];
								name = name.slice(clan.length);
							}
							var pid = info.find('td:eq(0) > a').attr('href').replace(/[^0-9]/g, '');
							var level = info.find('td:eq(0) > p').text().replace(/[^0-9]/g, '').trim();
							var amount = info.find('td:eq(2)').text().trim();
							var s_key = info.find('td:eq(4) > a').attr('onclick').split(/bounty_attack\//)[1].split(/',form_id:/)[0];
							targets.push({clan:clan, name:name, pid:pid, level:level, amount:amount, s_key:s_key});
						}
					}
				})
				if(targets.length == 0){
					var wait = 0;
					if($('#_speed').is(':checked')){
						wait = (Math.floor(Math.random() * 2)) + 0;
					}
					coffee_logger('no targets, refreshing..');
					if(wait > 0){
						pausing(wait, 'no targets, refreshing in ', function(){load_hitlist();});
					}else{
						load_hitlist();
					}
					return;
				}
				targets.sort(function(a, b){
					return b.amount.replace(/[^0-9]/g, '') - a.amount.replace(/[^0-9]/g, '');
				})
				if(que_boost){
					if(max_boosted){
						que_boost = false;
						coffee_logger('Daily limit of boosts reached..');
						hitlist_attack();
						return;
					}
					if($('#boost_text').is(":visible")){
						que_boost = false;
						coffee_logger('Boost currently active..');
						hitlist_attack();
						return;
					}
					if(!no_boosts){
						if(boosts_avail.length){
							load_boost(hitlist_attack);
						}else{
							coffee_logger('Reading Boost Stream..');
							read_boost_stream(hitlist_attack);								
						}
						return;
					}
				}
				var currentTime = (new Date().getTime()) / 1000;
				if (currentTime - boost_loadTime >= 300) {
					$('#boost_text').hide();
					if($('#_auto_boost').is(':checked') && !max_boosted){
						$('#_adrenaline').click();
					}
				}
				hitlist_attack();
			}else{
				var wait = 0;
				if($('#_speed').is(':checked')){
					wait = (Math.floor(Math.random() * 2)) + 0;
				}
				coffee_logger('no targets, refreshing..');
				if(wait > 0){
					pausing(wait, 'no targets, refreshing in ', function(){load_hitlist();});
				}else{
					load_hitlist();
				}
			}
		}
	}

	function read_boost_stream(callback){
		var info = 'event_group=share&relation=clan';
		build_ajax({page:'home/reload_more_feed_panel/stream/0',data:info}, function(response){
			var parsedResponse = $.parseHTML(response);
			boosts_avail = [];
			$(parsedResponse).find('.filter-box.feed-div').each(function(){
				if($(this).find('.lightgrey').length < 3){
					return true;
				}else if($(this).find('.lightgrey:eq(2)').css('display') != 'none'){
					return true;
				}else{
					if(/Get Adrenaline Boost/.test($(this).text())){
						var secret_ids = $(this).find('a:last').attr('id').split('_');
						boosts_avail.push({id:secret_ids[2], id2:secret_ids[3]});
					}
				}
			});
			if(boosts_avail.length){
				no_boosts = false;
				load_boost(callback);
			}else{
				coffee_logger('No Boosts currently available!')
				no_boosts = true;
				que_boost = false;
				callback();
			}
		});
	}
	
	function load_boost(callback){
		var info = 'ajax_response_type=modal&modal_id=modal_feed_'+boosts_avail[0].id+'_'+boosts_avail[0].id2+'_modal';
		build_ajax({page:'battle/accept_boost/'+boosts_avail[0].id+'/',data:info}, function(response){
			boosts_avail.shift();
			que_boost = false;
			if(/and now have increased attack strength for a limited/.test(response)){
				boost_loadTime = (new Date().getTime()) / 1000;
				$('#boost_text').show();
				coffee_logger('Adrenaline Boost loaded!');
			}else if(/You are only allowed to use 1 Adrenaline/.test(response)){
				boost_loadTime = (new Date().getTime()) / 1000;
				coffee_logger('You are only allowed to use 1 Adrenaline Boost at a time!');
				$('#boost_text').show();
			}else if(/You have reached the maximum number of/.test(response)){
				max_boosted = true;
				coffee_logger('You have reached the maximum number of Adrenaline Boosts!');
			}else{
				coffee_logger('booooooooooooooooost issue response!');
				logit('booooooooooooooooost issue response!');
				$('#_play').click();
			}
			callback();
		});
	}		
	
	function hitlist_attack(){
		var wait = 0;
		if($('#_speed').is(':checked')){
			wait = (Math.floor(Math.random() * 2)) + 0;
		}
		var energy_val = parseInt($('#_energy_remain').val());
		var stamina_val = parseInt($('#_stamina_remain').val());
		var heal_percent = (30 / 100) * parseInt($('#health_menu_value').text().split('/')[1]);
		if(run){
			if(parseInt(userStats.energy[1]) <= energy_val && energy_val > 0){
				coffee_status('Reached energy remain value, pausing...');
				$('#_play').click();
			}else if(parseInt(userStats.stamina[1]) <= stamina_val && stamina_val > 0){
				coffee_status('Reached stamina remain value, pausing...');
				$('#_play').click();
			}else if(parseInt(userStats.health[1]) <= heal_percent){
				visit_hospital(hitlist_attack);
			}else if(parseInt(userStats.stamina[1]) < 1){
				coffee_status('Ran out of stamina, stopping..');
				$('#_play').click();
			}else{
				if(wait > 0){
					pausing(wait, 'Attacking hitlist in ', function(){do_hl_attack();});
				}else{
					do_hl_attack();
				}
				return;
			}
		}else{
			coffee_status('Pausing...');
		}
	}
	
	function do_hl_attack(){
		if(targets.length == 0){
			load_hitlist();
			return;
		}
		if(run){			
			var low_bounty = parseInt($('#_low_bounty').val().replace(/[^0-9]/g, ''));
			if(low_bounty != 0){
				$('#_low_bounty_formated').html(format_money(low_bounty));			
			}
			var maxattacks = parseInt($('#_maxattacks').val());
			if(targets[0].amount.replace(/[^0-9]/g, '') < low_bounty && low_bounty != 0){
				coffee_logger('Skipping '+profile_link()+' because bounty ('+targets[0].amount+') is lower than $'+commas(low_bounty));
				skip_target();
				do_hl_attack();
			}else if(targets[0].level > parseInt($('#_level_high').val()) || targets[0].level < parseInt($('#_level_low').val())){
				coffee_logger('Skipping '+profile_link()+' because level '+targets[0].level);
				skip_target();
				do_hl_attack();
			}else if(target.attacks > maxattacks && maxattacks != 0){
				coffee_logger('Skipping '+profile_link()+' because max attacks reached ('+maxattacks+').');
				skip_target();
				do_hl_attack();
			}else if(check_name(targets[0].name)){
				coffee_logger('Skipping '+profile_link()+' because of name/family filter.');
				skip_target();
				do_hl_attack();
			}else if(check_name(targets[0].clan)){
				coffee_logger('Skipping '+profile_link()+' because of name/family filter.');
				skip_target();
				do_hl_attack();
			}else if(find_element(targets[0].pid, 'pid', blacklist) && $('#_blacklist').is(':checked')){
				coffee_logger('Skipping '+profile_link()+' because of blacklist. <span class="more_in">(Stronger opponent)</span>');
				stats.blacklist++;
				skip_target();
				do_hl_attack();
			}else{
				var x = parseInt(base.button_hitlist_x)+myRandom(10,80);
				var y = parseInt(base.button_hitlist_y)+myRandom(3,10);
				var url = 'battle/bounty_attack/'+targets[0].s_key;
				var info = 'a_c_x='+x+'&a_c_y='+y+'&user_id='+targets[0].pid;
				coffee_status('Attempting '+profile_link()+' whos bounty is '+format_money(targets[0].amount));
				target.attacks++;
				build_ajax({page:url,data:info},function(resp){
					parse_hl_attack(resp);
				})
			}
		}
	}

	function parse_hl_attack(data){
		update_ourStats(data);
		if(/has awarded you with/.test(data)){
			stats.levelup++;
		}
		if(/You were killed/.test(data)){
			userStats.health[1] = 0;
		}
		if(/This user is one of your Mobsters/.test(data)){
			coffee_logger(profile_link()+' is one of your Mobsters, skipping..');
			skip_target();
			do_hl_attack();
		}else if(/You are too weak to Fight/.test(data)){
			visit_hospital(do_hl_attack);
		}else if(/Selected opponent is already in a/.test(data)){
			coffee_logger(profile_link()+' is already in a fight, retrying..');
			do_hl_attack();
		}else if(/User Hit is no longer/.test(data)){
			coffee_logger(profile_link()+' is no longer available, skipping..');
			skip_target();
			do_hl_attack();
		}else if(/has just been attacked and/.test(data)){
			coffee_logger('Too slow! '+profile_link()+' has just been taken out, skipping..');
			skip_target();
			hitlist_attack();
		}else if(/You do not have enough stamina/.test(data)){
			coffee_logger('Not enough stamina to fight..');
			$('#_play').click();
		}else if(/are out of your XP range/.test(data)){
			coffee_logger('Cannot fight '+profile_link()+', they are out of your XP range, skipping..');
			skip_target();
			do_hl_attack();
		}else if(/battleV2-result-box-default default-dark-box/.test(data)){
			var result_divs = data.split(/battleV2-result-box-default default-dark-box/);
			var killed = /You have killed/.test(data);
			var output = '';
			var isWin = false;
			if(/WON/.test(result_divs[0])){
				isWin = true;
				stats.hl_won++;
				output += '<span style="color:green;">Won!</span>';
			}else{
				output += '<span style="color:red;">Lost!</span>';
				stats.hl_lost++;
				if(!$('#_red_hit').is(':checked')){
					add_blacklist();					
				}
			}
			if(/  XP/.test(data)){
				var xstr = /(red|green) bold"\>([()+-]).*  XP/.exec(data);
				xstr = parseInt(xstr[0].replace(/[a-zA-Z\>\",]/g, ''));
				if(/You were killed/.test(data)){
					output += ' <span style="color:red;">You died!</span>'
				}
				stats.exp_gained += xstr;
				output += ' <span class="bold attribute-title" title="Experience gained">'+xstr+'xp</span>';
			}
			if(killed){
				output += ' You have killed '+targets[0].name+' and collected their reward of '+targets[0].amount+'.';
				stats.hl_kills++;
				stats.money_gained += parseInt(targets[0].amount.replace(/[^0-9]/g, ''));
				coffee_logger(output);
				skip_target();
				hitlist_attack();
				return;
			}
			if(isWin||$('#_red_hit').is(':checked')){
				if(/Attack Again/.test(data)){
					output += ', Attacking '+profile_link()+' again!';
				}else{
					skip_target();
				}
			}else{
				output += ', skipping '+profile_link()+'..';
				skip_target();
			}
			coffee_logger(output);
			do_hl_attack();
		}else{
			coffee_logger('Unknown result!! stoppping');
			$('#_play').click();
		}
	}	
	
	function skip_target(){
		att_url = '';
		targets.shift();
		target.attacks = 0;
	}

	function visit_hospital(callback){
		coffee_status('<span class="good">Going to hospital...</span>');
		var x = parseInt(base.heal_x)+myRandom(10,80);
		var y = parseInt(base.heal_y)+myRandom(2,10);
		var heal_url = 'heal/oneclick/'+healCode_global+'/';
		if($('#_power_heal').is(':checked')){
			x = parseInt(base.heal_pwr_x)+myRandom(10,80);
			y = parseInt(base.heal_pwr_y)+myRandom(2,10);
			heal_url = 'heal/oneclick/'+healCode_global+'/1';
		}
		var info = 'ajax_response_type=modal&modal_id=heal_response_modal&a_c_x='+x+'&a_c_y='+y;
		build_ajax({page:heal_url,data:info},function(data){
			update_ourStats(data);
			if(/doctor will not heal you/.test(data)){
				coffee_logger('The doctor will not heal you right now!');
				callback();
			}else if(/The doctor healed you/.test(data)){
				var cost = /\$([\d,]+)(\$([\d,]+))?./.exec(data)[1];
				cost = parseInt(cost.replace(/[^0-9]/g, ''));
				stats.money_gained -= cost;
				stats.heals++;
				coffee_logger('<span style="color:green;">The doctor healed you for <span style="color:red;">$'+commas(cost)+'</span></span>');
				callback();
			}else if(parseInt(userStats.health[1]) <= heal_percent){
				pausing(10, 'Retrying heal in ...', function(){visit_hospital(callback);});
			}else{
				coffee_logger('Get new hospital message, stopping');
				$('#_play').click();
			}
		})
	}	
	
	function update_ourStats(data){
		userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
		userStats.energy = /energy_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
		userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
		userStats.exp_have = /hdr_level_xp"\).text\('(-?)(\d+)'\);/.exec(data)[2];
		if(/hdr_level_xp"\).text\('(-?)(\d+)'\);/.exec(data)[1] == '-'){
			var real_num = 0-parseInt(userStats.exp_have);
			userStats.exp_have = real_num;
		}
		userStats.exp_needed = /hdr_level_total_xp"\).text\('(\d+)'\);/.exec(data)[1];
	}	
	
	function profile_link(){
		return '<a href="https://apps.facebook.com/la_cosa_nostra/profile/user/'+targets[0].pid+'">'+targets[0].clan+' '+targets[0].name+'</a>';
	}
	
	function myRandom(min,max) {
		return min +  Math.floor(Math.round((Math.random() * (max - min))));
	}
	
	function commas(num){
		return(""+num).replace(/\B(?=(\d{3})+(?!\d))/g,",")
	}
	
	function format_money(amount, brackets){
		var figure = amount;
		if(isNaN(amount)){
			figure = amount.replace(/[^0-9]/g, '');			
		}
		figure = parseInt(figure);
		var t = '';
		if(figure >= 1000000000000000){
			figure = figure / 1000000000000000; 
			t = ' qufiguredrillion';
		}else if(figure >= 1000000000000){
			figure = figure / 1000000000000;
			t = ' trillion';
		}else if(figure >= 1000000000){
			figure = figure / 1000000000;
			t = ' billion';
		}
		if(t !== ''){
			if(brackets){
				return '($'+figure.toFixed(3)+t+')';
			}
			return '$'+figure.toFixed(3)+t;
		}
		if(brackets){
			return '($'+commas(figure)+')';
		}
		return '$'+commas(figure);
	}
	
	function add_blacklist() {
		if (!find_element(targets[0].pid,'pid',blacklist)) {
			blacklist.push(targets[0]);
		}
	}
	
	function check_name(name) {
		var characters = $('#_namefilter').val().trim().split(/[ \n]/);
		for (var i = 0; i < characters.length; i++) {
			characters[i] = characters[i].replace(/[\s\r\n]/g, '');
			if (characters[i].length > 0) {
				if (name.indexOf(characters[i]) > -1) {
					return true;
				}
			}
		}
		return false;
	}
	
	function find_element(search,property,array) {
		for (var x in array) {
			if (search == array[x][property]) {
				return array[x];
			}
		}
		return false;
	}
	
	function coffee_status(msg) {
		$('#coffee_status').html(msg);
	}
	
	function coffee_logger(msg) {
		$('#coffee_stats').html(display_stats());
		var limit = parseInt($('#_logsize').val());
		logs.unshift(msg);
		if (limit > 0) {
			if (logs.length > limit) {
				msg = logs.pop();
			}
		}
		$('#coffee_log').html(logs.join('<br />'));
	}
	
	function pausing(seconds, message, resume_func) {
		var delay = (seconds > 0)? delay = 1000 : delay = 100;
		var minutes = (parseInt(seconds/60) == 1) ? 0 : parseInt(seconds/60);
		if(minutes > 0){
			coffee_status(message+' <span id="minutes">'+minutes+' minutes</span> <span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...');
		}else{
			coffee_status(message+' <span id="minutes"></span><span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...');
		}
		timer = setInterval(function(){
			if(seconds%60 == 0){
				minutes--;
			}
			seconds--;
			if(document.getElementById('minutes')){
				document.getElementById('minutes').innerHTML = (minutes > 0) ? minutes+' minute'+(minutes==1?'':'s') : '';
			}
			if(document.getElementById('seconds')){
				document.getElementById('seconds').innerHTML = (seconds % 60)+' second'+(seconds==1 ? '' : 's');
			}else{
				clearInterval(timer);
			}
			if(seconds <= 0){
				clearInterval(timer);
				if (typeof resume_func == 'function') {
					resume_func();
				}
			}
		}, delay);
	}	
	
	function display_stats(){
		var log = '';
		if(parseInt(stats.won)>0){
			log += 'Fight Wins: '+commas(stats.won);
		}
		if(parseInt(stats.lost)>0){
			log += ' | Fights Lost: '+commas(stats.lost);
		}
		if(parseInt(stats.kills)>0){
			log += ' | Fight Kills: '+commas(stats.kills);
		}
		if(parseInt(stats.hl_won)>0){
			log += ' | Hitlist Wins: '+commas(stats.hl_won);
		}
		if(parseInt(stats.hl_lost)>0){
			log += ' | Hitlist Losses: '+commas(stats.hl_lost);
		}
		if(parseInt(stats.hl_kills)>0){
			log += ' | Hitlist Kills: '+commas(stats.hl_kills);
		}
		if(parseInt(stats.hl_refreshes)>0){
			log += ' | Hitlist Refresh #: '+commas(stats.hl_refreshes);
		}
		if(parseInt(stats.mathQ)>0){
			log += ' | Math Questions: '+commas(stats.mathQ);
		}
		if(parseInt(stats.dead)>0){
			log += ' | Dead Capo: '+commas(stats.dead);
		}
		if(parseInt(stats.pwr_att)>0){
			log += ' | Power Attacks: '+commas(stats.pwr_att);
		}
		if(parseInt(stats.heals) > 0){
			log += ' | Heals: '+commas(stats.heals);
		}
		if(parseInt(stats.stamina_used)>0){
			log += ' | Stamina Spent: '+commas(stats.stamina_used);
		}
		log += ' | Total Exp: '+commas(stats.exp_gained);
		log += ' | Total Cash: $'+commas(stats.money_gained)+(parseInt(stats.money_gained)>=1000000000 ? ' '+format_money(stats.money_gained, true) : '');
		if(log.charAt(1) == '|'){
			log = log.substring(3);
		}
		if(log != ''){
			$('#coffee_stats').show();
		}
		return log;
	}
	
	function build_ajax(arr, handler){
		var req = $.extend({
			'page': '',
			'data': '',
			'a_c_x': '',
			'a_c_y': '',
			'user_id': '',
			'stamina_boost': '',
			'data_type': 'html',
			'type': 'POST'
		}, arr);
		if(linkCode_global !== undefined){
			if (req.data.length > 0) {
				req.data = req.data + '&'
			};
			req.data = req.data + 'lc=' + linkCode_global
		};
		var c = {
			document_height: $(document).height(),
			window_height: $(window).height(),
			document_body_height: $(document.body).height()
		};
		var i = new TimeTracker();
		req.success_callback = function(resp) {
			i._recordEndTime();
			resize_canvas(c);
			resp = resp.replace(/<img/ig, '<noimg');
			try{
				pageLoadTime_global = /pageLoadTime_global = "(\d+.[0-9]+)";/.exec(resp)[1];
				travelController_global = /travelController_global = '(\w+)';/.exec(resp)[1];
				travelUpdateId_global = /travelUpdateId_global = '(?=\S*['-])([a-zA-Z'-]+)';/.exec(resp)[1];
				healCode_global = /healCode_global='([\w\d]+)';/.exec(resp)[1];
				linkCode_global = /linkCode_global='([\w\d]+)';/.exec(resp)[1];
				var updatechat = /updateChatHandshake\('([\w\d\=]+)'\)/.exec(resp)[1];
				updateChatHandshake(updatechat);
			}catch(err){
				console.log('Error updating page variables');
				console.log('Error: '+err.lineNumber);
			}
			handler(resp);
		};
		req.failure_callback = function() {
			i._recordEndTime();
			console.log('something failed!');
		};
		i._recordStartTime();
		send_ajax(req);				
	};
	
	function send_ajax(param) {
		$.ajax({
			url: APP_CONFIG.http_base_url + 'facebook/mob_wars/' + param.page,
			type: param.type,
			data: getAjaxData(param.data),
			dataType: param.data_type,
			success: function(resp){
				if(/Your Facebook session has expired/.test(resp)){
					console.log('session refresh detected: auto redirecting');
					top.location.href = "https://apps.facebook.com/la_cosa_nostra/";
					return;
				}
				param.success_callback(resp);
			},
			error: function() {
				param.failure_callback()
			}
		})
	};	
	
	function logit(msg) {
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}
	
})()