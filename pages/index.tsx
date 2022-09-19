import React from "react";
import Link from "next/link";

export default function Home({}) {
  return (
    <>
      <Link href={"/map"}>지도로 가는 버튼</Link>
    </>
  );
}
