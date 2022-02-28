import React from "react";
import './Button.css'

const Button = (props) => {
    return (
        <div>
            <button onClick={props.onClick} className="buttonDynmic">
                {props.title}
            </button>
        </div>
    )
}

export default Button;