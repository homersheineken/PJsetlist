import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';


import Header from './header'
//const REQ_URL = `http://localhost:3780/concertlist`
const json_url = '/data.json'


class Concert extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            concert:{}
        })
    }
    componentDidMount(){
        var concertid = `${this.props.match.params.concertid}`;
        fetch(json_url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            const concert = json.find(x => x.id === concertid)
            this.setState({

                concert:concert,
                show_download:''
            })
        })

    }
    renderSets(sets){
        if (sets !== undefined) {
            const start = 'start', lateron ='start continue';
            return sets.set.map((item,index) =>{
                return (
                    <div key={index} className='setlist'>
                        <h3 >Set #{index+1}</h3>
                        <ol className={`${index === 0 ? start : lateron}`}>
                            {item.song.map((name,j) => {
                                return(
                                    <Link key={name["name"]} to={`/songs/${name["name"]}`} className="concert_item" >
                                        <li className="song_name" key={j}>
                                            {name.name} 
                                            <span className='info'>  {name.info}</span>
                                        </li>
                                    </Link>
                                    ) 
                            })}
                        </ol>
                    </div>
                )
            })

        }

    }
    renderDate(date){
        if (date) {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var mydate = date
            mydate = mydate.split('-');
            return new Date(mydate[2], mydate[1] - 1, mydate[0]).toLocaleString('en-US',options);
        }
    }
    renderDownload(date){
        
        let url ='https://www.googleapis.com/customsearch/v1?key=AIzaSyCl1YUqEje5lhdWmig_4tKov0inoHG5-lE&cx=013528608713523460181:b4wrxadejog&as_sitesearch=www.pearljambootlegs.org&q=pearl+jam+' + date;
        let download_div = $(".download").html()
        download_div = download_div ? download_div.length : 0
        //if( download_div ){
            if (date && download_div <= 0){
            fetch(url, {
                method:'GET'
            })
            .then(response => response.json())
            .then(json => {
                if (json.items){
                    let link;
                    var show_download;
                    //let link = (json.items[0].link);
                    if (json.items[0].link === "http://www.pearljambootlegs.org/" ){
                         if(json.items[1] && json.items[1].link){
                            link = 'https://cors-anywhere.herokuapp.com/' + json.items[1].link 
                         } else {
                            link = undefined
                         }  
                    } else{
                        link = 'https://cors-anywhere.herokuapp.com/' + json.items[1].link
                    }
                    //let link ="http://www.pearljambootlegs.org/modules/jinzora2/index.php?nuCU0sannA%3D%3D=ZpZmmJRlZGhtYZFwYJhlWZCooMvRx7JQq6KWnZiSWaacz5jDzKJgV4CAjViIuXRZlHeMqMI%3D"
                    //var show_download;
                    if (link){
                        let callajax = $.ajax({
                           url:link,
                           mode: 'cors',
                           headers:{
                           'Access-Control-Allow-Origin':'*'
                           },
                           requireHeader: ['origin', 'x-requested-with'],
                           type:'GET',
                           success: function(data){
                               show_download = $(data).find('td.jz_main_block_topm a[title]').attr('href');
                               if(show_download){
                                show_download = "http://www.pearljambootlegs.org/modules/jinzora2/" + show_download
                                let html = "Click the Stickman to download show: <a href='" + show_download + "'><img class='aliveguy' src='/images/aliveguy.png' /></a>"
                                $(".download").html(html)
                               }
                           }

                        });
                        this.setState({
                         show_download:show_download
                        })
                    }

                    /*fetch(link, {
                        method:'GET',

                    })
                    .then(response => response.text())
                    .then(response => {

                        console.log('response',response)
                    })*/
                }
            })

          }
        //}

        /*return(
            this.state.download
            )*/
    }
    render() {
        return (
            <div>
                <Header />
                <div className="concert">
                    <div className="date">
                        <h2>{this.state.concert.eventDate}</h2>
                        <div className='tour_name'>Tour Name: {this.state.concert && this.state.concert.tour && this.state.concert.tour.name}</div>
                        <div className="venue">
                        Venue: {this.state.concert && this.state.concert.venue && this.state.concert.venue.name} in {this.state.concert && this.state.concert.venue && this.state.concert.venue.city.name}, {this.state.concert && this.state.concert.venue && this.state.concert.venue.city.state}
                        </div> 
                        
                    </div>

                    <div className='info'>
                    Info: {this.state.concert && this.state.concert.info}
                    </div>
                    <div className='download'>{/*this.renderDownload(this.state.concert.eventDate)*/}</div>
                    <div>{this.renderSets(this.state.concert.sets)}</div>

                    

                </div>
            </div>
            )
    }
}
export default Concert