import React, {Component} from 'react';

import Banner from '../components/banner';
import ConcertList from './concertList';


const ConcertData = require('./data.json');


const URL_V1 = "https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/1.0/artist/83b9cbe7-9857-49e2-ab8e-b57b01038103/setlists"; 
const URL_POST = 'http://localhost:3780/concertlist'


/**************NEED TO CHANGE TO USE NEW DB WITH UPDATED CONCERT DATES****************************/
//*************NEED TO CREATE JSON FILE OF CONCERT POSTERS AND YOUTUBE VIDEOS 
//https://developers.google.com/youtube/v3/code_samples/javascript#search_by_keyword 
//https://www.codecademy.com/courses/javascript-intermediate-en-757J2/0/5& DOWNLOADS?*******/
//*************NEED TO CREATE SORT BY YEAR OR PAGINATION BY YEAR https://codepen.io/PiotrBerebecki/pen/pEYPbY  ********///

/*DONE!!!!!*************NEED TO CREATE JSON FILE OF SONGS PULLED FROM CONCERT DATA************************/
//DONE!!!!!*************ADD DOWNLOAD LINK FOR THE SHOW****************************************************/
// can search 2016-08-20 site:www.pearljambootlegs.org  google_API_Key=AIzaSyCl1YUqEje5lhdWmig_4tKov0inoHG5-lE
//http://www.pearljambootlegs.org/modules/jinzora2/index.php?lcmpy9Sh=mNWs0NGilZs%3D&nuCU0sannA%3D%3D=ZpZmmJRlZGhtYZFwYJhjWZCooMvRx7JQq6KWnZiSWaacz5jDzKJgV4CAjViIuXRZlHeMqMI%3D&ext.html


class Home extends Component {

    constructor(props) {
        super(props);

        this.state={
            artists:'',
            concerts:''
        }

    }

    componentDidMount(){
        var data ={}

        fetch(URL_POST,{
            method:'GET'
        })
        .then(response => response.json())
        .then(json =>{
            var stuff = json
            this.setState({
                concerts:ConcertData
            })
        })

      
    }
    render() {
        return(
                <div>
                    <Banner/>
                    <ConcertList allConcerts={this.state.concerts} />
                </div>
            )
    }
}

export default Home;

//OLD NODE JS DEPENDENCY
//var setlistfm = require("setlistfm-js")
//const URL_ARTISTS = 'http://localhost:3006/artists';
//const URL_ARTISTS2 = 'https://api.setlist.fm/rest/0.1/artist/83b9cbe7-9857-49e2-ab8e-b57b01038103/setlists.json';
//const URL_ARTISTS3 = "https://cors-anywhere.herokuapp.com/https://api.setlist.fm/rest/0.1/artist/83b9cbe7-9857-49e2-ab8e-b57b01038103/setlists.json"; 

