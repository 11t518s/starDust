import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import Qr from "./_components/QR";
import DustInfo from "./_components/DustInfo";
import { authApi } from "../../apis/auth";

const Catch = () => {
  const NaverMap = dynamic(() => import("./_components/NaverMap"));

  useEffect(() => {}, []);

  return (
    <>
      <NaverMap />
      <div>여기에 네이버 지도 나와야지~~</div>
      <DustInfo />
      <Qr />
    </>
  );
};

export default Catch;
