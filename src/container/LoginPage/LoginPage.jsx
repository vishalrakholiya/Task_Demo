import React, { useState } from "react";
import { Col, Row, notification } from "antd";
import { useNavigate } from 'react-router-dom';

import Button from "../../component/Button/Button";
import TextInput from "../../component/Input/Input";
import './LoginPage.css'

const LoginPage = (props) => {
    let navigate = useNavigate();
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


    const handleInputChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        }
    }

    const formSubmitHandler = () => {
        if (username === "admin" && password == "123") {
            localStorage.setItem("isLogin",true);
            navigate('/list')
        } else {
            notification.open({
                message: 'Wrong Information',
                description:
                    'Invalid credentials, Please try again.',
            });
        }
    }

    return (
        <>
            <div className="mainLoginDiv">
                <div className="loginBox">
                    <Row>
                        <Col span={8}>
                            <div className="loginLeftSide">
                                <h2> Welcome To Login Page </h2>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div className="loginFormInput">
                                <h3 className="loginHead"> Member Login </h3>
                                <div className="inputDiv">
                                    <TextInput
                                        placeholder="User Name"
                                        type="text"
                                        label="User Name"
                                        handleChange={handleInputChange}
                                        name="username"
                                    />
                                </div>
                                <div className="inputDiv">
                                    <TextInput
                                        placeholder="Password"
                                        type="password"
                                        label="Password"
                                        handleChange={handleInputChange}
                                        name="password"
                                    />
                                </div>
                                <div>
                                    <Button onClick={formSubmitHandler} title="Login" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )

}

export default LoginPage;