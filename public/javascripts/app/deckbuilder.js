define(['jquery','PourOver','jqueryui','chart'], function($, pourover, jqueryui, chart){
var blacklist = [10003, 1006,1009]
var set1 = 'https://steamcdn-a.akamaihd.net/apps/583950/resource/card_set_1.0E871AFDD63D1CBD0FB52D924DF1923C4A6D443A.json'
var set0 = 'https://steamcdn-a.akamaihd.net/apps/583950/resource/card_set_0.BB8732855C64ACE2696DCF5E25DEDD98D134DD2A.json';
var allCards = ''
function deckCardsHover(){
	var timer
$("table.deck-main > tr").on({
    'mouseover': function () {
					tableRow = $(this).val(0);
					tableRow = tableRow[0]
					card = allCards[tableRow.dataset.cid]
					previewLocation = $("#card-preview");
          timer = setTimeout(function () {
					previewLocation.empty();
					html = '<img class="card-preview" alt="preview"src="'+card.large_image.default+'">'
					previewLocation.append(html);
        }, 600);
    },
    'mouseout' : function () {
        clearTimeout(timer);
    }
});
}
function allCardsHover(){
	var timer

$("table.all-cards > tr").on({
		'mouseenter': function () {
		$(this).find( "td.tr-background" ).css("display","none");
		var signature_card
		tableRow = $(this).val(0);
		tableRow = tableRow[0];
		card = allCards[tableRow.dataset.cid]
		previewLocation = $("#card-preview");
	  timer = setTimeout(function () {
		previewLocation.empty();
		if(card.card_type == "Hero"){
			signature_card_id = card.references[0].card_id
			allCards.forEach(function(card){
				if(signature_card_id === card.card_id){
					signature_card = card;
				}
			})
			html = '<img class="signature-card back-card" alt="preview"src="'+signature_card.large_image.default+'">' + '<img class="hero-preview front-card" alt="preview"src="'+card.large_image.default+'">'
			previewLocation.append(html);
			updatePreview();
		}
		else {
			html ='<img class="card-preview" alt="preview"src="'+card.large_image.default+'">'
			previewLocation.append(html);
		}
	}, 600);
		},
		'mouseleave' : function () {
				clearTimeout(timer);
			$(this).find( "td.tr-background" ).css("display","block")
		}
});
}
function deckHerosHover(){
	var timer
$("h4.hero-mini > img").on({
    'mouseover': function () {
			selectedHero = $(this).val(0);
			selectedHero = selectedHero[0]
			card = allCards[selectedHero.dataset.cid]
			signature_card_id = card.references[0].card_id
			var signature_card
			allCards.forEach(function(card){
				if(signature_card_id === card.card_id){
					signature_card = card;
				}
			})
			previewLocation = $("#card-preview");
	          timer = setTimeout(function () {
						previewLocation.empty();
						html = '<img class="signature-card back-card" alt="preview"src="'+signature_card.large_image.default+'">' + '<img class="hero-preview front-card" alt="preview"src="'+card.large_image.default+'">'
						previewLocation.append(html);
						updatePreview();
        }, 600);
    },
    'mouseout' : function () {
        clearTimeout(timer);
    }
});
}
function updatePreview(){
$(".signature-card").on('click', function(){
	if($(this).hasClass("front-card")){
		$(this).removeClass("front-card").addClass("back-card")
		$(".hero-preview").removeClass("back-card").addClass("front-card")
	}
else {
	$(this).removeClass("back-card").addClass("front-card")
	$(".hero-preview").removeClass("front-card").addClass("back-card")
	}
})
$(".hero-preview").on('click', function(){
	if($(this).hasClass("front-card")){
		$(this).removeClass("front-card").addClass("back-card")
		$(".signature-card").removeClass("back-card").addClass("front-card")
	}
else {
	$(this).removeClass("back-card").addClass("front-card")
	$(".signature-card").removeClass("front-card").addClass("back-card")
	}
})
}
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
if(!card.color){card.color = 'znone'}
if(id >= 1008 && id <= 4000){card.rarity = 'Basic'}
if(id >= 4002 && id <= 4005){card.rarity = 'Basic'}
if(id >= 4007 && id <= 4008){card.rarity = 'Basic'}
if(id == 4010){card.rarity = 'Basic'}
card.search = "Show"
if(card.card_type != "Hero"){
card.collectionQuantity = 3}
if(card.card_type === "Hero"){
  for(var i=0; i<card.references.length; i++){
  if(card.references[i].ref_type === "includes"){
    blacklist.push(card.references[i].card_id)
  }
  }
}
});
	console.log(blacklist)
     filter(allCards);},
	})
})
var cardQuantity
function filter(cards){

console.log(cards)
//pour filter start

collection = new PourOver.Collection(cards);

//filters

var rarity_filter = PourOver.makeExactFilter("rarity", ["Basic","Common","Uncommon","Rare"]);

var type_filter = PourOver.makeExactFilter("card_type", ["Hero", "Passive Ability", "Ability", "Creep", "Spell", "Improvement", "Item", "Stronghold", "Pathing"])

var color_filter = PourOver.makeExactFilter("color", ["Blue", "Red", "Black", "Green"])

var subtype_filter = PourOver.makeExactFilter("sub_type", ["Armor", "Accessory", "Weapon", "Consumable"])
var reference_filter = PourOver.makeExactFilter("sub_type", ["Armor", "Accessory", "Weapon", "Consumable"])
var search_filter = PourOver.makeExactFilter("search", ["Show","Hide"])
//adding filters

collection.addFilters([rarity_filter, type_filter, color_filter, search_filter, subtype_filter]);

//adding to a query
function clearFilter(){
$(".label-main").removeClass("text-active")
$(".label-items").removeClass("text-active")
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
	if(searchbox.value){
    search = $("#cardsearch")
    search.value = ""
    }
		$(".filtr-button").removeClass("filtr-active");
		$(this).addClass("filtr-active");
        allfilter();
	});



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
$(".label-main").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("text-active") ){
 $(this).removeClass("text-active")
  $("#spellBtn").removeClass("filtr-active")
 $("#creepBtn").removeClass("filtr-active")
 $("#improvementBtn").removeClass("filtr-active")
 collection.filters.card_type.subtractQuery("Creep")
 collection.filters.card_type.subtractQuery("Spell")
 collection.filters.card_type.subtractQuery("Improvement")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("text-active")
 $("#spellBtn").addClass("filtr-active")
 $("#creepBtn").addClass("filtr-active")
 $("#improvementBtn").addClass("filtr-active")
 collection.filters.card_type.unionQuery("Spell")
 collection.filters.card_type.unionQuery("Creep")
 collection.filters.card_type.unionQuery("Improvement")
 displayCards()}
})
$("#creepBtn").on('click',function(){
if($(".label-main").hasClass("text-active")){
 $(".label-main").removeClass("text-active")
}
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
if($(".label-main").hasClass("text-active")){
 $(".label-main").removeClass("text-active")
}
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
if($(".label-main").hasClass("text-active")){
 $(".label-main").removeClass("text-active")
}
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
$(".label-items").on('click',function(){
if( $(".filtr-button-all").hasClass("filtr-active") ){
 $(".filtr-button-all").removeClass("filtr-active");
 allfilteroff()}
 if( $(this).hasClass("text-active") ){
 $(this).removeClass("text-active")
  $("#armorBtn").removeClass("filtr-active")
 $("#weaponBtn").removeClass("filtr-active")
 $("#consumableBtn").removeClass("filtr-active")
 $("#accessoryBtn").removeClass("filtr-active")
 collection.filters.card_type.subtractQuery("Item")
 displayCards()
  if( !$(".filtr-button").hasClass("filtr-active") ){
  $(".filtr-button-all").addClass("filtr-active")
  allfilter()}}
 else{$(this).addClass("text-active")
 $("#armorBtn").addClass("filtr-active")
 $("#weaponBtn").addClass("filtr-active")
 $("#consumableBtn").addClass("filtr-active")
 $("#accessoryBtn").addClass("filtr-active")
 collection.filters.card_type.unionQuery("Item")
 displayCards()}
})
$("#armorBtn").on('click',function(){
if($(".label-items").hasClass("text-active")){
collection.filters.card_type.subtractQuery("Item")
 $(".label-items").removeClass("text-active")
 collection.filters.sub_type.unionQuery("Weapon")
 collection.filters.sub_type.unionQuery("Consumable")
 collection.filters.sub_type.unionQuery("Accessory")
}
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
if($(".label-items").hasClass("text-active")){
collection.filters.card_type.subtractQuery("Item")
 $(".label-items").removeClass("text-active")
  collection.filters.sub_type.unionQuery("Weapon")
 collection.filters.sub_type.unionQuery("Armor")
 collection.filters.sub_type.unionQuery("Accessory")
}
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
if($(".label-items").hasClass("text-active")){
 collection.filters.card_type.subtractQuery("Item")
 $(".label-items").removeClass("text-active")
  collection.filters.sub_type.unionQuery("Armor")
 collection.filters.sub_type.unionQuery("Consumable")
 collection.filters.sub_type.unionQuery("Accessory")
}
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
if($(".label-items").hasClass("text-active")){
 collection.filters.card_type.subtractQuery("Item")
 $(".label-items").removeClass("text-active")
  collection.filters.sub_type.unionQuery("Weapon")
 collection.filters.sub_type.unionQuery("Consumable")
 collection.filters.sub_type.unionQuery("Armor")
}
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

/*
$(".heros-container").on("mouseenter","img",function(){
selectedHero = $(this).val(0);
selectedHero = selectedHero[0]
card = allCards[selectedHero.dataset.cid]
signature_card_id = card.references[0].card_id
var signature_card
allCards.forEach(function(card){
	if(signature_card_id === card.card_id){
		signature_card = card;
	}
})
previewLocation = $("#card-preview");
previewLocation.empty();
html = '<img class="signature-card back-card" alt="preview"src="'+signature_card.large_image.default+'">' + '<img class="hero-preview front-card" alt="preview"src="'+card.large_image.default+'">'
previewLocation.append(html);
updatePreview();
})*/


$("#cardlist").on('click', "tr", function(){
tableRow = $(this).val(0);
tableRow = tableRow[0]
cid = tableRow.dataset.cid
addToDeck(cid)
})
$(".deck-main").on('contextmenu', "tr", function(){
remove = true
tableRow = $(this).val(0);
tableRow = tableRow[0]
cid = tableRow.dataset.cid
id = tableRow.dataset.id
blacklist.forEach(function(signature){
if(id == signature){remove = false}
})
if(remove){
removeFromDeck(cid)}
return false
})

$(".heros-container").on('contextmenu', "img", function(){
tableRow = $(this).val(0);
tableRow = tableRow[0]
cid = tableRow.dataset.cid
heroslot = tableRow.dataset.index
removeFromDeck(cid, heroslot)
return false
})

/*$(".heros-container").sortable({
		axis: "x",
    tolerance: "pointer",
    items: "> div h4",
    cursor: "grabbing",
    deactivate: function( event, ui ) {
    sortedIDs = $( ".heros-container" ).sortable( "toArray" );
    }
})*/
$(".heroes-container").selectable({
  classes: {
    "hero-selected": "highlight"
  }
});

$("#clear-btn").on('click', function(){
deckMain = []
deckItems = []
deckHeros = []
$("#hero-1").empty().removeClass("filled")
$("#hero-2").empty().removeClass("filled")
$("#hero-3").empty().removeClass("filled")
$("#hero-4").empty().removeClass("filled")
$("#hero-5").empty().removeClass("filled")
displayMain()
})

$("#cardsearch").keyup(function() {
 input = document.getElementById('cardsearch');
 if(input != null && $('.filtr-button-all').hasClass('filtr-active')){
     $('.filtr-button-all').removeClass('filtr-active');
 }
 if(input === null && !$('.filtr-button-all').hasClass('filtr-active')){
     $('.filtr-button-all').addClass('filtr-active');
 }
 filter = input.value.toUpperCase();
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
    var colorSort = PourOver.Sort.extend({
    fn: function(a,b){
        var x = a.color, y = b.color;
        if (y < x){
          return 1;
        } else if (y > x){
          return -1;
        } else {
          return 0;
        }
    }
    });
    var typeSort = PourOver.Sort.extend({
    fn: function(a,b){
        var x = a.color, y = b.color;
        if (y < x){
          return 1;
        } else if (y > x){
          return -1;
        } else {
          return 0;
        }
    }
    });


var name_sort = new nameSort("name", {associated_attrs: ["card_name"]});
var color_sort = new colorSort("color", {associated_attrs: ["color"]});
var type_sort = new typeSort("type", {associated_attrs: ["card_type","color"]});

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

       if($(".label-items").hasClass("text-active")){
       return type_dimension.and(search_dimension)}


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
view.setSort("type")
allfilter();

}
initial = true;
function displayCards(){
var filteredcards = view.getCurrentItems()
filteredcards.length
var showcaseLocation = $('#showcase');
var listLocation = $('#cardlist');
var previewLocation = $('#card-preview');
showcaseLocation.empty()
listLocation.empty()
previewLocation.empty()
var render = ''
if(filteredcards[0]){
	preview = filteredcards[0]
	var i = 0
	blacklist.forEach(function(id){
		if(filteredcards[i].card_id == id){
			i++
			preview = filteredcards[i];
		}
	})
previewRender = displayPreview(preview);
previewLocation.append(previewRender)}
  if($("#showcaseBtn").hasClass("layout-active")){
    filteredcards.forEach(function(card){
        render += showcaseCards(card)
    })
  showcaseLocation.append(render)}

   if($("#listBtn").hasClass("layout-active")){
   if(initial){
   initial = false;
}

   render = ''
   filteredcards.forEach(function(card){
       render += listCards(card)
    })
  listLocation.append(render);
	allCardsHover();
  }
  }

 function showcaseCards(card){
	var name = card.card_name.english
	var html ='<div class="card">' + '<a href="default.asp">' + '<img alt="' + name + '"src="' + card.large_image.default + '">' + '</a>' + '<span class="item-desc">' + name + '</span>' + '</div>'
    return html
}

function displayPreview(card){
html = '<img class="card-preview" alt="' + name + '"src="' + card.large_image.default + '">'
return html
}


function listCards(card, custom){
display = true
blacklist.forEach(function(signature){
if(signature == card.card_id){
display = false
}
})

var cardQuantity = card.collectionQuantity
if(custom){
var cardQuantity = card.quantity
display = true
}
if(display){
var hero = ''
var color= card.color
var icon= ''
var cost = ''
var quantityShow = ''
var gold_icon = 'images/Gold_symbol.png'
if(card.card_type === "Item"){
color = "item"
	if(card.sub_type === "Weapon"){
	icon = 'images/Attack_symbol.png'
    cost = card.gold_cost
	}
if(card.sub_type === "Armor"){
	icon = 'images/Armor_symbol.png'
     cost = card.gold_cost
	}
    if(card.sub_type === "Consumable"){
	icon = 'images/flask.png'
     cost = card.gold_cost
	}
    if((card.sub_type === "Accessory") || (card.sub_type === "Deed")){
	icon = 'images/Health_symbol.png'
     cost = card.gold_cost
	}
}
if(card.card_type === "Hero"){
icon = 'images/heroicon.png'
quantityShow = 'hide'
hero = "hidden"
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
id = card.card_id
x= "x  "
    var html =
    '<tr id="'+card.large_image.default+'" data-cardQuantity="'+cardQuantity+'" data-cid="'+card.cid+'" data-id="'+id+'"class="table-row '+display +' '+color+'">'+
		'<td class="tr-background">'+'</td>'+
		'<td class="table-img-container">'+ '<img class="table-img" alt="mini_image" src="'+card.mini_image.default +'">'+ '</img>'+'</td>'+
		'<td class="row-content">'+
       '<div class="card-icon">'+ '<img style="width:24px;" alt="mini_image" src="'+icon+'">'+ '</img>'+'</div>'+
       '<div class="cost'+ hero +'">'+'<div>'+ cost +'</div>'+'</div>'+
       '<div class="card-name">'+'<div>'+ card.card_name.english +'</div>'+'</div>'+
       '<div class="card-quantity">'+'<div class="'+quantityShow+'"style="display: relative;">'+x+'</div>'+'<div class="'+quantityShow+'" style="display:relative;">'+ cardQuantity +'</div>'+'</div>'+
			 '</td>'+
				'</tr>'
    return html
}}
var mainhtml = ''
var itemhtml = ''
var customDeck = []
var deckHeros = []
var deckMain = []
var deckItems = []
var sortedIDs = ['hero-1','hero-2','hero-3','hero-4','hero-5']
function addToDeck(cid){

var card = allCards[cid]

  if(card.card_type === "Hero"){
  display=true
  if(deckHeros.length === 5){
	display=false}
    for(var i=0;i<deckHeros.length;i++){
  if(deckHeros[i].cid == cid){
  display=false
  }}
    if(display){
  	heroCard = card.references
    heroCard = heroCard[0].card_id

    for(var i=0;i<allCards.length;i++){
      if(allCards[i].card_id == heroCard){
       signature = allCards[i]
       signature.quantity = 3
       deckMain = deckMain.concat(signature)
  	   displayMain(signature)
    }}
	img = card.ingame_image.default
    var firstOpenSlot

    for(i=0;i<5;i++){
      if(!$('#'+sortedIDs[i]).hasClass("filled")){
      firstOpenSlot = sortedIDs[i];
      break;
      }
    }
    var index
    if(firstOpenSlot == "hero-1"){index = 1}
    if(firstOpenSlot == "hero-2"){index = 2}
    if(firstOpenSlot == "hero-3"){index = 3}
    if(firstOpenSlot == "hero-4"){index = 4}
    if(firstOpenSlot == "hero-5"){index = 5}
    $("#"+firstOpenSlot).html('<img class="selectedHero" data-index="'+index+'" data-cid="'+cid+'" alt="hero" src="'+img+'">')
    .addClass("filled")
    deckHeros = deckHeros.concat(card)
		deckHerosHover()
  }} //Heros

  else {
		if(card.card_type === "Item"){
			var counter = 0
			deckItems.forEach(function(itemCard){
				if(itemCard.cid == cid){
				counter += 1}
			})
			if(counter == 0){
			card.quantity = 1
			card.collectionQuantity = 2
			deckItems = deckItems.concat(card)
			displayCards()
			displayMain(card)
			}
			else{
			if(card.quantity < 3){
			card.quantity += 1
			card.collectionQuantity -= 1}
			displayCards()
			displayMain(card)
			}
		}
		else {
  	var counter = 0
    deckMain.forEach(function(mainCard){
    	if(mainCard.cid == cid){
    	counter += 1}
    })
    if(counter == 0){
    card.quantity = 1
    card.collectionQuantity = 2
  	deckMain = deckMain.concat(card)
    displayCards()
    displayMain(card)
  	}
    else{
    if(card.quantity < 3){
    card.quantity += 1
    card.collectionQuantity -= 1}
    displayCards()
    displayMain(card)
    }
	}
  } //Main
}
function removeFromDeck(cid, heroslot){
var card = allCards[cid]

 if(card.card_type === "Hero"){
 	heroCard = card.references
    heroCard = heroCard[0].card_id

    for(var i=0; i < deckMain.length; i++){
    	if(deckMain[i].card_id == heroCard){
				heroRef = deckMain[i]
        deckMain.splice(i,1)
        displayMain(heroRef)
        }
    }
 	for(var i=0; i < deckHeros.length; i++){
    cardindeck = deckHeros[i]
    if(cardindeck.cid == cid){
    deckHeros.splice(i,1)}
    }
    if(heroslot == 1){$("#hero-1").empty().removeClass("filled")}
    if(heroslot == 2){$("#hero-2").empty().removeClass("filled")}
    if(heroslot == 3){$("#hero-3").empty().removeClass("filled")}
    if(heroslot == 4){$("#hero-4").empty().removeClass("filled")}
    if(heroslot == 5){$("#hero-5").empty().removeClass("filled")}
   }
 else{
	 if(card.card_type === "Item"){
		 if(card.quantity == 1){
			for(var i=0; i < deckItems.length; i++){
			 if(deckItems[i].cid == cid){
			 deckItems.splice(i,1)}
			 card.collectionQuantity = 3
			 displayCards()
			 displayMain(card)
			 }
		 }
		 if(card.quantity == 2){
			 card.collectionQuantity = 2
			card.quantity = 1
			 displayCards()
				displayMain(card)
		 }
		 if(card.quantity == 3){
		 card.collectionQuantity = 1
			card.quantity = 2
			 displayCards()
			 displayMain(card)
		 }
	 }
	 else {
    if(card.quantity == 1){
 	  for(var i=0; i < deckMain.length; i++){
      if(deckMain[i].cid == cid){
      deckMain.splice(i,1)}
      card.collectionQuantity = 3
      displayCards()
      displayMain(card)
      }
    }
    if(card.quantity == 2){
      card.collectionQuantity = 2
 	  card.quantity = 1
      displayCards()
       displayMain(card)
    }
    if(card.quantity == 3){
    card.collectionQuantity = 1
 	  card.quantity = 2
      displayCards()
      displayMain(card)
    }
	}
 }
}

function displayMain(card){
		if(card == null){
			card = "clear"
			$(".weapon-count").html('0');
			$(".armor-count").html('0')
			$(".accessory-count").html('0')
			$(".consumable-count").html('0')
      $(".spell-count").html('0')
			$(".creep-count").html('0')
		  $(".improvement-count").html('0')
		}
		custom = true;
		if(card.card_type === "Item"){
			itemSum = 0;
			weaponSum = 0;
			armorSum = 0;
			accessorySum = 0;
			consumableSum = 0;
	    deckItems.forEach(function(itemCard){
	    itemSum += itemCard.quantity
			if(itemCard.sub_type === "Weapon"){weaponSum += itemCard.quantity}
			if(itemCard.sub_type === "Armor"){armorSum += itemCard.quantity}
			if(itemCard.sub_type === "Accessory"){accessorySum += itemCard.quantity}
			if(itemCard.sub_type === "Consumable"){consumableSum += itemCard.quantity}
	    })
			if(card.sub_type === "Weapon"){$(".weapon-count").html(weaponSum)}
			if(card.sub_type === "Armor"){$(".armor-count").html(armorSum)}
			if(card.sub_type === "Accessory"){$(".accessory-count").html(accessorySum)}
			if(card.sub_type === "Consumable"){$(".consumable-count").html(consumableSum)}
	$(".item-counter").html(itemSum+'/9+')
		}
		else {
			resetCharts();

    mainSum = 0;
		spellSum = 0;
		creepSum = 0;
		improvementSum = 0;
    deckMain.forEach(function(mainCard){
    mainSum += mainCard.quantity
		if(mainCard.card_type === "Spell"){spellSum += mainCard.quantity}
		if(mainCard.card_type === "Creep"){creepSum += mainCard.quantity}
		if(mainCard.card_type === "Improvement"){improvementSum += mainCard.quantity}
		updateStats(mainCard);
    })
	if(card.card_type === "Spell"){$(".spell-count").html(spellSum)}
	if(card.card_type === "Creep"){$(".creep-count").html(creepSum)}
	if(card.card_type === "Improvement"){$(".improvement-count").html(improvementSum)}
		updateChart();
$(".main-counter").html(mainSum+'/40+')
}
	mainhtml = ''
	deckMain.forEach(function(card){
    mainhtml += listCards(card, custom)
    })
	deckItems.forEach(function(card){
    mainhtml += listCards(card, custom)
    })
    $(".deck-main").empty()
    $(".deck-main").append(mainhtml)
		deckCardsHover()
}
resetCharts();
function resetCharts(){
window.oneCount=0;
window.twoCount=0;
window.threeCount=0;
window.fourCount=0;
window.fiveCount=0;
window.sixCount=0;
window.sevenCount=0;
window.eightPlusCount=0;
}
function updateStats(card){
    if(card.mana_cost == 1){oneCount+=card.quantity;}
    if(card.mana_cost == 2){twoCount+=card.quantity;}
    if(card.mana_cost == 3){threeCount+=card.quantity;}
    if(card.mana_cost == 4){fourCount+=card.quantity;}
    if(card.mana_cost == 5){fiveCount+=card.quantity;}
    if(card.mana_cost == 6){sixCount+=card.quantity;}
    if(card.mana_cost == 7){sevenCount+=card.quantity;}
    if(card.mana_cost > 7){eightPlusCount+=card.quantity;}
}
function updateChart(){
    manaChart.data.datasets[0].data.splice(0,8,oneCount, twoCount, threeCount, fourCount,fiveCount,sixCount,sevenCount,eightPlusCount);
    manaChart.update()
}
var mana = document.getElementById('mana-chart').getContext('2d');
var manaChart = new Chart(mana, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['1', '2', '3', '4','5','6','7','8+'],
        datasets: [{
            label: 'Mana Curve',
            backgroundColor: 'rgb(0,79,171)',
            borderColor: 'rgb(0,0,0)',
            data: [oneCount, twoCount, threeCount, fourCount, fiveCount, sixCount, sevenCount, eightPlusCount]
        }]
    },
    // Configuration options go here
    options: {
			legend: {
        display: false
    },
         scales: {
					 xAxes: [{
                ticks: {
                    fontColor: "rgb(204, 204, 204)",
                }
            }],
            yAxes: [{
							gridLines: {
	 						 color: 'rgb(0,0,0)'
	 					 },
                ticks: {
									  fontColor: "rgb(204, 204, 204)",
                    beginAtZero: true,
										suggestedMax: 4,
                    precision: 0
                }
            }]
        }
    }

});
$("#save-btn").on('click', function(){
saveDeck();
});
var customDeck;
function saveDeck(){
input = document.getElementById('deck-name');
name = input.value.toLowerCase();

hero1 = $("#hero-1").children();
hero1 = hero1[0]
cid1 = hero1.dataset.cid;
hero1= allCards[cid1]
hero2 = $("#hero-2").children();
hero2 = hero2[0]
cid2 = hero2.dataset.cid;
hero2= allCards[cid2]
hero3 = $("#hero-3").children();
hero3 = hero3[0]
cid3 = hero3.dataset.cid;
hero3= allCards[cid3]
hero4 = $("#hero-4").children();
hero4 = hero4[0]
cid4 = hero4.dataset.cid;
hero4= allCards[cid4]
hero5 = $("#hero-5").children();
hero5 = hero5[0]
cid5 = hero5.dataset.cid;
hero5 = allCards[cid5]
//retrieve cards
customDeck =
    {
    heroes:[
        {id: hero1.card_id, turn: 1},
        {id: hero2.card_id, turn: 1},
        {id: hero3.card_id, turn: 1},
        {id: hero4.card_id, turn: 2},
        {id: hero5.card_id, turn: 3},
    ],

    cards:[]
    }

    for(var i=0;i<deckMain.length;i++){
    format = {id: deckMain[i].card_id, count: deckMain[i].quantity}
    customDeck.cards.push(format)
}
for(var i=0;i<deckItems.length;i++){
    format = {id: deckItems[i].card_id, count: deckItems[i].quantity}
    customDeck.cards.push(format)
}
  console.log(customDeck)
    saveDeck()
}

function saveDeck(){
    $.ajax({
  method: "POST",
  url: "/myphp.php",
  data: { customDeck: "please"}
})
  .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });
}
});
