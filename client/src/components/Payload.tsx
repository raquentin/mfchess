import { useUser } from "context/UserContext";
import styled from "styled-components";
import { PayloadType } from "types/MessageType";

interface Props {
    isMe: boolean;
}

type FCProps = {
    payload: PayloadType;
};

/**
 * * FC for payload used in chatroom
 * TODO make it look better
 * @param param0 
 */
const Payload = ({payload}:FCProps):JSX.Element => {
    const [user, updateUser, fetchUser] = useUser()

    // console.log(payload.userID, user!.userID)
    const isMe: boolean = payload.userID === user!.userID;
    return (
        <StyledMessage isMe={isMe}>
            {isMe ? <p>{payload.data}</p> : <p>{payload.name}: {payload.data}</p>}
        </StyledMessage>
    );
};

export default Payload;

const StyledMessage = styled.div<Props>`
    display: flex;
    align-items: center;
    flex-direction: ${({isMe}) => (isMe? 'row-reverse':'row')};
    margin: 8px 0px;

    & p:first-child{
        margin: 0 5px;
    }

    & p:last-child{
        padding: 2px 5px;
        border-radius: 5px;
        font-size: 20px;
        background: #eee;
        color: ${({isMe}) => (isMe? 'black':'black')};;
        font-weight: bold;
        margin: auto 0;
    }
`;