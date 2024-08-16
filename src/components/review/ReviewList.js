import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReviewListModal from './ReviewListModal';
import ReviewCard from "./ReviewCard";

const ReviewList = ({ dormId }) => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stats, setStats] = useState();
    const count = 6;

    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/review/${dormId}`, { withCredentials: true });
            if (resp.status === 200) {
                console.log("응답 데이터 확인: ", resp.data);
                setReviews(resp.data.reviews);
                setStats(resp.data.stats);
            } else {
                console.error("리뷰 및 stats 불러오는 도중 오류 발생", resp.status);
            }
        } catch (e) {
            console.error("리뷰 및 stats 불러오는 도중 오류 발생", e);
        }
    };

    useEffect(() => {
        if (reviews.length > 0) {
            console.log("reviews 상태 확인: ", reviews);
        }
    }, [reviews]);

    useEffect(() => {
        if (stats) {
            console.log("stats 상태 확인: ", stats);
        }
    }, [stats]);

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
                stats={stats}
            />
        </div>
    );
};

export default ReviewList;
