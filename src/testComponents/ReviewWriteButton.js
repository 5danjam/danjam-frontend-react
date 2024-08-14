import ReviewWriteModal from "../components/Review/ReviewWriteModal";
import {useState} from "react";

const ReviewWriteButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    return (
        <>
            <button onClick={openModal}> 리뷰작성 </button>
            <ReviewWriteModal isOpen={isModalOpen}
                              onRequestClose={closeModal}/>
        </>

    )
};

export default ReviewWriteButton;