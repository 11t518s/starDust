import React from "react";
import Image from "next/image";
import images from "../assets/images";
import styled from "@emotion/styled";
import { initialText } from "../assets/InitialText";

const Logo = () => {
  return (
    <LogoContainer>
      <Image src={images.logo} width={300} height={300} alt={"logo"} />
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  position: relative;
  margin: 0 auto;
`;
