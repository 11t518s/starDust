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
import Background from "../../components/Background";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import images from "../../assets/images";

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
    const subscribe = authApi.Auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUid(user.uid);
        const status = await dustApi.getMyCacheProgress(user.uid);
        setCatchStatus(status);
      } else {
        await router.push("/login");
        alert("로그인 하고 사용할 수 있습니다!");
      }
    });
    return () => {
      subscribe();
    };
  }, []);

  useEffect(() => {
    if (myCatch.length >= 5) {
      handleFinish();
    }
  }, [myCatch]);

  return (
    <>
      <Background>
        {!uid ? (
          <Loading />
        ) : (
          <>
            {catchStatus === CatchProgress.loading && <Loading />}
            {catchStatus === CatchProgress.BeforeStart && (
              <BeforeStart setCatchStatus={setCatchStatus} uid={uid} />
            )}
            {catchStatus === CatchProgress.Finish && <Finish />}

            <MapContentContainer>
              <NaverMap />
              <DustInfo myCatch={myCatch} setMyCatch={setMyCatch} uid={uid} />
              <QrModal setMyCatch={setMyCatch} uid={uid} />
              <RankContainer>
                <Link href={"rank"}>
                  <Image
                    src={images.rank}
                    alt={"rank"}
                    width={119}
                    height={45}
                  />
                </Link>
              </RankContainer>
            </MapContentContainer>
          </>
        )}
      </Background>
    </>
  );

  async function handleFinish() {
    const progress = await dustApi.getMyCacheProgress(uid);
    if (progress !== CatchProgress.Finish) {
      await dustApi.finishMyCatchProgress(uid);
    }
    setCatchStatus(CatchProgress.Finish);
  }
};

export default Catch;

const MapContentContainer = styled.div`
  margin: 0 auto;
`;

const RankContainer = styled.div`
  position: absolute;
  cursor: pointer;
  left: 10px;
  z-index: 1002;
  bottom: 100px;
`;
