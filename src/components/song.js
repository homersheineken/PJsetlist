import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Header from './header'
const REQ_URL = `http://localhost:3780/songs`
const json_url = '/songs.json'

class Song extends Component{
    constructor(props) {
        super(props);

        this.state = ({
            song:{}
        })
    }

    componentDidMount(){
        var songid = `${this.props.match.params.songid}`;
        fetch(json_url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            const song = json[0].songs.find(x => x.id === songid)
            this.setState({
                song: song
            })
        })

    }
    renderDates(dates){
        if(dates){
            return (
                dates.map((date,i)=>{
                    var newdate = date
                    return(
                        
                        <Link key={i} to={`/concert/${date}`} className="concert_item" >
                            <li>{date}</li>
                        </Link>
                        )
                })
            )
        }
            
    }
    render(){
        return(
            <div>
                <Header />
                <div className='song'>
                    <h3>{this.state.song.id}</h3>
                    <p>was played:</p>
                    <div>{this.renderDates(this.state.song.played)}</div>
                </div>
            </div>
            )
    }
}
export default Song