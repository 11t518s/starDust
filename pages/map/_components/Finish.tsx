import Link from "next/link";
import React from "react";
import { LoadingOverlay } from "./Loading";

const Finish = () => {
  return (
    <LoadingOverlay>
      여기도 오버레이넣고 완료됐다고 말해주기
      <Link href={"rank"}>랭킹 보러가기</Link>
    </LoadingOverlay>
  );
};

export default Finish;
