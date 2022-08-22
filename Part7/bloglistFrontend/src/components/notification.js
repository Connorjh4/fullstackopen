import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { resetNotification } from "../store/notifyReducer";

export const Notification = () => {
  const notify = useSelector( state => state.notify)
  const dispatch = useDispatch()

  useEffect(() => {
    if(notify) {
      const setTime = setTimeout(() => {
        dispatch(resetNotification())
      }, notify.time*1000)
      return ()  => clearTimeout(setTime)
    }
  }, [dispatch, notify])

    
      if (!notify) {
        return null;
      }
      if (notify.color === "green") {
        return <SuccessMessage>{notify.message}</SuccessMessage>;
      }
      if (notify.color === "red") {
        return <ErrorMessage data-testid="error-msg">{notify.message}</ErrorMessage>;
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
`;
const ErrorMessage = styled.div`
  color: #8f3535;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export default Notification;
