import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Header(props) {
    const navigate = useNavigate()
    console.log(props)

    const SignUp = () => {
        navigate('/signUp')
    }
    const LogIn = () => {
        navigate('/login')
    }
    const LogOut = async () => {
        try {
            const resp = await axios({
                url: 'http://localhost:8080/users/logout',
                method: 'POST',
                withCredentials: true,
            })
            console.log(resp)
            if (resp.status === 200) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const Home = () => {
        navigate('/')
    }

    return (
        <div style={{display: "flex", justifyContent: "end"}}>
            {props.userInfo.name !== '' ? (<h3>{props.userInfo.name}</h3>) : (<h3>비회원</h3>)}
            <div hidden={props.userInfo.name !== '' ? true : false}>
                <Button onClick={LogIn}>{'로그인'}</Button>
                <Button onClick={SignUp}>{'회원가입'}</Button>
            </div>
            <div hidden={props.userInfo.name === '' ? true : false}>
                <Button onClick={LogOut}>{'로그아웃'}</Button>
            </div>
            <Button onClick={Home}>{'home'}</Button>
        </div>
    )
}

export default Header