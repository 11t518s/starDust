import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Qr from "./_components/QR";
import DustInfo from "./_components/DustInfo";
import { dustApi } from "../../apis/dust";
import { catchProgress, CatchProgress } from "../../apis/dust/types";
import Loading from "./_components/Loading";
import BeforeStart from "./_components/BeforeStart";
import Finish from "./_components/Finish";

const Catch = () => {
  const NaverMap = dynamic(() => import("./_components/NaverMap"));
  // TODO 추후 recoil로 이전
  const [catchStatus, setCatchStatus] = useState<catchProgress>(
    CatchProgress.loading
  );

  const handleCatchDust = async () => {
    await dustApi.getMyCacheProgress("1");
  };

  const handleFinish = async () => {
    await dustApi.finishMyCatchProgress("1");
  };

  useEffect(() => {
    handleCheckStatus();
  }, []);

  if (catchStatus === CatchProgress.loading) {
    return <Loading />;
  }

  if (catchStatus === CatchProgress.BeforeStart) {
    return <BeforeStart setCatchStatus={setCatchStatus} />;
  }

  if (catchStatus === CatchProgress.Finish) {
    return <Finish />;
  }

  return (
    <>
      <NaverMap></NaverMap>
      <div>여기에 네이버 지도 나와야지~~</div>
      <DustInfo></DustInfo>
      <Qr></Qr>
      <button onClick={handleCatchDust}>누르면 먼지 잡음</button>
      <button onClick={handleFinish}> 이러면 마무리 </button>
    </>
  );

  async function handleCheckStatus() {
    const status = await dustApi.getMyCacheProgress("1");
    setCatchStatus(status);
  }
};

export default Catch;
