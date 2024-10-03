import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const LoginContainer = styled.div`
    width: 30%;
    height: 300px; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    margin: 0 auto; 
`


const InputId = styled.input`
    width : 80%;
    height : 20%;
    margin : 15px;
    border-radius: 15px;
    border: 5px solid #42F156;
    background: #A7A7A7;
`

const InputPassword = styled.input`
    width : 80%;
    height : 20%;
    margin : 15px;
    border-radius: 15px;
    border: 5px solid #42F156;
    background: #A7A7A7;
`

const LoginButton = styled.div`
    width : 80%;
    height : 20%;
    border-radius: 15px;
    background: #42F156;
    display: flex;  
    justify-content: center; 
    align-items: center; 
    cursor: pointer; 
`

const LoginTitle = styled.h2`
    font-size : 30px;
`


export default function Login(){
    const [loginid, setLoginid] = useState("");
    const [loginpassword, setLoginpassword] = useState("");
    const [logindata , setLogindata] = useState(null);

    const loginURL =  process.env.REACT_APP_API_SERVER_URL;
    


    const handleId= (e) =>{
        setLoginid(e.target.value)
    }

    const handlePassword= (e) =>{
        setLoginpassword(e.target.value)
    }

    const checkVlaue = () => {
        console.log(loginid);
        console.log(loginpassword);
    }

    const loginbody = {
        userId : loginid,
        password : loginpassword
    }

    const handleLogin = () => {
        axios.post(`${loginURL}/api/user/login`, loginbody)
        .then( response => {
            setLogindata(response.data);
            alert(`로그인 성공 , 사용자 고유 id : ${logindata}`)
            
        }
        ).catch(
            error => {
                console.log(error.data);
                
            }
        )
    }

    return(
        <LoginContainer>
            <InputId
            onChange={handleId}
            value = {loginid}
            placeholder="아이디를 입력해주세요"/>
            <InputPassword 
            onChange = {handlePassword}
            value = {loginpassword} 
            placeholder="비밀번호를 입력해주세요"/>
            <LoginButton onClick={handleLogin}>
                <LoginTitle>로그인</LoginTitle>
            </LoginButton>
        </LoginContainer>

        
    )
    
}