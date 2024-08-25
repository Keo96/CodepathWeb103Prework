import React, { useState, useEffect } from 'react';
import CreatorCard from '../components/CreatorCard';
import { supabase } from '../client';
import World from '../assets/world.png';
import { Link } from 'react-router-dom';
import './ShowCreators.css';

const ShowCreators = (props) => {

    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchCreators = async () => {
            const {data} = await supabase
                .from('creators')
                .select()
                .order('created_at', {ascending: true})
            setCreators(data);
        }
        fetchCreators();
    }, [props]);
    
    return (
        <div>
            <div className="header">
                <img src={World} alt="world" className= "worldImage" width="100%" height="auto"/>
                <div className="headerContent">
                    <p className="title">CreatorVerse</p>
                    <p className="subtitle">Connecting Youtubers, One Creator at a Time</p>
                    <div className="headerButtons">
                        <Link to="/" className="btn">Current Creators</Link>
                        <Link to="/create" className="btn">Create Creator</Link>    
                    </div>
                </div>
            </div>

            <div className="ShowCreators">
                {
                    creators && creators.length > 0 ?
                    creators.map((creator,index) => 
                    <CreatorCard key = {index} creator = {creator}/>
                    ) : <h2>{'No Creators Yet 😞'}</h2>
                }
            </div> 
        </div> 
    )
}

export default ShowCreators;