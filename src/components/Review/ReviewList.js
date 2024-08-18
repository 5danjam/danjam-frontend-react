import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewModal from './ReviewModal';

const ReviewList = ({ bookingId }) => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const response = await axios.get(`http://localhost:8080/review/booking/${bookingId}`);
        setReviews(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/review/${id}`);
        fetchReviews(); // 리뷰 목록 갱신
    };

    return (
        <div>
            <h2>Booking Reviews</h2>
            <button onClick={() => setIsModalOpen(true)}>Add Review</button>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <p>{review.users.username}: {review.content} ({review.rate}/5)</p>
                        <button onClick={() => handleDelete(review.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onReviewAdded={fetchReviews} bookingId={bookingId} />
        </div>
    );
};

export default ReviewList;