import React from 'react';
import Modal from 'react-modal';
import StarRating from "./StarRating";
import styled from "styled-components";
import {FaTimes} from "react-icons/fa";
import ReviewCard from "./ReviewCard";

Modal.setAppElement('#root');

const StyledModal = styled(Modal)`
    position: relative;
    width: 80%;
    max-width: 800px;
    margin: auto;
    background: white;
    border-radius: 30px;
    padding: 20px;
    overflow-y: auto;
    max-height: 90vh;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

const ModalBody = styled.div`
    padding-top: 10px;
`;

const ReviewItem = styled.div`
    margin-bottom: 20px;
`;

const ReviewContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

// {reviews.map((review, index) => (
//     <ReviewItem key={index}>
//         <p>{review.username}</p>
//         <ReviewContainer>
//             <span><StarRating rate={review.rate} /></span>
//             <span>{review.rate}</span>
//         </ReviewContainer>
//         <p>{review.content}</p>
//     </ReviewItem>
// ))}

const ReviewListModal = ({ isOpen, onRequestClose, reviews }) => {
    return (
        <StyledModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Review Modal"
            overlayClassName="ReviewModalOverlay"
            overlayElement={(props, contentElement) => <Overlay {...props}>{contentElement}</Overlay>}
        >
            <ModalHeader>
                <h2>후기 {reviews.length}개</h2>
                <CloseButton onClick={onRequestClose} className="close-button"><FaTimes /></CloseButton>
            </ModalHeader>
            <ModalBody>
                {reviews.map(review => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                    />
                ))}
            </ModalBody>
        </StyledModal>
    );
};

export default ReviewListModal;