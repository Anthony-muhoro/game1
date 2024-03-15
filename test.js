javascript:(function(){
	var game_url;
	var inject_game;
	var script_name = 'Ambusher';
	var check_game = document.location.href;
	if(/\//.test(check_game)){
		game_url = '';		
		inject_game = '#main_menu_div';
	}else{
		game_url = 'mob_wars';
		inject_game = '.metal-bar-repeater:eq(1)';
	}	
	var name;
	var profile_id;
	var badtimeouts;
	var isOn = true; 
	var itsBeen5 = false;
	var bad_coding = false;
	
	$(inject_game).after('<div id="ambusher_div" style="background:orange;height:20px;">'+
	'	<span id="ambusher_status" style="float:left;margin-top:2px;margin-left:2px;font-weight:bold;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:95%;"></span>'+
	'	<span style="float:right;">'+
	'		<div class="inlineblock modal_close_x" style="margin-top:2px;margin-right:2px;" id="ambusher_close">&nbsp;</div>'+
	'	</span>'+
	'	<div style="clear:both;"></div>'+
	'</div>');
	
	$('#ambusher_close').click(function(){
		isOn = false;
		$('#ambusher_div').remove();
		return false;
	});
	
	if(!$('#user_profile_url').length){
		$('#ambusher_div').css('background-color', 'red');
		$('#ambusher_status').text('You don\'t appear to be on a profile page..');
		isOn = false;
	}else{
		profile_id = $('#user_profile_url').attr('value').split('/')[6]
	}
	
	if(profile_id){
		check_profile();
	}
	
	function check_profile(){
		build_ajax({page:'profile/user/'+profile_id},function(resp){
			name = $(resp).find('.page-title').text().trim()+' '+$(resp).find('span[class="bold lightgrey"]').text();
			if(name == ''||name == ' '){
				$('#ambusher_div').css('background-color', 'red');
				$('#ambusher_status').text('You don\'t appear to be on a profile page..');
				isOn = false;
				return;
			}
			if(!/Add to/.test(resp)){
				$('#ambusher_div').css('background-color', 'red');
				$('#ambusher_status').text(name+' is currently friended, stopping..');
				isOn = false;
				return;
			}else{
				var info = 'user_id='+profile_id;
				build_ajax({page:'battle/counter_attack', data:info},function(data){
					if(/Please reduce the number of ambushes in order/.test(data)){
						if(itsBeen5){
							$('#ambusher_div').css('background-color', 'orange');
							$('#ambusher_status').text('Max ambushes set! retrying in 3 seconds..');
							setTimeout(function(){check_profile();},3*1000);
							return;
						}
						if(bad_coding){
							$('#ambusher_div').css('background-color', 'orange');
							$('#ambusher_status').text('You\'ve put the max ambushes on them, trying again..');
							check_profile();
							return;
						}
						bad_coding = true;
						badtimeouts = setTimeout(function(){
							itsBeen5 = true;
						},5*60*1000);
						$('#ambusher_div').css('background-color', 'orange');
						$('#ambusher_status').text('You\'ve put the max ambushes on them, trying again..');
						check_profile();
						return;
					}
					clearTimeout(badtimeouts);
					bad_coding = false;
					itsBeen5 = false;
					if(/You need at least 2 stamina to set/.test(data)){
						$('#ambusher_div').css('background-color', 'red');
						$('#ambusher_status').text('Not enough stamina, stopping..');
						isOn = false;
						return;
					}
					if(/You do not have enough money to/.test(data)){
						$('#ambusher_div').css('background-color', 'red');
						$('#ambusher_status').text('Not enough money, stopping..');
						isOn = false;
						return;
					}
					if(/It will cost you/.test(data)){
						info = 'action_confirm=1&user_id='+profile_id+'&update_id=app-response-message';
						build_ajax({page:'battle/counter_attack', data:info},function(resp2){
							if(/You have successfully ambushed/.test(resp2)||/You have successfully planned/.test(resp2)){
								$('#ambusher_div').css('background-color', 'green');
								$('#ambusher_status').text('You have successfully ambushed '+name);
								check_profile();
							}else{
								$('#ambusher_div').css('background-color', 'red');
								$('#ambusher_status').text('Got a new response on confirming ambush, stopping..');
								isOn = false;
								return;
							}
						})
					}else{
						$('#ambusher_div').css('background-color', 'red');
						$('#ambusher_status').text('Got a new response on launching ambush, stopping..');
						isOn = false;
						return;
					}
				})
			}
		})
	}
	
	function script_logger(msg){
		setTimeout(function(){
			throw new Error(script_name+' status: '+msg);
		}, 0);
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
				success: function(resp){
					if(/Your Facebook session has expired/.test(resp)){
						$('#calendar_div').css('background-color', 'red');
						$('#calendar_status').text('Session refresh detected, please refresh tab..');
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