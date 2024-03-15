//	https://dl.dropboxusercontent.com/s/n4wycrnckzz16iu/Keep_Dead.js

javascript:(function(){
	var game_url;
	var inject_game;
	var script_name = 'Keep Dead';
	var check_game = document.location.href;
	if(/pirate_clan\//.test(check_game)){
		game_url = 'pirate_clan';		
		inject_game = '#main_menu_div';
	}else{
		game_url = 'mob_wars';
		inject_game = '.metal-bar-repeater:eq(1)';
	}
	var isOn = true; 
	var heal_percent = (30 / 100) * parseInt($('#health_menu_value').text().split('/')[1]);
	var name;
	var userStats = {
		health: 0,
		stamina: 0
	}
	var heal_x = $('#heal').offset().left.toFixed();
	var heal_y = $('#heal').offset().top.toFixed();
	var attacksDone = 0;
	var profile_id;
	
	$(inject_game).after('<div id="keep_dead_div" style="background:orange;height:20px;">'+
	'	<span id="keep_dead_status" style="float:left;margin-top:2px;margin-left:2px;font-weight:bold;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:95%;"></span>'+
	'	<span style="float:right;">'+
	'		<div class="inlineblock modal_close_x" style="margin-top:2px;margin-right:2px;" id="keep_dead_close">&nbsp;</div>'+
	'	</span>'+
	'	<div style="clear:both;"></div>'+
	'</div>');
	
	$('#keep_dead_close').click(function(){
		isOn = false;
		$('#keep_dead_div').remove();
		return false;
	});
	
	if(!$('#user_profile_url').length){
		$('#keep_dead_div').css('background-color', 'red');
		$('#keep_dead_status').text('You don\'t appear to be on a profile page..');
		isOn = false;
	}else{
		profile_id = $('#user_profile_url').attr('value').split('/')[6].split('?')[0]
	}
	if(profile_id){
		check_profile();
	}
	
	function check_profile(){
		build_ajax({page:'profile/user/'+profile_id},function(data){
			userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
			userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
			name = $(data).find('.page-title').text().trim()+' '+$(data).find('span[class="bold lightgrey"]').text();
			if(name == ''||name == ' '){
				$('#keep_dead_div').css('background-color', 'red');
				$('#keep_dead_status').text('You don\'t appear to be on a profile page..');
				isOn = false;
				return;
			}
			if(!/Add to/.test(data)){
				$('#keep_dead_div').css('background-color', 'red');
				$('#keep_dead_status').text(name+' is currently friended, stopping..');
				isOn = false;
				return;
			}else{
				if($(data).find('.dead-profile-icon').length > 0){
					$('#keep_dead_div').css('background-color', 'orange');
					$('#keep_dead_status').text(name+' is currently dead, checking again in 2 seconds..');
					setTimeout(function(){check_profile()},2000);
				}else if(/In Hospital/.test(data)){
					$('#keep_dead_div').css('background-color', 'orange');
					$('#keep_dead_status').text(name+' is currently in hospital, checking again in 1 seconds..');
					setTimeout(function(){check_profile()},1000);
				}else{
					attack_em()
				}
			}
		})				
	}
	
	function attack_em(){
		var info = 'attack_type=battle_attack&user_id='+profile_id;					
		build_ajax({page:'battle/profile_attack', data:info},function(data){
			parse_fight(data)
		})
	}
	
	function parse_fight(data){
		if(isOn){
			userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
			userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
			if(/they are out of your/.test(data)){
				$('#keep_dead_div').css('background-color', 'red');
				$('#keep_dead_status').text('Cannot fight User, they are out of your XP range.... Stopping..');
				isOn = false;
				return;
			}
			if(/You are too weak to/.test(data)){
				$('#keep_dead_div').css('background-color', 'orange');
				$('#keep_dead_status').text('needing to heal..');
				vist_hospital(attack_em);
				return;
			}
			if(/is under protection from you/.test(data)){
				$('#keep_dead_div').css('background-color', 'red');
				$('#keep_dead_status').text('The person went into protection to get away from you hahahahahaha... Stopping..');
				isOn = false;
				return;
			}
			if(/Selected opponent is already in a fight./.test(data)){
				$('#keep_dead_div').css('background-color', 'orange');
				$('#keep_dead_status').text('already in a fight, retrying..');
				attack_em();
				return;
			}
			if(/Selected opponent be battling already/.test(data)){
				$('#keep_dead_div').css('background-color', 'orange');
				$('#keep_dead_status').text('already in a fight, retrying..');
				attack_em();
				return;
			}
			if(/has just been attacked/.test(data)){
				$('#keep_dead_div').css('background-color', 'orange');
				$('#keep_dead_status').text('Target has just been attacked and killed, checking profile..');
				setTimeout(function(){check_profile()},5000);
				return;
			}
			if(/battleV2-result-box-default default-dark-box/.test(data)){
				var result_divs = data.split(/battleV2-result-box-default default-dark-box/);
				var killed = /You have killed/.test(data);
				var iced = /in the hospital/.test(data);
				if(/WON/.test(result_divs[0])){
					attacksDone++;
					var log = 'You Won! Attack #:'+attacksDone+' ';
					if(/Attack Again/.test(data)){
						att_url = '';
						var find_str = data.split("data:'");
						for(var i =0; i<find_str.length; i++){
							if(find_str[i].includes('user_id')){
								att_url = find_str[i].split(/',top:/)[0];
								break;
							}
						}
						if(att_url == ''){
							$('#keep_dead_div').css('background-color', 'red');
							$('#keep_dead_status').text('something wrong with attack again url, stopping..');
							isOn = false;
							return;
						}
						if(parseInt(userStats.health[1]) <= heal_percent){
							$('#keep_dead_div').css('background-color', 'orange');
							$('#keep_dead_status').text('needing to heal..');
							vist_hospital(attack_em);
							return;
						}else if(parseInt(userStats.stamina[1]) < 1){
							$('#keep_dead_div').css('background-color', 'red');
							$('#keep_dead_status').text('No stamina left, stopping..');
							isOn = false;
							return;
						}else{
							$('#keep_dead_div').css('background-color', 'green');
							$('#keep_dead_status').text(log+'Attacking '+name+' again!');
							attack_em();
							return;
						}
					}else{
						if(killed){
							$('#keep_dead_div').css('background-color', 'green');
							$('#keep_dead_status').text(log+' Killing '+name);							
						}else if(iced){
							$('#keep_dead_div').css('background-color', 'green');
							$('#keep_dead_status').text(log+' Putting '+name+' in hospital!');
						}
						setTimeout(function(){check_profile()},1000);
						return;
					}
				}else{
					attacksDone++
					var log = 'You Lost! Attack #:'+attacksDone+' ';
					var timer = 5000;
					if(killed){
						$('#keep_dead_div').css('background-color', 'green');
						$('#keep_dead_status').text(log+'But have killed '+name);
					}else if(iced){
						$('#keep_dead_div').css('background-color', 'green');
						$('#keep_dead_status').text(log+'But have put '+name+' in hospital!');
					}else{
						timer = 10;
						if(parseInt(userStats.health[1]) <= heal_percent){
							$('#keep_dead_div').css('background-color', 'orange');
							$('#keep_dead_status').text(log+'But need to heal..');
							vist_hospital(attack_em);
							return;
						}else if(parseInt(userStats.stamina[1]) < 1){
							$('#keep_dead_div').css('background-color', 'red');
							$('#keep_dead_status').text(log+'But no stamina left...');
							return;
						}
						$('#keep_dead_div').css('background-color', 'green');
						$('#keep_dead_status').text(log+' attacking again..');
					}
					setTimeout(function(){check_profile()},timer);
					return;
				}
				setTimeout(function(){check_profile()},5000);
			}
		}
	}
	
	

	function vist_hospital(callback){
		if(isOn){
			var x = parseInt(heal_x)+myRandom(10,80);
			var y = parseInt(heal_y)+myRandom(5,10);
			var info = 'ajax_response_type=modal&modal_id=heal_response_modal&a_c_x='+x+'&a_c_y='+y;
			build_ajax({page:'heal/oneclick/'+healCode_global+'/',data:info},function(resp){
				userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(resp);
				userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(resp);
				if(/The Witch Doctor gave you/.test(resp)){
					$('#keep_dead_div').css('background-color', 'green');
					$('#keep_dead_status').text('The doctor healed you..');
					callback();
					return;
				}else if(/doctor will not heal you/.test(resp)){
					$('#keep_dead_div').css('background-color', 'green');
					$('#keep_dead_status').text('The doctor will not heal you right now!');
					callback();
					return;
				}else if(/The doctor healed you/.test(resp)){
					$('#keep_dead_div').css('background-color', 'green');
					$('#keep_dead_status').text('The doctor healed you..');
					callback();
					return;
				}else{
					$('#keep_dead_div').css('background-color', 'red');
					$('#keep_dead_status').text('Get new hospital message, stopping..');
				}
			})
		}
	}
	
	function myRandom(min,max) {
		return min +  Math.floor(Math.round((Math.random() * (max - min))));
	}
	
	function build_ajax(arr, handler) {
		if(isOn){
			var req = $.extend({
				'page': '',
				'data': '',
				'data_type': 'html',
				'update_id': 'inner-container',
				'hide': 0,
				'top': 1,
				'form_id': !1,
				'callback': !1,
				'type': 'POST',
				'new_page': !0,
				'lock_page': !0,
				'loading_id': !1,
				'coords': !1,
				'loading_html': !1
			}, arr);
			if (linkCode_global !== undefined) {
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
			req.failure_callback = function(){
				i._recordEndTime();
				console.log('Something has failed! Stopping..');
			};
			i._recordStartTime();
			send_ajax(req);				
		}
	};
	
	function send_ajax(param){
		if(isOn){
			$.ajax({
				url: APP_CONFIG.http_base_url + 'facebook/'+game_url+'/' + param.page,
				type: param.type,
				data: getAjaxData(param.data),
				dataType: param.data_type,
				success: function(resp) {
					if(/Your Facebook session has expired/.test(resp)){
						$('#keep_dead_div').css('background-color', 'red');
						$('#keep_dead_status').text('Session refresh detected, please refresh tab..');
						return;
					}
					param.success_callback(resp);
				},
				error: function() {
					param.failure_callback()
				}
			})
		}
	};
	
})()	