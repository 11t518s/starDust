import React, { Dispatch, SetStateAction } from "react";
import { dustApi } from "../../../apis/dust";
import { catchProgress } from "../../../apis/dust/types";

type Props = {
  setCatchStatus: Dispatch<SetStateAction<catchProgress>>;
};

const BeforeStart: React.FC<Props> = ({ setCatchStatus }) => {
  return (
    <>
      <div>여기에 엄은 오버레이 씌우고 시작하기 버튼 넣을거임</div>
      <button onClick={handleStartCatch}> 이거 누르면 게임 시작</button>
    </>
  );
  async function handleStartCatch() {
    const changedStatus = await dustApi.startMyCatchProgress("1");
    setCatchStatus(changedStatus);
  }
};

export default BeforeStart;
