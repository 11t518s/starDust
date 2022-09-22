import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import QrModal from "./_components/QrModal";
import DustInfo from "./_components/DustInfo";
import { dustApi } from "../../apis/dust";
import { Catch, catchProgress, CatchProgress } from "../../apis/dust/types";
import Loading from "./_components/Loading";
import BeforeStart from "./_components/BeforeStart";
import Finish from "./_components/Finish";
import Modal from "../../components/modal";
const NaverMap = dynamic(() => import("./_components/NaverMap"));

const Catch = () => {
  const [myCatch, setMyCatch] = useState<Catch[]>([]);

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
      <DustInfo myCatch={myCatch} setMyCatch={setMyCatch} />
      <QrModal setMyCatch={setMyCatch} />
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
