import React, { ChangeEvent, Suspense, useState } from "react";
import DustInfo from "./_components/DustInfo";

const Admin = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      {isOwner ? (
        <div>
          이제 먼지들 위치를 바꾸겠습니다
          <DustInfo />
        </div>
      ) : (
        <div>
          암호를 입력하세요
          <input onChange={(e) => handlePasswordChange(e)} />
          <input onClick={passwordSuccessChecker} type={"submit"} />
        </div>
      )}
    </>
  );
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function passwordSuccessChecker() {
    if (password === "웹웹웹") {
      setIsOwner(true);
    } else {
      alert("누구세요..? 여기 들어오시면 안돼요");
    }
  }
};

export default Admin;
