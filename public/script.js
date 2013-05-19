$(document).ready(function() {

	loadComments();
	loadArduino();
	
	function showError(error) {
        var message = "An error occurred";
        if (error.message) {
                message = error.message;
        } else if (error.errors) {
                var errors = error.errors;
                message = "";
                Object.keys(errors).forEach(function(k) {
                        message += k + ": " + errors[k] + "\n";
                });
        }

        alert(message);
	}

    $('#comment-form').submit(function() {
        //Get the data from the form
        var comment = $('#comment').val();

        dpd.comments.post({
				comment: comment
		}, function(comment, error) {
				if (error) return showError(error);

				addComment(comment);
				$('#comment').val('');
		});

		dpd.arduino.put("8f9405dad825ea5b", {"messagetoarduino": comment}, function(result, err) {
		  if(err) return console.log(err);
		  console.log(result, result.id);
		});

        return false;
    });
	


    function addComment(comment) {
        $('<div class="comment">')
            .append('<p>' + comment.comment + '</p>')
            .appendTo('#comments');
			
    }
	
	function addComment2(messagetoarduino) {
        $('<div class="messagetoarduino">')
            .append('<p>' + messagetoarduino.messagetoarduino + '</p>')
            .appendTo('header');		
    }
	
	function loadComments() {
		dpd.comments.get(function(comments, error) { //Use dpd.js to access the API
			$('#comments').empty(); //Empty the list
			comments.forEach(function(comment) { //Loop through the result
				addComment(comment); //Add it to the DOM.
			});
		});
	}
	
	function loadArduino() {
		dpd.arduino.get(function(arduino, error) { //Use dpd.js to access the API
			$('header').empty(); //Empty the list
			arduino.forEach(function(messagetoarduino) { //Loop through the result
				addComment2(messagetoarduino); //Add it to the DOM.
			});
		});
	}


});