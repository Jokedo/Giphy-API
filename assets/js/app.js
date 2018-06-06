var Manga = ['One Piece', 'Naruto', 'Gintama', 'Bleach', 'One Punchman', 'Dr. Stone', 'Black Clover', 'Berserk', 'Pluto', 'Dragon Ball', 'My Hero Academia'];
var currentGif; var pausedGif; var animatedGif; var stillGif;

//creates buttons
function createButtons(){
	$('#MangaButtons').empty();
	for(var i = 0; i < Manga.length; i++){
		var MangaBtn = $('<button>').text(Manga[i]).addClass('MangaBtn').attr({'data-name': Manga[i]});
		$('#MangaButtons').append(MangaBtn);
	}

	//displays gifs on click
	$('.MangaBtn').on('click', function(){
		$('.display').empty();

		var thisManga = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisManga + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

//sets a button from input
$('#addManga').on('click', function(){
	var newManga = $('#newMangaInput').val().trim();
	Manga.push(newManga);
	createButtons();
	return false;
});

createButtons();