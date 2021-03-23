define(['jquery','PourOver'], function($, pourover){
var collection
var set1 = 'https://steamcdn-a.akamaihd.net/apps/583950/resource/card_set_1.0E871AFDD63D1CBD0FB52D924DF1923C4A6D443A.json'
var set0 = 'https://steamcdn-a.akamaihd.net/apps/583950/resource/card_set_0.BB8732855C64ACE2696DCF5E25DEDD98D134DD2A.json';
var allCards = ''

$.getJSON( set0 , function(set0){
var cardSet0 = set0.card_set.card_list
	$.ajax({
	url: set1,
	success: function(data) {
     var cardSet1 = data.card_set.card_list
    allCards = $.merge( $.merge( [], cardSet0 ), cardSet1 );
     var i = 0
     allCards.forEach(function(card){
     var id = card.base_card_id
if(card.is_blue){card.color = 'Blue'}
if(card.is_red){card.color = 'Red'}
if(card.is_black){card.color = 'Black'}
if(card.is_green){card.color = 'Green'}
if(!card.color){card.color = 'None'}
if(id >= 1008 && id <= 4000){card.rarity = 'Basic'}
if(id >= 4002 && id <= 4005){card.rarity = 'Basic'}
if(id >= 4007 && id <= 4008){card.rarity = 'Basic'}
if(id == 4010){card.rarity = 'Basic'}
if(card.large_image.default){card.search = "Show"
i++}else{card.search = "Hide"}
});
     filter(allCards);},
	})
})

function filter(cards){

console.log(cards)
//pour filter start

collection = new PourOver.Collection(cards);

//filters

var rarity_filter = PourOver.makeExactFilter("rarity", ["Basic","Common","Uncommon","Rare"]);

var type_filter = PourOver.makeExactFilter("card_type", ["Hero", "Passive Ability", "Ability", "Creep", "Spell", "Improvement", "Item", "Stronghold", "Pathing"])

var color_filter = PourOver.makeExactFilter("color", ["Blue", "Red", "Black", "Green"])

var subtype_filter = PourOver.makeExactFilter("sub_type", ["Armor", "Accessory", "Weapon", "Consumable"])

var search_filter = PourOver.makeExactFilter("search", ["Show","Hide"])
//adding filters

collection.addFilters([rarity_filter, type_filter, color_filter, search_filter, subtype_filter]);

//adding to a query

function clearFilter(){
if($(".type").hasClass("filtr-active")){
collection.filters.card_type.subtractQuery("Hero")
collection.filters.card_type.subtractQuery("Creep")
collection.filters.card_type.subtractQuery("Item")
collection.filters.card_type.subtractQuery("Improvement")
collection.filters.card_type.subtractQuery("Spell")
}
if($(".color").hasClass("filtr-active")){
collection.filters.color.subtractQuery("Red")
collection.filters.color.subtractQuery("Black")
collection.filters.color.subtractQuery("Blue")
collection.filters.color.subtractQuery("Green")
}
if($(".rarity").hasClass("filtr-active")){
collection.filters.rarity.subtractQuery("Basic")
collection.filters.rarity.subtractQuery("Common")
collection.filters.rarity.subtractQuery("Uncommon")
collection.filters.rarity.subtractQuery("Rare")
}
if($(".subtype").hasClass("filtr-active")){
collection.filters.sub_type.subtractQuery("Consumable")
collection.filters.sub_type.subtractQuery("Armor")
collection.filters.sub_type.subtractQuery("Weapon")
collection.filters.sub_type.subtractQuery("Accessory")
}
}

function allfilter(){
collection.filters.card_type.unionQuery("Improvement")
collection.filters.search.unionQuery("Show")
collection.filters.card_type.unionQuery("Spell")
collection.filters.card_type.unionQuery("Creep")
collection.filters.card_type.unionQuery("Item")
collection.filters.card_type.unionQuery("Hero")
displayCards();
}
function allfilteroff(){
collection.filters.card_type.subtractQuery("Improvement")
collection.filters.card_type.subtractQuery("Spell")
collection.filters.card_type.subtractQuery("Creep")
collection.filters.card_type.subtractQuery("Item")
collection.filters.card_type.subtractQuery("Hero")
}

 $(".filtr-button-all").on('click',function (){
 		clearFilter();
  	var searchbox = $("#cardsearch").get(0)
    console.log(searchbox.value)
	if(searchbox.value){
    console.log("search is true")
    search = $("#cardsearch")
    search.value = ""
    }
		$(".filtr-button").removeClass("filtr-active");
		$(this).addClass("filtr-active");
        allfilter();
	});
 $("#showcaseBtn").on('click', function(){
console.log("working")
if( !$(this).hasClass("layout-active")){
$(".list-container").addClass("hidden")
$("#listBtn").removeClass("layout-active")
$(this).addClass("layout-active")
displayCards();
console.log("working")}
})

$("#listBtn").on('click', function(){
console.log("working")
if( !$(this).hasClass("layout-active")){
$(".list-container").removeClass("hidden")
$("#showcaseBtn").removeClass("layout-active")
$(this).addClass("layout-active")
displayCards();
console.log("working")}
})

$("#redBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.color.subtractQuery("Red")
  displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()
  console.log("working?")
  }}
 else{$(this).addClass("filtr-active")
 collection.filters.color.unionQuery("Red")
 displayCards()}
})
$("#blackBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.color.subtractQuery("Black")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.color.unionQuery("Black")
 displayCards()}
})
$("#greenBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.color.subtractQuery("Green")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.color.unionQuery("Green")
 displayCards()}
})
$("#blueBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.color.subtractQuery("Blue")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.color.unionQuery("Blue")
 displayCards()}
})
$("#basicBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.rarity.subtractQuery("Basic")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.rarity.unionQuery("Basic")
 displayCards()}
})
$("#commonBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.rarity.subtractQuery("Common")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.rarity.unionQuery("Common")
 displayCards()}
})
$("#uncommonBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.rarity.subtractQuery("Uncommon")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.rarity.unionQuery("Uncommon")
 displayCards()}
})
$("#rareBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.rarity.subtractQuery("Rare")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.rarity.unionQuery("Rare")
 displayCards()}
})
$("#heroBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.card_type.subtractQuery("Hero")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.card_type.unionQuery("Hero")
 displayCards()}
})
$("#creepBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.card_type.subtractQuery("Creep")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.card_type.unionQuery("Creep")
 displayCards()}
})
$("#spellBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.card_type.subtractQuery("Spell")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.card_type.unionQuery("Spell")
 displayCards()}
})
$("#improvementBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.card_type.subtractQuery("Improvement")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.card_type.unionQuery("Improvement")
 displayCards()}
})
$("#itemBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.card_type.subtractQuery("Item")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.card_type.unionQuery("Item")
 displayCards()}
})
$("#armorBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.sub_type.subtractQuery("Armor")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.sub_type.unionQuery("Armor")
 displayCards()}
})
$("#consumableBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.sub_type.subtractQuery("Consumable")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.sub_type.unionQuery("Consumable")
 displayCards()}
})
$("#weaponBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.sub_type.subtractQuery("Weapon")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.sub_type.unionQuery("Weapon")
 displayCards()}
})
$("#accessoryBtn").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("filtr-active") ){
 $(this).removeClass("filtr-active")
 collection.filters.sub_type.subtractQuery("Accessory")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("filtr-active")
 collection.filters.sub_type.unionQuery("Accessory")
 displayCards()}
})

