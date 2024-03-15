javascript:(function (){
    var page_loaded = location.href.split('/')[5];
    if(page_loaded == ''){
        setTimeout(function(){
            tidy_feed();
        },2500);
    }
     
    tidy_travel();
     
    $(document).ajaxSuccess(function(x,h,r,xhr){
        try{            
            var str = r.url;
            str = str.split('facebook/pirate_clan/')[1]||str.split('facebook/mob_wars/')[1]||str.split('facebook/viking_clan/')[1];
            if(str == "home"||str == "home/load_content_panel"||str == "home/reload_more_feed_panel/stream/0"||str == "home/reload_more_feed_panel/stream/20"){
                tidy_feed();            
            }
            if(str == "quests"||/quests\/switch_location/i.test(str)||/quests\/do_quest/i.test(str)){
                    add_ratios();
                    tidy_travel();
            }
            if(str == "land"||/land\/buy/i.test(str)||/land\/sell/i.test(str)||/land\/switch_location/i.test(str)||/land\/find/i.test(str)){
                    add_propInfo();
                    tidy_travel();
            }			
            if(str == "boss"){
                    tidy_bosses();
            }
            if(/location\/switch_location/i.test(str)){
                    tidy_travel();
            }
            if(/You have advanced to/.test(xhr)){
                    tidy_travel();
            }
        }catch(random_update){}
    });
     
    function add_ratios(){
        $('.quest-box').each(function(){
            if($(this).find('.job_info').length){
                return true;
            }
            var energy = parseInt($(this).find('.quest-body > .quest-required-outer > .quest-required > div > .energy-icon').text());
            var exp = parseInt($(this).find('.quest-body > .quest-reward-outer > .quest-reward > div > .exp-icon').text());
            var cash = $(this).find('.quest-body > .quest-reward-outer > .quest-reward > div > .cash-icon').text().replace(/[^0-9]/g, '');
            var ratio = parseFloat(exp/energy).toFixed(2);
            var ratio_cash = parseFloat(cash/energy).toFixed(2);
            $(this).find('.quest-body > .quest-required-outer > .quest-required > div > .energy-icon').html(energy+' Energy ('+ratio+')');
            $(this).find('.quest-body > .quest-required-outer > .quest-required > div > .energy-icon').after('<span class="job_info"> Pays: $'+commas(ratio_cash)+'<br> Per 1 energy spent</span>');
        })
    }
     
    function add_propInfo(){
        $('.land-outer').each(function(){
            if($(this).find('.prop_info').length){
                return true;
            }
//            var prop_price = parseInt($(this).find('[id^="cost_"]').text().replace(/[^0-9]/g, ''));
			var prop_price = parseFloat($(this).find('[id^="cost_"]').text().replace(/[^0-9.]/g, ''));
            if(prop_price == ''||isNaN(prop_price)){
                return true;
            }
//            if($(this).find('[id^="cost_"]:contains("billion")').text()){
 //               prop_price *= 1000000;
  //          }else if($(this).find('[id^="cost_"]:contains("trillion")').text()){
   //             prop_price *= 1000000000;
    //        }
			if($(this).find('[id^="cost_"]:contains("billion")').text()){
				prop_price *= 1000000000;
			}
			if($(this).find('[id^="cost_"]:contains("trillion")').text()){
				prop_price *= 1000000000000;
			}
			if($(this).find('[id^="cost_"]:contains("quadrillion")').text()){
				prop_price *= 1000000000000000;
			}
 //           var income = $(this).find('.land-info').text().replace(/[^0-9]/g, '');
			var income = parseFloat($(this).find('.land-info').text().replace(/[^0-9.]/g, ''));
			if($(this).find('[class^="land-info"]:contains("billion")').text()){
				income *= 1000000000;
			}
			if($(this).find('[class^="land-info"]:contains("trillion")').text()){
				income *= 1000000000000;
			}
			if($(this).find('[class^="land-info"]:contains("quadrillion")').text()){
				income *= 1000000000000000;
			}			
            var pay_info = ((income/prop_price) * 100).toFixed(5); //(10000 * (income/prop_price)).toFixed(5);
            //$(this).find('.land-info').append('<p class="prop_info">Pays: $'+pay_info+' per $10,000 spent</p>');
			$(this).find('.land-info').append('<p class="prop_info">ROI: $'+pay_info+'</p>');
        })
    }
     //thisRow.setROI((thisRow.getIncome() / thisRow.getCurrentCost()) * 100);
    function tidy_feed(){
        $('.filter-container > .filter-box.feed-div').each(function(){
            if($(this).find('.lightgrey').length < 3){
                $(this).remove();
            }else{
                if($(this).find('.lightgrey:eq(2)').css('display') != 'none'){
                    $(this).remove();
                    return true;
                }
            }
        });
 
        if($('#feed_more_id_20 > p').length < 1){
            $('#feed_more_id_20 > .filter-container > .filter-box.feed-div').each(function(){
                if($(this).find('.lightgrey').length < 3){
                    $(this).remove();
                }else{
                    if($(this).find('.lightgrey:eq(2)').css('display') != 'none'){
                        $(this).remove();
                        return true;
                    }
                }
                 
            });
        }
 
        setTimeout(function(){
            if($('#tidy_feed').length < 1){
                $('#relation-filter-select').parent().after('<div class="inlineblock" style="margin-left:5px;">'+
                    '<span class="lightgrey">Mod:</span> <a id="tidy_feed" href="#">Tidy!</a>'+
                '</div>');
                 
                $('#tidy_feed').click(function(){
                    tidy_feed();
                    return false;
                })
            }
        }, 2500);
    }
     
    function tidy_bosses(){
        if($('.ally-boss-bg').length){
            if($('#wb_reminder').length){
                $('.ally-boss-bg').insertAfter('#wb_reminder');
            }else{      
                $('.ally-boss-bg').insertAfter('#app-response-message');
            }
        }
    }
     
    function tidy_travel(){
        $('.location-sub').parent().show();
        $('.location_lock_icon').parent().hide();
        $('.location_lock_icon:first').parent().show();
        $('#travel_button').css("margin-left", "364px");
    }
         
    function commas(num){
        return(""+num).replace(/\B(?=(\d{3})+(?!\d))/g,",")
    }
 
}())