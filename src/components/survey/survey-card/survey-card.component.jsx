
import React from 'react';

import './survey-card.styles.scss';

import x from '../../../assets/repo/Exercise.jpg'
// test image:
/*
https://images.unsplash.com/
photo-1593614164161-e25658aea67e?ixlib=rb-1.2.
1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80

*/

// src in img can render out sourced images like from db and 3rd parties. but for local images
// we should import image with a desired name and then attach it to the src attribute.

const Card = () => (


    <div className="card">
        <div className="card-title"> crossfit </div>
        
            <img className="card-image" src={x} alt=""/>
        
        <div className="card-rating">
                <div>cancel</div>
                <div>rating icons</div>
        </div>

    </div>
);

export default Card;