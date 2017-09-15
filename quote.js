var currentQuote = " ";
var currentAuthor = " ";

function getQuote() {
	$(".quotes").fadeOut(450);

	$.get('/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1' ,function(data, status) {
		currentQuote= data.message;

		$('.quotes').fadeIn(450);
		$("#quote-text").html(currentQuote);
	});
}

$(document).ready(function() {
	getQuote();
	$("#new-quote").on('click', getQuote);
	
  $('.button').mouseenter(function() {
    $(this).fadeTo('fast', 0.25);
  })
  
  $('.button').mouseleave(function() {
    $(this).fadeTo('fast', 1);
  })
  $("#tweet").on('click', function() {
		window.open('https://twitter.com/intent/tweet?hashtags=randomquotes&text=' + currentQuote);
	});
});

$('#new-quote').on('click', function(e) {
    e.preventDefault();
    $.ajax( {
      url: '/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $('#quote-title').text(post.title);
        $('#text').html(post.content);

        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#author').html('Source:' + post.custom_meta.Source);
        } else {
          $('#author').text('');
        }
      },
      cache: false
    });
  });
});