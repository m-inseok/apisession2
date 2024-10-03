import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const SignupContainer = styled.div`
    width: 30%;
    height: 400px; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    margin: 0 auto; 
    position: relative;
`

const SignupId = styled.input`
    width : 80%;
    height : 20%;
    margin : 15px;
    border-radius: 15px;
    border: 5px solid #42F156;
    background: #A7A7A7;
`

const SignupPassword = styled.input`
    width : 80%;
    height : 20%;
    margin : 15px;
    border-radius: 15px;
    border: 5px solid #42F156;
    background: #A7A7A7;
`

const SignupEmail = styled.input`
    width : 80%;
    height : 20%;
    margin : 15px;
    border-radius: 15px;
    border: 5px solid #42F156;
    background: #A7A7A7;
`

const SignupButton = styled.div`
    width : 80%;
    height : 20%;
    border-radius: 15px;
    background: ${(props) => (props.disabled ? "#A7A7A7" : "#42F156")}; 
    display: flex;  
    justify-content: center; 
    align-items: center; 
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}; 
    position: relative;
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")}; 
`

const SignupTitle = styled.h2`
    font-size : 30px;
    color: ${(props) => (props.disabled ? "#666" : " #FFFFFF")}; 
`

const AlertSign = styled.p`
    text-align: left;  
    margin: 0;
    font-size: 10px;
    color: red;
    width: 80%;  
`

const FreeSign = styled.p`
    text-align: left;  
    margin: 0;
    font-size: 10px;
    color: #42F156;
    width: 80%;  
`

const Active = styled.div`
    width: 100%;  
    height: 100%;  
    border-radius: 15px;
    background: rgba(31, 29, 29, 0.39); 
    display: flex;  
    justify-content: center; 
    align-items: center; 
    position: absolute;  
    top: 0;
    left: 0;
`

export default function SignUp() {

    const [signid, setSignid] = useState("");
    const [signpassword, setSignpassword] = useState("");
    const [signemail, setSignemail] = useState("");
    const [responsedata, setResponsedata] = useState(null);

    const apiUrl = process.env.REACT_APP_API_SERVER_URL;

    const handleSignid = (e) => {
        setSignid(e.target.value);
    };

    const handleSignpassword = (e) => {
        setSignpassword(e.target.value);
    };

    const handleSignemail = (e) => {
        setSignemail(e.target.value);
    };

    const body = {
        userId: signid,
        password: signpassword,
        email: signemail,
    };

    const handleSignup = () => {
        if (!signid || !signpassword) return; 

        axios
            .post(`${apiUrl}/api/user/signup`, body)
            .then((response) => {
                setResponsedata(response.data);
                console.log("응답 데이터:", response.data);
                alert(responsedata);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert(error.response.data);
                } else {
                    console.log(error.data);
                }
            });
    };

    
    const isButtonDisabled = signid.length === 0 || signpassword.length === 0;

    return (
        <SignupContainer>
            {signid.length === 0 && (
                <AlertSign>필수필드 입니다. 아이디를 입력해주세요</AlertSign>
            )}
            <SignupId
                placeholder="회원가입시 아이디를 입력해주세요"
                value={signid}
                onChange={handleSignid}
            />
            {signpassword.length === 0 && (
                <AlertSign>필수필드 입니다. 비밀번호를 입력해주세요</AlertSign>
            )}
            <SignupPassword
                placeholder="회원가입시 비밀번호를 입력해주세요"
                value={signpassword}
                onChange={handleSignpassword}
            />
            <FreeSign>선택필드입니다. 이메일을 입력해주세요</FreeSign>
            <SignupEmail
                placeholder="회원가입시 이메일을 입력해주세요"
                value={signemail}
                onChange={handleSignemail}
            />
            <SignupButton onClick={handleSignup} disabled={isButtonDisabled}>
                <SignupTitle disabled={isButtonDisabled}>
                    회원가입
                </SignupTitle>
                {isButtonDisabled && <Active />}
            </SignupButton>
        </SignupContainer>
    );
}
