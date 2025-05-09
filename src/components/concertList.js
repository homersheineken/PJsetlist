import React from 'react';
import {Link} from 'react-router-dom';

const ConcertList = (props) => {

    const list = ({allConcerts}) => {
        if(allConcerts) {
            return allConcerts.map((item)=>{
                //var options = {  year: 'numeric', month: 'long', day: 'numeric' };
                //var newdate
                /*var mydate = item["@eventDate"];
                mydate = mydate.split('-');
                var newdate = new Date(mydate[2], mydate[1] - 1, mydate[0]);
                mydate = [mydate[1],mydate[0],mydate[2]]
                var dashdate = mydate.join("-");
                newdate = newdate.toLocaleString("en-US", options);*/

                const style = {
                    //background: `url('/images/covers/${item.cover}.jpg') no-repeat`
                }
                return(
                    <Link key={item.id} to={`/concert/${item.id}`} className="concert_item" style={style}>
                        <div>{item.eventDate}</div>
                    </Link>
                )
            })
        }
    }
    return (
        <div className="artists_list">
            <h4>Browse the shows</h4>
            {list(props)}
        </div>
        );
}

export default ConcertList;