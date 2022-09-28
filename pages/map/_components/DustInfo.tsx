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
import images from "../../../assets/images";

type Props = {
  myCatch: Catch[];
  setMyCatch: Dispatch<SetStateAction<Catch[]>>;
  uid: string;
};

const DustInfo: React.FC<Props> = ({ myCatch, setMyCatch, uid }) => {
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
      <DustContainer>
        {dustCatchProgress.map((dust, index) => (
          <DustItemContainer key={dust.id}>
            {dust.isCatch && (
              <ClearDust>
                <Image alt={"catch"} src={images.catch} />
              </ClearDust>
            )}
            <WantedDust>
              <Image
                alt={"wanted"}
                key={`${index}_${dust.id}`}
                src={images.wanted}
              />
            </WantedDust>
            <Dust>
              <Image
                key={index}
                alt={"dustImage"}
                src={dust.imagePath}
                width={50}
                height={50}
              />
            </Dust>
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
    const data = await dustApi.getMyCatches(uid);
    setMyCatch(data);
  }
};

export default DustInfo;

const DustContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  position: absolute;
  top: 20px;
  width: 80vw;
  max-width: 600px;
`;

const DustItemContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClearDust = styled.div`
  z-index: 100;
  position: absolute;
`;

const WantedDust = styled.div`
  position: absolute;
`;
const Dust = styled.div`
  margin-top: 20px;
`;
