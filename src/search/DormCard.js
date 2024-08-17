import React, {useEffect, useState} from 'react';
import WishButton from './WishButton';
import {FaStar} from "react-icons/fa";
import styled from "styled-components";
import {IoIosArrowDropleft, IoIosArrowDropright} from "react-icons/io";
import {useNavigate} from "react-router-dom";


const CardContainer = styled.div`
    position: relative;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    width: 250px;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 150px;

    &:hover .nav-button {
        opacity: 1;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    padding: 0;
    opacity: 0;
    transition: opacity 0.3s;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

    &:hover {
        opacity: 1;
    }

    ${(props) => props.left && `
    left: 10px;
  `}

    ${(props) => props.right && `
    right: 10px;
  `}
`;

const InfoContainer = styled.div`
    padding: 15px;
    padding-top: 5px;
`;

const DormCard = ({dorm, isWish, toggleWish}) => {
    console.log("dorm: ", dorm)
    // const originalPrice = dorm.minPrice + (dorm.minPrice / 4);

    // 위시리스트 버튼에 넘겨줄 값들

    let navigate = useNavigate()
    let moveToDorm = () => {
        navigate('dorm/showOne/' + dorm.id)
    }

    // 이미지 슬라이드

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = dorm.roomImages || [];
    // dorm.images 없어도 실행 가능한 코드

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <CardContainer onClick={moveToDorm}>
            <ImageContainer
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {images.length > 0 ? (
                    <Image src={'http://localhost:8080/uploads/' + images[currentImageIndex].name + '.'
                        + images[currentImageIndex].ext} alt={`룸이미지 ${currentImageIndex + 1}`}/>                ) : (
                    <Image src="/호텔샘플.png" alt="기본 이미지"/>
                )}
                {!isHovered && images.length > 1 && (
                    <>
                        <NavButton left onClick={prevImage}>
                            <IoIosArrowDropleft />
                        </NavButton>
                        <NavButton right onClick={nextImage}>
                            <IoIosArrowDropright />
                        </NavButton>
                    </>
                )}
                <WishButton isWish={isWish} toggleWish={toggleWish}/>
            </ImageContainer>
            <InfoContainer>
                <h3 style={{margin: '5px 0'}}>{dorm.name}</h3>
                {/* 잊지 말고 호텔이름이랑 호텔설명에 마진값 주기 */}
                <p style={{margin: '0 0 10px'}}>{dorm.description}</p>
                {/* 조건부 렌더링으로 불러온 객체에 기간에 관련된 데이터 존재하면 띄워주기 */}
                <div>
                    {/*<span style={{textDecoration: 'line-through', color: '#999'}}>{originalPrice} 원</span>*/}
                    <span style={{color: '#e53935', marginLeft: '10px'}}>{dorm.room.price} 원</span>
                </div>
                <div style={{color: '#fbc02d'}}>
                    {/* 조건부 렌더링으로 rating 값이 없으면 첫 리뷰를 달아주세요 띄워주기 */}
                    <FaStar/> {dorm.rate}
                </div>
            </InfoContainer>
        </CardContainer>
    );
};

export default DormCard;