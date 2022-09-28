import styled from "@emotion/styled";

const Loading = () => {
  return <LoadingOverlay>Loading...</LoadingOverlay>;
};

export default Loading;

export const LoadingOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  opacity: 0.3;
  background-color: black;
  color: white;
  z-index: 1007;
`;
