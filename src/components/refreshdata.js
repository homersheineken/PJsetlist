import React, { Component } from 'react';

import Header from './header'

const URL_V1 = "https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/artist/83b9cbe7-9857-49e2-ab8e-b57b01038103/setlists"; 
const URL_ARTISTS3 = "https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/0.1/artist/83b9cbe7-9857-49e2-ab8e-b57b01038103/setlists.json"; 

//POST URL CURRENTLY SET TO TEST.JSON
const URL_POST = 'http://localhost:3780/concertlist'

class RefreshData extends Component{
    componentDidMount(){
        /*var setlistfmClient = new setlistfm({
            key: "635629f4-f0f9-4e6d-b65a-ceec89151df5", // Insert your personal key here
            format: "json", // "json" or "xml", defaults to "json"
            language: "en", // defaults to "en"
        });
        setlistfmClient.getArtistSetlists("83b9cbe7-9857-49e2-ab8e-b57b01038103", {
            p: 1
        })
            .then(function(setlists) {
                // Returns page one of all Depeche Mode setlists
                data = setlists
                console.log('setlists here', data);
            })
            .catch(function(error) {
                // Returns error
                console.log('error', error);
            });*/
        //THE BELOW SCRIPT WORKS TO BRING IN FRESH CONCERT DATA    
        //var data;
        let fullconcertlist = []
        fetch(URL_ARTISTS3,{
            method:'GET'
        })
        .then(response => response.json())
        .then(json => {
            var data = json;
            const apiPromises = [];
            var pagesRequired = Math.ceil(json.setlists["@total"] / json.setlists["@itemsPerPage"]);

            for (let i=pagesRequired; i>0;i--) {
                   
                    var fetchurl = URL_V1 + '?p=' + i;
                    apiPromises.push(
                      fetch(fetchurl, {
                        method: "GET", 
                        body: json,
                        headers:{
                            'Accept':'application/json',
                            'Content-type':'application/json',
                            'x-api-key': '635629f4-f0f9-4e6d-b65a-ceec89151df5'
                        }
                    })
                    .then(response => response.json())
                    .then(json => json.setlist)
                    );
             
            }

            Promise.all(apiPromises)
            .then(processedResponses => {
                fullconcertlist = [].concat.apply([], processedResponses)
                var prefetch = []
                fullconcertlist.map((concert)=>{
                    //Script to slow down POSTS to server https://stackoverflow.com/questions/38512238/how-to-add-a-settimeout-to-a-fetch-promise-that-uses-redux
                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                        var mydate = concert.eventDate.split('-');
                        mydate = [months[Number(mydate[1])-1],mydate[0],mydate[2]]
                        mydate = mydate.join("-");
                        prefetch.push({
                                id:concert.id,
                                versionId:concert.versionId,
                                eventDate:mydate,
                                lastUpdated:concert.lastUpdated,
                                artist:concert.artist,
                                venue:concert.venue,
                                tour:concert.tour,
                                sets:concert.sets,
                                info:concert.info,
                                url:concert.url
                            })
                        fetch(`${URL_POST}`, {
                            method:'POST',
                            headers:{
                                'Accept':'application/json',
                                'Content-type':'application/json',
                                "Access-Control-Allow-Methods": "GET, POST, PATCH,OPTIONS, PUT, DELETE"
                            },
                            body:JSON.stringify({
                                id:concert.id,
                                versionId:concert.versionId,
                                eventDate:mydate,
                                lastUpdated:concert.lastUpdated,
                                artist:concert.artist,
                                venue:concert.venue,
                                tour:concert.tour,
                                sets:concert.sets,
                                info:concert.info,
                                url:concert.url
                            })

                    }) 
                })
            console.log('prefetch ',prefetch)   
            })  
                    
        })
    }

    render(){
        return(
            <div>
                <Header/>
                <div>Thank you for Refreshing Data!!</div>
            </div>
            )
    }
}
export default RefreshData