// https://dl.dropboxusercontent.com/s/hdjr58736xm55oh/Fight.js

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
    var block_dead = false;
    var possible_error = 0;
	var script_name = 'Fight';
    var timer;
    var att_url = '';
    var logs = [];
    var targets = [];
    var blacklist = [];
    var boost_loadTime;
    var no_boosts = false;
    var max_boosted = false;
    var boosts_avail = [];
    var stats = {
        'money_gained': 0,
        'stamina_used': 0,
        'exp_gained': 0,
        'levelup': 0,
        'attacks_done': 0,
        'pwr_att': 0,
        'won': 0,
        'lost': 0,
        'dead': 0,
        'kills': 0,
        'blacklist': 0,
        'damage_dealt': 0,
        'hl_refreshes': 0
    };
 
    var target = {
        'attacks': 0
    };
     
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
     
    var userStats = {
        health: 0,
        energy: 0,
        stamina: 0,
        exp_have: 0,
        exp_needed: 0
    };
     
    userStats.health = /(\d+)\/(\d+)/.exec($('#health_menu_value').text());
    userStats.energy = /(\d+)\/(\d+)/.exec($('#energy_menu_value').text());
    userStats.stamina = /(\d+)\/(\d+)/.exec($('#stamina_menu_value').text());
    userStats.exp_have = $('#hdr_level_xp').text();
    userStats.exp_needed = $('#hdr_level_total_xp').text();
     
    var coffee_html = '<div>'+
    '   <div>'+
	'<span style="color:yellow">'+
	'	Fight Module v1.3 .<br>'+
    '	!!!!! WARNING DO NOT RUN LONGER THEN 30 MINUTES !!!!<br>'+
	' </span>'+
	' <span style="color:red">'+
	'	Tip: Let THE NUT be with you !!<br>'+
	'			</span>'+
    '       <a href="#" id="_play" class="gx_button gx_button_green">'+
    '           <span style="color:white" title="start/stop">'+
    '               Start'+
    '           </span>'+
    '       </a>'+
    '       <a href="#" id="_close" class="gx_button gx_button_red">'+
    '           <span style="color:white" title="close">'+
    '               Close'+
    '           </span>'+
    '       </a>'+
    '   </div>'+
    '   Use Adrenaline Boost: <input id="_adrenaline" style="width:20px;" type="checkbox" name="fight_option" checked /> <span id="boost_text" style="color:green;display:none;">Boost Active!</span><br>'+
    '   Attack dead capos: <input id="_attack_dead" style="width:20px;" type="checkbox" name="fight_option" checked /><br>'+
    '   Red hit:<input id="_red_hit" style="width:20px;" type="checkbox" name="fight_option" checked /><br>'+
    '   Use blacklist: <input id="_blacklist" style="width:20px;" type="checkbox" name="fight_option" checked /><br>'+
    '   Power Attack:<input id="_power" title="Use power attack" style="width:20px;" type="checkbox" name="fight_option" checked /><br>'+
    '   Power heal:<input id="_power_heal" title="Use power heal" style="width:20px;" type="checkbox" name="fight_option" checked /><br>'+
    '   Max attacks per target:<input id="_maxattacks" type="text" name="fight_text" value="0" maxlength="5" style="width:40px;" /><br>'+
    '   Punch if health is under:<input id="_punch_percent" type="text" name="fight_text" value="5" maxlength="5" style="width:40px;" />%<br>'+
    '   Attack Boost:<input id="_boosted" type="text" name="fight_text" value="1" maxlength="2" style="width:20px;" /><br>'+
    '   Stop when <input id="_energy_remain" type="text" name="fight_text" value="0" maxlength="6" style="width:50px;" /> energy remaining<br>'+
    '   Stop when <input id="_stamina_remain" type="text" name="fight_text" value="0" maxlength="6" style="width:50px;" /> stamina remaining<br>'+
    '   Level range: <input id="_level_low" type="text" name="fight_text" value="1" maxlength="5" style="width:40px;" />-<input id="_level_high" type="text" name="fight_text" value="25000" maxlength="6" style="width:45px;" /><br>'+
    '   Mob Size: <input id="_mob_low" type="text" name="fight_text" value="1" maxlength="5" style="width:40px;" />-<input id="_mob_high" type="text" name="fight_text" value="2000" maxlength="5" style="width:40px;" /><br>'+
    '   <textarea id="_namefilter" rows="3" cols="40" name="fight_filter"></textarea><br>Separate characters with space or new line.<br>'+
    '   Random speed:<input id="_speed" title="Slow server request speed" type="checkbox" name="fight_option" /><br>'+
    '   <span id="coffee_stats" style="display:none;"></span><br><br>'+
    '   Status: <span id="coffee_status"></span><br>'+
    '   Log: <input id="_logsize" type="text" name="fight_text" value="20" maxlength="4" style="width:20px;" /> <span id="coffee_log"></span>'+
    '</div>';
 name="fight_option"

    $('.metal-bar-repeater:first').after(coffee_html);
     
    $('#_play, _pause').click(function(){
        if(!run){
            run = true;
            no_boosts = false;
            $(this).removeClass('gx_button_green').addClass('gx_button_red').children().text('Stop');
            if(!pos_load){
                load_bases();
            }else{
                load_fightlist();       
            }
        }else{
            run = false;
            clearInterval(timer);
            $(this).removeClass('gx_button_red').addClass('gx_button_green').children().text('Start');
            coffee_status('Paused...');
        }
        var currentTime = (new Date().getTime()) / 1000;
        if (currentTime - boost_loadTime >= 300) {
            $('#boost_text').hide();
        }
        return false;
    });
     
    $('#_close').click(function(){
        run = false;
        clearInterval(timer);
        $(this).parent().parent().remove();
        return false;
    });
	
	$('input[name="fight_text"]').each(function() {
		var name = $(this).attr('id');
		if(storage.getItem(name)){
			$(this).val(JSON.parse(storage.getItem(name)));
		}
	});
	
	$('input[name="fight_text"]').bind('change keyup click', function(){
		var name = $(this).attr('id');
		var value = parseInt($(this).val());
		storage.setItem(name, value);
	});
	
	$('textarea[name="fight_filter"]').each(function() {
		var name = $(this).attr('id');
		if(storage.getItem(name)){
			$(this).val(unescape(storage.getItem(name)));
		}
	});
	
	$('textarea[name="fight_filter"]').bind('input propertychange change keyup click', function(){
		var name = $(this).attr('id');
		var value = escape($(this).val());
		storage.setItem(name, value);
	});	
	
	$('input[name="fight_option"]').each(function() {
		var name = $(this).attr('id');
		if (storage.getItem(name) == "true") {
			$(this).prop('checked', true);
		}
	});
	
	$('input[name="fight_option"]').change(function() {
		var name = $(this).attr('id');
		var value = $(this).is(':checked');
		storage.setItem(name, value);
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
            if(/No mobs available in your range/.test(resp)){
                coffee_status('Please restart script when fightlist isnt on cooldown..');
                coffee_logger('Please restart script when fightlist isnt on cooldown..');
                run = false;
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
                run = false;
                return;
            }
            pos_load = true;
            parse_fightlist(resp);
        });
    }
     
    function load_fightlist(){
        coffee_status('Loading fight list...')
        build_ajax({page:'battle'}, function(resp){
            parse_fightlist(resp); 
        });
    }   
 
    function parse_fightlist(data){
        update_ourStats(data);
        if(/No mobs available in your range/.test(data)){
            coffee_status('Please restart script when fightlist isnt on cooldown..');
            coffee_logger('Please restart script when fightlist isnt on cooldown..');
            run = false;
            return;
        }
        targets = [];
        $(data).find('.stamina-icon:contains("Attack")').not(':contains("Attack Again")').each(function(index){
            var isUndead = false;
            var info = $(this).parent().parent().parent().parent();
            var name = info.find('td:eq(0) > a').text();
            var clan = '';
            if(name.charAt(0) == '['){
                clan = /\[[^.*]*?\]/.exec(name)[0];
                name = name.slice(clan.length);
            }
            var pid = info.find('td:eq(0) > a').attr('href').replace(/[^0-9]/g, '');
            var level = info.find('td:eq(0) > p > span').text().replace(/[^0-9]/g, '').trim();
            var mobsize = info.find('td:eq(1)').text().trim();
            var mob_health = 0;
            if(info.find('.dead-icon').length){
                isUndead =  true;
            }else{
                mob_health = info.find('td:eq(2) > div > span').attr('style').replace(/[^0-9]/g, '');
            }
            var pos = --index;
            if(pos < 0){
                pos = 0;
            }else if(pos > 14){
                pos = 14;
            }
            if(block_dead && isUndead||isUndead && !$('#_attack_dead').is(':checked')){
                return true;
            }
            targets.push({clan:clan, name:name, pid:pid, level:level, mobsize:mobsize, health:mob_health, pos:pos, pwr:false, isDead:isUndead});
        })
        //targets.push({name:'[FIJF] S M I T H', pid:'10211111182963620', level:'1682', mobsize:'1679', health:'100', pos:1, pwr:false, isDead:false});
        if(!targets.length){
            coffee_status('No targets, grabbing more..');
            possible_error++;
            if(possible_error > 9){
                possible_error = 0;
                coffee_logger('<span style="color:red;">Unable to get targets 10x in a row, stopping..</span>');
                run = false;
                return;
            }else{ 
                load_fightlist();
            }
        }else{
            possible_error = 0;
            targets.sort(function(a, b) {
                return a.mobsize - b.mobsize;
            });
            if(run){
                var boost_active = false;
                if($('#_adrenaline').is(':checked') && !max_boosted){
                    if($(data).find('#offer_boost_countdown').length){
                        boost_active = true;
                    }else{
                        boost_active = false;
                        if(!no_boosts){
                            if(boosts_avail.length){
                                load_boost(repeat_attack);
                            }else{
                                read_boost_stream(repeat_attack);                               
                            }
                            return;
                        }
                    }
                }
                repeat_attack();
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
                no_boosts = true;
                callback();
            }
        });
    }
     
    function load_boost(callback){
        var info = 'ajax_response_type=modal&modal_id=modal_feed_'+boosts_avail[0].id+'_'+boosts_avail[0].id2+'_modal';
        build_ajax({page:'battle/accept_boost/'+boosts_avail[0].id+'/',data:info}, function(response){
            boosts_avail.shift();
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
                run = false;
            }
            callback();
        });
    }   
     
    function repeat_attack(){
        var wait = 0;
        if($('#_speed').is(':checked')){
            wait = (Math.floor(Math.random() * 4)) + 0;
        }
        var energy_val = parseInt($('#_energy_remain').val());
        var stamina_val = parseInt($('#_stamina_remain').val());
        var heal_percent = (30 / 100) * parseInt($('#health_menu_value').text().split('/')[1]);
        var currentTime = (new Date().getTime()) / 1000;
        if (currentTime - boost_loadTime >= 300) {
            $('#boost_text').hide();
        }
        if(run){
            if(parseInt(userStats.energy[1]) <= energy_val && energy_val > 0){
                coffee_status('Reached energy remain value, pausing...');
                run = false;
            }else if(parseInt(userStats.stamina[1]) <= stamina_val && stamina_val > 0){
                coffee_status('Reached stamina remain value, pausing...');
                run = false;
            }else if(parseInt(userStats.health[1]) <= heal_percent){
                visit_hospital(repeat_attack);
            }else if(parseInt(userStats.stamina[1]) < 1){
                coffee_status('Ran out of stamina, stopping..');
                run = false;
            }else{
                if(wait > 0){
                    pausing(wait, 'Attacking again in ', function(){do_attack();});
                }else{
                    do_attack();
                }
                return;
            }
        }else{
            coffee_status('Pausing...');
        }
    }   
 
    function do_attack(){
        if(targets.length == 0){
            coffee_logger('Ran out of targets, reloading fight list...');
            targets = [];
            pausing(3, 'Ran out of targets, reloading fight list in', function(){load_fightlist();});
            return;
        }
        if(run){
            var maxattacks = parseInt($('#_maxattacks').val());
            if(targets[0].mobsize > parseInt($('#_mob_high').val()) || targets[0].mobsize < parseInt($('#_mob_low').val())){
                coffee_logger('Skipping '+profile_link()+' because mafia size '+targets[0].mobsize);
                skip_target();
                repeat_attack();
            }else if(targets[0].level > parseInt($('#_level_high').val()) || targets[0].level < parseInt($('#_level_low').val())){
                coffee_logger('Skipping '+profile_link()+' because level '+targets[0].level);
                skip_target();
                repeat_attack();
            }else if(target.attacks > maxattacks && maxattacks != 0){
                coffee_logger('Skipping '+profile_link()+' because max attacks reached ('+maxattacks+').');
                skip_target();
                repeat_attack();
            }else if(check_name(targets[0].name)){
                coffee_logger('Skipping '+profile_link()+' because of name filter.');
                skip_target();
                repeat_attack();
            }else if(find_element(targets[0].pid, 'pid', blacklist) && $('#_blacklist').is(':checked')){
                coffee_logger('Skipping '+profile_link()+' because of blacklist. <span class="more_in">(Stronger opponent)</span>');
                stats.blacklist++;
                skip_target();
                repeat_attack();
            }else{
                coffee_status('<a href="#" id="skip_the_target">(Skip)</a> Attacking '+profile_link()+' <span class="more_in">(Attack #'+target.attacks+')</span>...');
                $('#skip_the_target').bind('click',function(){
                    coffee_logger('Manually skipped '+profile_link());
                    skip_target();
                    return false;
                }); 
                target.attacks++;
                var x = parseInt(base['pos'+targets[0].pos+'_x'])+myRandom(10,80);
                var y = parseInt(base['pos'+targets[0].pos+'_y'])+myRandom(1,10);
                if(targets[0].isDead){
                    var info = 'a_c_x='+x+'&a_c_y='+y+'&user_id='+targets[0].pid;
                    build_ajax({page:'battle/attack_dead',data:info}, function(resp){
                        parse_fight(resp);
                    });
                }else{
                    if($('#_power').is(':checked') && targets[0].pwr){
                        var info = 'user_id='+targets[0].pid+'&attack_type=power_attack&update_id=app-response-message&response_type=app';
                        build_ajax({page:'battle/again_attack/',data:info}, function(resp){
                            parse_fight(resp);
                        });
                    }else{
                        if(att_url != ''){
                            build_ajax({page:'battle/again_attack/',data:att_url}, function(resp){
                                parse_fight(resp);
                            });
                        }else{
                            var boosted = 0; 
                            if(parseInt($('#_boosted').val()) > 1){
                                boosted = parseInt($('#_boosted').val()) - 1;
                            }
                            var info = 'a_c_x='+x+'&a_c_y='+y+'&user_id='+targets[0].pid+'&stamina_boost='+boosted;
                            build_ajax({page:'battle/attack',data:info}, function(resp){
                                parse_fight(resp);
                            });
                        }
                    }
                }
            }
        }
    }
         
    function parse_fight(data){
        update_ourStats(data);
        if(/has awarded you with/.test(data)){
            stats.levelup++;
        }
        if(/temporarily exhausted your ability to attack Whacked Mobsters/.test(data)){
            coffee_logger('You have temporarily exhausted your ability to attack Whacked Mobsters');
            block_dead = true;
            load_fightlist();
        }else if(/This user is one of your Mobsters/.test(data)){
            coffee_logger(profile_link()+' is one of your Mobsters, skipping..');
            skip_target();
            repeat_attack();
        }else if(/You are too weak to Fight/.test(data)){
            visit_hospital(do_attack);
        }else if(/Selected opponent is already in a/.test(data)){
            coffee_logger(profile_link()+' is already in a fight, retrying..');
            do_attack();
        }else if(/User Hit is no longer/.test(data)){
            skip_target();
            repeat_attack();
        }else if(/has just been attacked and/.test(data)){
            coffee_logger('Too slow! '+profile_link()+' has just been taken out, skipping..');
            skip_target();
            repeat_attack();
        }else if(/You do not have enough stamina/.test(data)){
            coffee_logger('Not enough stamina to fight..');
            run = false;
        }else if(/are out of your XP range/.test(data)){
            coffee_logger('Cannot fight '+profile_link()+', they are out of your XP range, skipping..');
            skip_target();
            repeat_attack();
        }else if(/battleV2-result-box-default default-dark-box/.test(data)){
            var result_divs = data.split(/battleV2-result-box-default default-dark-box/);
            var killed = /You have killed/.test(data);
            var iced = /in the hospital/.test(data);
            var output = '';
            var isWin = false;
            stats.stamina_used++;
            if(/WON/.test(result_divs[0])){
                isWin = true;
                stats.won++;
                output += '<span style="color:green;">Won!</span> ';
            }else{
                output += '<span style="color:red;">Lost!</span> ';
                stats.lost++;
                if(!$('#_red_hit').is(':checked')){
                    add_blacklist();                    
                }
            }
            if(/  XP/.test(data)){
                var m=/(\d+)  XP/.exec(data);
                output += '<span class="bold attribute-title" title="Experience gained">'+parseInt(m[1])+'xp</span>';
                stats.exp_gained += parseInt(m[1]);             
            }
            var n=/ld">([()+-])\$([\d,]+)(\$([\d,]+))?<\/sp/.exec(data);
            if(parseInt(n[2].replace(/[^0-9]/g, '')) > 0){
                if(isWin){
                    output += ' <span class="bold attribute-title">$'+n[2]+'</span>';
                    stats.money_gained += parseInt(n[2].replace(/[^0-9]/g, ''));                    
                }else{
                    output += ' <span class="bold attribute-title">-$'+n[2]+'</span>';
                    stats.money_gained -= parseInt(n[2].replace(/[^0-9]/g, ''));            
                }
            }
            var isDead = false;
            if(killed){
                output += ', killing '+profile_link()+'..';
                stats.kills++;
            }else if(iced){
                var punch_percentage = parseInt($('#_punch_percent').val());
                var their_health = $(data).find('.battleV2-details-health-box:last').children().eq(1).children().attr('style').replace(/[^\d\.\-]/g, '');
                output += ', putting '+profile_link()+' in hospital!';
                if(punch_percentage > 0 && punch_percentage >= their_health){
                    output += ' Attempting a punch kill!';
                    coffee_logger(output);
                    do_punch();
                    return;
                }
            }else if(/dead.png/.test(data)){
                var extra_log = '';
                isDead = true;
                stats.dead++;
                if(/You can attack (\d+) more Whacked Mobsters/.test(data)){
                    var p=/can attack (\d+) more Whacked/.exec(data)[1];
                    extra_log = p+' dead capos left!';
                }else if(/You can no longer attack/.test(data)){
                    extra_log = 'no more dead capos left!';
                }
                output += ', fought dead capo '+profile_link()+', '+extra_log;
            }
 
            if(iced||killed||isDead){
                coffee_logger(output);
                skip_target();
                repeat_attack();
                return;
            }
            if(isWin||$('#_red_hit').is(':checked')){
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
                        coffee_logger('something wrong with attack again url, stopping..');
                        run = false;
                        return;
                    }
                    if($('#_power').is(':checked')){
                        if(targets[0].pwr){
                            stats.pwr_att++;
                        }
                        if($(data).find('.battleV2-power-attack').length){
                            if(!$(data).find('#user_rage_progress').length){
                                targets[0].pwr = true;
                            }else{
                                targets[0].pwr = false;
                            }
                        }
                    }else{
                        targets[0].pwr = false;
                    }
                    output += ', Attacking '+profile_link()+' again!';
                }else{
                    skip_target();
                }
            }else{
                output += ', skipping '+profile_link()+'..';
                skip_target();
            }
            coffee_logger(output);
            repeat_attack();
        }else{
            coffee_logger('Unknown result!! stoppping');
            run = false;
        }
    }
     
    function do_punch(){
        var info = 'target_user_id='+targets[0].pid+'&ajax_response_type=modal&modal_id=rival_punch_modal_modal';
        build_ajax({page:'profile/do_punch',data:info},function(data){
            parse_punch(data);
        })
    }
     
    function parse_punch(data){
        update_ourStats(data);
        if(/You are too weak to punch/.test(data)){
            visit_hospital(do_punch);
            return;
        }
        if(/You need 1 Stamina/.test(data)){
            coffee_status('Ran out of stamina, stopping..');
            run = false;
            return;
        }
        if(/You just punched/.test(data)){
            var n = 0;
            if(/WP/.test(data)){
                n = /\+(\d+)  WP/.exec(data)[1];
            }
            var output = '';
            if(/and dealt/.test(data)){
                output += 'and dealt' +/dealt (\d+) damage/.exec(data)[1]+' damage ';
            }
            if(parseInt(n) > 0){
                output += 'and got '+n+' WPs';
            }
            coffee_logger('You just punched in the face '+profile_link()+' '+output);
        }else if(/is currently dead/.test(data)){
            coffee_logger(profile_link()+' level '+targets[0].level+' is currently dead');
        }else if(/You can only punch/.test(data)){
            coffee_logger('You\'ve already punched '+profile_link()+' level '+targets[0].level+' within the last hour');
        }else if(/You just killed/.test(data)){
            var n = 0;
            if(/WP/.test(data)){
                n = /\+(\d+)  WP/.exec(data)[1];
            }
            var output = '';
            if(/and dealt/.test(data)){
                output += 'Dealing '+/dealt (\d+) damage/.exec(data)[1]+' damage ';
            }
            if(parseInt(n) > 0){
                output += 'and got '+n+' WPs';
            }
            coffee_logger('You just killed '+profile_link()+' with a punch to the face! '+output);
        }else if(/user is in your Mob and cannot/.test(data)){
            coffee_logger('cant hit '+profile_link()+' level '+targets[0].level+' as they are in your mob');
        }else if(/cannot Punch this player while/.test(data)){
            coffee_logger('cant hit '+profile_link()+' level '+targets[0].level+' since they are on the hitlist');
        }else{
            coffee_logger('have not caught this error yet, stopping');
            run = false;
            return;
        }
        skip_target();
        repeat_attack();
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
                run = false;
            }
        })
    }
 
    function profile_link(){
        return '<a href="https://apps.facebook.com/la_cosa_nostra/profile/user/'+targets[0].pid+'">'+targets[0].name+'</a>';
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
			if(/%/.test(characters[i])){
				characters[i] = characters[i].replace(/%/g, " ");
			}
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
        if(parseInt(stats.heals)>0){
            log += ' | Heals: '+commas(stats.heals);
        }
        if(parseInt(stats.stamina_used)>0){
            log += ' | Stamina Spent: '+commas(stats.stamina_used);
        }
        if(parseInt(stats.exp_gained)>0){
            log += ' | Total Exp: '+commas(stats.exp_gained);
        }
        log += ' | Total Cash: $'+commas(stats.money_gained)+(parseInt(stats.money_gained)>=1000000000 ? ' '+format_money(stats.money_gained, true) : '');
        if(log.charAt(1) == '|'){
            log = log.substring(3);
        }
        if(log != ''){
            $('#coffee_stats').show();
        }
        return log;
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
        $('#coffee_log').html(logs.join('<br>'));
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