$("#cardsearch").keyup(function() {
 var input = document.getElementById('cardsearch');
 var filter = input.value.toUpperCase();
cards.forEach(function(card){
var name = card.card_name.english
if (name.toUpperCase().indexOf(filter) > -1){
     collection.updateItem(card.cid,"search","Show");
    } else {
   collection.updateItem(card.cid,"search","Hide");
    }
})
collection.filters.search.unionQuery("Show")
displayCards()
 })

   var nameSort = PourOver.Sort.extend({
    fn: function(a,b){
        var x = a.card_name.english, y = b.card_name.english;
        if (y < x){
          return 1;
        } else if (y > x){
          return -1;
        } else {
          return 0;
        }
    }
    });

var name_sort = new nameSort("card_name", {associated_attrs: ["card_name"]});
var color_sort = PourOver.makeExplicitSort("color",collection,"color",["Blue","Red","Black","Green","None"])
var type_sort = PourOver.makeExplicitSort("type",collection,"card_type",["Hero", "Spell", "Creep", "Improvement", "Item","Ability","Passive Ability","Stronghold","Pathing"])
collection.addSorts([name_sort, color_sort, type_sort]);


//view
MyView = PourOver.View.extend({
  render: function(){
  filteredcards = this.getCurrentItems();
  },
	selectionFn: function(){

      color_dimension = collection.filters.color.current_query;
      rarity_dimension = collection.filters.rarity.current_query;
      type_dimension = collection.filters.card_type.current_query;
      subtype_dimension = collection.filters.sub_type.current_query;
      search_dimension = collection.filters.search.current_query;

      if($(".filtr-button-all").hasClass("filtr-active")){
      allA = true}else{allA=false}
      if($(".type").hasClass("filtr-active")){
      typeA = true;} else{typeA = false;}
      if($(".rarity").hasClass("filtr-active")){
      rarityA = true;
      }else{rarityA = false;}
      if($(".color").hasClass("filtr-active")){
      colorA = true;
      } else{colorA = false;}
       if($(".subtype").hasClass("filtr-active")){
      subtypeA = true;
      }else{subtypeA = false;}

       if(typeA && (!rarityA && (!colorA && !subtypeA))){
       return type_dimension.and(search_dimension)}
       if(rarityA && (!typeA && (!colorA && !subtypeA))){
       return rarity_dimension.and(search_dimension)}
       if(colorA && (!rarityA && (!typeA && !subtypeA))){
       return color_dimension.and(search_dimension)}
       if(subtypeA && (!rarityA && (!colorA && !typeA))){
       return subtype_dimension.and(search_dimension)}

       if(typeA && (colorA && (!subtypeA && !rarityA))){
       return type_dimension.and(color_dimension).and(search_dimension)}
        if(typeA && (rarityA && (!subtypeA && !colorA))){
       return type_dimension.and(rarity_dimension).and(search_dimension)}
        if(typeA && (subtypeA && (!colorA && !rarityA))){
       return subtype_dimension.and(type_dimension).and(search_dimension)}
        if(subtypeA && (rarityA && (!typeA && !colorA))){
       return subtype_dimension.and(rarity_dimension).and(search_dimension)}
        if(subtypeA && (colorA && (!typeA && !rarityA))){
       return subtype_dimension.and(color_dimension).and(search_dimension)}
        if(rarityA && (colorA && (!subtypeA && !typeA))){
       return rarity_dimension.and(color_dimension).and(search_dimension)}

        if(typeA && (colorA && (subtypeA && !rarityA))){
       return type_dimension.and(color_dimension).and(subtype_dimension).and(search_dimension)}

        if(typeA && (rarityA && (!subtypeA && colorA))){
       return type_dimension.and(rarity_dimension).and(color_dimension).and(search_dimension)}

        if(typeA &&(subtypeA && (!colorA && rarityA))){
       return subtype_dimension.and(type_dimension).and(rarity_dimension).and(search_dimension)}

        if(subtypeA && (rarityA &&(!typeA && colorA))){
       return subtype_dimension.and(rarity_dimension).and(color_dimension).and(search_dimension)}
       if(allA){return type_dimension.and(search_dimension)}
  else{console.log("?")
  return}
  }

});
view = new MyView("default_view",collection);
view.setSort("card_name")
allfilter();

}

