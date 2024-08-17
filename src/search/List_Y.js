import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import DormCard from "./DormCard";
import * as dorms from "react-bootstrap/ElementChildren";

function List_Y() {
    // 리스트
    const [data, setData] = useState({dormList: []})

    let navigate = useNavigate()
    let moveToDorm = (id) => {
        navigate('dorm/showOne/' + id)
    }

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/showAll")
                .catch((e) => {
                    console.error("console.log: "+e)
                })

            if (resp.status === 200 && resp.status.result === 'success') {
                setData(resp.data) // result, dormList, pageable
            }
        }
        selectList()
    }, []);

    // 위시한테 값 넘겨주기
    const [isWish, setIsWish] = useState(false);
    const toggleWish = async (dormId) => {
        try {
            setData(prevDorms =>
                prevDorms.map(dorm =>
                    dorm.id === dormId
                        ? { ...dorm, isWish: !dorm.isWish }
                        : dorm
                )
            );

            const targetDorm = dorms.find(dorm => dorm.id === dormId);
            /** User 값 받아서 로그인 한 상태면 위시로 넘겨주고, 로그인되지 않았으면 로그인 창으로 넘겨주기
             */
            if (targetDorm.isWish) {
                await axios.delete(`http://localhost:8080/wish/${dormId}`, {withCredentials: true});
            } else {
                await axios.get(`http://localhost:8080/wish/${dormId}`, {}, {withCredentials: true});
            } // 위시리스트 매핑 설정 @영우
        } catch (e) {
            console.error("찜 상태 변경 중 오류 발생", e);
            setData(prevDorms =>
                prevDorms.map(dorm =>
                    dorm.id === dormId
                        ? { ...dorm, isWish: !dorm.isWish }
                        : dorm
                )
            );
        }
    };

    // 무한스크롤
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const size = 40; // 에어비앤비 기준

    const loadMoreDorms = () => {
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        setPage(1); //페이지 초기화
        setDorms([]) //호텔 초기화
        getDorms(1, size, filters)
    }, [filters]);

    return (
        <>
            <h1>List</h1>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {data.dormList.map(/* 위시새끼 단체로 움직임 */(dorm) => (
                    <DormCard
                        key={dorm.id}
                        dorm={dorm}
                        onClick={() => moveToDorm(dorm.id)}
                        // isWish={isWish}
                        // toggleWish={() => toggleWish(dorm.id)}
                    />
                ))}
                {hasMore && (
                    <button onClick={loadMoreDorms} style={{margin: '20px', padding: '10px'}}>
                        더보기
                    </button>
                )}
                {/* !hasMore 일 경우 마지막 더 불러올 리스트가 없습니다 메시지 추가 */}
            </div>

        </>
    )
}

export default List_Y