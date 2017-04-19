// link to data sources

var friends = require("../data/friends");

//routing
module.exports = function(app) {

  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  
  app.post("/api/friends", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // scan user survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;

    // empty variable for difference eq
    var totalDifference = 0;

    // loop through friend matches on database
    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDifference = 0;

      //going through scores
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // calculate differencce via totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // selecct for "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset with better match
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    friends.push(userData);

    // Return with best match
    res.json(bestMatch);

  });

};
 