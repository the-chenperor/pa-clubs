var currentClub;

$(document).ready(function(){

  // Include parse inside!!
  Parse.initialize("nhetQrvqKNFE5veguHPycojrCoyJA87zrxzg1wQ2", "KRqpMHMwUjDIahX9pOMSNnqaPOSbFDxPaksRpCfx");

  // Populate #leftFeed
  var Club = Parse.Object.extend("Clubs");
  var query = new Parse.Query(Club);
  // This would be the place to narrow the query (e.g., query.equalTo("name", "International Club"))
  query.find({
    success: function(results) {
      console.log("Successfully retrieved" + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        $("#leftFeed").append("<div class='feedCell btn btn-1a'><h3 class='feedClubTitle'>" + object.get('name') + "</h3></div>")
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  })

  $(document).on('click', '.feedCell', function(){
    // Mark the selected club
    $(currentClub).find('h3').css("font-weight", "normal")
    currentClub = $(this)
    $(this).find('h3').css("font-weight", "bold")

    var clubName = $(this).find('h3').text()
    var query = new Parse.Query(Club);
    query.equalTo("name", clubName)
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var time = object.get('time')

          $("#clubTitle").text(object.get('name'))
          $("#time").text(time.start_time + " to " + time.end_time + "pm on " + object.get('day') + "s")
          $("#description").text(object.get('description'))
          $("#info-list li:nth-child(1) .info-value").text(object.get('location'))
          $("#info-list li:nth-child(3) .info-value").text(object.get('advisor'))
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    })
  })

  $("#subscribeButton").click(function(){
    var emailAddress = $("#emailBox").val()
    var listID = "0438fd50bb"
    var data = {
      "apikey": "50c41848bcc4c81b561e474b30f4d41a-us11",
      "id": listID,
      "email": {
          "email": emailAddress
      },
      "merge_vars": {
          "mc_language": "en ",
      },
      "email_type": "text"
      }

    $.post("https://us11.api.mailchimp.com/2.0/lists/subscribe.json", data, function(){
      alert("success")
    }).done(function(){

    }).fail(function(){

    }).always(function(){

    })
  })

})