function displayCards(){
var filteredcards = view.getCurrentItems()
console.log(filteredcards)
var showcaseLocation = $('#showcase');
var listLocation = $('#list');
var previewLocation = $('#card-preview');
showcaseLocation.empty()
listLocation.empty()
previewLocation.empty()
var render = ''
showResults(filteredcards)

  if($("#showcaseBtn").hasClass("layout-active")){
    filteredcards.forEach(function(card){
        render += showcaseCards(card)
    })
  showcaseLocation.append(render)}

   if($("#listBtn").hasClass("layout-active")){
   if(filteredcards[0]){
   previewRender = displayPreview(filteredcards[0]);}
   render = '<tr>'+
   '<th>'+'</th>'+
   '<th>'+'</th>'+
   '<th>'+"CARD NAME"+'</th>'+
   '<th>'+"COST"+'</th>'+
   '</tr>'
   filteredcards.forEach(function(card){
       render += listCards(card)
    })
  listLocation.append(render)
  previewLocation.append(previewRender)}
  }
	function showResults(filteredcards){
		$('.filter-results').html('<h2 class="results-text">'+ "Results: "+ filteredcards.length + '</h2>')

	}
 function showcaseCards(card){
	var name = card.card_name.english
	var html ='<div class="card">' + '<a href="default.asp">' + '<img alt="' + name + '"src="' + card.large_image.default + '">' + '</a>' + '<span class="item-desc">' + name + '</span>' + '</div>'
    return html
}
function displayPreview(card){
html = '<a href="default.asp">' + '<img alt="' + name + '"src="' + card.large_image.default + '">' + '</a>'
return html
}

