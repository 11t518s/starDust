import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dustApi } from "../../../apis/dust";
import styled from "@emotion/styled";

import Image from "next/image";
import { Catch, DustPositionType } from "../../../apis/dust/types";

type Props = {
  myCatch: Catch[];
  setMyCatch: Dispatch<SetStateAction<Catch[]>>;
};

const DustInfo: React.FC<Props> = ({ myCatch, setMyCatch }) => {
  const [dustPosition, setDustPosition] = useState<DustPositionType[]>([]);
  const [isFinish, setIsFinish] = useState(false);

  const dustCatchProgress: (DustPositionType & { isCatch: boolean })[] =
    useMemo(() => {
      return dustPosition.map((dust) => {
        return myCatch.some((item) => item.itemId === dust.id)
          ? { ...dust, isCatch: true }
          : { ...dust, isCatch: false };
      });
    }, [dustPosition, myCatch]);

  useEffect(() => {
    getDustInfo();
    getMyDustCatch();
  }, []);

  useEffect(() => {
    if (dustCatchProgress.filter((item) => item.isCatch).length === 5) {
      setIsFinish(true);
    }
  }, [dustCatchProgress]);

  return (
    <>
      {isFinish && (
        <>
          <button onClick={handleFinishCatch}>
            그리고 여기 눌러서 완료하기 버튼 누르기
          </button>
          <div>완료하면 이렇게 오버레이</div>
        </>
      )}
      <DustContainer>
        {dustCatchProgress.map((dust, index) => (
          <DustItemContainer key={dust.id}>
            {dust.isCatch && <ClearDust>잡았어여</ClearDust>}
            <Image
              key={index}
              alt={"dustImage"}
              src={dust.imagePath}
              width={50}
              height={50}
            />
          </DustItemContainer>
        ))}
      </DustContainer>
    </>
  );

  async function getDustInfo() {
    const data = await dustApi.getDustPosition();
    setDustPosition(data);
  }

  async function getMyDustCatch() {
    const data = await dustApi.getMyCatches("1");
    setMyCatch(data);
  }

  async function handleFinishCatch() {
    await dustApi.finishMyCatchProgress("1");
  }
};

export default DustInfo;

const DustContainer = styled.ul`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
`;

const DustItemContainer = styled.li``;

const ClearDust = styled.div`
  z-index: 100;
  position: absolute;
`;
