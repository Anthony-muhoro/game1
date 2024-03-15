javascript:(function(){
    var userStats = {
        health: 0,
        stamina: 0
    }
     
    var base = {
        heal_x: 0,
        heal_y: 0
    };
     
    var points = {
        syn_start:0, 
        syn_end:0,
        your_start:0,
        your_end:0
    }
     
    var isOn = false;
    var war_log = [];
    var targets = [];
    var current_target = [];
    var already_hit = [];
    var already_punched = [];
    var war_mode = 'attack';
    var firstRun = true;
    var wm_onscreen = false;
    var heal_percent = (30 / 100) * parseInt($('#health_menu_value').text().split('/')[1]);
    //console.log('heal percent: '+heal_percent);
    base.heal_x = $('#heal').offset().left.toFixed();
    base.heal_y = $('#heal').offset().top.toFixed();
     
    var wheel_position = 0;
    var punch_wheel_targets = [{"name": "Vito Greasy Thumbs Milito","pid": "1618683071499589","clan": "17511","level": "101","clan_name": "[Love]"},{"name": "Robbie 12 Drink Locascio","pid": "665942867","clan": "5863","level": "101","clan_name": "[BOA]"},{"name": "Chris Narcoleptic Massino","pid": "562421519","clan": "4319","level": "102","clan_name": "[shot]"},{"name": "Ralphie Shifty Hammer Zaffarano","pid": "747215425444916","clan": "17888","level": "103","clan_name": "[AS]"},{"name": "Marella Deadman Rastelli","pid": "100004337768393","clan": "6454","level": "103","clan_name": "[RS]"},{"name": "Cindy Ice Pick Dellacroce","pid": "647914430","clan": "5863","level": "103","clan_name": "[BOA]"},{"name": "Kyler Shifty Cheesebox Rosenthal","pid": "500145070190033","clan": "14502","level": "104","clan_name": "[EXM]"},{"name": "Brandon 12 Drink Bosco","pid": "1021961307867135","clan": "9070","level": "104","clan_name": "[CC]"},{"name": "666 gang","pid": "100000259916150","clan": "6075","level": "108","clan_name": "[Vamp]"},{"name": "Armando 12 Drink McVitie","pid": "100000567681389","clan": "4095","level": "109","clan_name": "[boss]"},{"name": "JHittah100","pid": "960805110622775","clan": "9070","level": "109","clan_name": "[CC]"},{"name": "Michael The Hacksaw Bilotti","pid": "100000349381185","clan": "6910","level": "113","clan_name": "[Kill]"},{"name": "Blue Messenger from Hades","pid": "100001304371486","clan": "6736","level": "113","clan_name": "[CJM2]"},{"name": "Lance Mad Bookie Spero","pid": "1062147708","clan": "6736","level": "113","clan_name": "[CJM2]"},{"name": "TIMO","pid": "1425471872","clan": "4483","level": "115","clan_name": "[WAR]"},{"name": "Gino Greasy Lips Galione","pid": "1600823246626685","clan": "17511","level": "115","clan_name": "[Love]"},{"name": "Rick Lucky Knuckles Cafaro","pid": "100000871654851","clan": "5157","level": "117","clan_name": "[FRMC]"},{"name": "JohnnyK","pid": "100003224499711","clan": "6454","level": "119","clan_name": "[RS]"},{"name": "AlStHosea","pid": "834735146541924","clan": "17511","level": "119","clan_name": "[Love]"},{"name": "Francis Crazy Moustache Garafolo","pid": "100001819123857","clan": "6905","level": "120","clan_name": "[all]"},{"name": "Cindy Too Tall Porrello","pid": "100003810049966","clan": "6905","level": "121","clan_name": "[all]"},{"name": "David 12 Drink Genovese","pid": "1013307705","clan": "2245","level": "122","clan_name": "[Joes]"},{"name": "Franky Hole Digger Dellacroce","pid": "100003737131849","clan": "6905","level": "123","clan_name": "[all]"},{"name": "Rob Repeat Offender Bundy","pid": "100000407226510","clan": "3429","level": "124","clan_name": "[BMF]"},{"name": "Corrado Fat Weasal Bonanno","pid": "1654569974603727","clan": "6800","level": "127","clan_name": "[ASLA]"},{"name": "Cheezehead","pid": "10206692447491179","clan": "6711","level": "129","clan_name": "[dane]"},{"name": "Mike Fat Anvil Tarricone","pid": "100002569817121","clan": "10086","level": "129","clan_name": "[TCC]"},{"name": "Paola Good Looking Squillante","pid": "2019454608340744","clan": "17511","level": "131","clan_name": "[Love]"},{"name": "Sachin jiwani","pid": "1743291179051195","clan": "17888","level": "136","clan_name": "[AS]"},{"name": "Myrna the boss","pid": "100000523441528","clan": "4095","level": "141","clan_name": "[boss]"},{"name": "Louis Mad Balistrieri","pid": "912921248882805","clan": "6800","level": "142","clan_name": "[ASLA]"},{"name": "Thisis Rusty Bananas Lucchese","pid": "100002840586304","clan": "6075","level": "145","clan_name": "[Vamp]"},{"name": "Arturo Mad Animal Milito","pid": "895751690501312","clan": "11971","level": "149","clan_name": "[Sun]"},{"name": "Nico alto trava","pid": "100000560614027","clan": "10086","level": "149","clan_name": "[TCC]"},{"name": "Moo5e Wiseguy DeStefano","pid": "100002798371419","clan": "5157","level": "149","clan_name": "[FRMC]"},{"name": "Richard The Lips Gigante","pid": "629321424","clan": "5863","level": "149","clan_name": "[BOA]"},{"name": "elliot ness","pid": "100002525046638","clan": "7718","level": "150","clan_name": "[kill]"},{"name": "Alex Dead Eye LaSalle","pid": "100000148792839","clan": "5157","level": "157","clan_name": "[FRMC]"},{"name": "Erika Say Nothin Salerno","pid": "100004353913157","clan": "7618","level": "158","clan_name": "[luv]"},{"name": "Mimi babyface bandaidflicka","pid": "859076360940075","clan": "6800","level": "159","clan_name": "[ASLA]"},{"name": "Mohammad Wiseguy Tartamella","pid": "554140023","clan": "7370","level": "160","clan_name": "[MIC]"},{"name": "Jannie","pid": "1540077472950780","clan": "17888","level": "161","clan_name": "[AS]"},{"name": "KingDaddyStokes","pid": "896688770401280","clan": "5858","level": "165","clan_name": "[ILLU]"},{"name": "Grant Shifty Fingers Pignatelli","pid": "100003009995625","clan": "5863","level": "169","clan_name": "[BOA]"},{"name": "Edward Greasy Face Bilotti","pid": "111802099632105","clan": "15765","level": "171","clan_name": "[BBHC]"},{"name": "James Ice Pick Gravano","pid": "719704578162271","clan": "11971","level": "175","clan_name": "[Sun]"},{"name": "Mitchell Rusty Wolf Fratto","pid": "912596268795937","clan": "9070","level": "179","clan_name": "[CC]"},{"name": "Kenneth Break your Kneecap Capelli","pid": "10208711658943321","clan": "15882","level": "185","clan_name": "[BOOM]"},{"name": "Ashley Rusty Hat Castagna","pid": "10206460616726564","clan": "11971","level": "192","clan_name": "[Sun]"},{"name": "Austin Choker Cestaro","pid": "100000392465277","clan": "5863","level": "195","clan_name": "[BOA]"},{"name": "Richard Round Bagels Damico","pid": "1167730196570913","clan": "3429","level": "197","clan_name": "[BMF]"},{"name": "Paul Greasy Hammer Rampino","pid": "1590051114656318","clan": "3429","level": "197","clan_name": "[BMF]"},{"name": "Nicholas Lucky Wolf Fatico","pid": "100001037166892","clan": "6075","level": "197","clan_name": "[Vamp]"},{"name": "Jeff Weed Wacker Tartamella","pid": "595279970635582","clan": "3429","level": "198","clan_name": "[BMF]"},{"name": "Enzo Quick Hands Cannone","pid": "1421798821229030","clan": "17511","level": "204","clan_name": "[Love]"},{"name": "Crazyboy","pid": "1794944987461054","clan": "14502","level": "205","clan_name": "[EXM]"},{"name": "Elias El Padrino","pid": "1101987737","clan": "6711","level": "207","clan_name": "[dane]"},{"name": "Marco Congelosi","pid": "100000601967331","clan": "7370","level": "207","clan_name": "[MIC]"},{"name": "Peter Quick Hands Spero","pid": "617250260","clan": "7963","level": "209","clan_name": "[360]"},{"name": "Jack Rusty Butcher Daddano","pid": "100001489014454","clan": "2245","level": "209","clan_name": "[Joes]"},{"name": "Malik","pid": "100004107528215","clan": "7718","level": "210","clan_name": "[kill]"},{"name": "Paul Mad Anvil Licavoli","pid": "1532222973480998","clan": "6800","level": "212","clan_name": "[ASLA]"},{"name": "Chase Bullet Tooth Smarrelli","pid": "100002298126658","clan": "5157","level": "212","clan_name": "[FRMC]"},{"name": "Thomas Wiseguy Manzo","pid": "102274523879220","clan": "15765","level": "215","clan_name": "[BBHC]"},{"name": "Purple Shaft Wonder Boy","pid": "100001670468565","clan": "5156","level": "219","clan_name": "[HI]"},{"name": "D3ATHCOM5","pid": "100003764528628","clan": "6895","level": "229","clan_name": "[SOUL]"},{"name": "Adrian Shifty Moustache Galione","pid": "100003793423674","clan": "7618","level": "231","clan_name": "[luv]"},{"name": "Rootvij Shifty Anvil Arcuri","pid": "628460960","clan": "4319","level": "232","clan_name": "[shot]"},{"name": "kerem","pid": "100002689453167","clan": "7690","level": "234","clan_name": "[tb]"},{"name": "Zach THE KING LaSalle","pid": "986384598087494","clan": "11811","level": "236","clan_name": "[SMK]"},{"name": "T Dillinger","pid": "10155926854340290","clan": "11971","level": "239","clan_name": "[Sun]"},{"name": "Gary Rusty Ox DeFeo","pid": "1635393503158284","clan": "17888","level": "239","clan_name": "[AS]"},{"name": "Daniel Contr0lz","pid": "100000897349138","clan": "8999","level": "242","clan_name": "[ONE]"},{"name": "7ru7roop","pid": "1008099842556043","clan": "17888","level": "249","clan_name": "[AS]"},{"name": "Sara The Moustache Bruno","pid": "1007221229313584","clan": "6711","level": "258","clan_name": "[dane]"},{"name": "Grant Bugsy Licavoli","pid": "100004670225089","clan": "5863","level": "260","clan_name": "[BOA]"},{"name": "Henry Bugsy Lucchese","pid": "100005205302951","clan": "8999","level": "261","clan_name": "[ONE]"},{"name": "Solomoriah","pid": "1437683009893707","clan": "11971","level": "267","clan_name": "[Sun]"},{"name": "Littlehusky Moonshine Napolitano","pid": "100002230534016","clan": "5863","level": "268","clan_name": "[BOA]"},{"name": "Faton One Ear Casso","pid": "1795172514","clan": "5927","level": "276","clan_name": "[JM]"},{"name": "Michael MadHot Corleone","pid": "100000944291187","clan": "7963","level": "276","clan_name": "[360]"},{"name": "Jess Fast Hands Marcussi","pid": "290092978007533","clan": "6711","level": "281","clan_name": "[dane]"},{"name": "MLF","pid": "10212898082308729","clan": "15882","level": "281","clan_name": "[BOOM]"},{"name": "Alan Quick Hands Zicarelli","pid": "100001756976550","clan": "7370","level": "281","clan_name": "[MIC]"},{"name": "Micheal Rusty Moustache Sqitieri","pid": "894104290675616","clan": "11971","level": "287","clan_name": "[Sun]"},{"name": "Tyler The Hawk Corleone","pid": "1645038922404975","clan": "11971","level": "287","clan_name": "[Sun]"},{"name": "Bugzy standalone Malone","pid": "731994966922775","clan": "11971","level": "296","clan_name": "[Sun]"},{"name": "Troy The Mo Gambino","pid": "100006036600920","clan": "7496","level": "297","clan_name": "[DK]"},{"name": "Razvan Fat Hammer Vallario","pid": "1657368467909146","clan": "17888","level": "297","clan_name": "[AS]"},{"name": "Paul Mad Barber Trinchera","pid": "695707685","clan": "7496","level": "309","clan_name": "[DK]"},{"name": "SHANnon TIA PhilliPs KIllaS EndURAnce","pid": "100003594790004","clan": "6628","level": "309","clan_name": "[jinx]"},{"name": "Steven No Nose Persico","pid": "113172136113760","clan": "15765","level": "310","clan_name": "[BBHC]"},{"name": "HOLE","pid": "100000235214743","clan": "6413","level": "316","clan_name": "[ASS]"},{"name": "Dannyjo Fat Hat Bruno","pid": "891126044400004","clan": "15765","level": "317","clan_name": "[BBHC]"},{"name": "BloodClot","pid": "1812993488","clan": "5927","level": "321","clan_name": "[JM]"},{"name": "Wil Rusty Lackey LaSalle","pid": "100005192736296","clan": "10226","level": "327","clan_name": "[ALEY]"},{"name": "CrAzY LeGgS","pid": "111550602682860","clan": "18229","level": "332","clan_name": "[BOSS]"},{"name": "Jason Handsome Jack Galante","pid": "10209781049106176","clan": "14502","level": "333","clan_name": "[EXM]"},{"name": "Roger The Iceman Salerno","pid": "1385636322","clan": "6075","level": "335","clan_name": "[Vamp]"},{"name": "Waylon Empty Saddles Gambino","pid": "108714049607253","clan": "18229","level": "336","clan_name": "[BOSS]"},{"name": "Persia Mad Eyes Gambino","pid": "1133536120030354","clan": "18229","level": "336","clan_name": "[BOSS]"},{"name": "VIPER CASEY SAERNO","pid": "100001070299125","clan": "7599","level": "337","clan_name": "[scm]"},{"name": "Victor Mad pizza stick with jalapenyos","pid": "100000873738546","clan": "4095","level": "338","clan_name": "[boss]"},{"name": "Deadly PJ","pid": "100000399864910","clan": "7186","level": "338","clan_name": "[PK1]"},{"name": "Tiina Fat Nostrils Manzo","pid": "677027982430064","clan": "6800","level": "342","clan_name": "[ASLA]"},{"name": "Moh da buggy man","pid": "10155902553150176","clan": "11971","level": "348","clan_name": "[Sun]"},{"name": "Alex Green Eyes Gambino","pid": "1758149991084926","clan": "18229","level": "350","clan_name": "[BOSS]"},{"name": "Mason The Blade Matrona","pid": "100001787656602","clan": "4095","level": "358","clan_name": "[boss]"},{"name": "Colin the ultimate destroyer","pid": "866341723441244","clan": "11971","level": "362","clan_name": "[Sun]"},{"name": "Wesley Greasy Animal Ciasullo","pid": "576622766","clan": "6628","level": "362","clan_name": "[jinx]"},{"name": "Joey slash Dovetia","pid": "1469709517","clan": "7690","level": "378","clan_name": "[tb]"},{"name": "Paul great another diversion LoDuca","pid": "742760268","clan": "2245","level": "378","clan_name": "[Joes]"},{"name": "Kyle Mad Nostrils Castagna","pid": "100001338264975","clan": "5917","level": "390","clan_name": "[BANG]"},{"name": "Southwest Mad Nails Massino","pid": "100001543515301","clan": "7370","level": "390","clan_name": "[MIC]"},{"name": "Sean Michael Shifty Bookie Spilotro","pid": "100004424044470","clan": "6800","level": "393","clan_name": "[ASLA]"},{"name": "Rusty Gambino","pid": "113899739182578","clan": "18229","level": "399","clan_name": "[BOSS]"},{"name": "Thesweetiger Crazy Moustache Morosso","pid": "100000892118434","clan": "5863","level": "399","clan_name": "[BOA]"},{"name": "Chris Square Hips Dellacroce","pid": "542461936","clan": "5157","level": "400","clan_name": "[FRMC]"},{"name": "Roots The Lips Abbandando","pid": "100003161852747","clan": "11811","level": "402","clan_name": "[SMK]"},{"name": "Lil Spitfire","pid": "1718513571706778","clan": "18229","level": "403","clan_name": "[BOSS]"},{"name": "Tay","pid": "100003999504888","clan": "7718","level": "410","clan_name": "[kill]"},{"name": "Lethal Shadow","pid": "150220332044468","clan": "18229","level": "412","clan_name": "[BOSS]"},{"name": "Wan The Moustache Guidice","pid": "10210573597073775","clan": "14356","level": "416","clan_name": "[BBI]"},{"name": "Chicono Crazy Cheesebox Cannone","pid": "100002256262152","clan": "7718","level": "417","clan_name": "[kill]"},{"name": "HITMAN DANNER","pid": "100000750566154","clan": "7610","level": "419","clan_name": "[icu]"},{"name": "Yannick The Barber Palermo","pid": "710273545","clan": "5863","level": "421","clan_name": "[BOA]"},{"name": "Alex Shifty Fingers Corleone","pid": "100003797385538","clan": "14502","level": "423","clan_name": "[EXM]"},{"name": "Anggi Moonshine Galione","pid": "1712411671","clan": "6800","level": "427","clan_name": "[ASLA]"},{"name": "Austin Quick Hands Capesso","pid": "100000688976814","clan": "7294","level": "429","clan_name": "[Aces]"},{"name": "Trevor EPIC Fat Bum","pid": "100001626104310","clan": "4095","level": "437","clan_name": "[boss]"},{"name": "Andy Zeus Anderson","pid": "10208137818667319","clan": "11971","level": "439","clan_name": "[Sun]"},{"name": "Shadow Warrior","pid": "1681353325442585","clan": "16603","level": "439","clan_name": "[INX]"},{"name": "Scott Mad Dog Gingello","pid": "999349480109450","clan": "11971","level": "440","clan_name": "[Sun]"},{"name": "Edwin Tally Tall Pignatelli","pid": "100000849701200","clan": "6910","level": "447","clan_name": "[Kill]"},{"name": "L3tHal W3aPoN","pid": "1710665289222621","clan": "16603","level": "448","clan_name": "[INX]"},{"name": "Davie the Done Ward","pid": "100000948496729","clan": "6800","level": "452","clan_name": "[ASLA]"},{"name": "Mister Waverly","pid": "1119262751446577","clan": "14356","level": "452","clan_name": "[BBI]"},{"name": "The deadly tigeress Leonna","pid": "1672101480","clan": "8976","level": "456","clan_name": "[HM]"},{"name": "Illya Kuriakin","pid": "1540520139576402","clan": "14356","level": "459","clan_name": "[BBI]"},{"name": "Winter is coming","pid": "1431344947114049","clan": "14356","level": "462","clan_name": "[BBI]"},{"name": "Buzz BudHead","pid": "105092160246705","clan": "15765","level": "464","clan_name": "[BBHC]"},{"name": "Vito Scarface Porrello","pid": "1363237470362022","clan": "15143","level": "475","clan_name": "[KobK]"},{"name": "Dan Shifty Mugs Massino","pid": "100001571668835","clan": "17511","level": "488","clan_name": "[Love]"},{"name": "James Lefty Righty DeFeo","pid": "759569358","clan": "6736","level": "497","clan_name": "[CJM2]"},{"name": "Patrik The Knuckles Casso","pid": "1285340950","clan": "6454","level": "504","clan_name": "[RS]"},{"name": "Don Camillo","pid": "1272991526061860","clan": "14356","level": "510","clan_name": "[BBI]"},{"name": "DRAKE THE DRAKE KNIGHT","pid": "100002067315496","clan": "8693","level": "513","clan_name": "[69]"},{"name": "Mystical Rose","pid": "127212927757579","clan": "16603","level": "519","clan_name": "[INX]"},{"name": "Napoleon Solo","pid": "1726125330960870","clan": "14356","level": "521","clan_name": "[BBI]"},{"name": "BBI Assassin","pid": "1259533117407811","clan": "14356","level": "523","clan_name": "[BBI]"},{"name": "Desaster","pid": "805399789593536","clan": "14356","level": "526","clan_name": "[BBI]"},{"name": "Francis Tea Bags Lucchese","pid": "100002801476818","clan": "6905","level": "527","clan_name": "[all]"},{"name": "Kyle Bugsy Lombardozzi","pid": "886783974731313","clan": "11971","level": "530","clan_name": "[Sun]"},{"name": "Marko Crazy Blade Morosso","pid": "100001961266779","clan": "4483","level": "532","clan_name": "[WAR]"},{"name": "Rajiv Mad DeStefano","pid": "1355635450","clan": "6454","level": "534","clan_name": "[RS]"},{"name": "Cree Wolf","pid": "1327557161","clan": "9070","level": "547","clan_name": "[CC]"},{"name": "Silver Shadow","pid": "1381081945","clan": "8999","level": "552","clan_name": "[ONE]"},{"name": "DiDi OuTlAw","pid": "100001649071871","clan": "7618","level": "552","clan_name": "[luv]"},{"name": "Whitey McDrankin","pid": "100000867821666","clan": "5156","level": "557","clan_name": "[HI]"},{"name": "Paul Hunchback Tarricone","pid": "1802842586","clan": "4483","level": "563","clan_name": "[WAR]"},{"name": "Steven mad death hunter","pid": "1010952730","clan": "7116","level": "576","clan_name": "[lord]"},{"name": "GRIM REAPER DCX","pid": "100000625614887","clan": "7718","level": "585","clan_name": "[kill]"},{"name": "Teemu Greasy Contractor Giordano","pid": "100000017581409","clan": "6075","level": "587","clan_name": "[Vamp]"},{"name": "Edgardo The Barber Gingello","pid": "100005169727796","clan": "8680","level": "596","clan_name": "[tsk]"},{"name": "Ugo Lead Boots Bosco","pid": "154997434973341","clan": "16397","level": "608","clan_name": "[RFG]"},{"name": "MAJESTIC DAVID MOORE","pid": "100004647912535","clan": "8693","level": "638","clan_name": "[69]"},{"name": "Lethal Strikes","pid": "549811441866523","clan": "16603","level": "639","clan_name": "[INX]"},{"name": "Zombie Dragon","pid": "704995102890406","clan": "15121","level": "646","clan_name": "[RIP]"},{"name": "Michael Round Bagels Gravano","pid": "1664662605","clan": "4483","level": "663","clan_name": "[WAR]"},{"name": "Paul Rusty Animal Casso","pid": "711004674","clan": "6257","level": "669","clan_name": "[asbo]"},{"name": "PEDRITO EL INFIEL","pid": "1304811895","clan": "6910","level": "670","clan_name": "[Kill]"},{"name": "Melvin Crazy Blade Capesso","pid": "100001068369732","clan": "11971","level": "677","clan_name": "[Sun]"},{"name": "bros sticking together","pid": "100000891721487","clan": "5863","level": "677","clan_name": "[BOA]"},{"name": "Jameel Say Nothin Rastelli","pid": "1082906579","clan": "17511","level": "683","clan_name": "[Love]"},{"name": "Mani Shifty Blade Fazoli","pid": "10201035588089251","clan": "9070","level": "685","clan_name": "[CC]"},{"name": "ForgottenSoul","pid": "100000625735827","clan": "6895","level": "692","clan_name": "[SOUL]"},{"name": "Tatolyn","pid": "537496492","clan": "6910","level": "708","clan_name": "[Kill]"},{"name": "Treasury","pid": "832831460154271","clan": "14356","level": "784","clan_name": "[BBI]"},{"name": "ramhammer","pid": "100000422225582","clan": "17888","level": "801","clan_name": "[AS]"},{"name": "Unknown","pid": "121155445256614","clan": "15143","level": "801","clan_name": "[KobK]"},{"name": "Angelic Renegade","pid": "1154929731207381","clan": "15765","level": "830","clan_name": "[BBHC]"},{"name": "Eric Deadman Ciasullo","pid": "100001383336634","clan": "6800","level": "839","clan_name": "[ASLA]"},{"name": "blue eyed boys","pid": "1108266717","clan": "6454","level": "848","clan_name": "[RS]"},{"name": "HardCore Warriors Mafia Member","pid": "1810404562","clan": "7047","level": "854","clan_name": "[DMBD]"},{"name": "Swiftent","pid": "100004259824573","clan": "11811","level": "858","clan_name": "[SMK]"},{"name": "Craig Crazy Barber Todaro","pid": "10153649828959617","clan": "11971","level": "862","clan_name": "[Sun]"},{"name": "Judd Clit Nose Manzo","pid": "100001696778244","clan": "10086","level": "866","clan_name": "[TCC]"},{"name": "Kevin Hole Digger Rastelli","pid": "100001575656532","clan": "11971","level": "874","clan_name": "[Sun]"},{"name": "Nicolina Fat Bookie Siegel","pid": "1535020036544610","clan": "17888","level": "879","clan_name": "[AS]"},{"name": "Peder Tea Bags Furnari","pid": "111360479285767","clan": "6711","level": "880","clan_name": "[dane]"},{"name": "Mike Lucky Monk Corleone","pid": "100001248450946","clan": "4483","level": "894","clan_name": "[WAR]"},{"name": "YIPPEE KIYAY","pid": "10201080398286843","clan": "16908","level": "905","clan_name": "[ME]"},{"name": "Ivan Greasy Lackey Fratto","pid": "100000551115044","clan": "15882","level": "919","clan_name": "[BOOM]"},{"name": "Done Gone","pid": "100001681703502","clan": "5863","level": "921","clan_name": "[BOA]"},{"name": "ALL LESBIAN","pid": "798725005","clan": "9070","level": "924","clan_name": "[CC]"},{"name": "Shamus Cavalier Hayes","pid": "10206494768716676","clan": "14356","level": "932","clan_name": "[BBI]"},{"name": "Raymond Fat Nails Capesso","pid": "785724814","clan": "14502","level": "956","clan_name": "[EXM]"},{"name": "Johnny B","pid": "100000566355009","clan": "3429","level": "969","clan_name": "[BMF]"},{"name": "Insane killer","pid": "10203810995582324","clan": "15121","level": "994","clan_name": "[RIP]"},{"name": "VICON","pid": "10154202368268793","clan": "14356","level": "1031","clan_name": "[BBI]"},{"name": "Haruko Round Bagels Sisca","pid": "100004539780737","clan": "7047","level": "1036","clan_name": "[DMBD]"},{"name": "Don KAR Corleone","pid": "100004874467819","clan": "7963","level": "1043","clan_name": "[360]"},{"name": "Veliscu Machine Gun Tamasulo","pid": "100000479294316","clan": "7718","level": "1061","clan_name": "[kill]"},{"name": "Anthony Say Nothin Giordano","pid": "106962163413673","clan": "18087","level": "1070","clan_name": "[MoL]"},{"name": "Michelle Mad Barber McVitie","pid": "1386651114","clan": "4319","level": "1093","clan_name": "[shot]"},{"name": "BBHC dan","pid": "1674436132816955","clan": "15765","level": "1112","clan_name": "[BBHC]"},{"name": "Van Lucky Cheesebox DeCicco","pid": "793432117","clan": "5858","level": "1131","clan_name": "[ILLU]"},{"name": "Rick the mad hitter","pid": "838292616186369","clan": "14467","level": "1137","clan_name": "[SS]"},{"name": "Jens Shifty Weasal Coppa","pid": "141727009551324","clan": "6711","level": "1146","clan_name": "[dane]"},{"name": "Katie Lead Boots Fratto","pid": "10152113235328546","clan": "3429","level": "1152","clan_name": "[BMF]"},{"name": "Comisarul M0LD0V4N","pid": "100000993673500","clan": "6736","level": "1209","clan_name": "[CJM2]"},{"name": "Shady Saddie","pid": "10206998332171876","clan": "15121","level": "1216","clan_name": "[RIP]"},{"name": "BIG PHILL","pid": "100000531543874","clan": "3429","level": "1216","clan_name": "[BMF]"},{"name": "StillAlive","pid": "1154499177907017","clan": "14356","level": "1227","clan_name": "[BBI]"},{"name": "BRING YOUR ASS","pid": "10206524881145056","clan": "18608","level": "1231","clan_name": "[HALO]"},{"name": "Thomas The Moustache Grammauta","pid": "10153928890019879","clan": "16065","level": "1232","clan_name": "[go]"},{"name": "Eloisa One Ear Cerasani","pid": "100005952305207","clan": "7479","level": "1249","clan_name": "[PRCM]"},{"name": "Bill Crazy Hat Bruno","pid": "10153481306661828","clan": "14502","level": "1258","clan_name": "[EXM]"},{"name": "Dario the Bull Giordano","pid": "10154325159863395","clan": "15121","level": "1260","clan_name": "[RIP]"},{"name": "Robert Lucky Sicilian Milano","pid": "972556416173550","clan": "14502","level": "1326","clan_name": "[EXM]"},{"name": "Anthony Fat Moustache Ciasullo","pid": "100000190972880","clan": "7496","level": "1377","clan_name": "[DK]"},{"name": "Kathy Greasy Moustache Morosso","pid": "10153833404103822","clan": "15121","level": "1385","clan_name": "[RIP]"},{"name": "team killers tapper","pid": "100002787641668","clan": "6711","level": "1463","clan_name": "[dane]"},{"name": "Killer Cat","pid": "612765208799198","clan": "15121","level": "1474","clan_name": "[RIP]"},{"name": "Team Ladykillers","pid": "1531239930","clan": "6711","level": "1670","clan_name": "[dane]"},{"name": "Crazy Ladykill","pid": "1660639684","clan": "6711","level": "1674","clan_name": "[dane]"},{"name": "John Mad dog Gioelli","pid": "673863437","clan": "11811","level": "1717","clan_name": "[SMK]"},{"name": "Bent Mad Moustache Fiato","pid": "100008968893976","clan": "6711","level": "1735","clan_name": "[dane]"},{"name": "Feisty Fighter","pid": "100003836336385","clan": "4619","level": "1744","clan_name": "[SPWN]"},{"name": "Mike The Wolf Gambino","pid": "10202623802375324","clan": "15121","level": "1755","clan_name": "[RIP]"},{"name": "crazykiller","pid": "100000773211065","clan": "6711","level": "1766","clan_name": "[dane]"},{"name": "killerscruze","pid": "100003713906399","clan": "6711","level": "1775","clan_name": "[dane]"},{"name": "John Shifty Marcussi","pid": "100006632803016","clan": "10086","level": "1796","clan_name": "[TCC]"},{"name": "Rob Rusty Hacksaw Pignatelli","pid": "100001277212997","clan": "12048","level": "1816","clan_name": "[Kill]"},{"name": "Windy Britches","pid": "1339485707","clan": "17888","level": "1820","clan_name": "[AS]"},{"name": "Prohibition 30","pid": "10203486093223727","clan": "16603","level": "1835","clan_name": "[INX]"},{"name": "Crazy Dane","pid": "100001337244106","clan": "6711","level": "1850","clan_name": "[dane]"},{"name": "Bosskill","pid": "1595419173","clan": "6711","level": "1874","clan_name": "[dane]"},{"name": "The instagator","pid": "934962369954694","clan": "15765","level": "1881","clan_name": "[BBHC]"},{"name": "BADASS GIRL","pid": "10201984171797953","clan": "15121","level": "1882","clan_name": "[RIP]"},{"name": "Bent Fishy Fisherson Smarrelli","pid": "1633702983","clan": "6711","level": "1892","clan_name": "[dane]"},{"name": "The Girl Next Door","pid": "1495769520561940","clan": "14242","level": "1894","clan_name": "[ICE]"},{"name": "Diba the undertaker","pid": "1663154699","clan": "7963","level": "1961","clan_name": "[360]"},{"name": "William Baby Face DeLuna","pid": "591200162","clan": "2245","level": "1968","clan_name": "[Joes]"},{"name": "Kathy Whackya","pid": "10202933736057708","clan": "17645","level": "2040","clan_name": "[TOYS]"},{"name": "MARCELO WARNER","pid": "1665370260","clan": "40","level": "2052","clan_name": "[EBG]"},{"name": "SS HOT SQUIRREL","pid": "648270228674940","clan": "14467","level": "2070","clan_name": "[SS]"},{"name": "WhiskeyTom","pid": "100000240685320","clan": "8040","level": "2080","clan_name": "[DOA]"},{"name": "Oaken Flunky","pid": "10209784010734905","clan": "4619","level": "2085","clan_name": "[SPWN]"},{"name": "Tracey Iwannasnuffu Bastoni","pid": "10152307793827597","clan": "14242","level": "2117","clan_name": "[ICE]"},{"name": "SS ThE wHiTe DeViL","pid": "575659445968253","clan": "14467","level": "2133","clan_name": "[SS]"},{"name": "Frederick Fat Bananas Masseria","pid": "600557315","clan": "11811","level": "2162","clan_name": "[SMK]"},{"name": "ZigZag","pid": "10154094108764339","clan": "17168","level": "2234","clan_name": "[FURY]"},{"name": "SHADOWMASTER69","pid": "10203376468874117","clan": "16603","level": "2262","clan_name": "[INX]"},{"name": "James Crazy Hat Squillante","pid": "103822840181181","clan": "16603","level": "2281","clan_name": "[INX]"},{"name": "Mik The Smbino","pid": "796820033","clan": "6800","level": "2307","clan_name": "[ASLA]"},{"name": "Kiss my booty","pid": "10206939613153697","clan": "17168","level": "2313","clan_name": "[FURY]"},{"name": "Henry Crazy Lone Wolf","pid": "10154033618260650","clan": "17168","level": "2343","clan_name": "[FURY]"},{"name": "Lil RED","pid": "792944234049261","clan": "15121","level": "2374","clan_name": "[RIP]"},{"name": "plumberelkkiller","pid": "1055609864487773","clan": "14242","level": "2389","clan_name": "[ICE]"},{"name": "Cov Twat","pid": "10152287451560186","clan": "17645","level": "2394","clan_name": "[TOYS]"},{"name": "Lorna The Iceman Baldassare","pid": "10153630944201814","clan": "15882","level": "2397","clan_name": "[BOOM]"},{"name": "Puff Puff Pass it","pid": "10203796880551023","clan": "15121","level": "2429","clan_name": "[RIP]"},{"name": "neeskillers","pid": "1412134071","clan": "6711","level": "2444","clan_name": "[dane]"},{"name": "Eva Big Tuna Gravano","pid": "100000666313213","clan": "6800","level": "2456","clan_name": "[ASLA]"},{"name": "Guy Machine Gun Licavoli","pid": "1409845729041407","clan": "16603","level": "2469","clan_name": "[INX]"},{"name": "NoiZe SuPPreSSoR","pid": "1114099645296497","clan": "14242","level": "2488","clan_name": "[ICE]"},{"name": "Abigor","pid": "10208707595345222","clan": "8040","level": "2543","clan_name": "[DOA]"},{"name": "BLU 1SE","pid": "656088837771788","clan": "8040","level": "2552","clan_name": "[DOA]"},{"name": "Erratic","pid": "10202853854060111","clan": "17168","level": "2553","clan_name": "[FURY]"},{"name": "P H O E N I X","pid": "10204503315342049","clan": "17075","level": "2562","clan_name": "[FURY]"},{"name": "Anabela Machine Gun Castagna","pid": "698958686793773","clan": "14242","level": "2697","clan_name": "[ICE]"},{"name": "cheeky scottish batsturd","pid": "1057059471003661","clan": "17645","level": "2702","clan_name": "[TOYS]"},{"name": "The Silent Dark Angel","pid": "794652930545155","clan": "17168","level": "2726","clan_name": "[FURY]"},{"name": "Karey Lead Boots Fazoli","pid": "10106493","clan": "16603","level": "2753","clan_name": "[INX]"},{"name": "EL SICARIO","pid": "10152339443888684","clan": "17075","level": "2768","clan_name": "[FURY]"},{"name": "Chelle pokeahontas","pid": "652443318156132","clan": "17168","level": "2842","clan_name": "[FURY]"},{"name": "REYALMIR","pid": "1103139730","clan": "7479","level": "2887","clan_name": "[PRCM]"},{"name": "Kidon","pid": "10204439243580147","clan": "8040","level": "2902","clan_name": "[DOA]"},{"name": "Frank the Bookie","pid": "100000028082091","clan": "18594","level": "2913","clan_name": "[EF]"},{"name": "GunZatU","pid": "100000330661189","clan": "8040","level": "2936","clan_name": "[DOA]"},{"name": "Drunk Punk Butch","pid": "100002368570874","clan": "14467","level": "2950","clan_name": "[SS]"},{"name": "1The Hound1","pid": "10203711843626669","clan": "17168","level": "2955","clan_name": "[FURY]"},{"name": "Cheese Steak Jimmy","pid": "10207642357671346","clan": "8040","level": "2997","clan_name": "[DOA]"},{"name": "Reverend StJames","pid": "10206130423238850","clan": "14242","level": "3003","clan_name": "[ICE]"},{"name": "VILI","pid": "1533873339","clan": "8040","level": "3024","clan_name": "[DOA]"},{"name": "Ole Mad Ox Plumeri","pid": "10154116984848839","clan": "15121","level": "3050","clan_name": "[RIP]"},{"name": "SS FROST BYTE","pid": "695559940480754","clan": "14467","level": "3080","clan_name": "[SS]"},{"name": "I am Dauntless","pid": "10202069544281128","clan": "17168","level": "3083","clan_name": "[FURY]"},{"name": "KillerK","pid": "10152347228184443","clan": "15143","level": "3284","clan_name": "[KobK]"},{"name": "Bubb the Rat","pid": "1163079167038052","clan": "18608","level": "3299","clan_name": "[HALO]"},{"name": "Mae Sleepy Tiger","pid": "1157364304297976","clan": "17168","level": "3322","clan_name": "[FURY]"},{"name": "VicDizzle","pid": "1369727504","clan": "17168","level": "3347","clan_name": "[FURY]"},{"name": "El Vagabundo","pid": "10203011222735788","clan": "17168","level": "3395","clan_name": "[FURY]"},{"name": "Michael Shifty Mugs Castellano","pid": "10209409563937726","clan": "15121","level": "3422","clan_name": "[RIP]"},{"name": "SS Deborah Squirrel","pid": "890426654361001","clan": "14467","level": "3466","clan_name": "[SS]"},{"name": "Lips","pid": "10154054956310084","clan": "8040","level": "3474","clan_name": "[DOA]"},{"name": "X DESTINI X","pid": "1208534785857641","clan": "16603","level": "3576","clan_name": "[INX]"},{"name": "James Ice Pick Corozzo","pid": "1250392324972607","clan": "16603","level": "3606","clan_name": "[INX]"},{"name": "SS Little but Deadly","pid": "10202566321312298","clan": "14467","level": "3621","clan_name": "[SS]"},{"name": "Otis B Driftwood","pid": "730378767013800","clan": "14242","level": "3627","clan_name": "[ICE]"},{"name": "SS INFIDEL","pid": "1068170879911632","clan": "14467","level": "3644","clan_name": "[SS]"},{"name": "Rabid Rabbit","pid": "10154173724470314","clan": "17168","level": "3666","clan_name": "[FURY]"},{"name": "HoeLiSchit","pid": "856155857734692","clan": "17168","level": "3681","clan_name": "[FURY]"},{"name": "S A S S","pid": "10203730591484464","clan": "17645","level": "3687","clan_name": "[TOYS]"},{"name": "Debbie Dark deva d","pid": "1089010794488963","clan": "14242","level": "3691","clan_name": "[ICE]"},{"name": "Aztk","pid": "100003716809439","clan": "14242","level": "3723","clan_name": "[ICE]"},{"name": "SS Ianie Meanie","pid": "1327528463929595","clan": "14467","level": "3845","clan_name": "[SS]"},{"name": "The Deplorable","pid": "555391471299127","clan": "17645","level": "3879","clan_name": "[TOYS]"},{"name": "MACtheKNIFE","pid": "10209586462964072","clan": "17168","level": "3884","clan_name": "[FURY]"},{"name": "Vastly Blank","pid": "219918621709245","clan": "14242","level": "3918","clan_name": "[ICE]"},{"name": "SS Valentina Nina DeLuca","pid": "10153526394333994","clan": "14467","level": "3958","clan_name": "[SS]"},{"name": "CarPeDiem","pid": "100000774015641","clan": "6800","level": "3983","clan_name": "[ASLA]"},{"name": "Joanna","pid": "985323024885532","clan": "17075","level": "3986","clan_name": "[FURY]"},{"name": "Ginger Snap","pid": "811206508912645","clan": "14242","level": "3989","clan_name": "[ICE]"},{"name": "R0NiN","pid": "10206542367825070","clan": "17075","level": "4013","clan_name": "[FURY]"},{"name": "Stan Down","pid": "100000790298025","clan": "17732","level": "4032","clan_name": "[BOTS]"},{"name": "Kevin fishin huntin lovin everyday","pid": "10205323317797127","clan": "17645","level": "4065","clan_name": "[TOYS]"},{"name": "SAME SHEET NEW DAY BLAH BLAH BLAH HAHAHEHEHOHO","pid": "1131670336872713","clan": "4619","level": "4095","clan_name": "[SPWN]"},{"name": "Mike Bingo Bango Bongo","pid": "1590243611","clan": "8040","level": "4100","clan_name": "[DOA]"},{"name": "Finnisher J","pid": "10154123964254481","clan": "17168","level": "4151","clan_name": "[FURY]"},{"name": "Kingster69","pid": "1318759574804325","clan": "8040","level": "4168","clan_name": "[DOA]"},{"name": "Smoochie","pid": "10208565320522295","clan": "17645","level": "4182","clan_name": "[TOYS]"},{"name": "Hell Hound","pid": "10152774045788065","clan": "17168","level": "4201","clan_name": "[FURY]"},{"name": "GrandPopa T","pid": "10203692959951226","clan": "17645","level": "4227","clan_name": "[TOYS]"},{"name": "Franco Massimo Sanguinetti","pid": "849680335049012","clan": "17168","level": "4231","clan_name": "[FURY]"},{"name": "Da ToothFairy","pid": "10206636405208592","clan": "14242","level": "4372","clan_name": "[ICE]"},{"name": "DOMINO","pid": "1130339280342497","clan": "18608","level": "4387","clan_name": "[HALO]"},{"name": "SS SinisterSquirrel","pid": "10202924330803239","clan": "14467","level": "4474","clan_name": "[SS]"},{"name": "HUCK","pid": "269109146788842","clan": "17645","level": "4526","clan_name": "[TOYS]"},{"name": "Jimmy the Rose","pid": "568653085","clan": "6169","level": "4539","clan_name": "[SIKU]"},{"name": "Michelle Fat Ox Castagna","pid": "689952445","clan": "4619","level": "4600","clan_name": "[SPWN]"},{"name": "The War Wabbit","pid": "1341832559167313","clan": "8040","level": "4668","clan_name": "[DOA]"},{"name": "Pretty Boy Floy","pid": "10200825082708398","clan": "14467","level": "4683","clan_name": "[SS]"},{"name": "Patty Cakes","pid": "1274469132581475","clan": "14242","level": "4720","clan_name": "[ICE]"},{"name": "Mafia Mike Gotti","pid": "1701894850050554","clan": "14242","level": "4753","clan_name": "[ICE]"},{"name": "SS Matriarch Dee","pid": "10203345256853496","clan": "14467","level": "4758","clan_name": "[SS]"},{"name": "SS Kelly Exotic Squirrel","pid": "10206681453498203","clan": "14467","level": "4942","clan_name": "[SS]"},{"name": "Icepick J","pid": "604837816","clan": "8040","level": "5004","clan_name": "[DOA]"},{"name": "BOUNTY THIEF","pid": "837247882956578","clan": "17645","level": "5096","clan_name": "[TOYS]"},{"name": "J1NX","pid": "100004396001129","clan": "18608","level": "5144","clan_name": "[HALO]"},{"name": "SS Movin on Diva","pid": "10201685519650291","clan": "14467","level": "5178","clan_name": "[SS]"},{"name": "CatWoman","pid": "100003533382079","clan": "15143","level": "5183","clan_name": "[KobK]"},{"name": "STEPPENWOLF","pid": "622221409","clan": "4619","level": "5207","clan_name": "[SPWN]"},{"name": "Kevin NY NIGHTMARE Coleman","pid": "622680041229061","clan": "17168","level": "5219","clan_name": "[FURY]"},{"name": "Holy Cow","pid": "674072277","clan": "17732","level": "5260","clan_name": "[BOTS]"},{"name": "Thrill Me","pid": "1414474326","clan": "17645","level": "5272","clan_name": "[TOYS]"},{"name": "Mr EviL","pid": "1156503274381234","clan": "14242","level": "5301","clan_name": "[ICE]"},{"name": "Stetz","pid": "10201868577145033","clan": "14242","level": "5311","clan_name": "[ICE]"},{"name": "Rodney The Face","pid": "595238810","clan": "8040","level": "5353","clan_name": "[DOA]"},{"name": "Floppity Loppity Booblesnoot","pid": "753082367","clan": "4619","level": "5434","clan_name": "[SPWN]"},{"name": "La Vera PerLa da CoLoniA","pid": "10206229777207782","clan": "17075","level": "5479","clan_name": "[FURY]"},{"name": "Just Dano","pid": "597032897126635","clan": "14242","level": "5518","clan_name": "[ICE]"},{"name": "Love Simon","pid": "847622608597873","clan": "14467","level": "5616","clan_name": "[SS]"},{"name": "ZeroKillz","pid": "522789914","clan": "15143","level": "5645","clan_name": "[KobK]"},{"name": "DOA Rebs","pid": "1652980052","clan": "8040","level": "5817","clan_name": "[DOA]"},{"name": "I Am Wrath","pid": "10206829517469717","clan": "17645","level": "5858","clan_name": "[TOYS]"},{"name": "AdolfOnZiA","pid": "1045964342","clan": "8040","level": "5939","clan_name": "[DOA]"},{"name": "don AP Smith","pid": "1809249684","clan": "14242","level": "5974","clan_name": "[ICE]"},{"name": "SS Pinky","pid": "519465264828802","clan": "14467","level": "5979","clan_name": "[SS]"},{"name": "SINISTER","pid": "1353825043","clan": "4619","level": "6021","clan_name": "[SPWN]"},{"name": "Fire Dragon","pid": "971473436235329","clan": "17075","level": "6037","clan_name": "[FURY]"},{"name": "K I L L E R P U P","pid": "10209203515474164","clan": "18608","level": "6053","clan_name": "[HALO]"},{"name": "Wyld Stallyon","pid": "10151946862106237","clan": "17075","level": "6066","clan_name": "[FURY]"},{"name": "Slick The Misfit","pid": "563328512","clan": "4619","level": "6070","clan_name": "[SPWN]"},{"name": "Natural Born Killer","pid": "100003725777709","clan": "8040","level": "6164","clan_name": "[DOA]"},{"name": "Wizard","pid": "100000552431013","clan": "17645","level": "6244","clan_name": "[TOYS]"},{"name": "S T E L L A","pid": "845941842089194","clan": "16603","level": "6255","clan_name": "[INX]"},{"name": "Rogue Wind","pid": "10200657063827759","clan": "17645","level": "6259","clan_name": "[TOYS]"},{"name": "SpiritRobber","pid": "1054530959","clan": "17645","level": "6302","clan_name": "[TOYS]"},{"name": "Smooochie","pid": "841245282556917","clan": "17645","level": "6302","clan_name": "[TOYS]"},{"name": "Sumthin Shiny","pid": "10201741714702241","clan": "18608","level": "6320","clan_name": "[HALO]"},{"name": "Snarky RL Frunkiss","pid": "10207489611136890","clan": "17645","level": "6381","clan_name": "[TOYS]"},{"name": "W I L D H E A R T","pid": "100003157834457","clan": "17075","level": "6389","clan_name": "[FURY]"},{"name": "Casse","pid": "10209528825442216","clan": "17075","level": "6839","clan_name": "[FURY]"},{"name": "CELTICDOG","pid": "100000845838447","clan": "17645","level": "7069","clan_name": "[TOYS]"},{"name": "SS Darkstar","pid": "1025805624179149","clan": "14467","level": "7090","clan_name": "[SS]"},{"name": "Ozzy One Ear Hoffa","pid": "1558928871","clan": "17075","level": "7105","clan_name": "[FURY]"},{"name": "Tiny Snarky Gnat","pid": "10206427064344003","clan": "17645","level": "7142","clan_name": "[TOYS]"},{"name": "Risque Karma","pid": "10154841019724408","clan": "17075","level": "7194","clan_name": "[FURY]"},{"name": "The Joker Ha Ha Ha","pid": "770632852955099","clan": "17075","level": "7401","clan_name": "[FURY]"},{"name": "SS Nutty Doug","pid": "1147389248619053","clan": "14467","level": "7443","clan_name": "[SS]"},{"name": "SoiDogBob","pid": "1359742980","clan": "4619","level": "7569","clan_name": "[SPWN]"},{"name": "Marshal Orrin Porter Rockwell","pid": "100008606797549","clan": "8040","level": "7621","clan_name": "[DOA]"},{"name": "Hand of Doom","pid": "1612233325","clan": "17168","level": "7634","clan_name": "[FURY]"},{"name": "Shawn CraZyKr","pid": "724861930","clan": "17075","level": "7658","clan_name": "[FURY]"},{"name": "Goldie The Specialist","pid": "10201816250628219","clan": "17075","level": "7738","clan_name": "[FURY]"},{"name": "MAFIA INC","pid": "652985388088334","clan": "14242","level": "7744","clan_name": "[ICE]"},{"name": "Efn Shweet","pid": "1592811047627615","clan": "18608","level": "7863","clan_name": "[HALO]"},{"name": "Tarek Tally Tall Bilotti","pid": "100001113235866","clan": "14242","level": "8251","clan_name": "[ICE]"},{"name": "santa claus","pid": "1837830926","clan": "40","level": "8268","clan_name": "[EBG]"},{"name": "Alin Mad Hat Tramunti","pid": "100002039058221","clan": "6800","level": "8277","clan_name": "[ASLA]"},{"name": "Lorraine The Blade","pid": "1308520097","clan": "4619","level": "8403","clan_name": "[SPWN]"},{"name": "Sweetcream Scoops","pid": "100000261654052","clan": "14242","level": "8545","clan_name": "[ICE]"},{"name": "Tony Lucky","pid": "100002524211688","clan": "17168","level": "8695","clan_name": "[FURY]"},{"name": "Fade To Black","pid": "10209347818431201","clan": "17075","level": "8701","clan_name": "[FURY]"},{"name": "1 KraZyDaR","pid": "10206073499508639","clan": "17075","level": "8814","clan_name": "[FURY]"},{"name": "Maurice Ice Pick Gotti","pid": "1067538500","clan": "15143","level": "8890","clan_name": "[KobK]"},{"name": "LosChe","pid": "100003494035612","clan": "17168","level": "9315","clan_name": "[FURY]"},{"name": "Tara Thunder","pid": "100000598147289","clan": "17645","level": "9368","clan_name": "[TOYS]"},{"name": "Kiss My Tutu","pid": "100001052839368","clan": "17075","level": "9380","clan_name": "[FURY]"},{"name": "REVENANT","pid": "370803719789153","clan": "17075","level": "9381","clan_name": "[FURY]"},{"name": "Da Beer Truck","pid": "10153757637762957","clan": "18608","level": "9408","clan_name": "[HALO]"},{"name": "The Tamminator","pid": "10152759918507977","clan": "14467","level": "9417","clan_name": "[SS]"},{"name": "PSYCHO BASTARD","pid": "1141056935906946","clan": "17075","level": "9651","clan_name": "[FURY]"},{"name": "Incatnito","pid": "10202189569758193","clan": "17168","level": "9686","clan_name": "[FURY]"},{"name": "Tiny Snarky Gnat Sneezes","pid": "1444898909","clan": "17645","level": "10104","clan_name": "[TOYS]"},{"name": "Jill the 2THFAIRY","pid": "10202944074357347","clan": "17645","level": "10214","clan_name": "[TOYS]"},{"name": "SS Big Daddy Squirrel","pid": "10208127977690877","clan": "14467","level": "10457","clan_name": "[SS]"},{"name": "Elektra","pid": "1482758917","clan": "17168","level": "10613","clan_name": "[FURY]"},{"name": "Captain Of Industry","pid": "100000166316281","clan": "4619","level": "10789","clan_name": "[SPWN]"},{"name": "S A M M Y","pid": "623259252","clan": "4619","level": "10820","clan_name": "[SPWN]"},{"name": "MR KURKER The king of KURKERS","pid": "1039990564","clan": "17645","level": "10834","clan_name": "[TOYS]"},{"name": "B E G","pid": "100000694123623","clan": "14467","level": "10941","clan_name": "[SS]"},{"name": "THE OLD WAR DOG","pid": "1212377612","clan": "17645","level": "11057","clan_name": "[TOYS]"},{"name": "Harvey Ballzbanger","pid": "1425904938","clan": "17168","level": "11084","clan_name": "[FURY]"},{"name": "Heretic Wild The Farm Boy","pid": "544680867","clan": "14242","level": "11150","clan_name": "[ICE]"},{"name": "RUUD THE BRUTE","pid": "1844139629","clan": "14242","level": "11352","clan_name": "[ICE]"},{"name": "Road King","pid": "10201006783491040","clan": "17075","level": "11414","clan_name": "[FURY]"},{"name": "The end of the beginning","pid": "1422482457","clan": "4619","level": "11497","clan_name": "[SPWN]"},{"name": "OMG UR BANANA HAMMOCK","pid": "100002019248646","clan": "4619","level": "11759","clan_name": "[SPWN]"},{"name": "SS The Squirrel","pid": "816617391699974","clan": "14467","level": "11857","clan_name": "[SS]"},{"name": "mort","pid": "100000200889346","clan": "17732","level": "12049","clan_name": "[BOTS]"},{"name": "Chris The Hammer Arcuri","pid": "1093039789","clan": "8040","level": "12194","clan_name": "[DOA]"},{"name": "getoverit","pid": "1009424359150429","clan": "17075","level": "12903","clan_name": "[FURY]"},{"name": "Just a Girl","pid": "3985091562196","clan": "17075","level": "13045","clan_name": "[FURY]"},{"name": "Gene Shen an Calhar","pid": "10201141077203997","clan": "17075","level": "13571","clan_name": "[FURY]"},{"name": "Ali In Wonderland","pid": "747698992","clan": "17645","level": "13841","clan_name": "[TOYS]"},{"name": "SincinnatiKid","pid": "1152607454749884","clan": "17075","level": "14432","clan_name": "[FURY]"},{"name": "Venomous Veronica","pid": "553393791","clan": "14242","level": "14894","clan_name": "[ICE]"},{"name": "ARMANDO THE BEAUTIFUL ITALIAN MAN","pid": "1692541694","clan": "8040","level": "15087","clan_name": "[DOA]"},{"name": "Paul Moonshine Lombardozzi","pid": "1360841114","clan": "17168","level": "15102","clan_name": "[FURY]"},{"name": "Heisenberg PE","pid": "10207750225347969","clan": "17075","level": "18014","clan_name": "[FURY]"},{"name": "Nino DeMeo","pid": "1352490141","clan": "14242","level": "19850","clan_name": "[ICE]"}];  
     
    $('#user_config_button').parent().parent().append('<li><a id="war_tunnel" href="#">War mode.&#12324;</a></li>');
                 
    $('#war_tunnel').click(function(){
        if(!wm_onscreen){
            wm_onscreen = true;
            $('#war_mode_div').slideDown("slow");
        }else{
            wm_onscreen = false;
            $('#war_mode_div').slideUp("slow");
        }
        return false;
    });
 
    $('.metal-bar-repeater:first').after('<div id="war_mode_div" style="display:none;position:absolute;z-index:999999;width:750px; border: 1px solid #666666;background:black;">'+
    '<style>'+
    '   .gx_button {'+
    '       display: inline-block; '+ 
    '       background: #ffffff;'+  
    '       -webkit-border-radius: 6px;'+
    '       -moz-border-radius: 6px;'+
    '       border-radius: 3px;'+
    '       font-size: 14px;'+
    '       font-weight: bold;'+
    '       height: 27px;'+
    '       line-height: 15px;'+
    '       padding: 0 0 0 3px;'+
    '       text-align: center;'+
    '       text-decoration: none;'+
    '       vertical-align: middle;'+
    '   }'+
    '   .gx_button span{'+
    '       background-position: 1000px 0;'+
    '       background-repeat: no-repeat;'+
    '       display: block;'+
    '       margin: 0;'+
    '       padding: 5px 12px 5px 9px;'+
    '   }'+
    '   .gx_button_red {'+
    '       background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(252,78,51,1)), color-stop(50%, rgba(205,69,51,1)), color-stop(51%, rgba(185,22,0,1)), color-stop(100%, rgba(125,8,0,1)));'+
    '       background: -webkit-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
    '       background: -moz-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
    '       background: -ms-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
    '       background: -o-linear-gradient(top, rgba(252,78,51,1) 0%, rgba(205,69,51,1) 50%, rgba(185,22,0,1) 51%, rgba(125,8,0,1) 100%);'+
    '       color: #ffffff;'+
    '   }'+
    '   .gx_button_red:hover {'+
    '       background: #fc4e33;'+
    '   }'+
    '   .gx_button_green {'+
    '       background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(200,250,125,1)), color-stop(50%, rgba(161,202,103,1)), color-stop(51%, rgba(114,171,34,1)), color-stop(100%, rgba(56,101,2,1)));'+
    '       background: -webkit-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
    '       background: -moz-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
    '       background: -ms-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
    '       background: -o-linear-gradient(top, rgba(200,250,125,1) 0%, rgba(161,202,103,1) 50%, rgba(114,171,34,1) 51%, rgba(56,101,2,1) 100%);'+
    '       color: #000000;'+
    '   }'+
    '   .gx_button_green:hover {'+
    '       background: #c8fa7d;'+
    '   }   '+
    '</style>'+
    '   <div style="width:100%;">'+
    '       <div>'+
    '           <p style="display:block;margin:10px;">'+
    '               <span style="display:block;float:left;width:50%;margin-left:0px;text-align:right;">War mode</span>'+
    '               <span style="display:block;float:right;width:25%;margin-left:0px;text-align:right;"><a href="#" id="p_wheel_active" class="gx_button gx_button_green">'+
    '                   <span style="color:black">'+
    '                       Run Wheel'+
    '                   </span>'+
    '               </a></span>'+
    '               <span style="display:block;float:right;width:25%;margin-left:0px;text-align:right;"><a href="#" id="wm_active" class="gx_button gx_button_green">'+
    '                   <span style="color:black">'+
    '                       Run'+
    '                   </span>'+
    '               </a></span>'+
    '           </p>'+
    '       </div>'+
    '       <div>'+
    '           <p>'+
    '               Status:<span style="align:left;" id="war_status">Waiting to start...</span>'+
    '           </p>'+
    '       </div>'+
    '       <div>'+
    '           <table style="border: 1px solid #666666; margin-left:5px; margin-right:5px; width:740px;">'+
    '               <tr>'+
    '                   <td width="25px" valign="top">Log</td>'+
    '                   <td width="1px" valign="top">:</td>'+
    '                   <td id="war_log" valign="baseline" colspan="2" style="font-weight:bold;"></td>'+
    '               </tr>'+
    '           </table>'+
    '       </div>'+
    '   </div>'+
    '</div>');
 
    var p_wheel = false;
    $('#wm_active').click(function(){
        if(p_wheel){
            return;
        }
        if(isOn){
            isOn = false;
            $('#war_status').html('Finished run!');
            $(this).addClass('gx_button_green').removeClass('gx_button_red').children().text('Run');
        }else{
            isOn = true;
            $(this).addClass('gx_button_red').removeClass('gx_button_green').children().text('Stop');
            war_mode = 'attack';
            start_warring();
        }       
        return false;
    })
     
    $('#p_wheel_active').click(function(){
        if(isOn){
            return;
        }
        if(p_wheel){
            p_wheel = false;
            $('#war_status').html('Finished Punch Wheel Run!');
            $(this).addClass('gx_button_green').removeClass('gx_button_red').children().text('Run Wheel');
        }else{
            p_wheel = true;
            $(this).addClass('gx_button_red').removeClass('gx_button_green').children().text('Stop Wheel');
            start_wheel();
        }       
        return false;
    })  
     
    function start_warring(){
        if(!isOn){
            return;
        }
        targets = [];
        build_ajax({page:'rival/rival_modal_select/faction_rivals'},function(data){
            userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
            userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
            if(/Wars is disabled/.test(data)){
                war_logger('War mode disabled, stopping..');
                $('#wm_active').click();
                return;
            }else if(/War mode has been enabled/.test(data)){
                if(firstRun){
                    firstChild = false;
                    points.your_start = /Your Points: (\d+)/.exec(data)[1];
                    points.syn_start = /Syndicate Points: (\d+)/.exec(data)[1];                 
                }
                $(data).find('.styled-table-v2 > tbody').children().each(function(){
                    if($(this).find('th').length > 0){
                        return true;
                    }
                    var clan_name = $(this).find('td:eq(1) > a:first').text().trim();
                    var name = $(this).find('td:eq(1) > a:last').text().trim();
                    var level = parseInt($(this).find('td:eq(1) > p > span').text().replace(/[^0-9]/g, '').trim());
                    var mob_id = $(this).find('td:eq(0) > a').attr('href').replace(/[^0-9]/g, '');
                    var att_left = parseInt($(this).find('td:eq(2)').find('.lightgrey:first').text().replace(/[^0-9]/g, ''));
                    var pun_left = parseInt($(this).find('td:eq(2)').find('.lightgrey:eq(1)').text().replace(/[^0-9]/g, ''));
                    var can_hit = $(this).find('a[id^="rival_battle_message"]').length > 0;
                    var can_punch = $(this).find('a[id^="rival_punch_message"]').length > 0;
                    targets.push({clan: clan_name, name: name, level: level, pid: mob_id, attacks_left:att_left, can_attack: can_hit, punches_left:pun_left, can_punch:can_punch})
                })
                //war_logger('Your points: '+points.points+' Syns total points: '+points.syn_start);
                targets.sort(function(a,b){
                    return a.level - b.level;
                })
                if(war_mode.toLowerCase() == 'attack'){
                    batter_up();
                }else{
                    who_we_punching();                  
                }
                //war_logger(JSON.stringify(targets))
            }
        })
    }start_warring();
     
    function who_we_punching(){
        if(isOn){
            if(targets.length){
                current_target = targets.shift();
                if(!current_target.can_punch){
                    who_we_punching();
                    return;
                }
                var found = false;;
                if(already_punched.length != 0){
                    for(var i = 0; i<already_punched.length; i++){
                        if(current_target.pid == already_punched[i].pid){
                            found = true;
                            break;
                        }
                    }               
                }
                if(found){
                    who_we_punching();
                    return;
                }
                do_punch();
            }else{
                build_ajax({page:'rival/rival_modal_select/faction_rivals'},function(data){
//                  war_logger('possible error: no targets? stoppping..');
                    points.your_end = /Your Points: (\d+)/.exec(data)[1];
                    points.syn_end = /Syndicate Points: (\d+)/.exec(data)[1];
                    war_logger('Your points: '+points.your_end+' Syns total points: '+points.syn_end);
                    war_logger('Points made this run: '+(parseInt(points.your_end)-parseInt(points.your_start)));
//                  war_logger(JSON.stringify(already_punched))
                    $('#wm_active').click();
                })
            }
        }
    }
     
    function do_punch(){
        if(isOn){
            if(current_target.punches_left <= 0){
                $('#war_status').html('skipping to next target');
                already_punched.push(current_target);
                who_we_punching();
                return;
            }else{
                if(parseInt(userStats.health[1]) <= heal_percent){
                    $('#war_status').html('Needing to heal..');
                    vist_hospital(do_punch);
                    return;
                }else if(parseInt(userStats.stamina[1]) < 1){
                    war_logger('No stamina...');
                    return;
                }else{
                    $('#war_status').html('Punching '+current_target.clan+' '+current_target.name+' level '+current_target.level+'!');
                    var info = 'target_user_id='+current_target.pid+'&ajax_response_type=modal&modal_id=rival_punch_modal_modal';
                    build_ajax({page:'profile/do_punch',data:info},function(data){
                        parse_punch(data);
                    })
                }
            }
        }
    }
     
    function parse_punch(data){
        if(isOn){
            userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
            userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
            if(/You are too weak to punch/.test(data)){
                vist_hospital(do_punch);
                return;
            }
            if(/You need 1 Stamina/.test(data)){
                war_logger('ran out of stamina, stopping');
                $('#wm_active').click();
                return;
            }
            if(/You just punched/.test(data)){
                var n = 0;
                if(/WP/.test(data)){
                    n = /\+(\d+)  WP/.exec(data)[1];
                }
                war_logger('You just punched '+current_target.clan+' '+current_target.name+' level '+current_target.level+' and got '+n+' WPs');
            }else if(/is currently dead/.test(data)){
                war_logger(current_target.clan+' '+current_target.name+' level '+current_target.level+' is currently dead');
            }else if(/You can only punch/.test(data)){
            //  war_logger('You\'ve already punched '+current_target.clan+' '+current_target.name+' level '+current_target.level+' within the last hour');
            }else if(/You just killed/.test(data)){
                var n = 0;
                if(/WP/.test(data)){
                    n = /\+(\d+)  WP/.exec(data)[1];
                }
                war_logger('You just killed '+current_target.name+' with a punch to the face! and got '+n+' WPs');
            }else if(/user is in your Mob and cannot/.test(data)){
                war_logger('cant hit '+current_target.clan+' '+current_target.name+' level '+current_target.level+' as they are in your mob');
            }else if(/cannot Punch this player while/.test(data)){
                war_logger('cant hit '+current_target.clan+' '+current_target.name+' level '+current_target.level+' since they are on the hitlist');
            }else if(/Selected opponent is already in a/.test(data)){
            //  war_logger(''+current_target.clan+' '+current_target.name+' level '+current_target.level+' is already in a fight, trying again..');
            }else{
                war_logger('have not caught this error yet, stopping');
                $('#wm_active').click();
                return;
            }
            who_we_punching();
        }
    }
     
    function batter_up(){
        if(isOn){
            if(targets.length){
                current_target = targets.shift();
                if(!current_target.can_attack){
                    batter_up();
                    return;
                }
                var found = false;;
                if(already_hit.length != 0){
                    for(var i = 0; i<already_hit.length; i++){
                        if(current_target.pid == already_hit[i].pid){
                            found = true;
                            break;
                        }
                    }               
                }
                if(found){
                    batter_up();
                    return;
                }
                do_attack();
            }else{
                war_mode = 'punch';
                start_warring();
/*              build_ajax({page:'rival/rival_modal_select/faction_rivals'},function(data){
                    war_logger('possible error: no targets? stoppping..');
                    points.your_end = /Your Points: (\d+)/.exec(data)[1];
                    points.syn_end = /Syndicate Points: (\d+)/.exec(data)[1];
                    war_logger('Your points: '+points.your_end+' Syns total points: '+points.syn_end);
                    war_logger('Points made this run: '+(parseInt(points.your_end)-parseInt(points.points)));
                    war_logger(JSON.stringify(already_hit))
                })*/
            }
        }
    }
     
    function do_attack(){
        if(isOn){
            if(current_target.attacks_left <= 0){
                $('#war_status').html('skipping to next target');
                already_hit.push(current_target);
                batter_up();
                return;
            }else{
                if(parseInt(userStats.health[1]) <= heal_percent){
                    $('#war_status').html('Needing to heal..');
                    vist_hospital(do_attack);
                    return;
                }else if(parseInt(userStats.stamina[1]) < 1){
                    war_logger('No stamina...');
                    return;
                }else{
                    war_logger('Attacking '+current_target.clan+' '+current_target.name+' level '+current_target.level+'!');
                    var info = 'user_id='+current_target.pid+'&attack_type=battle_attack&response_type=modal&update_id=rival_attack_modal_callback&ajax_response_type=modal&modal_id=rival_attack_modal_modal';
                    build_ajax({page:'battle/modal_attack',data:info},function(data){
                        parse_fight(data);
                    })
                }
            }
        }
    }
     
    function parse_fight(data){
        if(isOn){
            userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
            userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
            if(/You are too weak to Fight/.test(data)){
                $('#war_status').html('needing to heal..');
                vist_hospital(do_attack);
                return;
            }
            if(/Selected opponent is already in a/.test(data)){
            //  war_logger(''+current_target.clan+' '+current_target.name+' level '+current_target.level+' is already in a fight, trying again..');
                do_attack();
                return;
            }
            if(/User Hit is no longer/.test(data)){
            //  war_logger(''+current_target.clan+' '+current_target.name+' level '+current_target.level+' is already taken out');
                do_attack();
                return;
            }
            if(/has just been attacked and/.test(data)){
            //  war_logger(''+current_target.clan+' '+current_target.name+' level '+current_target.level+' has just been attacked and killed');
                do_attack();
                return;
            }
            if(/battleV2-result-box-default default-dark-box/.test(data)){
                var result_divs = data.split(/battleV2-result-box-default default-dark-box/);
                var killed = /You have killed/.test(data);
                if(/WON/.test(result_divs[0])){
                    var log = 'You Won! ';
                    if(/Attack Again/.test(data)){
                        current_target.attacks_left--;
                        att_url = '';
                        var find_str = data.split("data:'");
                        for(var i =0; i<find_str.length; i++){
                            if(find_str[i].includes('user_id')){
                                att_url = find_str[i].split(/',top:/)[0];
                                break;
                            }
                        }
                        if(att_url == ''){
                            include_stat_logger('something still wrong, stopping');
                            $('#wm_active').click();
                            return;
                        }   
                        if(parseInt(userStats.health[1]) <= heal_percent){
                            $('#war_status').html(log+'But needing to heal..');
                            vist_hospital(do_attack);
                            return;
                        }else if(parseInt(userStats.stamina[1]) < 1){
                            war_logger(log+'But no stamina left...');
                            return;
                        }else{
                            do_attack();
                            return;
                        }
                    }else{
                        if(killed){
                            war_logger(log+'Killed '+current_target.clan+' '+current_target.name+' level '+current_target.level);                                   
                        }else{
                            war_logger(log+'You put '+current_target.clan+' '+current_target.name+' level '+current_target.level+' in hospital!');
                        }
                    }
                }else{
                    var log = 'You Lost! ';
                    if(/Attack Again/.test(data)){
                        current_target.attacks_left--;
                        att_url = '';
                        var find_str = data.split("data:'");
                        for(var i =0; i<find_str.length; i++){
                            if(find_str[i].includes('user_id')){
                                att_url = find_str[i].split(/',top:/)[0];
                                break;
                            }
                        }
                        if(att_url == ''){
                            include_stat_logger('something still wrong, stopping');
                            $('#wm_active').click();
                            return;
                        }   
                        if(parseInt(userStats.health[1]) <= heal_percent){
                            $('#war_status').html(log+'But needing to heal..');
                            vist_hospital(do_attack);
                            return;
                        }else if(parseInt(userStats.stamina[1]) < 1){
                            war_logger(log+'But no stamina left...');
                            return;
                        }else{
                            do_attack();
                            return;
                        }
                    }else{
                        if(killed){
                            war_logger(log+'Killed '+current_target.clan+' '+current_target.name+' level '+current_target.level);                                   
                        }else{
                            war_logger(log+'You put '+current_target.clan+' '+current_target.name+' level '+current_target.level+' in hospital!');
                        }
                    }
                }
                batter_up();
            }
        }
    }
     
    function start_wheel(){
        //console.log('func start wheel');
        if(isOn || !p_wheel){
            return;
        }
        //console.log('func start wheel 2');
        load_profile_to_punch()
    }
 
    function load_profile_to_punch(){
        //console.log('func l p t p');
        if(isOn || !p_wheel){
            return;
        }
        //console.log('func l p t p 2');
        build_ajax({page:'profile/user/'+punch_wheel_targets[wheel_position].pid},function(data){
            read_punching_profile(data)
        })
    }
     
    function next_punching_profile(){
        if(isOn || !p_wheel){
            return;
        }
        wheel_position++;
        if(wheel_position >= punch_wheel_targets.length){
            wheel_position = 0;
            $('#p_wheel_active').click();
        }else{
            load_profile_to_punch();
        }
    }
     
    function read_punching_profile(data){
        if(isOn || !p_wheel){
            return;
        }
        var name = $(data).find('.page-title').text().trim()+' '+$(data).find('span[class="bold lightgrey"]').text();
        $('#war_status').html('Checking profile '+name);
        if(!/Add to/.test(data)){
            //console.log(name+' is part of your crew, skipping..');
            next_punching_profile();
        }else{
            if($(data).find('.war_target_icon').length > 0){
                //var log = ' is part of the war';
                if($(data).find('.dead-profile-icon').length > 0){
                    //log += ' and is dead, skipping..';
                    //console.log(name+' '+log);
                    next_punching_profile();
                    return;
                }
                //console.log(name+' '+log)
            }else{
                //console.log(name+' is no longer part of the war');
                //nl++
                next_punching_profile();
                return;
            }       
             
            var info = 'target_user_id='+punch_wheel_targets[wheel_position].pid+'&ajax_response_type=modal&modal_id=rival_punch_modal_modal';
            build_ajax({page:'profile/do_punch',data:info},function(resp){
             
            //var info = 'target_user_id='+punch_wheel_targets[wheel_position].pid;
            //build_ajax({page:'profile/do_punch',data:info},function(resp){
                userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(resp);
                userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(resp);
                if(/You are too weak to punch/.test(resp)){
                    vist_hospital(load_profile_to_punch);
                    return;
                }
                if(/You need 1 Stamina/.test(resp)){
                    war_logger('ran out of stamina, stopping');
                    $('#p_wheel_active').click();
                    return;
                }
                if(/You just punched/.test(resp)){
                    var n = 0;
                    if(/WP/.test(resp)){
                        n = /\+(\d+)  WP/.exec(resp)[1];
                    }
                    war_logger('You just punched '+punch_wheel_targets[wheel_position].clan_name+' '+punch_wheel_targets[wheel_position].name+' level '+punch_wheel_targets[wheel_position].level+' and got '+n+' WPs');
                }else if(/is currently dead/.test(resp)){
                    war_logger(punch_wheel_targets[wheel_position].clan_name+' '+punch_wheel_targets[wheel_position].name+' level '+punch_wheel_targets[wheel_position].level+' is currently dead');
                }else if(/You can only punch/.test(resp)){
                //  war_logger('You\'ve already punched '+punch_wheel_targets[wheel_position].clan_name+' '+punch_wheel_targets[wheel_position].name+' level '+punch_wheel_targets[wheel_position].level+' within the last hour');
                }else if(/You just killed/.test(resp)){
                    var n = 0;
                    if(/WP/.test(resp)){
                        n = /\+(\d+)  WP/.exec(resp)[1];
                    }
                    war_logger('You just killed '+punch_wheel_targets[wheel_position].name+' with a punch to the face! and got '+n+' WPs');
                }else if(/user is in your Mob and cannot/.test(resp)){
                    war_logger('cant hit '+punch_wheel_targets[wheel_position].clan_name+' '+punch_wheel_targets[wheel_position].name+' level '+punch_wheel_targets[wheel_position].level+' as they are in your mob');
                }else if(/experience is too low to get punched/.test(resp)){
                    //console.log('user experience is too low to get punched!?!?, skipping..');
                }else if(/cannot Punch this player while/.test(resp)){
                    //war_logger('cant hit '+punch_wheel_targets[wheel_position].clan_name+' '+punch_wheel_targets[wheel_position].name+' level '+punch_wheel_targets[wheel_position].level+' since they are on the hitlist');
                }else{
                    war_logger('have not caught this error yet, stopping');
                    $('#p_wheel_active').click();
                    return;
                }
                next_punching_profile();
            })
        }
    }   
 
    function vist_hospital(callback){
        if(isOn||p_wheel){
            var x = parseInt(base.heal_x)+myRandom(10,80);
            var y = parseInt(base.heal_y)+myRandom(5,10);
            var info = 'ajax_response_type=modal&modal_id=heal_response_modal&a_c_x='+x+'&a_c_y='+y;
            build_ajax({page:'heal/oneclick/'+healCode_global+'/',data:info},function(data){
                userStats.health = /health_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
                userStats.stamina = /stamina_menu_value"\).text\('(\d+)\/(\d+)'\);/.exec(data);
                if(/doctor will not heal you/.test(data)){
                    $('#war_status').html('The doctor will not heal you right now!');
                    callback();
                    return;
                }else if(/The doctor healed you/.test(data)){
                    $('#war_status').html('The doctor healed you..');
                    callback();
                    return;
                }else{
                    war_logger('Get new hospital message, stopping');
                    $('#wm_active').click();
                }
            })
        }
    }
     
    function myRandom(min,max) {
        return min +  Math.floor(Math.round((Math.random() * (max - min))));
    }
 
    function build_ajax(arr, handler) {
        if(isOn||p_wheel){
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
                war_logger('Something has failed! Stopping..');
                $('#wm_active').click();
            };
            i._recordStartTime();
            send_ajax(req);             
        }
    };
     
    function send_ajax(param){
        if(isOn||p_wheel){
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
     
    function war_logger(msg){
        war_log.unshift(msg);
        var LogCount = war_log.length;
        document.getElementById('war_log').innerHTML = '';
        var LogEntry = '';
        for (LogCount = 0; LogCount < war_log.length; LogCount++) {
            LogEntry += war_log[LogCount] + '<br>'
        }
        $('#war_log').html(LogEntry)
    }
})()
