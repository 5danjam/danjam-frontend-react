import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import ReviewListModal from './ReviewListModal';
import ReviewCard from "./ReviewCard";

const ReviewList = ({ dormId }) => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const count = 6;

    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/review/${dormId}`, {withCredentials: true});

            if (resp.status === 200) {
                console.log("리뷰 로드 데이터 확인: " + resp.data);
                setReviews(resp.data);
            } else {
                console.error("리뷰 불러오는 도중 오류 발생", resp.status);
            }

        } catch (e) {
            console.error("리뷰 불러오는 도중 오류 발생", e)
        }

    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <h2>리뷰</h2>
            <ul>
                {reviews.slice(0, count).map(review => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        hasmore='fromList'
                    />
                ))}
            </ul>
            {reviews.length > count && (
                <button onClick={openModal}>후기 {reviews.length}개 모두 보기</button>
            )}
            <ReviewListModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            reviews={reviews}
            />
        </div>
    );
};

export default ReviewList;