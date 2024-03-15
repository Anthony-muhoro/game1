	// https://dl.dropboxusercontent.com/s/3gj0tc9txgwju1d/Do_Job_One.js
	
javascript:(function(){	
	var script_name = 'Do Job One';
	var isOn = true;
	
	$('.metal-bar-repeater:eq(1)').after('<div id="do_job_one_div" style="background:orange;height:20px;">'+
	'	<span id="do_job_one_status" style="float:left;margin-top:2px;margin-left:2px;font-weight:bold;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:95%;"></span>'+
	'	<span style="float:right;">'+
	'		<div class="inlineblock modal_close_x" style="margin-top:2px;margin-right:2px;" id="do_job_one_close">&nbsp;</div>'+
	'	</span>'+
	'	<div style="clear:both;"></div>'+
	'</div>');
	
	$('#do_job_one_close').click(function(){
		isOn = false;
		$('#do_job_one_div').remove();
		return false;
	});
	
	$('#do_job_one_div').css('background-color', 'orange');
	$('#do_job_one_status').text('Traveling to NY');
	
	function do_job_one(){
		if(isOn){
			build_ajax({page:'quests/do_quest/100'},function(data){
				if(/You must travel to New York/.test(data)){
					$('#do_job_one_div').css('background-color', 'orange');
					$('#do_job_one_status').text('Traveling to NY');
					travel_to_ny();
				}else if(/You Used:/.test(data)){
					$('#do_job_one_div').css('background-color', 'green');
					$('#do_job_one_status').text('Job done!');
					do_job_one()
				}else{
					$('#do_job_one_div').css('background-color', 'red');
					$('#do_job_one_status').text('Got a message i dont know, stopping..');
					isOn = false;
				}
			})
		}
	}do_job_one();
	
	function travel_to_ny(){
		if(isOn){
			build_ajax({page:'quests/switch_location/1/'},function(data){
				if(/You have travelled to New York/.test(data)){
					$('#do_job_one_div').css('background-color', 'orange');
					$('#do_job_one_status').text('Arrived in NY, attempting to do job..');
					do_job_one();
				}else{
					$('#do_job_one_div').css('background-color', 'red');
					$('#do_job_one_status').text('Got a message i dont know, stopping..');
					isOn = false;
				}
			})
		}
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
				url: APP_CONFIG.http_base_url + 'facebook/mob_wars/' + param.page,
				type: param.type,
				data: getAjaxData(param.data),
				dataType: param.data_type,
				success: function(resp){
					if(/Your Facebook session has expired/.test(resp)){
						$('#do_job_one_div').css('background-color', 'red');
						$('#do_job_one_status').text('Session refresh detected, please refresh tab..');
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