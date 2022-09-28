import Link from "next/link";
import React from "react";
import { LoadingOverlay } from "./Loading";

const Finish = () => {
  return (
    <LoadingOverlay>
      <div>먼지를 모두 잡았습니다!</div>
      <br />
      <div>
        <Link href={"rank"}>랭킹 보러가기</Link>
      </div>
    </LoadingOverlay>
  );
};

export default Finish;
