import styled from "@emotion/styled";
import React from "react";

const Loading = () => {
  return <LoadingOverlay>로딩중 오버레이 띄울거임</LoadingOverlay>;
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
