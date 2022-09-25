import React, { useEffect, useState } from "react";
import Link from "next/link";
import Background from "../components/Background";
import styled from "@emotion/styled";
import Image from "next/image";
import images from "../assets/images";
import { initialText } from "../assets/InitialText";
import Logo from "../components/Logo";

export default function Home({}) {
  const [textLength, setTextLength] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomValue = Math.ceil(Math.random() * 3);

      setTextLength((v) => {
        const nextValue = v + randomValue;

        return initialText.length + 3 > nextValue
          ? nextValue
          : initialText.length;
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Background>
        <ContentContainer>
          <Logo />

          <DescriptionText>{initialText.slice(0, textLength)}</DescriptionText>
          {/*<div>*/}
          {/*  <Link href={"/map"}>지도로 가는 버튼</Link>*/}
          {/*</div>*/}

          {/*<div>*/}
          {/*  <Link href={"/admin"}>어드민 가는 버튼</Link>*/}
          {/*</div>*/}

          {/*<div>*/}
          {/*  <Link href={"/rank"}>랭킹으로 가는 버튼</Link>*/}
          {/*</div>*/}
        </ContentContainer>
      </Background>
      <LoginContainer>
        <Link href={"login"}>
          <LoginText>SKIP {">"}</LoginText>
        </Link>
      </LoginContainer>
      <Footer>SSUMC</Footer>
    </>
  );
}

const ContentContainer = styled.div`
  position: relative;
  overflow: scroll;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const DescriptionText = styled.div`
  min-width: 300px;
  width: 30vw;
  font-size: 1.8rem;
  color: white;
  white-space: break-spaces;
  word-break: break-all;
`;

const LoginContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 999;
`;

const LoginText = styled.p`
  cursor: pointer;
  color: #f9e219;
  z-index: 999;
`;

const Footer = styled.div`
  color: white;
  text-align: center;
  position: absolute;
  bottom: 20px;
  align-self: center;
  right: 0;
  left: 0;
  font-size: 1.2rem;
  z-index: 100;
`;
