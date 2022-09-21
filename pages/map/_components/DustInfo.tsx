import React, { useEffect, useState } from "react";
import { dustApi } from "../../../apis/dust";
import styled from "@emotion/styled";

import Image from "next/image";
import { DustPositionType } from "../../../apis/dust/types";

const DustInfo = () => {
  const [dustPosition, setDustPosition] = useState<DustPositionType[]>([]);

  useEffect(() => {
    getDustInfo();
  }, []);

  return (
    <DustContainer>
      {dustPosition.map((dust, index) => (
        <Image
          key={index}
          alt={"dustImage"}
          src={dust.imagePath}
          width={50}
          height={50}
        />
      ))}
    </DustContainer>
  );

  async function getDustInfo() {
    const data = await dustApi.getDustPosition();
    setDustPosition(data);
  }
};

export default DustInfo;

export const DustContainer = styled.ul`
  position: absolute;
  top: 0;
`;
