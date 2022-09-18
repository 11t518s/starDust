import React, { useEffect, useState } from "react";
import useAsync from "../../../hooks/useAsync";
import { dustApi } from "../../../apis/dust";

const DustInfo = () => {
  const [dustInfo, refetchDustInfo] = useAsync(getDustInfo);
  return <ul></ul>;

  async function getDustInfo() {
    const dustInfo = await dustApi.getDustInfo();
  }
};

export default DustInfo;
