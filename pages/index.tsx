import React from "react";
import Link from "next/link";

export default function Home({}) {
  return (
    <>
      <div>
        <Link href={"/map"}>지도로 가는 버튼</Link>
      </div>

      <div>
        <Link href={"/login"}>로그인 하러가는 버튼</Link>
      </div>

      <div>
        <Link href={"/admin"}>어드민 가는 버튼</Link>
      </div>
    </>
  );
}
