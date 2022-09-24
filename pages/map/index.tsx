import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import QrModal from "./_components/QrModal";
import DustInfo from "./_components/DustInfo";
import { dustApi } from "../../apis/dust";
import { Catch, catchProgress, CatchProgress } from "../../apis/dust/types";
import Loading from "./_components/Loading";
import BeforeStart from "./_components/BeforeStart";
import Finish from "./_components/Finish";
import { authApi } from "../../apis/auth";
import { useRouter } from "next/router";
const NaverMap = dynamic(() => import("./_components/NaverMap"), {
  ssr: false,
});

const Catch = () => {
  const router = useRouter();

  const [myCatch, setMyCatch] = useState<Catch[]>([]);
  const [catchStatus, setCatchStatus] = useState<catchProgress>(
    CatchProgress.loading
  );
  const [uid, setUid] = useState("");

  useEffect(() => {
    handleInitialSettings();
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
      <DustInfo myCatch={myCatch} setMyCatch={setMyCatch} uid={uid} />
      <QrModal setMyCatch={setMyCatch} uid={uid} />
      <button onClick={handleCatchDust}>누르면 먼지 잡음</button>
      <button onClick={handleFinish}> 이러면 마무리 </button>
    </>
  );
  async function handleCatchDust() {
    await dustApi.getMyCacheProgress(uid);
  }

  async function handleFinish() {
    await dustApi.finishMyCatchProgress(uid);
  }

  async function handleInitialSettings() {
    const currentUser = await authApi.getCurrentUser();
    if (!currentUser) {
      await router.push("/login");
      alert("로그인 하고 사용할 수 있습니다!");
    } else {
      setUid(currentUser.uid);
      const status = await dustApi.getMyCacheProgress(currentUser.uid);
      setCatchStatus(status);
    }
  }
};

export default Catch;
