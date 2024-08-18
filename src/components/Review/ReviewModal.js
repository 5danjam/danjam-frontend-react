import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const ReviewModal = ({ isOpen, onClose, onReviewAdded, bookingId }) => {
    const [content, setContent] = useState('');
    const [rate, setRate] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/review', { content, rate, booking: { id: bookingId } });
        onReviewAdded(); // 리뷰 목록 갱신
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Add Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Review:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </label>
                <label>
                    Rating:
                    <input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} min="1" max="5" required />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default ReviewModal;