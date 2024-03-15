    //  https://dl.dropboxusercontent.com/s/jg8t7a7f38cdzz5/Buy_Property.js
 //javascript:(function(){
	var script_name = 'Buy_Property';
 /*   var isOn = true;
    var city_prop = [];
    var myEmpire = [];
    var showEmpirePage = [];
    var reference_cheat = [{pid:100, base_up:10000},{pid:101, base_up:30000},{pid:102, base_up:200000},{pid:103, base_up:400000},{pid:104, base_up:5000000},{pid:105, base_up:16000000},{pid:200, base_up:30000000},{pid:201, base_up:150000000},{pid:202, base_up:200000000},{pid:203, base_up:300000000},{pid:204, base_up:400000000},{pid:205, base_up:500000000},{pid:300, base_up:50000000},{pid:301, base_up:75000000},{pid:302, base_up:168750000},{pid:303, base_up:337500000},{pid:304, base_up:675000000},{pid:305, base_up:1350000000},{pid:400, base_up:200000000},{pid:401, base_up:360000000},{pid:402, base_up:648000000},{pid:403, base_up:1166400000},{pid:404, base_up:2099520000},{pid:405, base_up:3779136000},{pid:500, base_up:180000000},{pid:501, base_up:288000000},{pid:502, base_up:737280000},{pid:503, base_up:1179648000},{pid:504, base_up:1887436000},{pid:505, base_up:3019898000},{pid:600, base_up:100000000},{pid:601, base_up:150000000},{pid:602, base_up:400000000},{pid:603, base_up:750000000},{pid:604, base_up:1000000000},{pid:605, base_up:2500000000},{pid:700, base_up:80000000},{pid:702, base_up:152000000},{pid:703, base_up:288800000},{pid:704, base_up:1000000000},{pid:705, base_up:2500000000},{pid:706, base_up:12500000000},{pid:800, base_up:300000000},{pid:801, base_up:630000000},{pid:802, base_up:9000000000},{pid:803, base_up:18900000000},{pid:804, base_up:39690000000},{pid:805, base_up:83349000000},{pid:900, base_up:100000000000},{pid:901, base_up:125000000000},{pid:902, base_up:150000000000},{pid:903, base_up:175000000000},{pid:1000, base_up:200000000000},{pid:1001, base_up:205000000000},{pid:1002, base_up:210000000000},{pid:1003, base_up:220000000000},{pid:1100, base_up:230000000000},{pid:1101, base_up:235000000000},{pid:1102, base_up:245000000000},{pid:1103, base_up:255000000000},{pid:1200, base_up:260000000000},{pid:1201, base_up:270000000000},{pid:1202, base_up:280000000000},{pid:1203, base_up:290000000000},{pid:1300, base_up:300000000000},{pid:1301, base_up:325000000000},{pid:1302, base_up:350000000000},{pid:1303, base_up:375000000000},{pid:1400, base_up:400000000000},{pid:1401, base_up:425000000000},{pid:1402, base_up:450000000000},{pid:1403, base_up:475000000000},{pid:1500, base_up:500000000000},{pid:1501, base_up:525000000000},{pid:1502, base_up:550000000000},{pid:1503, base_up:575000000000},{pid:1600, base_up:600000000000},{pid:1601, base_up:650000000000},{pid:1602, base_up:700000000000},{pid:1700, base_up:750000000000},{pid:1701, base_up:800000000000},{pid:1702, base_up:850000000000},{pid:1800, base_up:900000000000},{pid:1801, base_up:950000000000},{pid:1802, base_up:1000000000000},{pid:1803, base_up:1050000000000},{pid:1900, base_up:1100000000000},{pid:1901, base_up:1150000000000},{pid:1902, base_up:1200000000000},{pid:2000, base_up:1250000000000},{pid:2001, base_up:1300000000000},{pid:2002, base_up:1350000000000},{pid:2100, base_up:1400000000000},{pid:2101, base_up:1450000000000},{pid:2102, base_up:1500000000000},{pid:2200, base_up:1600000000000},{pid:2201, base_up:1700000000000},{pid:2202, base_up:1800000000000},{pid:2203, base_up:1900000000000},{pid:2300, base_up:2000000000000},{pid:2301, base_up:2200000000000},{pid:2302, base_up:2400000000000},{pid:2303, base_up:2600000000000},{pid:2400, base_up:3000000000000},{pid:2401, base_up:4000000000000},{pid:2402, base_up:5000000000000},{pid:2500, base_up:6000000000000},{pid:2501, base_up:7000000000000},{pid:2502, base_up:8000000000000},{pid:2600, base_up:8000000000000},{pid:2601, base_up:9000000000000},{pid:2602, base_up:10000000000000},{pid:2700, base_up:10500000000000},{pid:2701, base_up:11000000000000},{pid:2800, base_up:11500000000000},{pid:2801, base_up:12000000000000},{pid:2900, base_up:12500000000000},{pid:2901, base_up:13000000000000},{pid:3000, base_up:13500000000000},{pid:3001, base_up:14000000000000},{pid:3100, base_up:14500000000000},{pid:3101, base_up:15000000000000},{pid:3200, base_up:15500000000000},{pid:3201, base_up:16000000000000},{pid:3300, base_up:16500000000000},{pid:3301, base_up:17000000000000},{pid:3400, base_up:17500000000000},{pid:3401, base_up:18000000000000},{pid:3500, base_up:18500000000000},{pid:3501, base_up:19000000000000},{pid:3600, base_up:19500000000000},{pid:3601, base_up:20000000000000}];
     
    function gather_location_data(){
        city_prop = [];
        myEmpire = [];
        $('#travelButton').find('.loc-dropdown > #travel_button').find('.location-sub').each(function(){
            if($(this).hasClass('location_lock_icon')){
                return true;
            }
            city_prop.push({city_name: $(this).text().trim(),city_num:$(this).children().children().attr('onclick').split('switch_location/')[1].split("/',")[0]});
        })
        $('#inner-container').prepend('<div id="entire_empire"></div>');
        gather_prop_data();
    }gather_location_data();
     
    function gather_prop_data(){
        if(!city_prop.length){
            show_properties_page('New York');
        }else{
            console.log('Reading '+city_prop[0].city_name+' property page');
            build_ajax({page:'land/find/land_'+city_prop[0].city_num+'00/'},function(data){
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
                        city:city_prop[0].city_name, 
                        property:property_name, 
                        owned:property_owned, 
                        price:property_price, 
                        income:property_rent, 
                        property_id:propID
                    };
                    myEmpire.push(tmp);         
                })
                city_prop.shift();
                gather_prop_data();
            })
        }
    }
     
    function show_properties_page(city){
        showEmpirePage = [];
        for(var i = 0; i < myEmpire.length; i++) {
            if(myEmpire[i].city == city){
                showEmpirePage.push(myEmpire[i])
            }
        };
        build_property_table(showEmpirePage)
    }
     
    function buy10(param, param2){
        var idClicked = parseInt(param);
        var info = 'id='+idClicked+'&quantity=10';
        build_ajax({page:'land/buy/'+idClicked, data:info},function(data){
            if(/You bought 10/.test(data)){
                var m;
                m=/bought 10 (.*?) for/.exec(data)[1];
                console.log('You bought 10 '+m);
                for(var i = 0; i<myEmpire.length; i++){
                    if(myEmpire[i].property_id == $(data).find('form[id^=re_buy_] [name=id]').val()){
                        myEmpire[i].owned = myEmpire[i].owned+10;
                        for(var j = 0;j<reference_cheat.length; j++){
                            if(myEmpire[i].property_id == reference_cheat[j].pid){
                                myEmpire[i].price = '$'+(parseInt(myEmpire[i].price.replace(/[^0-9]/g, ''))+(reference_cheat[j].base_up));
                            }
                        }
                    }
                }
                show_properties_page(param2);
            }else if(/You need more cash to buy/.test(data)){
                console.log('you need more cash, stopping..');
            }else{
                console.log('check prop error msg..');
            }
        })
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
        for(var i = 0; i<myEmpire.length; i++){
            myEmpire[i].ROI = (10000 * (myEmpire[i].income.replace(/[^0-9]/g, '')/myEmpire[i].price.replace(/[^0-9]/g, ''))).toFixed(4);
            var a = parseInt(myEmpire[i].price.replace(/[^0-9]/g, ''));
            var b = parseInt(myEmpire[i].income.replace(/[^0-9]/g, ''));
            myEmpire[i].turns = Math.ceil(a/b);
        }
        console.log(JSON.stringify(myEmpire))
//      myEmpire.sort(function(a, b) {
 //           return b.ROI - a.ROI;
   //     });
        myEmpire.sort(function(a, b) {
            return a.turns - b.turns;
        });
        my_mobDiv += 'A suggested property to buy next for this city is: 10x of '+arr[0].property+'\'s<br>'+
        'A suggested overall property based on all your cities is: 10x of '+myEmpire[0].property+' in '+myEmpire[0].city+' <br><a href="#" id="'+myEmpire[0].property_id+'" onclick="buy10(this.id, \''+myEmpire[0].city+'\'); return false;" class="buy_em">Buy!</a>';
        $('#entire_empire').html(my_mobDiv);
        $('.buy_em').click();
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
                success: function(resp) {
                    param.success_callback(resp);
                },
                error: function() {
                    param.failure_callback()
                }
            })
        }
    };
     
//})()	
*/

	$('<style id="properties_styles">'+
	'	.properties_container{'+
	'		width: 755px;'+
	'		margin: 0 auto;'+
	'		border: 2px solid #666666;'+
	'		border-radius: 3px;'+
	'		background: black;'+
	'		color: white;'+
	'		position:absolute;'+
	'		z-index:999999;'+
	'	}'+		
	'	.alignleft {'+
	'		float: left;'+
	'	}'+		
	'	.alignright {'+
	'		float: right;'+
	'	}'+		
	'	ul.prop_log_tab{'+
	'		margin: 5px;'+
	'		padding: 0px;'+
	'		list-style: none;'+
	'	}'+		
	'	ul.prop_log_tab li{'+
	'		color: silver;'+
	'		background: #ffffff;'+
	'		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(89,89,89,1)), color-stop(50%, rgba(60,60,60,1)), color-stop(51%, rgba(34,34,34,1)), color-stop(100%, rgba(2,2,2,1)));'+
	'		background: -webkit-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);'+
	'		background: -moz-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);'+
	'		background: -ms-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);'+
	'		background: -o-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);'+
	'		border-radius:3px 3px 0px 0px;'+
	'		display: inline-block;'+
	'		padding: 5px 10px;'+
	'		cursor: pointer;'+
	'		opacity:0.8;'+
	'	}'+
	'	ul.prop_log_tab li.current{'+
	'		color: white;'+
	'		opacity:1;'+
	'	}'+
	'	.prop_log_tab_content{'+
	'		display: none;'+
	'		background: black;'+
	'		color:white;'+
	'		margin: 5px;'+
	'		margin-top: -5px;'+
	'		border: 1px solid #666666;'+
	'	}'+
	'	.prop_log_tab_content.current{'+
	'		display: inherit;'+
	'	}'+
	'	.properties_button {'+
	'		background-color: #4CAF50;'+ 
	'		border: none;'+
	'		border-radius: 3px;'+
	'		color: black;'+
	'		padding: 5px 10px 5px 10px;'+
	'		text-align: center;'+
	'		text-decoration: none;'+
	'		display: inline-block;'+
	'		font-size: 14px;'+
	'		font-weight: bold;'+
	'		margin: 5px;'+
	'		margin-top: -5px;'+
	'		cursor: pointer;'+
	'	}'+		
	'	.properties_button_red {'+
	'		color: white;'+
	'		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(252,78,51,1)), color-stop(50%, rgba(205,69,51,1)), color-stop(51%, rgba(185,22,0,1)), color-stop(100%, rgba(125,8,0,1)));'+
	'		background: -webkit-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
	'		background: -moz-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
	'		background: -ms-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
	'		background: -o-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
	'	}'+		
	'	.properties_button_red:hover {'+
	'		background: #fc4e33;'+
	'	}'+		
	'	.properties_button_green {'+
	'		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(200,250,125,1)), color-stop(50%, rgba(161,202,103,1)), color-stop(51%, rgba(114,171,34,1)), color-stop(100%, rgba(56,101,2,1)));'+
	'		background: -webkit-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
	'		background: -moz-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
	'		background: -ms-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
	'		background: -o-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
	'	}'+		
	'	.properties_button_green:hover {'+
	'		background: #c8fa7d;'+
	'	}'+		
	'	.properties_button_black {'+
	'		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(89,89,89,1)), color-stop(50%, rgba(60,60,60,1)), color-stop(51%, rgba(34,34,34,1)), color-stop(100%, rgba(2,2,2,1)));'+
	'		background: -webkit-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);'+
	'		background: -moz-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);'+
	'		background: -ms-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);'+
	'		background: -o-linear-gradient(top, rgba(89,89,89,1) 0%, rgba(60,60,60,1) 50%, rgba(34,34,34,1) 51%, rgba(2,2,2,1) 100%);'+
	'	}'+		
	'	.properties_button_black:hover {'+
	'		background: #595959;'+
	'	}'+		
	'	.properties_button_white {'+
	'		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(248,248,248,1)), color-stop(50%, rgba(235,235,235,1)), color-stop(51%, rgba(199,199,199,1)), color-stop(100%, rgba(156,156,156,1)));'+
	'		background: -webkit-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(235,235,235,1) 50%, rgba(199,199,199,1) 51%, rgba(156,156,156,1) 100%);'+
	'		background: -moz-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(235,235,235,1) 50%, rgba(199,199,199,1) 51%, rgba(156,156,156,1) 100%);'+
	'		background: -ms-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(235,235,235,1) 50%, rgba(199,199,199,1) 51%, rgba(156,156,156,1) 100%);'+
	'		background: -o-linear-gradient(top, rgba(248,248,248,1) 0%, rgba(235,235,235,1) 50%, rgba(199,199,199,1) 51%, rgba(156,156,156,1) 100%);'+
	'	}'+		
	'	.properties_button_white:hover {'+
	'		background: #EBEBEB;'+
	'	}'+		
	'	.properties_button_orange {'+
	'		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,230,128,1)), color-stop(50%, rgba(255,219,128,1)), color-stop(51%, rgba(255,183,0,1)), color-stop(100%, rgba(255,153,0,1)));'+
	'		background: -webkit-linear-gradient(top, rgba(255,230,128,1) 0%, rgba(255,219,128,1) 50%, rgba(255,183,0,1) 51%, rgba(255,153,0,1) 100%);'+
	'		background: -moz-linear-gradient(top, rgba(255,230,128,1) 0%, rgba(255,219,128,1) 50%, rgba(255,183,0,1) 51%, rgba(255,153,0,1) 100%);'+
	'		background: -ms-linear-gradient(top, rgba(255,230,128,1) 0%, rgba(255,219,128,1) 50%, rgba(255,183,0,1) 51%, rgba(255,153,0,1) 100%);'+
	'		background: -o-linear-gradient(top, rgba(255,230,128,1) 0%, rgba(255,219,128,1) 50%, rgba(255,183,0,1) 51%, rgba(255,153,0,1) 100%);'+
	'	}'+		
	'	.properties_button_orange:hover {'+
	'		background: #ffe680;'+
	'	}'+
	'</style>').appendTo('head');

	var properties_html = '<div class="properties_container">'+
	'	<div style="background:url(data:image/gif;base64,R0lGODlhAQAhAMQAAAcHBxgYGBISEh4eHiQkJCIiIjExMS4uLgQEBCwsLBQUFA4ODigoKDc3NhwcHDk5NQwMDDY2NiYmJhYWFgYGBjAwMCAgIAMDAxAQECoqKhoaGgoKCjQ0NDg4NgkJCTMzMyH5BAAAAAAALAAAAAABACEAAAUb4NM1EfcZ1ZFkjEQU1uBowaQI2AJtHkAhF08IADs=); height:33px; width:755px; repeat-x scroll 0 0;">'+
	'		<span class="alignleft" style="color:gold;margin-left:2px;margin-top:5px;font-weight: bold;">Buy Properties.&#12324; v2.02</span>'+
	'		<span class="alignright" style="margin-top:6px;margin-right:-4px;">'+
	'			<button class="properties_button properties_button_orange" id="properties_close">'+
	'				<img height="18" width="18" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoVJREFUeNpi/P//PwMMsOxmZATRIJETTFBBkMhpgABihCmDKfkMkhYAYl6AAGLcBVHzD6oWBJSZoKZIQOn7QPwAIIAYke1CthMk+h6IhaBimSxAYhMQqwLxFyDmBpkNEvSHWpQGxJogpTCLJIF4Dsg4IOYBCCCQk2D+YEByFjK4CcTqMD8yMyA0IDuxB4jVQGIwhTBPgvAZqGKQWAkQC4PEmZB0gzy9A4hNoRpAjs8CYl2wm4BuNATS5xlwA2UgDgYIIKyhhg2AQrIKSLcCcScQV6DJVwLxCpCzQG40ggqWA3EkmsJ2IM4DGQgKzHogfg7EOUC8DIg5gHg+EHMC8Veox3aATLwKxDpALA81ZR7UGd+AGBQfIKftZIFKOkJpPiD+BMRl0OABRbotLF5hYAVU0UEgfgfEG6HipxigEQ4CAUAcDk0VN6BiZdAYYoQpBIW+ARCzAfFvJBu6gPgHEN8CxTcoZkCeeIgnrJVAIQEQYLBkBjLeD4j1oYliGwNxwBeIPYE4F4j/wpwIwtegSR8Z2AHxYQIGboYmumggXgQLxT9AHALE+9EUHwLlYiCOxWOgORAvBuKF0IC0hUWLGBCnALEMELsD8R2oOA/U5t9IBoOS/zFYqQKNgNtQb5+GGbgHmsvZoKkF5H1+IO4A4u/QYFkENeQUNFcmQMNeDRqDU0CxyILk/Mto3rEAYh9o2kUHy6DeZIAGy22YBHJKBNmmB02mIJfsBGIRIK6BGgqSD4SmI1kg/ggNnhfQ1IthoDc0YnSghQ0jtChrhSZIENgAKqmAeBUQr4b64hVSFgYb2AotKcWhBREogS7FkreRwXIgLgBiBWhhUQ3EC2BlE7UALyhzAAA/2IuI/o0g0AAAAABJRU5ErkJggg==" />'+
	'			</button>'+
	'		</span>'+
	'		<span class="alignright" style="margin-top:6px;margin-right:-4px;">'+
	'			<button class="properties_button properties_button_green" style="height:31px;" id="properties_activity">Run</button>'+
	'		</span>'+
	'	</div>'+
	'	<div style="clear: both;"></div>'+
	'	<span style="margin: 5px;font-weight:bold;">Status: <span id="properties_status">N/A</span></span>'+
	'	<ul class="prop_log_tab">'+
	'		<li class="tab-link current" data-tab="prop_log_tab-1">Log</li>'+
	'	</ul>'+
	'	<div id="prop_log_tab-1" class="prop_log_tab_content current">'+
	'		<div style="border-bottom: 1px solid #666666;margin-left:2px;margin-right:2px;">Log Size <input type="text" id="properties_log_size" value="15" style="width:20px"></input></div>'+
	'		<span style="margin-left:2px;margin-right:2px;" id="properties_log">Loaded..</span>'+
	'	</div>'+
	'</div>';
	
	$('.metal-bar-repeater:first').after(properties_html);
	
	$('#properties_close').click(function(){
		$('#properties_styles').remove();
		$('.properties_container').remove();
	});
	
	$('#properties_activity').click(function(){
		if($(this).hasClass('properties_button_green')){
			$(this).removeClass('properties_button_green').addClass('properties_button_red').text('Stop');
			isOn = true;
			properties_logger('Running script..');
			gather_prop_data();
		}else{
			$(this).removeClass('properties_button_red').addClass('properties_button_green').text('Run');
			isOn = false;
			properties_logger('Script stopped', true);
		}
	});	
	
	var prop_log = [];
	var city_prop = [];
    var myEmpire = [];
	var showEmpirePage = [];
	var isOn = false;
	var reference_cheat = [{pid:100, base_up:10000},{pid:101, base_up:30000},{pid:102, base_up:200000},{pid:103, base_up:400000},{pid:104, base_up:5000000},{pid:105, base_up:16000000},{pid:200, base_up:30000000},{pid:201, base_up:150000000},{pid:202, base_up:200000000},{pid:203, base_up:300000000},{pid:204, base_up:400000000},{pid:205, base_up:500000000},{pid:300, base_up:50000000},{pid:301, base_up:75000000},{pid:302, base_up:168750000},{pid:303, base_up:337500000},{pid:304, base_up:675000000},{pid:305, base_up:1350000000},{pid:400, base_up:200000000},{pid:401, base_up:360000000},{pid:402, base_up:648000000},{pid:403, base_up:1166400000},{pid:404, base_up:2099520000},{pid:405, base_up:3779136000},{pid:500, base_up:180000000},{pid:501, base_up:288000000},{pid:502, base_up:737280000},{pid:503, base_up:1179648000},{pid:504, base_up:1887436000},{pid:505, base_up:3019898000},{pid:600, base_up:100000000},{pid:601, base_up:150000000},{pid:602, base_up:400000000},{pid:603, base_up:750000000},{pid:604, base_up:1000000000},{pid:605, base_up:2500000000},{pid:700, base_up:80000000},{pid:702, base_up:152000000},{pid:703, base_up:288800000},{pid:704, base_up:1000000000},{pid:705, base_up:2500000000},{pid:706, base_up:12500000000},{pid:800, base_up:300000000},{pid:801, base_up:630000000},{pid:802, base_up:9000000000},{pid:803, base_up:18900000000},{pid:804, base_up:39690000000},{pid:805, base_up:83349000000},{pid:900, base_up:100000000000},{pid:901, base_up:125000000000},{pid:902, base_up:150000000000},{pid:903, base_up:175000000000},{pid:1000, base_up:200000000000},{pid:1001, base_up:205000000000},{pid:1002, base_up:210000000000},{pid:1003, base_up:220000000000},{pid:1100, base_up:230000000000},{pid:1101, base_up:235000000000},{pid:1102, base_up:245000000000},{pid:1103, base_up:255000000000},{pid:1200, base_up:260000000000},{pid:1201, base_up:270000000000},{pid:1202, base_up:280000000000},{pid:1203, base_up:290000000000},{pid:1300, base_up:300000000000},{pid:1301, base_up:325000000000},{pid:1302, base_up:350000000000},{pid:1303, base_up:375000000000},{pid:1400, base_up:400000000000},{pid:1401, base_up:425000000000},{pid:1402, base_up:450000000000},{pid:1403, base_up:475000000000},{pid:1500, base_up:500000000000},{pid:1501, base_up:525000000000},{pid:1502, base_up:550000000000},{pid:1503, base_up:575000000000},{pid:1600, base_up:600000000000},{pid:1601, base_up:650000000000},{pid:1602, base_up:700000000000},{pid:1700, base_up:750000000000},{pid:1701, base_up:800000000000},{pid:1702, base_up:850000000000},{pid:1800, base_up:900000000000},{pid:1801, base_up:950000000000},{pid:1802, base_up:1000000000000},{pid:1803, base_up:1050000000000},{pid:1900, base_up:1100000000000},{pid:1901, base_up:1150000000000},{pid:1902, base_up:1200000000000},{pid:2000, base_up:1250000000000},{pid:2001, base_up:1300000000000},{pid:2002, base_up:1350000000000},{pid:2100, base_up:1400000000000},{pid:2101, base_up:1450000000000},{pid:2102, base_up:1500000000000},{pid:2200, base_up:1600000000000},{pid:2201, base_up:1700000000000},{pid:2202, base_up:1800000000000},{pid:2203, base_up:1900000000000},{pid:2300, base_up:2000000000000},{pid:2301, base_up:2200000000000},{pid:2302, base_up:2400000000000},{pid:2303, base_up:2600000000000},{pid:2400, base_up:3000000000000},{pid:2401, base_up:4000000000000},{pid:2402, base_up:5000000000000},{pid:2500, base_up:6000000000000},{pid:2501, base_up:7000000000000},{pid:2502, base_up:8000000000000},{pid:2600, base_up:8000000000000},{pid:2601, base_up:9000000000000},{pid:2602, base_up:10000000000000},{pid:2700, base_up:10500000000000},{pid:2701, base_up:11000000000000},{pid:2800, base_up:11500000000000},{pid:2801, base_up:12000000000000},{pid:2900, base_up:12500000000000},{pid:2901, base_up:13000000000000},{pid:3000, base_up:13500000000000},{pid:3001, base_up:14000000000000},{pid:3100, base_up:14500000000000},{pid:3101, base_up:15000000000000},{pid:3200, base_up:15500000000000},{pid:3201, base_up:16000000000000},{pid:3300, base_up:16500000000000},{pid:3301, base_up:17000000000000},{pid:3400, base_up:17500000000000},{pid:3401, base_up:18000000000000},{pid:3500, base_up:18500000000000},{pid:3501, base_up:19000000000000},{pid:3600, base_up:19500000000000},{pid:3601, base_up:20000000000000}];
	
	$('#travelButton').find('.loc-dropdown > #travel_button').find('.location-sub').each(function(){
		if($(this).hasClass('location_lock_icon')){
			return true;
		}
		city_prop.push({city_name: $(this).text().trim(),city_num:$(this).children().children().attr('onclick').split('switch_location/')[1].split("/',")[0]});
	})
	
	function gather_prop_data(){
		if(!isOn){
			return;
		}
		if(!city_prop.length){
			//console.log(JSON.stringify(myEmpire));
			calculate_better_property();
		}else{
			properties_logger('Reading '+city_prop[0].city_name+' property page', true);
			build_ajax({page:'land/find/land_'+city_prop[0].city_num+'00/'},function(data){
				$(data).find('.land-outer').each(function(){
					var property_name = $(this).find('.land-info > .white').text().trim();
					var propID = $(this).find('.land-button').find('form[id^="buy_form_"] > input[name=id]').val();
					var prop_price = parseFloat($(this).find('[id^="cost_"]').text().replace(/[^0-9.]/g, ''));
					if(prop_price == ''||isNaN(prop_price)){
						return true;
					}
					if($(this).find('[id^="cost_"]:contains("billion")').text()){
						prop_price *= 1000000000;
					}
					if($(this).find('[id^="cost_"]:contains("trillion")').text()){
						prop_price *= 1000000000000;
					}
					if($(this).find('[id^="cost_"]:contains("quadrillion")').text()){
						prop_price *= 1000000000000000;
					}
					var property_price = '$'+prop_price.toFixed(0);
					var property_rent = parseFloat($(this).find('.land-info').text().replace(/[^0-9.]/g, ''));
					if($(this).find('[class^="land-info"]:contains("billion")').text()){
						property_rent *= 1000000000;
					}
					if($(this).find('[class^="land-info"]:contains("trillion")').text()){
						property_rent *= 1000000000000;
					}
					if($(this).find('[class^="land-info"]:contains("quadrillion")').text()){
						property_rent *= 1000000000000000;
					}
					property_rent = '$'+property_rent.toFixed(0);
					var property_owned = parseInt($(this).find('[id^="num_owned_"]').text().replace(/[^0-9]/g, ''));;
					var tmp = {
						city:city_prop[0].city_name, 
						property:property_name, 
						owned:property_owned, 
						price:property_price, 
						income:property_rent, 
						property_id:propID
					};
					myEmpire.push(tmp);         
				})
				city_prop.shift();
				gather_prop_data();
			})
		}
	}
	
    function calculate_better_property(){
		if(!isOn){
			return;
		}
        for(var i = 0; i<myEmpire.length; i++){
            //myEmpire[i].ROI = (10000 * (myEmpire[i].income.replace(/[^0-9]/g, '')/myEmpire[i].price.replace(/[^0-9]/g, ''))).toFixed(4);
			//var pay_info = ((income/prop_price) * 100).toFixed(5);
			myEmpire[i].ROI = ((myEmpire[i].income.replace(/[^0-9]/g, '')/myEmpire[i].price.replace(/[^0-9]/g, '')) * 100).toFixed(5)
        //    var a = parseInt(myEmpire[i].price.replace(/[^0-9]/g, ''));
         //   var b = parseInt(myEmpire[i].income.replace(/[^0-9]/g, ''));
          //  myEmpire[i].turns = Math.ceil(a/b);
        }
//        myEmpire.sort(function(a, b) {
 //           return a.turns - b.turns;
   //     });
		myEmpire.sort(function(a, b) {
            return b.ROI - a.ROI;
        });
		//console.log(JSON.stringify(myEmpire));
		//return;
		properties_logger('Attempting to purchase 10x '+myEmpire[0].property+' from '+myEmpire[0].city, true);
		buy_10_properties(myEmpire[0].property_id);
		//myEmpire[0].property
		//myEmpire[0].property_id
    }
	
	function buy_10_properties(param){
		if(!isOn){
			return;
		}
        var idClicked = parseInt(param);
        var info = 'id='+idClicked+'&quantity=10';
        build_ajax({page:'land/buy/'+idClicked, data:info},function(data){
            if(/You bought 10/.test(data)){
                var m;
                m=/bought 10 (.*?) for/.exec(data)[1];
                properties_logger('You bought 10 '+m);
                for(var i = 0; i<myEmpire.length; i++){
                    if(myEmpire[i].property_id == $(data).find('form[id^=re_buy_] [name=id]').val()){
                        myEmpire[i].owned += 10;
                        for(var j = 0;j<reference_cheat.length; j++){
                            if(myEmpire[i].property_id == reference_cheat[j].pid){
                                myEmpire[i].price = '$'+(parseInt(myEmpire[i].price.replace(/[^0-9]/g, ''))+(reference_cheat[j].base_up));
                            }
                        }
                    }
                }
                calculate_better_property();
            }else if(/You need more cash to buy/.test(data)){
                properties_logger('you need more cash, stopping..');
				$('#properties_activity').click();
            }else{
                properties_logger('check prop error msg..');
				$('#properties_activity').click();
            }
        })
    }
	
	function build_ajax(arr, handler) {
		if(!isOn){
			return;
		}
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
    };
     
    function send_ajax(param){
		if(!isOn){
			return;
		}
		$.ajax({
			url: APP_CONFIG.http_base_url + 'facebook/mob_wars/' + param.page,
			type: param.type,
			data: getAjaxData(param.data),
			dataType: param.data_type,
			success: function(resp) {
				param.success_callback(resp);
			},
			error: function() {
				param.failure_callback()
			}
		})
    };	
	
	
	function properties_logger(msg, status){
		if(status){
			$('#properties_status').html(msg);
		}else{
			prop_log.unshift(msg);
			var LogCount = prop_log.length;
			var limit = parseInt($('#properties_log_size').val());
			prop_log.length = (LogCount < limit) ? LogCount: limit;
			document.getElementById('properties_log').innerHTML = '';
			var LogEntry = '';
			for (LogCount = 0; LogCount < prop_log.length; LogCount++) {
				LogEntry += prop_log[LogCount] + '<br>'
			}
			$('#properties_log').html(LogEntry);
		}
	}