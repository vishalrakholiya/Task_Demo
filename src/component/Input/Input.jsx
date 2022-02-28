import React from "react";
import { Input } from "antd";
import './Input.css';

const TextInput = (props) => {
    return (
        <div className="textInput">
            <Input
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                type={props.type}
                className="inputDynmic"
                name={props.name}
            />
        </div>
    )
}

export default TextInput;