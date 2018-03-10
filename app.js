
var topics = ["lion", "elephant", "gazelle", "zebra"];

function displayGIF () {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=trdRF6CLLx3AeKOyZDjD9Pa5m2dWi2Z5&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response){
          
        var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.addClass("animalGIF");
            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gif-view").prepend(gifDiv);
          }

          $(".animalGIF").on("click", function() {
            var state = $(this).attr("data-state")
        
            if (state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still");
              }
             
          });


        });
            
};




function renderButtons() {
 
  $("#buttons-view").empty();
 
  for (var i = 0; i < topics.length; i++) {
  
    var a = $("<button>");
    a.addClass("animals"); 
    a.attr("data-name", topics[i]);  
    a.text(topics[i]);
    $("#buttons-view").append(a);

  }
}

$("#add-animal").on("click", function(event) {
event.preventDefault();
var newAnimal = $("#animal-input").val().trim();
topics.push(newAnimal);
renderButtons()
$("#animal-input").val("")
});


$(document).on("click", ".animals", displayGIF);


renderButtons()
