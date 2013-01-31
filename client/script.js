(function(){

$(function(){
	var weddingDate = new Date(2013, 2, 23),
		today = Date.now()

	//Get 1 day in milliseconds
	var one_day=1000*60*60*24;

	var days = Math.ceil((weddingDate.getTime()-today)/(one_day));
	$('nav .countdown .num').text(days);

	if (!document.cookie && !window.navigator.standalone && (window.navigator.userAgent.search("iPhone") > -1 || window.navigator.userAgent.search("iPad") > -1)) {
		$('#homescreen').fadeIn('slow');
		$(window).one('touchstart', function(){
			$('#homescreen').fadeOut('slow');
		});
		document.cookie = "homescreen=true";
	}

	$(document).on('click', 'nav li.weddingParty', function(e){
		$('.partyList').toggleClass('shown')
	});

	$(document).on('click', '.partyList a', function(e){
		$('.partyList').removeClass('shown')
	});

});

} ())

