//	https://dl.dropboxusercontent.com/s/heyntb2t1bhj5ou/Calendar.js

javascript:(function (){
	var storage;
	try{
		if(localStorage.getItem){
			storage = localStorage;
		}else if(window.localStorage.getItem){
			storage = window.localStorage;
		}
	}catch(storagefail){}
	
	var game_url;
	var inject_game;
	var script_name = 'Calendar';
	var check_game = document.location.href;
	if(/pirate_clan\//.test(check_game)){
		game_url = 'pirate_clan';		
		inject_game = '#main_menu_div';
	}else if(/viking_clan\//.test(check_game)){
		game_url = 'viking_clan';		
		inject_game = '#main_menu_div';
	}else{
		game_url = 'mob_wars';
		inject_game = '.metal-bar-repeater:eq(1)';
	}
	var isOn = true;
	var gid = 0;
	var timer;
	var game_num;
	var jump = '';
	var titles = [];
	
	$(inject_game).after('<div id="calendar_div" style="background:orange;height:20px;">'+
	'	<span id="calendar_status" style="float:left;margin-top:2px;margin-left:2px;font-weight:bold;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:95%;">Connecting...</span>'+
	'	<span style="float:right;">'+
	'		<div class="inlineblock modal_close_x" style="margin-top:2px;margin-right:2px;" id="calendar_close">&nbsp;</div>'+
	'	</span>'+
	'	<div style="clear:both;"></div>'+
	'</div>');
	
	$('#calendar_close').click(function(){
		isOn = false;
		clearInterval(timer);
		$('#calendar_div').remove();
		return false;
	});
	
	if($('#bullet_offer_0').length){
		gid = $('#bullet_offer_0').attr('onclick').split(/minigame_id=/)[1].split(/',top:/)[0];
		load_info();
	}else{
		readSettings();
		if(game_num){
			build_ajax({page:'minigame/play/'+game_num},function(data){
				if(/Download the Background/.test(data)){
					isOn = false;
					try{
						storage.removeItem('calendar_kano');
					}catch(noStorage){
						console.log('Error accessing local storage..')
					}
					$('#calendar_div').css('background-color', 'red');
					$('#calendar_status').html('You don\'t appear to be on a mini game page or no current mini game detected..');
				}else{
					gid = game_num;
					load_info();
				}
			})
			return;
		}
		$('#calendar_div').css('background-color', 'red');
		$('#calendar_status').html('You don\'t appear to be on a mini game page or no mini game detected..');
	}
	
	function load_info(){
		jump = '<a href="#" onclick="return ajax({page:\'minigame/play/'+gid+'\',top:1});" target="_top">Jump! </a>';
		if(isOn){
			build_ajax({page:'minigame/play/'+gid},function(data){
				writeSettings();
				if(/PLAY AGAIN/.test(data)){
					$('#calendar_div').css('background-color', 'green');
					$('#calendar_status').html(jump+'Mini game has finished!');
					play_mini_again();
					return;
				}
				if(/Free Keys Full/.test(data)||!$(data).find('.day_shooter-shot-clip-empty').length){
					titles = [];
					$(data).find('.inlineblock.bold').each(function(){
						if($(this).children().hasClass('day_shooter-target-current')){
							return true;
						}
						if($(this).hasClass('large')){
							return true;
						}
						var target = $(this).find('.day_shooter-target').attr('onclick');
						target = target.split(/data:'/)[1].split(/',top/)[0];
						titles.push({target:target});
					})
					if(titles.length){
						attempt_event();
					}else{
						$('#calendar_div').css('background-color', 'red');
						$('#calendar_status').html(jump+'Minigame may of finished...');
					}
				}else if(!$(data).find('#bullet_countdown').length){
					$('#calendar_div').css('background-color', 'red');
					$('#calendar_status').html(jump+'Minigame may of finished...');
				}else{
					//console.log('last else');
					var key_time = $(data).find('#bullet_countdown').text().split(':');
					var mins = parseInt(key_time[0])*(60*1000);
					var secs = parseInt(key_time[1])*1000;
					var restart_mini = mins+secs+1000;
					$('#calendar_div').css('background-color', 'orange');
					pausing(restart_mini/1000, jump+'Restarting in: ', function(){load_info();})
				}
			})	
		}
	}
	
	function attempt_event(){
		build_ajax({page:'minigame/shoot',data:titles[0].target},function(resp){
			var cash = $(resp).find('.day_shooter-payout-bg').find('.green').text();
			var xp = $(resp).find('.day_shooter-payout-bg').find('.lightgrey').text();
			$('#calendar_div').css('background-color', 'green');
			$('#calendar_status').html(jump+'You made '+cash+' and earned '+xp);
			if(/PLAY AGAIN/.test(resp)){
				$('#calendar_div').css('background-color', 'green');
				$('#calendar_status').html(jump+'Mini game has finished!');
				play_mini_again();
				return;
			}
			if(/Thanks for playing and check/.test(resp)){
				$('#calendar_div').css('background-color', 'red');
				$('#calendar_status').html(jump+'Mini game has finished! Stopping..');
				return;
			}
			if(!$(resp).find('.day_shooter-shot-clip-empty').length){
				titles = [];
				$(resp).find('.inlineblock.bold').each(function(){
					if($(this).children().hasClass('day_shooter-target-current')){
						return true;
					}
					if($(this).hasClass('large')){
						return true;
					}
					var target = $(this).find('.day_shooter-target').attr('onclick');
					target = target.split(/data:'/)[1].split(/',top/)[0];
					titles.push({target:target});
				})
				if(titles.length){
					attempt_event();
				}else{
					$('#calendar_div').css('background-color', 'red');
					$('#calendar_status').html(jump+'Minigame may of finished...');
				}
			}else if($(resp).find('#bullet_countdown')){
				var key_time = $(resp).find('#bullet_countdown').text().split(':');
				var mins = parseInt(key_time[0])*(60*1000);
				var secs = parseInt(key_time[1])*1000;
				var restart_mini = mins+secs+1000;
				$('#calendar_div').css('background-color', 'orange');
				pausing(restart_mini/1000, jump+'Restarting in: ', function(){load_info();})
			}else{
				load_info();
			}
		})
	}
	
	function play_mini_again(){
		var info = 'minigame_id='+gid;
		build_ajax({page:'minigame/reset_minigame/',data:info},function(){
			load_info();
		})
	}
	
	function pausing(seconds,message,resume_func) {
		var delay = (seconds > 0) ? delay = 1000 : delay = 100;
		var minutes = (parseInt(seconds/60) == 1) ? 0 : parseInt(seconds/60);
		if (minutes > 0) {				   
			$('#calendar_status').html(message+' <span id="calendar_div_minutes">'+minutes+' minute'+(minutes > 1 ? 's' : '')+'</span> <span id="calendar_div_seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>');
		}else{
			$('#calendar_status').html(message+' <span id="calendar_div_minutes"></span> <span id="calendar_div_seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>');
		}
		var future = Date.now()+(seconds*1000);
		timer = setInterval(function(){
			var curr = Date.now();
			seconds = Math.floor(Math.abs(new Date(future)-new Date(curr))/1000);
			if(seconds%60 == 0){
				minutes--;
			}
			seconds--;
			if(document.getElementById('calendar_div_minutes')){
				document.getElementById('calendar_div_minutes').innerHTML = (minutes > 0) ? minutes+' minute'+(minutes==1?'':'s') : '';
			}
			if(document.getElementById('calendar_div_seconds')){
				document.getElementById('calendar_div_seconds').innerHTML = (seconds % 60)+' second'+(seconds==1 ? '' : 's');
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
				$('#calendar_div').css('background-color', 'red');
				$('#calendar_status').html(jump+'Something has failed! Stopping..');
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
						$('#calendar_status').html(jump+'Session refresh detected, please refresh tab..');
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
	
	function readSettings(){
		if(storage.getItem("calendar_kano")){
			game_num = JSON.parse(storage.getItem("calendar_kano"));
		}
	}
	
	function writeSettings(){
		storage.setItem("calendar_kano", JSON.stringify(gid));
	}
	
}())