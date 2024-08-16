import {Link, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Button} from "react-bootstrap";
import React from "react";

const MyPage = () => {
    const params = useParams()
    const id = params.id
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = location.state?.userInfo;
    const goTo = (id) => {
        navigate(`${id}`, { state: { userInfo } });
    };

    return (
        <>
            <Button onClick={() => goTo('privacy')}>Privacy</Button>
            <Button onClick={() => goTo('bookings')}>Bookings</Button>
            <Button onClick={() => goTo('wishes')}>Wishes</Button>
            <Button onClick={() => goTo('reservations')}>Reservations</Button>
            <Outlet /> {/* This will render the nested routes */}
        </>
    );
}

export default MyPage