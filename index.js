//

let scoreDisplay = document.querySelector("[data-scoreDisplay]")







// Starts the promise chain to fetch live games
function getLiveGames(){

    fetch('https://api.opendota.com/api/live')
        .then(convertToJSON) 
        .then(getMatchInfo)
        .then(filterTeams)
        .then(writeMatchInfo)

}


// converts data to JSON
function convertToJSON(fetchedData){
    return fetchedData.json()
}

// function that converts unix time

function timeConverter(UNIX_timestamp){

  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
// pull start times of matches

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

function getMatchInfo(JSONdata){
    
    let matchInfo = JSONdata.map(item => [
        
        // time
        timeConverter(item.activate_time), 
        // scores
        item.radiant_score, 
        item.dire_score,
        // team names
        item.team_name_radiant,
        item.team_name_dire,
        secondsToHms(item.game_time)
    
    ])
        
        return matchInfo
    }

// Filters outs all matches without team names

function filterTeams(matchArray){

    let filteredMatches = matchArray.filter(function(element){
        return element[3] !== undefined

    })

    return filteredMatches
};


// Write matchInfo

function writeMatchInfo(matchArray){

    matchArray.forEach(element => {

        let match = document.createElement("div")
        match.textContent = `${element[3]} : ${element[1]} ${element[4]} : ${element[2]} ${element[5]}`

        scoreDisplay.appendChild(match)

    });


}

   
    
    
    // Our main function calls
function Main(){
        
    getLiveGames();
    
}

Main();