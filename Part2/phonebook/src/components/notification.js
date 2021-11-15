import React from "react";
import styled from "styled-components";

export const Notification = ({message}) => {
    if(message === null){
        return null
    }
    if(message.color === 'green'){
        return <SuccessMessage>{message.text}</SuccessMessage>
    }
    if(message.color === 'red'){
        return <ErrorMessage>{message.text}</ErrorMessage>
    }
}

const SuccessMessage = styled.div`
    color: #3a663a;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
`
const ErrorMessage = styled.div`
    color: #8f3535;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
`

export default Notification;