//  https://dl.dropboxusercontent.com/s/azoa9hqadr0gavq/Raid_Killer.js

javascript:(function (){
    var isOn = true;
    var raid_stam = 20;
    var en_stop_at = 3000;
    var stats = {
        health: 0,
        stamina: 0,
        tokens: 0
    };
    var bossInfo = {
        boss_start_ts: 0,
        bid: 0,
        boss_user_id: 0,
        raid_boss_collect_id: 0
    };
    var check_game = document.location.href;
    var game_url;
    var inject_game;
    if(/pirate_clan\//.test(check_game)){
        game_url = 'pirate_clan';       
        inject_game = '#main_menu_div';
    }else{
        game_url = 'mob_wars';
        inject_game = '.metal-bar-repeater:eq(1)';
    }
     
    $(inject_game).after('<div id="raid_killer" style="background:orange;height:20px;">'+
    '   <span id="raid_killer_status" style="float:left;margin-top:2px;margin-left:2px;font-weight:bold;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:95%;">Connecting...</span>'+
    '   <span style="float:right;">'+
    '       <div class="inlineblock modal_close_x" style="margin-top:2px;margin-right:2px;" id="raid_killer_close">&nbsp;</div>'+
    '   </span>'+
    '   <div style="clear:both;"></div>'+
    '</div>');
     
    $('#raid_killer_close').click(function(){
        isOn = false;
        $('#raid_killer').remove();
        return false;
    });
     
    if($('.raid-reward-left-menu-text').length){
        //console.log('you seem to be a part of this raid');
        load_info();
    }else{
        $('#raid_killer').css('background-color', 'red');
        $('#raid_killer_status').text('You don\'t appear to be in this raid or no raid detected..')
    }
     
    function load_info(){
        bossInfo.boss_user_id = $('form input[name=boss_user_id]').val();
        bossInfo.bid = $('form input[name=boss_id]').val();//
        bossInfo.boss_start_ts = $('form input[name=boss_start_ts]').val();
        bossInfo.raid_boss_collect_id = $('input[name=link]').val().split('/')[6];
        start_the_raid();
    }
     
    function start_the_raid(){
        if(isOn){
            var info = 'boss_id='+bossInfo.bid+'&boss_user_id='+bossInfo.boss_user_id+'&raid_boss_collect_id='+bossInfo.raid_boss_collect_id+'&boss_start_ts='+bossInfo.boss_start_ts;
            build_ajax({page:'boss/view/'+bossInfo.boss_user_id+'/'+bossInfo.bid+'/'+bossInfo.boss_start_ts+'/1', data:info}, function(resp){
                update_ourStats(resp);
                if(/Time Left To Defeat/.test(resp)){
                    var info = $(resp).find('.boss-attack-button').parent().prev();
                    var buid = info.find('input[name="boss_user_id"]').val();
                    var bid = info.find('input[name="boss_id"]').val();
                    var bts = info.find('input[name="boss_start_ts"]').val();
                    var more_info = 'boss_user_id='+buid+'&boss_id='+bid+'&boss_start_ts='+bts+'&stamina_amount='+raid_stam;
                    var url = 'boss/attack/'+bid;
                    if(raid_stam > 4){
                        url = 'boss/boost_attack/'+bid;
                    }
                    build_ajax({page:url, data:more_info}, function(data){
                        parse_raid(data);
                    })
                }
            })
        }
    }
     
    function att_raid(data){
        if(isOn){
            var info = $(data).find('.boss-attack-button').parent().prev();
            var buid = info.find('input[name="boss_user_id"]').val();
            var bid = info.find('input[name="boss_id"]').val();
            var bts = info.find('input[name="boss_start_ts"]').val();
            var info = 'boss_user_id='+buid+'&boss_id='+bid+'&boss_start_ts='+bts+'&stamina_amount='+raid_stam;
            var url = 'boss/attack/'+bid;
            if(raid_stam > 4){
                url = 'boss/boost_attack/'+bid;
            }
            build_ajax({page:url, data:info}, function(resp){
                parse_raid(resp);
            })
        }
    }
     
    function heal_raid(data){
        if(isOn){
            var info = $(data).find('.boss-heal-button').parent().prev();
            var buid = info.find('input[name="boss_user_id"]').val();
            var bid = info.find('input[name="boss_id"]').val();
            var bts = info.find('input[name="boss_start_ts"]').val();
            var eam = info.find('input[name="energy_amount"]').val();
            var pa = info.find('input[name="power_attack"]').val();
            if(parseInt(stats.energy[1]) >= 20){
                var info = 'boss_user_id='+buid+'&boss_id='+bid+'&boss_start_ts='+bts+'&energy_amount='+eam+'&power_attack='+pa;
                build_ajax({page:'boss/raid_heal/'+bid,data:info}, function(resp){
                    parse_raid(resp);                   
                })
            }else{
                $('#raid_killer').css('background-color', 'red');
                $('#raid_killer_status').text('Party needs to heal, not enough energy, Stopping..');
                stop_all();
            }
        }
    }
     
    function parse_raid(data){
        if(isOn){
            if(/boss-win/.test(data)){
                $('#raid_killer').css('background-color', 'orange');
                $('#raid_killer_status').text('The boss has been defeated!, Stopping..');
                return;
            }
            update_ourStats(data);
            var info = $(data).find('.boss-attack-button').parent().prev();
            var buid = info.find('input[name="boss_user_id"]').val();
            var bid = info.find('input[name="boss_id"]').val();
            var bts = info.find('input[name="boss_start_ts"]').val();
            if(/raid is already at maximum health/.test(data)){
                $('#raid_killer').css('background-color', 'green');
                $('#raid_killer_status').text('Raid is already at maximum health');
                att_raid(data);
                return;
            }
            if(/do not have enough Stamina to/.test(data)){
                $('#raid_killer').css('background-color', 'red');
                $('#raid_killer_status').text('Not enough stamina, Stopping..');
                stop_all();
                return;
            }
            if(/Boss is currently being attacked/.test(data)){
                $('#raid_killer').css('background-color', 'orange');
                $('#raid_killer_status').text('Boss is currently being attacked by someone else');
                att_raid(data);
                return;
            }
            if(/green bold/.test(data)||/- (\d+) Stamina/.test(data)||/- 20 Energy/.test(data)){
                var party_health = $(data).find('.progress-bar-inner-text:first').text();
                var party_health_percent = $(data).find('.progress-bar-inner:first').attr('style').replace(/[^0-9]/g, '');
                var snakes_rem = $(data).find('.progress-bar-inner-text:eq(1)').text();                 
                var snakes_rem_percent = $(data).find('.progress-bar-inner:eq(1)').attr('style').replace(/[^0-9]/g, '');
                $('#raid_killer').css('background-color', 'green');
                $('#raid_killer_status').text('Party Health: '+party_health+' ('+party_health_percent+'%) remaining health '+snakes_rem+' ('+snakes_rem_percent+'%)');
                if(parseInt(party_health_percent) < 99||/Careful, the Raid is at low/.test(data)){
                    $('#raid_killer').css('background-color', 'green');
                    $('#raid_killer_status').text('Force heal as party below 99%');
                    if(/boss-win/.test(data)){
                        $('#raid_killer').css('background-color', 'orange');
                        $('#raid_killer_status').text('the boss has been defeated!');
                        return;
                    }
                    heal_raid(data);
                    return;
                }
                /*if(parseInt(stats.energy[1]) >= en_stop_at-1){
                    $('#raid_killer').css('background-color', 'orange');
                    $('#raid_killer_status').text('Energy is above '+en_stop_at+', Stopping..');
                    stop_all();
                    return;
                }*/
                if(parseInt(stats.stamina[1]) > raid_stam && parseInt(stats.energy[1]) >= 20){
                    att_raid(data);
                }else{
                    var which = (parseInt(stats.stamina[1]) > raid_stam ? 'health':'stamina');
                    $('#raid_killer').css('background-color', 'red');
                    $('#raid_killer_status').text('Not enough '+which+', Stopping..');
                    stop_all();
                }
            }
        }
    }   
     
    function update_ourStats(data){
        stats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
        stats.energy = /energy_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
        stats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
    }
     
    function stop_all(){
        isOn = false;
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
                    $('#raid_killer').css('background-color', 'red');
                    console.log('Error updating page variables');
                    console.log('Error: '+err.lineNumber);
                    $('#raid_killer_status').text('Error! Stopping..');
                }
                handler(resp);
            };
            req.failure_callback = function(){
                i._recordEndTime();
                $('#raid_killer').css('background-color', 'red');
                $('#raid_killer_status').text('Something has failed! Stopping..');
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
                    param.success_callback(resp);
                },
                error: function() {
                    param.failure_callback()
                }
            })
        }
    };
}())    
