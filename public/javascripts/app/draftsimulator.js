
define(['jquery','chart','jqueryui'], function($, chart, jqueryui){
$( "#instructions-tooltip" ).tooltip();
$( "#help-tooltip" ).tooltip();
tierListPath = 'javascripts/lib/tierlist.json';
var tierList;

 $.getJSON( tierListPath, function(data){
     tierList=data;
 });
 $.getJSON( 'card_prices.json', function(prices){
     console.log(prices);
 });
var set1 = 'https://steamcdn-a.akamaihd.net/apps/583950/resource/card_set_1.0E871AFDD63D1CBD0FB52D924DF1923C4A6D443A.json';
var set0 = 'https://steamcdn-a.akamaihd.net/apps/583950/resource/card_set_0.BB8732855C64ACE2696DCF5E25DEDD98D134DD2A.json';
var allCards = '';
var round = 1;
var priceurl = 'https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=name&sort_dir=asc&appid=583950&norender=1&start=0&count=10';
var testurl = 'https://steamcommunity.com/market/priceoverview/?country=DE&currency=3&appid=730&market_hash_name=P90%20%7C%20Asiimov%20%28Factory%20New%29'
var pr = 'https://raw.githubusercontent.com/eoakley/artifactscraping/master/card_dict.pkl';

var helper = true
var USERNAME = 'rsprules'
var PASSWORD = 'blip908HYPO'
/*var request = $.ajax({
  method: "GET",
  url: testurl,
  dataType: 'application/x-www-form-urlencoded',
  headers: {
    "Authorization": "27F11A17C82B8BFE900D05B08C664610"
  },

});
request.done(function( msg ) {
  console.log(msg);
});
request.fail(function( jqXHR, textStatus ) {
  console.log('fail');
});*/
$.getJSON( set0 , function(set0){
var cardSet0 = set0.card_set.card_list;
	$.ajax({
	url: set1,
	success: function(data) {
     var cardSet1 = data.card_set.card_list;
    allCards = $.merge( $.merge( [], cardSet0 ), cardSet1 );
    i = 0;
    allCards.forEach(function(card){
        tierList.forEach(function(tierData){
        if(card.card_name.english === tierData['card name'] ){
            card.tier = tierData.tier;
            card.tierRank = tierData['tier rank'];
        }
     });
    card.cid = i;
    i++;
var id = card.base_card_id;
if(card.is_blue){card.color = 'Blue'}
if(card.is_red){card.color = 'Red'}
if(card.is_black){card.color = 'Black'}
if(card.is_green){card.color = 'Green'}
if(!card.color){card.color = 'znone'}
if(id >= 1008 && id <= 4000){card.rarity = 'Basic'}
if(id >= 4002 && id <= 4005){card.rarity = 'Basic'}
if(id >= 4007 && id <= 4008){card.rarity = 'Basic'}
if(id == 4010){card.rarity = 'Basic'}
card.quantity = 1;
    });
    generateCardPools();
    generatePack();
     },
	}) ;
});

var draftedCards =[];
var heroPool = [];
  var commonHeroes = [];
  var uncommonHeroes = [];
  var rareHeroes = [];
var itemPool = [];
  var commonItems = [];
  var uncommonItems = [];
  var rareItems = [];
var mainPool = [];
  var commonMain = [];
  var uncommonMain = [];
  var rareMain = [];
var heroPicked = false;
var displayTier = true;
function generateCardPools(){
    console.log(allCards)
    for(var i=0;i<allCards.length;i++){
        if(allCards[i].card_type == "Hero"){
        heroPool.unshift(allCards[i]); }
    }
    for(i=0;i<allCards.length;i++){
        if(allCards[i].card_type == "Item" && allCards[i].sub_type != "Consumable"){
        itemPool.unshift(allCards[i]); }
    }
    for(i=0;i<allCards.length;i++){
        if(allCards[i].card_type == "Creep" || allCards[i].card_type == "Spell" || allCards[i].card_type == "Improvement" ){
        mainPool.unshift(allCards[i]); }
    }
    heroPool.forEach(function(hero){
        if(hero.rarity === "Common"){
            commonHeroes.unshift(hero);
        }
        if(hero.rarity === "Uncommon"){
            uncommonHeroes.unshift(hero);
        }
        if(hero.rarity === "Rare"){
            rareHeroes.unshift(hero);
        }
    });
    mainPool.forEach(function(main){
        if(main.rarity === "Common"){
            commonMain.unshift(main);
        }
        if(main.rarity === "Uncommon"){
            uncommonMain.unshift(main);
        }
        if(main.rarity === "Rare"){
            rareMain.unshift(main);
        }
    });
    itemPool.forEach(function(item){
        if(item.rarity === "Common"){
            commonItems.unshift(item);
        }
        if(item.rarity === "Uncommon"){
            uncommonItems.unshift(item);
        }
        if(item.rarity === "Rare"){
            rareItems.unshift(item);
        }
    });
}

  var picks;
  var render = '';
function generatePack(){
 if(round == 1){picks = 0}
 if(round == 2){picks = 2}
 if(round == 3){picks = 4}
 if(round == 4){picks = 6}
 if(round == 5){picks = 8}
 if(round == 6){picks = 10}
    createPack();
   function createPack(){
     var pack =[]
       var specialSlots = []
       for(i=0;i<4;i++){
         slot = Math.floor((Math.random() * 12) + 1);
         if(i==0){specialSlots.push(slot);}

         if(i===1){
         if(slot != specialSlots[0]){
            specialSlots.push(slot);
         }else{i--}
         }
         if(i===2){
         if(slot != specialSlots[0] && slot != specialSlots[1]){
            specialSlots.push(slot);
         }else{i--}
         }
         if(i===3){
         if(slot != specialSlots[0] && slot != specialSlots[1] && slot != specialSlots[2]){
            specialSlots.push(slot);
         }else{i--}
         }
       }

       var commonSlots =[1,2,3,4,5,6,7,8,9,10,11,12];
       for(i=0;i<12;i++){
           if(commonSlots[i] === specialSlots[0]){
               commonSlots.splice(i,1)
           }
       }
       for(i=0;i<11;i++){
           if(commonSlots[i] === specialSlots[1]){
               commonSlots.splice(i,1)
           }
       }
       for(i=0;i<10;i++){
           if(commonSlots[i] === specialSlots[2]){
               commonSlots.splice(i,1)
           }
       }
       for(i=0;i<9;i++){
           if(commonSlots[i] === specialSlots[3]){
               commonSlots.splice(i,1)
           }
       }
       var rareSlots = []
       n = Math.random()
       if(n>.75){rare = specialSlots.splice(0,1); rareSlots.push(rare[0])}
       if(n<=.75 && n>.5){rare = specialSlots.splice(1,1); rareSlots.push(rare[0])}
       if(n>.25 && n<=.5){rare = specialSlots.splice(2,1); rareSlots.push(rare[0])}
       if(n<=.25){rare = specialSlots.splice(3,1); rareSlots.push(rare[0])}
       uncommonSlots = specialSlots
       var commonUpgrades = 0
       for(i=0;i<8;i++){
           if(Math.random()<=.05){
               commonUpgrades++
           }
       }
       if(commonUpgrades != 0){
         for(i=0;i<commonUpgrades;i++){
         commonSlot = Math.floor((Math.random() * commonSlots.length));
         newUncommon = commonSlots.splice(commonSlot,1)
           uncommonSlots.push(newUncommon[0])
         }
       }
       var uncommonUpgrades = 0
       for(i=0;i<uncommonSlots.length;i++){
           if(Math.random()<=.05){
               uncommonUpgrades++
           }
       }
       if(uncommonUpgrades != 0){
         for(i=0;i<uncommonUpgrades;i++){
         uncommonSlot = Math.floor((Math.random() * uncommonSlots.length));
         newrare = uncommonSlots.splice(uncommonSlot,1)
           rareSlots.push(newrare[0])
         }
       }
       function searchArray(slot){
           if(commonSlots.find(function(commonSlot){return commonSlot == slot})){return 'common'}
            if(uncommonSlots.find(function(uncommonSlot){return uncommonSlot == slot})){return 'uncommon'}
             if(rareSlots.find(function(rareSlot){return rareSlot == slot})){return 'rare'}
       }
       if(searchArray(1)== 'common'){
           i = Math.floor((Math.random() * commonHeroes.length));
           pack.push(commonHeroes[i])
       }
       if(searchArray(1)== 'uncommon'){
           i = Math.floor((Math.random() * uncommonHeroes.length));
           pack.push(uncommonHeroes[i])
       }
       if(searchArray(1)== 'rare'){
           i = Math.floor((Math.random() * rareHeroes.length));
           pack.push(rareHeroes[i])
       }
       for(a=2;a<11;a++){
        if(searchArray(a)== 'common'){
           i = Math.floor((Math.random() * commonMain.length));
           pack.push(commonMain[i])
       }
       if(searchArray(a)== 'uncommon'){
           i = Math.floor((Math.random() * uncommonMain.length));
           pack.push(uncommonMain[i])
       }
       if(searchArray(a)== 'rare'){
           i = Math.floor((Math.random() * rareMain.length));
           pack.push(rareMain[i])
       }
       }
       for(a=11;a<13;a++){
        if(searchArray(a)== 'common'){
           i = Math.floor((Math.random() * commonItems.length));
           pack.push(commonItems[i])
       }
       if(searchArray(a)== 'uncommon'){
           i = Math.floor((Math.random() * uncommonItems.length));
           pack.push(uncommonItems[i])
       }
       if(searchArray(a)== 'rare'){
           i = Math.floor((Math.random() * rareItems.length));
           pack.push(rareItems[i])
       }
       }
       window.originalPack = pack
       firstDisplay = true;
       displayCards(originalPack, firstDisplay)
   }
}
   function displayCards(pack, firstDisplay){
       var S = [];
       var A = [];
       var B = [];
       var C = [];
       var D = [];
       var F = [];
       var U = [];
       pack.forEach(function(card){
           if(card.tier == "S"){
             S.push(card);
           }
           if(card.tier == "A"){
             A.push(card);
           }
           if(card.tier == "B"){
             B.push(card);
           }
           if(card.tier == "C"){
             C.push(card);
           }
           if(card.tier == "D"){
             D.push(card);
           }
           if(card.tier == "F"){
             F.push(card);
           }
           if(card.tier == "U"){
             U.push(card);
           }
       });
       var picked = 0
       if(S.length > 0){
           S.sort(function(a, b){return a.tierRank - b.tierRank});
       }
       if(A.length > 0){
           A.sort(function(a, b){return a.tierRank - b.tierRank});
       }
       if(B.length > 0){
           B.sort(function(a, b){return a.tierRank - b.tierRank});
       }
       if(C.length > 0){
           C.sort(function(a, b){return a.tierRank - b.tierRank});
       }
       if(D.length > 0){
           D.sort(function(a, b){return a.tierRank - b.tierRank});
       }
       if(F.length > 0){
           F.sort(function(a, b){return a.tierRank - b.tierRank});
       }
       if(U.length > 0){
           U.sort(function(a, b){return a.tierRank - b.tierRank});
       }
       orderedPack = S.concat(A).concat(B).concat(C).concat(D).concat(F).concat(U)
       removedCards = []
       removedCards = orderedPack.splice(0,picks);
       removedCardsIDs = []
       removedCards.forEach(function(card){
       removedCardsIDs.push(card.card_name.english)
       })
       var samePack = []
       pack.forEach(function(card){
         samePack.push(card)
       })
    if(!helper){
              getOUT = []
      removedCardsIDs.forEach(function(cardName){
        i = samePack.findIndex(function(card){
          return card.card_name.english == cardName
        })
        getOUT.unshift(i)
        getOUT.sort(function(a, b){return b-a})
        console.log(getOUT)
      })
     getOUT.forEach(function(i){
        samePack.splice(i,1);
     });
         orderedPack = samePack
   }

     console.log(orderedPack);
     var render = ''
       var cardCount = 0

       var packRow1 = 0
       if(round<=3){
       orderedPack.forEach(function(card){
           if(card.card_type == "Hero"){
             packRow1 += 1;
           render += displayDraftCards(card);}
       })
       orderedPack.forEach(function(card){
           if(card.card_type == "Creep" || card.card_type == "Spell" || card.card_type == "Improvement"){
             packRow1 += 1;
           render += displayDraftCards(card);
           if(packRow1 == 6){
             $(".pack-row-1").html(render);
             render=''
           }
         }
       })
       orderedPack.forEach(function(card){
           if(card.card_type == "Item"){
             packRow1 += 1;
           render += displayDraftCards(card);}
       })
       $(".pack-row-2").html(render)
     }
     else {
       if(round==4){$(".pack-row-2").empty()}
       orderedPack.forEach(function(card){
           if(card.card_type == "Hero"){
           render += displayDraftCards(card);}
       })
       orderedPack.forEach(function(card){
           if(card.card_type == "Creep" || card.card_type == "Spell" || card.card_type == "Improvement"){
           render += displayDraftCards(card);
         }
       })
       orderedPack.forEach(function(card){
           if(card.card_type == "Item"){
           render += displayDraftCards(card);}
       })
      $(".pack-row-1").html(render);
     }
     updateAbilities()
   }

$("#help-btn").on('click', function(){
  if($("#help-btn").hasClass("help-active")){
    $("#help-btn").removeClass("help-active")
    displayTier = false;
    helper = false;
    firstDisplay = false;
    displayCards(originalPack, firstDisplay)
  }
  else{
    $("#help-btn").addClass("help-active")
  displayTier = true;
    helper = true;
    firstDisplay = false;
    displayCards(originalPack, firstDisplay)
  }
});

$("#reset-btn").on('click', function(){
    heroPicked = false;
    round = 1;
    pack = 1;
    $(".round-number").html( '<h4 class="round-number">' + round + ' of 6 </h4>' );
    $(".pack-number").html( '<h4 class="pack-number">' + pack + ' of 5 </h4>' );
    startProgressbar()
    selectedcards=0;
    resetCharts();
    updateChart();
    draftedCards = [];
    $(".card-list").empty();
    generatePack();
});
function displayDraftCards(card){
var html;
if(displayTier){
if(card.card_type == "Hero"){
    if(heroPicked){
    html ='<div class="card">' + '<div class="tier">'+card.tier+'</div>'+ '<img data-cid="'+card.cid+'" class="card-image Hero" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">'+'<div class="faded-card">'+'</div>' + ' </div>';
}
    else{
        //heros when one hasnt been picked yet
        if(card.references.length == 1){
        html ='<div class="card">' + '<div class="tier">'+card.tier+'</div>'+'<img data-cid="'+card.cid+'" class="card-image Hero" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">' + ' </div>';
            }
        if(card.references.length == 2){
        html ='<div class="card">' + '<div class="tier">'+card.tier+'</div>'+'<div class="ability-one" data-cid="'+card.cid+'">'+'</div>'+'<img data-cid="'+card.cid+'" class="card-image Hero" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">' + ' </div>';
        }
        if(card.references.length == 3){
        html ='<div class="card">' + '<div class="tier">'+card.tier+'</div>'+'<div class="abilitys">'+'</div>'+'<img data-cid="'+card.cid+'" class="card-image Hero" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">' + ' </div>';
            }
    }
}
else{
html = '<div class="card">' + '<img data-cid="'+card.cid+'" class="card-image" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">' + '<div class="tier">'+card.tier+'</div>'+ ' </div>';}
return html;
}
else {
  if(card.card_type == "Hero"){
      if(heroPicked){
      html ='<div class="card">' + '<img data-cid="'+card.cid+'" class="card-image Hero" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">'+'<div class="faded-card">'+'</div>' + ' </div>';
  }
      else{
          //heros when one hasnt been picked yet
          if(card.references.length == 1){
          html ='<div class="card">' + '<img data-cid="'+card.cid+'" class="card-image Hero" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">' + ' </div>';
              }
          if(card.references.length == 2){
          html ='<div class="card">' + '<div class="ability-one" data-cid="'+card.cid+'">'+'</div>'+'<img data-cid="'+card.cid+'" class="card-image Hero" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">' + ' </div>';
          }
          if(card.references.length == 3){
          html ='<div class="card">' + '<div class="abilitys">'+'</div>'+'<img data-cid="'+card.cid+'" class="card-image Hero" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">' + ' </div>';
              }
      }
  }
  else{
  html = '<div class="card">' + '<img data-cid="'+card.cid+'" class="card-image" alt="' +card.card_name.english+ '"src="' + card.large_image.default + '">' + ' </div>';}
  return html;
  }

}
function updateAbilities(){
$("div.ability-one").mouseover(function(){
    i = this.dataset.cid
    references = allCards[i].references
    abilityID = references[1].card_id
    var ability
    allCards.forEach(function(card){
        if(card.base_card_id === abilityID){
        ability = card
        }
    })
    html = '<div class="pop-up">'+'<div class="ability-name">'+ability.card_name.english+'</div>'+'<div class="ability-type">'+ability.card_type+'</div>'+'<div class="ability-desc">'+ability.card_text.english+'</div>'+'</div>'
    $(".ability-one").append(html)
})
$("div.ability-one").mouseout(function(){
    $(".ability-one").empty();
})
}
displayDraftTable();
function displayDraftTable(){
    var render = '<tr>'+ '<th>' + '</th>' + '<th>' + '</th>' + '<th>' + '</th>' + '<th>' + '</th>' + '<th>' + '</th>' +
    '</tr>';
    reset=true
    draftedCards.forEach(function(card){
        render += draftTableRow(card, reset);
    });
    $(".card-list").empty();
    $(".card-list").append(render);
}
function draftTableRow(card, reset){

    cardQuantity = card.quantity;
    color = card.color;
    if(card.card_type === "Item"){
color = "item";
cost = card.gold_cost;
	if(card.sub_type === "Weapon"){
	icon = '/images/Attack_symbol.png'}
if(card.sub_type === "Armor"){
	icon = '/images/Armor_symbol.png'	}
    if(card.sub_type === "Consumable"){
	icon = 'images/flask.png'	}
    if((card.sub_type === "Accessory") || (card.sub_type === "Deed")){
	icon = '/images/Health_symbol.png'}
}
if(card.card_type === "Hero"){
icon = '/images/heroicon.png';
cost = ''}
if(card.card_type === "Spell"){
icon = '/images/spell.png';
cost = card.mana_cost}
if(card.card_type === "Improvement"){
icon = '/images/improvement.png';
cost = card.mana_cost}
if(card.card_type === "Creep"){
icon = '/images/creep.png';
cost = card.mana_cost}
    var rowhtml =
    '<tr data-cardQuantity="'+cardQuantity+'" data-cid="'+card.cid+'" class="'+color +'">'+
    	'<td class="mini-image">'+ '<img style="width: 40px; " alt="mini_image" src="'+card.mini_image.default +'">'+'</td>'+
       '<td margin-left:-15px;>'+ '<img style="max-width: 27px;" alt="mini_image" src="'+icon+'">'+'</td>'+
       '<td style="max-width: 10px;">'+ cost +'</td>'+
       '<td >' +card.card_name.english +'</td>'+
       '<td class="card-quantity">x '+ cardQuantity +'</td>'+
        '</tr>';
    if(reset){ return rowhtml}
    else{
    $(".card-list").append(rowhtml);}
}
 cardselect();
var selectedcards = 0;
function cardselect(){
$(".pack-row-1").on('click', 'img', function(){
if($(this).hasClass("Hero") && heroPicked){return}
if($(this).hasClass("card-active")){
$(this).removeClass("card-active");
$(this).parentsUntil( $( ".pack-row-1" ) ).css( { "width": "15.8%", "margin": "0 .4% 12px .4%", } );
if(selectedcards == 1){ $(".pick-btn").removeClass("one-selected")}
 if(selectedcards == 2){ $(".pick-btn").removeClass("two-selected").addClass("one-selected")}
selectedcards -= 1;
return}
if(selectedcards == 2){return}
else{
$(this).addClass("card-active");
$(this).parentsUntil( $( ".pack-row-1" ) ).css( { "width": "16.6%", "margin": "-.6% 0px 0px 0px", } );
selectedcards +=1;
 if(selectedcards == 1){ $(".pick-btn").addClass("one-selected")}
 if(selectedcards == 2){ $(".pick-btn").removeClass("one-selected").addClass("two-selected")}
}
});
$(".pack-row-2").on('click', 'img', function(){
if($(this).hasClass("Hero") && heroPicked){return}
if($(this).hasClass("card-active")){
$(this).removeClass("card-active");
$(this).parentsUntil( $( ".pack-row-2" ) ).css( { "width": "15.8%", "margin": "0 .4% 12px .4%", } );
if(selectedcards == 1){ $(".pick-btn").removeClass("one-selected")}
 if(selectedcards == 2){ $(".pick-btn").removeClass("two-selected").addClass("one-selected")}
selectedcards -= 1;
return}
if(selectedcards == 2){return}
else{
$(this).addClass("card-active");
$(this).parentsUntil( $( ".pack-row-2" ) ).css( { "width": "16.6%", "margin": "-.6% 0px 0px 0px", } );
selectedcards +=1;
 if(selectedcards == 1){ $(".pick-btn").addClass("one-selected")}
 if(selectedcards == 2){ $(".pick-btn").removeClass("one-selected").addClass("two-selected")}
}
});
}
$(".chart-btn").on('click',function(){
    if($(this).hasClass('chart-active')){return}
    else{$(".chart-btn").removeClass("chart-active")
        $(this).addClass("chart-active")
    }
})
var pack = 1;
$(".pick-btn").on('click',function(){
    if(selectedcards != 2){
        return}

    reset=false;
  e = $(".card-active").get(0);
  addCard1 = allCards[e.dataset.cid];
  d = $(".card-active").get(1);
  addCard2 = allCards[d.dataset.cid];
  if(addCard1.card_type === "Hero" || addCard2.card_type === "Hero"){heroPicked = true;}
  firstcard1 = true
  firstcard2 = true
  indeck=false;
  if(addCard1.cid === addCard2.cid){
      firstcard1=false;
      firstcard2=false;
    draftedCards.forEach(function(draftedcard){
    if(addCard1.cid === draftedcard.cid){
        draftedcard.quantity += 2;
        displayDraftTable();
        indeck=true;}
  });
  if(!indeck){
    addCard1.quantity = 0
    draftedCards.push(addCard1)
    draftTableRow(addCard1, reset)}
  }
  draftedCards.forEach(function(draftedcard){
      if(addCard1.cid === draftedcard.cid){
          draftedcard.quantity +=1;
          firstcard1=false;
          displayDraftTable();}
      if(addCard2.cid === draftedcard.cid){
          draftedcard.quantity +=1;
          firstcard2=false;
          displayDraftTable();}
  })
  if(firstcard1){
  draftedCards.push(addCard1);
  draftTableRow(addCard1, reset);
  }
  if(firstcard2){
  draftedCards.push(addCard2);
  draftTableRow(addCard2, reset);
  }
  selectedcards = 0;
  $(".pick-btn").removeClass("two-selected").removeClass("one-selected");

  if(round == 6){
        round = 1;
        pack +=1;
        heroPicked = false
        $(".round-number").html('<h4 class="round-number">' + round + ' of 6 </h4>' );
        $(".pack-number").html( '<h4 class="pack-number">' + pack + ' of 5 </h4>' );
    }
    else{round += 1;
        $(".round-number").html('<h4 class="round-number">' + round + ' of 6 </h4>' );
    }
    updateProgressBar()
    updateStats(addCard1)
    updateStats(addCard2)
    updateChart();
    if(pack == 6 && round==1){
      $(".pack-row-1").html('<h1>Draft complete!</h1>');
      return
    }
    generatePack();
});//pickbtn end
  var draftProgress = 0
startProgressbar()
function startProgressbar(){
  draftProgress = 0
$( "#progressbar" ).progressbar({
  value: 0
});
}
  function updateProgressBar(){
    draftProgress += 1
    val = draftProgress/30*100
    $( "#progressbar" ).progressbar({
      value: val
    });
  }

$(".color-chart-btn").on('click', function(){
    $(".colorcontainer").removeClass("hidden")
    $(".manacontainer").addClass("hidden")
    $(".itemcontainer").addClass("hidden")
})
$(".mana-chart-btn").on('click', function(){
$(".manacontainer").removeClass("hidden")
$(".colorcontainer").addClass("hidden")
$(".itemcontainer").addClass("hidden")
})
$(".item-chart-btn").on('click', function(){
$(".itemcontainer").removeClass("hidden")
$(".colorcontainer").addClass("hidden")
$(".manacontainer").addClass("hidden")
})
resetCharts();
function resetCharts(){
window.blackCount=0;
window.blueCount=0;
window.redCount=0;
window.greenCount=0;
window.oneCount=0;
window.twoCount=0;
window.threeCount=0;
window.fourCount=0;
window.fiveCount=0;
window.sixCount=0;
window.sevenCount=0;
window.eightPlusCount=0;
window.accessoryCount=0;
window.weaponCount=0;
window.armorCount=0;
}
function updateStats(card){
    if(card.color === "Red"){redCount+=1;}
    if(card.color === "Green"){greenCount+=1;}
    if(card.color === "Blue"){blueCount+=1;}
    if(card.color === "Black"){blackCount+=1;}
    if(card.mana_cost == 1){oneCount+=1;}
    if(card.mana_cost == 2){twoCount+=1;}
    if(card.mana_cost == 3){threeCount+=1;}
    if(card.mana_cost == 4){fourCount+=1;}
    if(card.mana_cost == 5){fiveCount+=1;}
    if(card.mana_cost == 6){sixCount+=1;}
    if(card.mana_cost == 7){sevenCount+=1;}
    if(card.mana_cost > 7){eightPlusCount+=1;}
    if(card.sub_type === "Accessory"){accessoryCount+=1;}
    if(card.sub_type === "Weapon"){weaponCount+=1;}
    if(card.sub_type === "Armor"){armorCount+=1;}
}
function updateChart(){
    colorChart.data.datasets[0].data.splice(0,4,blueCount, redCount, greenCount, blackCount);
    colorChart.update()
    manaChart.data.datasets[0].data.splice(0,8,oneCount, twoCount, threeCount, fourCount,fiveCount,sixCount,sevenCount,eightPlusCount);
    manaChart.update()
    itemChart.data.datasets[0].data.splice(0,3,accessoryCount, weaponCount, armorCount);
    itemChart.update()
}

var color = document.getElementById('color-chart').getContext('2d');
var colorChart = new Chart(color, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Blue', 'Red', 'Green', 'Black'],
        datasets: [{
            label: 'Color Distribution',
            backgroundColor: ['rgb(18, 63, 86)','rgb(107, 27, 36)','rgb(75, 99, 49)','rgb(47, 38, 39)'],
            borderColor: 'rgb(0, 0, 0)',
            data: [blueCount, redCount, greenCount, blackCount]
        }]
    },
    // Configuration options go here
    options: {}

});

var mana = document.getElementById('mana-chart').getContext('2d');
var manaChart = new Chart(mana, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['1', '2', '3', '4','5','6','7','8+'],
        datasets: [{
            label: 'Mana Curve',
            backgroundColor: 'rgb(18, 63, 86)',
            borderColor: 'rgb(0, 0, 0)',
            data: [oneCount, twoCount, threeCount, fourCount, fiveCount, sixCount, sevenCount, eightPlusCount]
        }]
    },
    // Configuration options go here
    options: {
         scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 1
                }
            }]
        }
    }

});

var item = document.getElementById('item-chart').getContext('2d');
var itemChart = new Chart(item, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Accessory', 'Weapon', 'Armor'],
        datasets: [{
            label: 'Item Distribution',
            backgroundColor: 'rgb(225,153,44)',
            borderColor: 'rgb(0, 0, 0)',
            data: [accessoryCount, weaponCount, armorCount]
        }]
    },
    // Configuration options go here
    options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    precision: 1
                }
            }]
        }
    }

});
})
