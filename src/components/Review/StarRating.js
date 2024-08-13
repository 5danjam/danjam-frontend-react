import React from 'react';
import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";

const StarRating = ({ rate }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 !== 0;

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, index) => (
                <span key={index}><FaStar /></span>
            ))}
            {halfStar && <span><FaStarHalfAlt /></span>}
            {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
                <span key={index}><FaRegStar /></span>
            ))}
        </div>
    );
};

export default StarRating;