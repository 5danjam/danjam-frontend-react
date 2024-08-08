import {useLocation, useNavigate} from 'react-router-dom'
import Search from "./search/Search";
import Header from "./Header";

function Main() {
    let userInfo={
        id: '',
        name: '',
        role: ''
    }
    const location = useLocation();
    console.log(location.state)
    if (location.state != null) {
        userInfo = location.state.userInfo
        console.log(userInfo)
    }

    return (
        <>
            <Header userInfo={userInfo}/>
            <h1>{'여기가 메인 페이지 입니다.'}</h1>
            <Search/>
        </>
    )
}

export default Main
