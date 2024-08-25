import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './Creator.css'
import { Link } from 'react-router-dom'

const CreatorCard = ({creator}) =>  {
  
    return (
        <div 
            className="creator-card"
            style={{ backgroundImage: `url(${creator.imageURL})` }}
        >
            <div className="card-content">
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>
                <Link to={`/info/${creator.id}`}>Visit Profile</Link>
            </div>
        </div>
    );
  };
  
  export default CreatorCard;