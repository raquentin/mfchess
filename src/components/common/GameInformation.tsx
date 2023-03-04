import styled from "styled-components";

const GameInformation = (): JSX.Element => {
  return (
    <InfoContainer>
      <MoveHistory>

      </MoveHistory>
      <ChatContainer>

      </ChatContainer>
    </InfoContainer>
  )
}

export default GameInformation

const InfoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 0.3fr 1fr;
`;

const MoveHistory = styled.div`
  background-color: red;
`;

const ChatContainer = styled.div`
  background-color: black;
`;
