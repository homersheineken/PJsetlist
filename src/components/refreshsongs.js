import React, { Component } from 'react';
//import Banner from '../components/banner';

import Header from './header'


//POST URL CURRENTLY SET TO TEST.JSON
const URL_GET = 'http://localhost:3777/concertlist'
const URL_POST = 'http://localhost:3780/songs'

class RefreshSongs extends Component{
    constructor(props){
        super(props)
        this.state={
            songs:[],
            concerts:[]
        }
    }

    renderSongs = (concerts) =>{
        var allsongs = []
        
        concerts.map((concert,i)=>{
                this.concert = concert.eventDate
                concert.sets.set.map((set,j)=>{

                    set.song.map((song,k)=>{
                        var coversong=null;
                        if(song.cover){
                            coversong = song.cover
                        }
                        var found = allsongs.findIndex(
                            x => x.id===song.name)
                        if(found === -1 ){
                            allsongs.push({id:song.name,cover:coversong,played:[this.concert]})
                        }else{
                            //var dleteme = allsongs[found].played.push(this.concert)
                        }
                    
                    },this)
                    
                },this)
        },this)
        //SORT SONGS
        allsongs.sort((a, b) => a.id.localeCompare(b.id));
        console.log('allsongs',allsongs)
        //POST SONGS TO API
        allsongs.map((song)=>{
            fetch(`${URL_POST}`, {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json',
                    "Access-Control-Allow-Methods": "GET, POST, PATCH,OPTIONS, PUT, DELETE"
                },
                body:JSON.stringify({
                    id:song.id,
                    cover:song.cover,
                    played:song.played
                })

            }) 
        }) 
        return(
            allsongs.map((song)=>{
                return(<div key={song.id}>{song.id}</div>)
            })
        )

    }
    componentDidMount(){
    
      fetch(URL_GET,{
        method:'GET'
      })
      .then(response =>response.json())
      .then(json => {
        this.setState({
            concerts:json
        })
      })
    }

    render(){
        return(
            <div>
                <Header/>
                <h2>Pearl Jam Songs!</h2>
                {this.renderSongs(this.state.concerts)}
            </div>
            )
    }
}
export default RefreshSongs