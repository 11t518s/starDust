import React, { useEffect, useState } from "react";
import useAsync from "../../../hooks/useAsync";
import { dustApi } from "../../../apis/dust";

import * as E from "./styles";
import { useRecoilValue } from "recoil";
import { dustPositionSelector } from "../../../state/selector";
import Image from "next/image";

const DustInfo = () => {
  const dustPosition = useRecoilValue(dustPositionSelector);
  getDustInfo();
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <E.DustContainer>
      {dustPosition.map((dust) => (
        <Image src={dust.imagePath} width={50} height={50} />
      ))}
    </E.DustContainer>
  );

  async function getDustInfo() {
    const dustInfo = await dustApi.getDustInfo();
    console.log(dustInfo);
  }
};

export default DustInfo;
