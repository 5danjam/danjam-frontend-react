import React, { useEffect, useState } from 'react';
import TestCard from './TestCard';
import axios from 'axios';

const TestList = () => {

    // 위시한테 값 넘겨주기
    const [isWish, setIsWish] = useState(false);
    const toggleWish = () => {
        setIsWish(prevState => !prevState);
    };

    // 무한스크롤
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreDorms = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // 호텔 리스트
    const [dorms, setDorms] = useState([]);

    const image1 = { name: 'sample01.png' };
    const image2 = { name: 'sample02.png' };
    const roomImage = [image1, image2];

    const dormList = {
        name: '최고의 호텔',
        id: 1,
        description: '슈퍼인간 유정\'s Pick',
        price: '124890',
        totalPrice: '9990',
        rating: 4.8,
        images: roomImage
    };

    useEffect(() => {
        setDorms([dormList]);
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {dorms.map((dormList) => (
                <TestCard
                    key={dormList.id}
                    dorm={dormList}
                    isWish={isWish}
                    toggleWish={toggleWish}
                />
            ))}
            {hasMore && (
                <button onClick={loadMoreDorms} style={{ margin: '20px', padding: '10px' }}>
                    더보기
                </button>
            )}
        </div>
    );
};

export default TestList;