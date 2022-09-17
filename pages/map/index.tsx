import dynamic from "next/dynamic";
import React from "react";

const Catch = () => {
  const NaverMap = dynamic(() => import("./_components/NaverMap"));

  return (
    <>
      <NaverMap />
      <div>여기에 네이버 지도 나와야지~~</div>
      <button>qr코드 리더 오픈</button>
    </>
  );
};

export default Catch;
