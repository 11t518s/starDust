import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { authApi } from "../../apis/auth";

const Index = () => {
  const router = useRouter();

  const [nickname, setNickname] = useState("");

  const [phoneNumber, setPhoneNumber] = useState<number | string>("");
  const [isConfirmCodeMode, setIsConfirmCodeMode] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");

  return (
    <form>
      <section>
        전화번호
        <input
          value={phoneNumber || ""}
          type={"number"}
          onChange={handlePhoneNumberChange}
        />
        닉네임 <input value={nickname} onChange={handleNicknameChange} />
        <button
          id={"signIn"}
          disabled={isConfirmCodeMode}
          onClick={handleSubmitPhoneNumber}
        >
          핸드폰 번호 인증하고 게임 시작하기
        </button>
      </section>
      {isConfirmCodeMode ? (
        <section>
          <input value={confirmCode} onChange={handleConfirmCode} />
          <button id={"conformCode"} onClick={handleSubmitConfirmCode}>
            인증번호 확인하기
          </button>
        </section>
      ) : null}
    </form>
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
    const { result } = await authApi.signIn(phoneNumber, nickname);
    if (!result) {
      alert(
        "핸드폰 번호를 잘 못 입력하셨습니다! 해당 오류가 지속적으로 발생하면 운영진에게 문의해주세요  "
      );
      return;
    }

    setIsConfirmCodeMode(true);
  }

  async function handleSubmitConfirmCode(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    const { result } = await authApi.confirmSignIn(confirmCode);
    if (result) {
      await router.push("/map");
    } else {
      alert("코드 인증에 실패했습니다!");
    }
  }
};

export default Index;
