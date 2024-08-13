import {useState} from "react";
import ReviewModal from "./ReviewModal";
import StarRating from "./StarRating";

const ReviewCard = ({review}) => {

    const maxLength = 100;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="review-card">
            <p>{review.username}</p>
            <div className='ReviewContainer'>
                <div style={{ display: 'inline-block'}}> <StarRating rate={review.rate}/> </div>
                <span> {review.rate} </span>
            </div>
            <p>{review.content.length > maxLength ? review.content.slice(0, 100) + '...' : review.content}</p>
            {review.content.length > maxLength && (
                <button onClick={openModal}>더보기</button>
            )}
            {isModalOpen && (
                <ReviewModal review={review} closeModal={closeModal} />
            )}
        </div>
    );
};

export default ReviewCard;