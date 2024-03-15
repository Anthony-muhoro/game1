//	https://dl.dropboxusercontent.com/s/prmofezwc7ro692/War_Healer.js

javascript:(function (){
	var isOn = true;
	var check_game = document.location.href;
	var timer;
	var game_url;
	var inject_game;
	if(/pirate_clan\//.test(check_game)){
		game_url = 'pirate_clan';		
		inject_game = '#main_menu_div';
	}else{
		game_url = 'mob_wars';
		inject_game = '.metal-bar-repeater:eq(1)';
	}
	
	$(inject_game).after('<div id="war_healer" style="background:orange;height:20px;">'+
	'	<span id="war_healer_status" style="float:left;margin-top:2px;margin-left:2px;font-weight:bold;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:95%;">Connecting...</span>'+
	'	<span style="float:right;">'+
	'		<div class="inlineblock modal_close_x" style="margin-top:2px;margin-right:2px;" id="war_healer_close">&nbsp;</div>'+
	'	</span>'+
	'	<div style="clear:both;"></div>'+
	'</div>');
	
	$('#war_healer_close').click(function(){
		isOn = false;
		$('#war_healer').remove();
		return false;
	});
	
	var stats = {
		stamina: 0,
		tokens: 0
	}
	
	function check_for_heal(){
		if(isOn){
			build_ajax({page:'war'},function(data){
				if(/War but it has not started yet/.test(data)){
					$('#war_healer').css('background-color', 'red');
					$('#war_healer_status').text('No wars in progress, stoppping..');
					return;
				}
				if(/needs to join first before you can join/.test(data)){
					$('#war_healer').css('background-color', 'red');
					$('#war_healer_status').text('No wars in progress, stoppping..');
					return;
				}
				if(/will enroll all members/.test(data)){
					$('#war_healer').css('background-color', 'red');
					$('#war_healer_status').text('No wars in progress, stoppping..');
					return;
				}
				if(/You need at least/.test(data)){
					$('#war_healer').css('background-color', 'red');
					$('#war_healer_status').text('You need more tokens, stopping..');
					return;
				}
				if(/Your health is already full/.test(data)){
					$('#war_healer').css('background-color', 'green');
					$('#war_healer_status').text('Your health is still full..');
					return;
				}
				if(parseInt($(data).find('.progress-bar-inner:first').attr('style').replace(/[^0-9]/g, '')) == 0){
					var can_spawn = $(data).find('#respawn_timer').text();
					if(can_spawn == '0:00'){
						check_for_heal();
					}else{
						var wait = can_spawn.split(':');
						wait = ((parseInt(wait[0]) * 60) + (parseInt(wait[1])));
						pausing(wait+1, 'Respawning in ',function(){check_for_heal();});
					}
					return;
				}
				stats.tokens = /token_value"\).text\("(\d+)\/(\d+)"\);/.exec(data)[1];
				stats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
				middle(data);
			})
		}
	}

	function middle(data){
		if(isOn){
			var clan_health = $(data).find('.progress-bar-inner:first').attr('style').replace(/[^0-9]/g, '');
			stats.tokens = /token_value"\).text\("(\d+)\/(\d+)"\);/.exec(data)[1];
			stats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
			if(parseInt(clan_health) < 100){
				if(parseInt(stats.tokens) > 0 && parseInt(stats.stamina[1]) >= 0){
					$('#war_healer').css('background-color', 'green');
					$('#war_healer_status').text('Healing....');
					build_ajax({page:'war/heal'},function(resp){
						parse_synheal(resp);
					});
				}else{
					$('#war_healer').css('background-color', 'red');
					$('#war_healer_status').text('Needing to heal, but have run out of tokens or stamina, stopping..');
				}
			}else{
				var wait = 12;
				$('#war_healer').css('background-color', 'orange');
				pausing(wait, 'We are all healed, rechecking in ',function(){check_for_heal();});
			}
		}
	}
	
	function parse_synheal(data){
		if(isOn){
			if(/Your Armada total heals have exceeded/.test(data)){
				$('#war_healer').css('background-color', 'red');
				$('#war_healer_status').text('Your Armada total heals have exceeded the maximum amount. Stopping..');
				return;
			}else if(/Your Syndicate total heals have exceeded/.test(data)){
				$('#war_healer').css('background-color', 'red');
				$('#war_healer_status').text('Your Syndicate total heals have exceeded the maximum amount. Stopping..');
				return;
			}else if(/Your Armada has (\d+) heals remaining/.test(data)){
				$('#war_healer').css('background-color', 'green');
				$('#war_healer_status').text('Your Armada was healed..');
				middle(data)
			}else if(/Your Syndicate has (\d+) heals remaining/.test(data)){
				$('#war_healer').css('background-color', 'green');
				$('#war_healer_status').text('Your Syndicate was healed..');
				middle(data)
			}else if(/Your health is already full/.test(data)){
				var wait = 12;
				$('#war_healer').css('background-color', 'green');
				pausing(wait, 'Your health is still full, rechecking in ',function(){check_for_heal();});
			}else if(/Please wait to respawn/.test(data)){
				$('#war_healer').css('background-color', 'orange');
				check_for_heal();
				//$('#war_healer_status').text('Script paused for 15 minutes as your currently dead..');
				//setTimeout(function(){check_for_heal();},15*60*1000);
			}else if(/Not enough tokens/.test(data)){
				$('#war_healer').css('background-color', 'red');
				$('#war_healer_status').text('You need more tokens or stamina, stopping..');
				return;
			}else if(/You need at least/.test(data)){
				$('#war_healer').css('background-color', 'red');
				$('#war_healer_status').text('You need more tokens or stamina, stopping..');
				return;
			}else if(/has -1 heals/.test(data)){
				var wait = 2;
				$('#war_healer').css('background-color', 'orange');
				pausing(wait, 'You maybe dead, checking in ',function(){check_for_heal();});
			}else if(/System busy please/.test(data)){
				var wait = 2;
				$('#war_healer').css('background-color', 'orange');
				pausing(wait, 'Server is busy, retrying in ',function(){
					build_ajax({page:'war/heal'},function(resp){
						parse_synheal(resp);
					});
				});
			}else{
				$('#war_healer').css('background-color', 'red');
				$('#war_healer_status').text('Healing error i haven\'t picked up yet, Stopping..');
			}
		}
	}
	
	function pausing(seconds,message,resume_func) {
		var delay = (seconds > 0) ? delay = 1000 : delay = 100;
		var minutes = (parseInt(seconds/60) == 1) ? 0 : parseInt(seconds/60);
		if (minutes > 0) {				   
			$('#war_healer_status').html(message+' <span id="war_healer_minutes">'+minutes+' minute'+(minutes > 1 ? 's' : '')+'</span> <span id="war_healer_seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>');
		}else{
			$('#war_healer_status').html(message+' <span id="war_healer_minutes"></span> <span id="war_healer_seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>');
		}
		var future = Date.now()+(seconds*1000);
		timer = setInterval(function(){
			var curr = Date.now();
			seconds = Math.floor(Math.abs(new Date(future)-new Date(curr))/1000);
			if(seconds%60 == 0){
				minutes--;
			}
			seconds--;
			if(document.getElementById('war_healer_minutes')){
				document.getElementById('war_healer_minutes').innerHTML = (minutes > 0) ? minutes+' minute'+(minutes==1?'':'s') : '';
			}
			if(document.getElementById('war_healer_seconds')){
				document.getElementById('war_healer_seconds').innerHTML = (seconds % 60)+' second'+(seconds==1 ? '' : 's');
			}else{
				clearInterval(timer);
			}
			if(seconds <= 0){
				clearInterval(timer);
				if(typeof resume_func == 'function'){
					resume_func();
				}
			}
		},delay);
	}
	
	function build_ajax(arr, handler){
		if(isOn){
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
					console.log('Error updating page variables..');
					console.log('Error: '+err.lineNumber);
				}
				handler(resp);
			};
			req.failure_callback = function() {
				i._recordEndTime();
				console.log('Something has failed! Stopping..');
			};
			i._recordStartTime();
			send_ajax(req);	
		}
	};
	
	function send_ajax(param) {
		if(isOn){
			$.ajax({
				url: APP_CONFIG.http_base_url + 'facebook/'+game_url+'/' + param.page,
				type: param.type,
				data: getAjaxData(param.data),
				dataType: param.data_type,
				success: function(resp){
					if(/Your Facebook session has expired/.test(resp)){
						$('#war_healer').css('background-color', 'red');
						$('#war_healer_status').text('Session refresh detected, please refresh tab..');
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
	
	check_for_heal();	
	
}())