function listCards(card){
var color= card.color
var icon= ''
var cost = ''
var show_gold_icon = 'hide'
var gold_icon = 'images/Gold_symbol.png'
if(card.card_type === "Item"){
color = "item"
	if(card.sub_type === "Weapon"){
	icon = 'images/Attack_symbol.png'
    cost = card.gold_cost
    show_gold_icon = 'show'
	}
if(card.sub_type === "Armor"){
	icon = 'images/Armor_symbol.png'
     cost = card.gold_cost
     show_gold_icon = 'show'
	}
    if(card.sub_type === "Consumable"){
	icon = 'images/flask.png'
     cost = card.gold_cost
     show_gold_icon = 'show'
	}
    if(card.sub_type === "Accessory"){
	icon = 'images/Health_symbol.png'
     cost = card.gold_cost
     show_gold_icon = 'show'
	}
}
if(card.card_type === "Hero"){
icon = 'images/heroicon.png'
}
if(card.card_type === "Spell"){
icon = 'images/spell.png'
cost = card.mana_cost
}
if(card.card_type === "Improvement"){
icon = 'images/improvement.png'
cost = card.mana_cost
}
if(card.card_type === "Creep"){
icon = 'images/creep.png'
cost = card.mana_cost
}

    var html =
    '<tr id="'+card.large_image.default+'" class="cardTable '+color +'">'+
    	'<td class="table-img">'+ '<img style="max-width: 40px;" alt="mini_image" src="'+card.mini_image.default +'">'+ '</img>'+'</td>'+
       '<td>'+ '<img style="max-width: 30px;" alt="mini_image" src="'+icon+'">'+ '</img>'+'</td>'+
       '<td>'+ card.card_name.english +'</td>'+
       '<td class="gold-icon">'+'<img class="'+show_gold_icon+'" style="max-width: 20px;" alt="mini_image" src="'+ gold_icon +'">'+ '</img>'+'<div>'+ cost +'</div>'+'</td>'+
        '</tr>'
    return html
}

$("table").on('click', "tr", function(){
tableRow = $(this).val(0);
tableRow = tableRow[0]
console.log( tableRow.id );
previewLocation = $("#card-preview");
previewLocation.empty();
html = '<a href="default.asp">' + '<img alt="preview"src="'+tableRow.id+'">' + '</a>'
previewLocation.append(html);})
});
