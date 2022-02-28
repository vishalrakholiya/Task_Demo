import React from "react";
import { Input } from "antd";

const TextArea = (props) => {
    return (
        <div className="textInput">
            <Input.TextArea
                rows={4}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                className="inputDynmic"
                name={props.name}
            />
        </div>
    )
}

export default TextArea;