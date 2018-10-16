//Require https module
const https = require('https');

const http = require('http');
//Print Error Message
function printError(error){
    console.error(error.message);

}

//Function to print message to console
function printMessage(username, badgeCount, points) {

    //Use back tick for template literals
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

function get(username){

    try {

        // Connect to the API URL(https://teamtreehouse.com/nicholasgabriel.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if(response.statusCode === 200) {


                // Read the data
                let body = "";
                response.on("data", data => {
                    body += data.toString();
                });

                //or can do request.on outside body

                response.on("end", () => {
                    try {

                        // Parse the data
                        const profile = JSON.parse(body);

                        // Print the data
                        printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        printError(error);
                    }
                });
            }else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });
        request.on("error", printError);
    } catch(error){
        printError(error);
    }
}

// this needs to be explicitly stated for modules. API that needs to accessible from whoever requires it
module.exports.get = get;

//the first get is the name by which API will be accessible