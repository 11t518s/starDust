import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { authApi } from "../../apis/auth";
import { dustApi } from "../../apis/dust";
import Background from "../../components/Background";
import styled from "@emotion/styled";
import Logo from "../../components/Logo";
import { CatchProgress } from "../../apis/dust/types";

const Index = () => {
  const router = useRouter();

  const [nickname, setNickname] = useState("");

  const [phoneNumber, setPhoneNumber] = useState<number | string>("");
  const [isConfirmCodeMode, setIsConfirmCodeMode] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <Background>
      <Logo />
      <form>
        <PhoneNumberAndNickname>
 
          <CustomLabel>
            input your <YellowText> nickname</YellowText>
          </CustomLabel>
          <CustomInput value={nickname} onChange={handleNicknameChange} />

      <CustomLabel>
            input your <YellowText> phone number</YellowText>
          </CustomLabel>
          <CustomInput
            value={phoneNumber || ""}
            type={"number"}
            onChange={handlePhoneNumberChange}
          />


          <CustomClickButton
            id={"signIn"}
            disabled={isConfirmCodeMode}
            onClick={handleSubmitPhoneNumber}
          >
            Login {">"}
          </CustomClickButton>
        </PhoneNumberAndNickname>
        {isConfirmCodeMode ? (
          <>
            <CustomInput value={confirmCode} onChange={handleConfirmCode} />
            <button
              disabled={isSubmit}
              id={"conformCode"}
              onClick={handleSubmitConfirmCode}
            >
              인증번호 확인하기
            </button>
          </>
        ) : null}
      </form>
    </Background>
  );
  function handlePhoneNumberChange(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();

    setPhoneNumber(e.currentTarget.value);
  }

  function handleNicknameChange(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setNickname(e.currentTarget.value);
  }

  function handleConfirmCode(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setConfirmCode(e.currentTarget.value);
  }

  async function handleSubmitPhoneNumber(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (Number(phoneNumber) === 0) {
      alert("핸드폰 번호를 바르게 입력해주세요");
      return;
    }
    if (nickname === "기본닉네임") {
      alert("닉네임을 변경해주세요!");
      return;
    }
    setIsConfirmCodeMode(true);

    const { result } = await authApi.signIn(phoneNumber, nickname);
    if (!result) {
      alert(
        "핸드폰 번호를 잘 못 입력하셨습니다! 해당 오류가 지속적으로 발생하면 운영진에게 문의해주세요  "
      );
      return;
    }
  }

  async function handleSubmitConfirmCode(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    setIsSubmit(true);
    const { result } = await authApi.confirmSignIn(confirmCode);
    if (result) {
      const user = authApi.getCurrentUser();
      // TODO 여기서 이미 했는지 안했는지 체크

      if (user) {
        const catchProgress = (await dustApi.getMyCatchDoc(user.uid)).get(
          "catchProgress"
        );

        if (!catchProgress) {
          await dustApi.setInitialCatchInfo(user.uid, phoneNumber, nickname);
        }

        await router.push("/map");
      }
    } else {
      alert("코드 인증에 실패했습니다!");
      router.reload();
    }
  }

  async function checkLogin(){}
};

export default Index;

const PhoneNumberAndNickname = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomInput = styled.input`
  background: transparent;
  padding: 10px;
  border-width: 2px;
  border-color: #f9e219;
  margin: 0 30px;
`;

const CustomLabel = styled.label`
  margin-left: 30px;
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  color: white;
`;

const YellowText = styled.p`
  margin-left: 8px;
  color: #f9e219;
`;

const CustomClickButton = styled.button`
  background-color: transparent;
  border-width: 0;
  color: #f9e219;
  font-family: "NeoDunggeunmo";
  font-size: 1.6rem;
  margin-top: 30px;
  cursor: pointer;
`;
