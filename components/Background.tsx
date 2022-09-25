import React, { ReactNode } from "react";
import Image from "next/image";
import images from "../assets/images";
import styled from "@emotion/styled";

type Props = {
  children: ReactNode;
};

const Background: React.FC<Props> = ({ children }) => {
  return (
    <BackgroundContainer>
      <Image
        alt={"background"}
        src={images.background}
        layout={"fill"}
        objectFit={"cover"}
        objectPosition={"center"}
      />
      <ContentContainer>{children}</ContentContainer>
    </BackgroundContainer>
  );
};

export default Background;

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
