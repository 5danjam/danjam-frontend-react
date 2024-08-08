import React, {useEffect, useState} from 'react';
import WishButton from './WishButton';
import {FaStar} from "react-icons/fa";
import styled from "styled-components";
import {IoIosArrowDropleft, IoIosArrowDropright} from "react-icons/io";


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
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 5px;
    opacity: 0;
    transition: opacity 0.3s;

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

    // 위시리스트 버튼에 넘겨줄 값들


    // 이미지 슬라이드

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = dorm?.images || [];
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
        <CardContainer>
            <ImageContainer
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                {images.length > 0 ? (
                    <Image src={images[currentImageIndex].name} alt={`호텔 이미지 ${currentImageIndex + 1}`}/>
                ) : (
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
                <div>
                    <span style={{textDecoration: 'line-through', color: '#999'}}>{dorm.price} 원</span>
                    <span style={{color: '#e53935', marginLeft: '10px'}}>{dorm.totalPrice} 원</span>
                </div>
                <div style={{color: '#fbc02d'}}>
                    <FaStar/> {dorm.rating}
                </div>
            </InfoContainer>
        </CardContainer>
    );
};

export default DormCard;