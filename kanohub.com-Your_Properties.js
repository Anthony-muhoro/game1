	//	https://dl.dropboxusercontent.com/s/8mdd9m81388kb13/Your_Properties.js

javascript:(function(){
	var Xproperties = {
		showEmpirePage:[],
		myEmpire:[],
		city_prop:[],
		pageCity:[],
		currLocations:0,
		activeLocations:-1
	}
	
	$('.facebook-width:first').append('<div id="property_config" class="modal-window" style="top: 46.5px; left: 140px; width:800px; display:block;">'+
	'		<div class="modal_close_outer">'+
	'			<div class="modal_close_inner" onclick="$(\'#property_config\').remove(); return false;">'+
	'				<div class="inlineblock">'+
	'					<a href="#" onclick="$(\'#property_config\').remove(); return false;" class="bold text-highlight close-btn">Close</a>'+
	'				</div>'+
	'				<div class="inlineblock modal_close_x">&nbsp;</div>'+
	'			</div>'+
	'		</div>'+
	'		<div id="user_config_modal_callback">'+
    '			<div>'+
    '  			  <center>'+
    '  			          <a href="#" id="loadproperties" class="button button_orange" title="Load or reload your properties">'+
    '			             <span>Load Properties</span>'+
    '			          </a>'+
    '			           <br>'+
    ' 			       <div id="entire_empire">Click Load Properties to get started..</div>'+
    ' 			       <div>'+
    ' 			           <br>'+
    '  			          <a href="#" id="empire_previous_page" class="button button_black" title="Load previous location of properties">'+
    '       			         <span>Previous</span>'+
    '      			      </a>'+
    '     			       <a href="#" id="empire_next_page" class="button button_green" title="Load next location of your properties">'+
    '     			           <span>Next</span>'+
    '     			       </a>'+
    '    			    </div>'+
    '  			  </center>'+
    '			</div>'+
	'			<div style="padding:10px;" id="user_config_container">'+
	'				<div style="text-align: center;margin-top:5px;">'+
	'					<a href="#" onclick="$(\'#property_config\').remove(); return false;" class="bold text-highlight close-btn">Close</a>'+
	'				</div>'+
	'			</div>'+
	'		</div>'+
	'	</div>');
	
	$('#loadproperties').click(function(){
        $('#entire_empire').html('Loading your Empire...');
        your_empire();
        return false;
    })
 
    $('#empire_previous_page').click(function(){
        if(Xproperties.myEmpire.length){
            var page = $('#entire_empire').children().children().children().eq(1).children().eq(0).text();
            page = Xproperties.pageCity.indexOf(page)-1;
            if(page < 0){
                page = Xproperties.activeLocations;
            }
            show_properties_page(Xproperties.pageCity[page])
        }
        return false;
    })
 
    $('#empire_next_page').click(function(){
        if(Xproperties.myEmpire.length){
            var page = $('#entire_empire').children().children().children().eq(1).children().eq(0).text();
            page = Xproperties.pageCity.indexOf(page)+1;
            if(page > Xproperties.activeLocations){
                page = 0;
            }
            show_properties_page(Xproperties.pageCity[page])
        }
        return false;
    })

	function your_empire(){
        Xproperties.city_prop = [];
        Xproperties.myEmpire = [];
        Xproperties.currLocations = $('#travelButton').find('.loc-dropdown').find('.location-sub');
        Xproperties.activeLocations = -1;
        Xproperties.currLocations.each(function(){
            if($(this).hasClass('location_lock_icon')){
                return true;
            }
            Xproperties.activeLocations++;
            Xproperties.city_prop.push({city_name: $(this).text().trim(),city_num:$(this).children().children().attr('onclick').split('switch_location/')[1].split("/',")[0]});
            Xproperties.pageCity.push($(this).text().trim());
        })
		/*console.log('Xproperties.city_prop: '+JSON.stringify(Xproperties.city_prop));
        console.log('Xproperties.myEmpire: '+JSON.stringify(Xproperties.myEmpire));
		console.log('Xproperties.currLocations: '+JSON.stringify(Xproperties.currLocations));
		console.log('Xproperties.activeLocations: '+JSON.stringify(Xproperties.activeLocations));
		console.log('Xproperties.pageCity: '+JSON.stringify(Xproperties.pageCity));*/
		//$('#inner-container').prepend('<div id="entire_empire"></div>');
        gather_prop_data();
    }
 
    function gather_prop_data(){
        if(!Xproperties.city_prop.length){
            show_properties_page('New York');
        }else{
            console.log('Reading '+Xproperties.city_prop[0].city_name+' property page');
            build_ajax({page:'land/find/land_'+Xproperties.city_prop[0].city_num+'00/'},function(data){
                $(data).find('.land-outer').each(function(){
                    var property_name = $(this).find('.land-info > .white').text().trim();
                    var propID = $(this).find('.land-button').find('form[id^="buy_form_"] > input[name=id]').val();
                    var prop_price = parseInt($(this).find('[id^="cost_"]').text().replace(/[^0-9]/g, ''));
                    if(prop_price == ''||isNaN(prop_price)){
                        return true;
                    }
                    if($(this).find('[id^="cost_"]:contains("billion")').text()){
                        prop_price *= 1000000;
                    }
                    if($(this).find('[id^="cost_"]:contains("trillion")').text()){
                        prop_price *= 1000000000;
                    }
                    var property_price = '$'+prop_price;
                    var property_hourly = prop_price;
                    var property_rent = '$'+$(this).find('.land-info').text().replace(/[^0-9]/g, '');
                    var property_owned = parseInt($(this).find('[id^="num_owned_"]').text().replace(/[^0-9]/g, ''));;
                    var tmp = {
                        city:Xproperties.city_prop[0].city_name, 
                        property:property_name, 
                        owned:property_owned, 
                        price:property_price, 
                        income:property_rent, 
                        property_id:propID
                    };
                    Xproperties.myEmpire.push(tmp);         
                })
                Xproperties.city_prop.shift();
                gather_prop_data();
            })
        }
    }
     
    function show_properties_page(city){
        Xproperties.showEmpirePage = [];
        for(var i = 0; i < Xproperties.myEmpire.length; i++) {
            if(Xproperties.myEmpire[i].city == city){
                Xproperties.showEmpirePage.push(Xproperties.myEmpire[i])
            }
        };
        build_property_table(Xproperties.showEmpirePage)
    }
         
    function build_property_table(arr) {
        var my_mobDiv = '<table style="border: 1px solid white; border-collapse:collapse;">'+
        '   <tr>'+
        '       <th style="width:55px; color:white; border:1px solid white; text-align:left;"><center>City</center></th>'+
        '       <th style="width:130px; color:white; border:1px solid white; text-align:left;"><center>Property Name</center></th>'+
        '       <th style="width:40px; color:white; border:1px solid white; text-align:left;"><center>Owned</center></th>'+
        '       <th style="width:130px; color:white; border:1px solid white; text-align:left;"><center>Property Price</center></th>'+
        '       <th style="width:70px; color:white; border:1px solid white; text-align:left;"><center>Income</center></th>'+
        '       <th style="width:70px; color:white; border:1px solid white; text-align:left;"><center>ROI</center></th>'+
        '   </tr>';
        for (var i = 0; i < arr.length; i++) {
            var row_data = arr[i];
            my_mobDiv += '<tr>'+
            '   <td style="color:white; border:1px solid white;"><center>'+row_data.city+'</center></td>'+//.replace('_', ' ')
            '   <td style="color:white; border:1px solid white;"><center>'+row_data.property+'</center></td>'+
            '   <td style="color:white; border:1px solid white;"><center>'+row_data.owned+'</center></td>'+
            '   <td style="color:white; border:1px solid white;">'+row_data.price+'</td>'+
            '   <td style="color:white; border:1px solid white;">$'+row_data.income.replace(/[^0-9]/g, '')*row_data.owned+'</td>'+
            '       </center>'+
            '   </td>'+
            '   <td style="color:white; border:1px solid white;">'+(10000 * (row_data.income.replace(/[^0-9]/g, '')/row_data.price.replace(/[^0-9]/g, ''))).toFixed(4)+'</td>'+
            '</tr>';
            row_data.ROI = (10000 * (row_data.income.replace(/[^0-9]/g, '')/row_data.price.replace(/[^0-9]/g, ''))).toFixed(4);
        };
        arr.sort(function(a, b) {
            return b.ROI - a.ROI;
        });
        my_mobDiv += '</table>';
        for(var i = 0; i<Xproperties.myEmpire.length; i++){
            Xproperties.myEmpire[i].ROI = (10000 * (Xproperties.myEmpire[i].income.replace(/[^0-9]/g, '')/Xproperties.myEmpire[i].price.replace(/[^0-9]/g, ''))).toFixed(4);
            var a = parseInt(Xproperties.myEmpire[i].price.replace(/[^0-9]/g, ''));
            var b = parseInt(Xproperties.myEmpire[i].income.replace(/[^0-9]/g, ''));
            Xproperties.myEmpire[i].turns = Math.ceil(a/b);
        }
        Xproperties.myEmpire.sort(function(a, b) {
            return a.turns - b.turns;
        });
        my_mobDiv += 'A suggested property to buy next for this city is: 10x of '+arr[0].property+'\'s<br>'+
        'A suggested overall property based on all your cities is: 10x of '+Xproperties.myEmpire[0].property+' in '+Xproperties.myEmpire[0].city;
        $('#entire_empire').html(my_mobDiv);
    }	
	
	function commas(num){
        return(''+num).replace(/\B(?=(\d{3})+(?!\d))/g,',')
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
            resp = resp.replace(/<script/ig, '<noscript');
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