import React, { useEffect, useState } from 'react';
import DormCard from './DormCard';
import axios from 'axios';

const DormList = () => {

    // 위시한테 값 넘겨주기
    const [isWish, setIsWish] = useState(false);
    const toggleWish = async (dormId) => {

        setIsWish(prevState => !prevState);
        try {
            /** User 값 받아서 로그인 한 상태면 위시로 넘겨주고, 로그인되지 않았으면 로그인 창으로 넘겨주기
             */
            if (isWish) {
                await axios.delete('http://localhost:8080/wish/' + dormId);
            } else {
                await axios.get('http://localhost:8080/wish/' + dormId);
            } // 위시리스트 매핑 설정 @영우
        } catch (e) {
            console.error("찜 상태 변경 중 오류 발생", e);
            setIsWish((prevState) => !prevState)
        }
    };
    // 무한스크롤

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreDorms = () => {
        setPage((prevPage) => prevPage + 1);
    }

    // 호텔 리스트
    const [dorms, setDorms] = useState([]);

    const getDorms = async (page) => {
        try {
            const resp = await axios.get("http://localhost:8080/dorm/" + page);
            console.log("데이터가 있나요?", resp.data);
            const newDorms = resp.data;
            setDorms((prevDorms) =>
                [...prevDorms, ...newDorms]
            );
            if (newDorms.length === 0) {
                setHasMore(false);
            }
        } catch (e) {
            console.error("호텔 정보 로드 중 오류 발생", e);
        }
    };


    useEffect(() => {
        getDorms(page)
    }, [page]);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {dorms.map((dorm) => (
                <DormCard
                key={dorm.id}
                dorm={dorm}
                isWish={false}
                toggleWish={toggleWish}
                />
            ))}
            {hasMore && (
                <button onClick={loadMoreDorms} style={{ margin: '20px', padding: '10px'}}>
                    더보기
                </button>
            )}
        </div>
    );
};

export default DormList;