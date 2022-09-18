import dynamic from "next/dynamic";
import React from "react";
import Qr from "./_components/QR";
import { dustApi } from "../../apis/dust";

const Catch = () => {
  const NaverMap = dynamic(() => import("./_components/NaverMap"));

  return (
    <>
      <NaverMap />
      <div>여기에 네이버 지도 나와야지~~</div>
      <Qr />
    </>
  );
};

export default Catch;
