	// https://dl.dropboxusercontent.com/s/cnlkck2ow2d4ybq/IA.js

javascript:(function(){	 
	var read_pages = 1;
	var pages_read = 1;
	var equip = ['armor','vehicle'];
	var weapons = [];
	var armor = [];
	var vehicles = [];
	
	function load_invent_info(){
		build_ajax({page:'inventorymanager'},function(data){
			$(data).find('.invmng-page-links:first > a').each(function(){
				if($(this).text() == 'Next'||$(this).text() == 'Previous'){
					return true;
				}
				read_pages++;
			});
			var type = $(data).find('#menu_root').text().toLowerCase().replace("\n", "").trim();
			if(type == 'weapons'){
				read_items(data, type);
			}		
		})
	}
	
	function read_items(data, type){
		$(data).find('.inv-mng-item-limited').each(function(){
			var shop = false;
			if($(this).find('a[id^="buying_item_"]').length > 0){
				if(/Favor/.test($(this).find('a[id^="buying_item_"]').text())){
					shop = 'favor';				
				}
			}
			//var name = $(this).find('p[class="bold medium"]').text().trim();
			var name = $(this).find('.inv-mng-image').children().attr('title');
			var att = $(this).find('.attack-icon.inherit').parent().text().replace(/[^0-9]/g, '')|0;
			var def = $(this).find('.defense-icon.inherit').parent().text().replace(/[^0-9]/g, '')|0;
/*			var att = parseInt($(this).find('p[class="bold medium"]').next().text())|0;
			var def = parseInt($(this).find('p[class="bold medium"]').next().next().text())|0;
			if(name == ''){
				name = $(this).find('p[class="bold medium raid-text-highlight"]').text().trim();
				att = parseInt($(this).find('p[class="bold medium raid-text-highlight"]').next().text());
				def = parseInt($(this).find('p[class="bold medium raid-text-highlight"]').next().next().text());
			}
	*/		var own = parseInt($(this).find('p[class="large bold"]').text().replace(/[^0-9]/g, ''))|0;
			var item_id = $(this).find('form input[name=inventory_id]').val();
			var temp = {name:name, attack:att, defense:def, amount:own, type:type, id:item_id, buy:shop};
			if(type == 'weapons'){
				weapons.push(temp);
			}else if(type == 'armor'){
				armor.push(temp);
			}else if(type == 'vehicle'){
				vehicles.push(temp);
			}
		})
		$(data).find('.inv-mng-item').each(function(){
			var shop = false;
			if($(this).find('a[id^="buying_item_"]').length > 0){
				if(/Loyalty/.test($(this).find('a[id^="buying_item_"]').text())){
					shop = 'loyalty';					
				}else{
					shop = true;
				}
			}
			//var name = $(this).find('p[class="bold medium"]').text().trim();
			var name = $(this).find('.inv-mng-image').children().attr('title');
			var att = $(this).find('.attack-icon.inherit').parent().text().replace(/[^0-9]/g, '')|0;
			var def = $(this).find('.defense-icon.inherit').parent().text().replace(/[^0-9]/g, '')|0;
			//var att = parseInt($(this).find('p[class="bold medium"]').next().text())|0;
			//var def = parseInt($(this).find('p[class="bold medium"]').next().next().text())|0;
			//if(name == ''){
			//	name = $(this).find('p[class="bold medium raid-text-highlight"]').text().trim();
			//	att = parseInt($(this).find('p[class="bold medium raid-text-highlight"]').next().text());
			//	def = parseInt($(this).find('p[class="bold medium raid-text-highlight"]').next().next().text());
			//}
			var own = parseInt($(this).find('p[class="large bold"]').text().replace(/[^0-9]/g, ''))|0;
			var item_id = $(this).find('form input[name=inventory_id]').val();
			var temp = {name:name, attack:att, defense:def, amount:own, type:type, id:item_id, buy:shop};
			if(type == 'weapons'){
				weapons.push(temp);
			}else if(type == 'armor'){
				armor.push(temp);
			}else if(type == 'vehicle'){
				vehicles.push(temp);
			}
		})
		read_pages--;
		if(read_pages > 0){
			next_page(type);	
		}else{
			if(!equip.length){
				$('#sortby_attack').trigger('click');
				$('#ia_tog').show();
				$('#ia_analyse').show();
//				console.log(JSON.stringify(weapons));
	//			console.log(JSON.stringify(armor));
		//		console.log(JSON.stringify(vehicles));				
			}else{
				next_equip();
			}			
		}
	}
	
	function next_equip(){
		var equip_type = equip.shift();
		var info = 'inventory_type='+equip_type+'&inventory_sort_field=attack&inventory_sort_direction=DESC&inventory_own_filter&inventory_filter&highlight_item_id&page=1';
		build_ajax({page:'inventorymanager/load_inventory',data:info},function(data){
			read_pages = 1;
			pages_read = 1;
			$(data).find('.invmng-page-links:first > a').each(function(){
				if($(this).text() == 'Next'||$(this).text() == 'Previous'){
					return true;
				}
				read_pages++;
			});
			read_items(data, equip_type);
		})
	}

	function next_page(param){
		pages_read++;
		var info = 'page='+pages_read+'&inventory_type='+param+'&inventory_sort_field=attack&inventory_sort_direction=DESC&inventory_own_filter&inventory_filter&highlight_item_id';
		build_ajax({page:'inventorymanager/load_inventory',data:info},function(data){
			read_items(data, param);
		})
	}

	var mobsize = parseInt($('#generals-reload').text());
	var ia_table = '';
	var analyze = [];
	var analyze_dupecheck = '';
	var main_html = '<div style="width:100%;" id="ia__">'+
	'	<center>'+
	'		<h2>Top '+mobsize+' Attack and Defense items - <a href="#" id="ia_close">CLOSE</a></h2>'+
	'		<p>Sort by: <a href="#" id="sortby_attack">Attack</a> | <a href="#" id="sortby_defense">Defense</a><br>Show: <a href="#" id="show_Weapons">Weapons</a> | <a href="#" id="show_Armor">Armor</a> | <a href="#" id="show_Vehicles">Vehicles</a></p>'+
	'		<span id="ia_tog" style="display:none;"><a href="#" id="ia_table_s">Show Results</a>|<a href="#" id="ia_sugg">Show Suggestions</a></span>'+
	'		<div id="ia_sug_table" style="display:none;"></div>'+
	'	</center>'+
	'	<div id="ia_table"></div>'+
	'	<center>'+
	'		<a href="#" id="ia_analyse">Click to Analyse</a>'+
	'	</center>'+
	'</div>';
	
	function write_ia_table(object, sortby, header, limit){
		function customSort(property) {
			return function (b, a) {
				return parseInt(a[property]) - parseInt(b[property]);
			};
		}
		object.sort(customSort(sortby));
		var count = 0;
		var tally = 0;
		var zebra = 0;
		ia_table += '<div id="ia_'+header+'" style="display:none;">';
		ia_table += '<table style="width:100%;">';
		ia_table += '<tr><th><h3 class="good">Top '+header+'</h3></th><th>Attack</th><th>Defense</th><th>Using</th><th>Have</th><th>Purchasable</th><th>amount</th><th>increase</th></tr>';
		for(y in object){
			object[y].equipped_offense = 0;
			object[y].equipped_defense = 0;
		}
		var c22 = 0;
		for(xyz in object){
			object[xyz].equipped_offense = ((c22+object[xyz].amount)>limit?limit-c22:object[xyz].amount);
			object[xyz].equipped_defense = ((c22+object[xyz].amount)>limit?limit-c22:object[xyz].amount);
			c22 += ((c22+object[xyz].amount)>limit?limit-c22:object[xyz].amount);
			if(c22 >= limit){
				break;
			}
		}
		var c2 = 0;
		for(z in object){
			var i_improvement = [];			
			i_improvement = find_improvements(object, object[z][sortby], sortby, object[z].type);
			if(i_improvement[0] > 0){//analyze_dupecheck.search(object[z].name) < 0 && 
				object[z].improv_amount = i_improvement[0];
				object[z].improv_increase = commas(i_improvement[1]);
				analyze_dupecheck += object[z].name+'|';
			}
			c2 += ((c2+object[z].amount)>limit?limit-c2:object[z].amount);
			console.log('list '+JSON.stringify(i_improvement));
			if(c2 >= limit){
				break;
			}
		}
		for(x in object){
			ia_table += '<tr style="background-color:'+(zebra%2?'#000000':'#202020')+'">\
				<td>'+object[x].name+'</td>\
				<td><center>'+object[x].attack+'</center></td>\
				<td><center>'+object[x].defense+'</center></td>\
				<td><center>'+((count+object[x].amount)>limit?limit-count:object[x].amount)+'</center></td>\
				<td><center>'+object[x].amount+'</center></td>\
				<td><center>'+(object[x].buy ? '<span style="color:green;">'+object[x].buy+'</span>' : '<span style="color:red;">'+object[x].buy+'</span>')+'</center></td>';
			//object[x].equipped_offense = ((count+object[x].amount)>limit?limit-count:object[x].amount);
			//object[x].equipped_defense = ((count+object[x].amount)>limit?limit-count:object[x].amount);
			tally += ((count+object[x].amount)>limit?limit-count:object[x].amount);
			count += ((count+object[x].amount)>limit?limit-count:object[x].amount);
			zebra++;
			if(object[x].improv_amount){
				ia_table += '<td><span class="font_good">+'+object[x].improv_amount+'x</span></td>';
				ia_table += '<td><span class="font_good">+'+object[x].improv_increase+'</span></td>';
			}else{
				ia_table += '<td></td><td></td>';
			}
			//var i_improvement = [];			
			//i_improvement = find_improvements(object, object[x][sortby],sortby,object[x].type);
			//if(analyze_dupecheck.search(object[x].name) < 0 && i_improvement[0] > 0){// && object[x].buy
				//ia_table += '<td><span class="font_good">+'+i_improvement[0]+'x</span></td>';
				//ia_table += '<td><span class="font_good">'+commas(i_improvement[1])+'</span></td>';
				//analyze[analyze.length] = '<td>['+(object[x].type == 'powerup'? 'Armor':object[x].type)+']</td> <td><span class="font_good">'+i_improvement[0]+'x</span> '+object[x].name+' for a '+sortby+' increase of around: <span class="font_good">'+commas(i_improvement[1])+'</span></td>';
				//analyze_dupecheck += object[x].name+'|';
			//}
			ia_table += '</tr>\n';
			if(count >= limit){
				break;
			}
		}/*
		var c2 = 0;
		for(z in object){
			var i_improvement = [];			
			i_improvement = find_improvements(object, object[z][sortby],sortby,object[z].type);
			if(analyze_dupecheck.search(object[z].name) < 0 && i_improvement[0] > 0){// && object[z].buy
				analyze[analyze.length] = '<td>['+(object[z].type == 'powerup'? 'Armor':object[z].type)+']</td> <td><span class="font_good">'+i_improvement[0]+'x</span> '+object[z].name+' for a '+sortby+' increase of around: <span class="font_good">'+commas(i_improvement[1])+'</span></td>';
				analyze_dupecheck += object[z].name+'|';
			}
			c2 += ((c2+object[z].amount)>limit?limit-c2:object[z].amount);
			if(c2 >= limit){
				break;
			}
		}
		if(analyze.length > 0){
			var z2 = 0;
			var analyze_output = '<table>';
			for (i=0;i<analyze.length;i++) {
				analyze_output += '<tr style="background-color:'+(z2%2?'#000000':'#202020')+'">';
				analyze_output += analyze[i];
				analyze_output += '</tr>';
				z2++;
			}	
			analyze_output += '</table>';
			jQuery('#ia_sug_table').html(analyze_output);
		}*/
		ia_table += '<tr style="background-color:'+(zebra%2?'#000000':'#202020')+'"><td colspan="8">Equipped Total '+tally+'/'+limit+'</td></tr>'
		ia_table += '</table>';
		ia_table += '</div>';
	}
	
	function find_improvements(Items, m_value, category, c_type) {
		var i_count = 0;
		var i_value = 0;
		var t_item_count = 0;
		var t_item_improvement = 0;
		for (var l = 0; l < Items.length; l++) {
            if (Items[l].type  == c_type && ((category == 'attack' && Items[l].equipped_offense > 0 && Items[l].attack < m_value)||(category == 'defense' && Items[l].equipped_defense > 0 && Items[l].defense < m_value))) {
				if (category == 'attack') {
						i_count = parseInt(Items[l].equipped_offense);
						i_value = parseInt(Items[l].attack);
				}
				if (category == 'defense') {
						i_count = parseInt(Items[l].equipped_defense);
						i_value = parseInt(Items[l].defense);
				}
				t_item_count = t_item_count + i_count;
 				t_item_improvement = t_item_improvement + (i_count*(m_value - i_value));
			}
		}
		return [t_item_count, t_item_improvement];
	}
	
	function commas(num){
		return(''+num).replace(/\B(?=(\d{3})+(?!\d))/g,',')
	}

	$('.app-body').before(main_html);
	
	$('#ia_close').click(function(){
		$('#ia__').remove();
		return false;
	})
	
	$('a[id^="sortby_"]').click(function(){
		ia_table = '';
		analyze = [];
		analyze_dupecheck = '';
		write_ia_table(weapons, $(this).attr('id').split("_")[1], 'Weapons', mobsize);
		write_ia_table(armor, $(this).attr('id').split("_")[1], 'Armor', mobsize);
		write_ia_table(vehicles, $(this).attr('id').split("_")[1], 'Vehicles', mobsize);
		$('#ia_table').html(ia_table);
		$('#ia_Weapons').show();
		return false;
	})
		
	$('a[id^="show_"]').click(function(){
		$('#ia_Weapons, #ia_Armor, #ia_Vehicles').hide();
		$('div[id=ia_'+$(this).attr('id').split('_')[1]).show();
		return false;
	})	
	
	$('#ia_analyse').click(function(){
		$(this).hide();
		$('#ia_tog').hide();
		$('#ia_table').html('<center>Reading pages to gather info..</center>');
		analyze = [];
		analyze_dupecheck = '';
		load_invent_info()
		return false;
	})
	
	$('#ia_table_s').click(function(){
		$('#ia_sug_table').hide();
		$('#ia_table').show();
		return false;
	})

	$('#ia_sugg').click(function(){
		$('#ia_sug_table').show();
		$('#ia_table').hide();	
		return false;
	})	
	
	function build_ajax(arr, handler) {
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
			console.log('something failed!');
		};
		i._recordStartTime();
		send_ajax(req);		
	};

	function send_ajax(param){
		$.ajax({
			url: APP_CONFIG.http_base_url + 'facebook/mob_wars/' + param.page,
			type: param.type,
			data: getAjaxData(param.data),
			dataType: param.data_type,
			success: function(resp){
				param.success_callback(resp);
			},
			error: function() {
				param.failure_callback()
			}
		})
	};
})()