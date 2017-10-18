import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Header from './header'
const REQ_URL = `http://localhost:3777/songs`

class Song extends Component{
    constructor(props) {
        super(props);

        this.state = ({
            song:{}
        })
    }

    componentDidMount(){
        var songid = `${REQ_URL}/${this.props.match.params.songid}`;
        fetch(songid, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.setState({
                song:json
            })
        })

    }
    renderDates(dates){
        if(dates){
            return (
                dates.map((date,i)=>{
                    var newdate = date
                    return(
                        <div>
                            <li key={i}>{date}</li>
                        </div>
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