import React, { Component } from 'react';
import Header from './header'

//POST URL CURRENTLY SET TO TEST.JSON
const URL_POST = 'http://localhost:3780/concertlist'

class UpdateDate extends Component{
    componentDidMount(){
        fetch(URL_POST,{
            method:'GET'
        })
        .then(response => response.json())
        .then(json => {
            json.map((item)=>{
                var thedate = `${item.eventDate}`
                var posturl = `${URL_POST}/${item.id}`
                fetch(posturl, {
                                    method:'PATCH',
                                    headers:{
                                        'Accept':'application/json',
                                        'Content-type':'application/json',
                                        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS, PUT, DELETE"
                                    },
                                    body:JSON.stringify({
                                        id2:thedate
                                        
                                    })

                            }) 
                            return true;
            })
            return true;
        })

    }
    render(){
        return(
            <div>
                <Header/>
                <div>Thank you for Updating Dates!!</div>
            </div>
            )
    }
}



export default UpdateDate