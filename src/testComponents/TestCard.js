import React, { useState } from 'react';
import TestWishButton from './TestWishButton';
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import {
    IoIosArrowDropleft,
    IoIosArrowDropleftCircle,
    IoIosArrowDropright,
    IoIosArrowDroprightCircle
} from "react-icons/io";

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

const TestCard = ({ dorm = {}, isWish, toggleWish }) => {
    const { name, description, price, totalPrice, rating } = dorm;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = dorm.images || [];

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
                    <Image src={'/' + images[currentImageIndex].name} alt={`호텔 이미지 ${currentImageIndex + 1}`} />
                ) : (
                    <Image src="/호텔샘플.png" alt="기본 이미지" />
                )}
                {isHovered && images.length > 1 && (
                    <>
                        <NavButton left onClick={prevImage}>
                            <IoIosArrowDropleftCircle />
                        </NavButton>
                        <NavButton right onClick={nextImage}>
                            <IoIosArrowDroprightCircle />
                        </NavButton>
                    </>
                )}
                <TestWishButton isWish={isWish} toggleWish={toggleWish} />
            </ImageContainer>
            <InfoContainer>
                <p style={{ margin: '5px 0', fontSize: "19px"}}>{name}</p>
                <p style={{ margin: '0 0 10px', fontSize: "14px" }}>{description}</p>
                <div>
                    <span style={{ textDecoration: 'line-through', color: '#999' }}>{price} 원</span>
                    <span style={{ color: '#e53935', marginLeft: '10px' }}>{totalPrice} 원</span>
                </div>
                <div style={{ color: '#fbc02d' }}>
                    <FaStar /> {rating}
                </div>
            </InfoContainer>
        </CardContainer>
    );
};

export default TestCard;