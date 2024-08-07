import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

function Main() {
  // 로그인 성공했을 경우 사용 됨
  /* const location = useLocation()
  const userInfo = location.state.userInfo
  if (userInfo != null) {
    console.log(userInfo)
  }*/

  const navigate = useNavigate()

  const SignUp = () => {
    navigate('/signUp')
  }
  const LogIn = () => {
    navigate('/login')
  }
  const LogOut = async () => {
    try {
      const resp = await axios.post('http://localhost:8080/user/logout')
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
    <>
      <h1>{'여기가 메인 페이지 입니다.'}</h1>
      <Button onClick={LogIn}>{'로그인'}</Button>
      <Button onClick={SignUp}>{'회원가입'}</Button>
      <Button onClick={LogOut}>{'로그아웃'}</Button>
      <h1>{'성공!'}</h1>
      <Button onClick={Home}>{'home'}</Button>
    </>
  )
}

export default Main
