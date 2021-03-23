(function($) {
console.log('js is working');
$('.collection').mouseover(function(){
    $('.collection').empty();
    html='<a href="www.artifactalley.com/cards/">'+
'<img class="collection-btn" src="https://artifactalley.com/wp-content/uploads/2019/05/red-button.png" alt="splash">'+
'<img class="collection-icon" src="https://artifactalley.com/wp-content/uploads/2019/05/white-cards-icon.png" alt="icon">'
+'</a>';
    $('collection').append(html);
});
$('.collection').mouseout(function(){
    $('.collection').empty();
    html='<a href="www.artifactalley.com/cards/">'+
'<img class="collection-btn" src="https://artifactalley.com/wp-content/uploads/2019/05/red-button.png" alt="splash">'+
'<img class="collection-icon" src="https://artifactalley.com/wp-content/uploads/2019/05/kisspng-playing-card-computer-icons-board-game-card-game-card-technology-5af21219a46288.0663556115258137856733.png" alt="icon">'
+'</a>';
    $('collection').append(html);
});
}(jQuery));