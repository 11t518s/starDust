import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import { useRouter } from "next/router";

const DUST = "catch";

const Qr = () => {
  const router = useRouter();

  const [isQRReader, setIsQRReader] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  return (
    <>
      <button onClick={handleQrReaderOpen}>
        버튼을 눌러서 먼지를 잡아주세요
      </button>
      {qrData && <button onClick={handleCatchDust}>먼지 잡기</button>}
      {isQRReader && (
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={handleReadQrData}
        ></QrReader>
      )}
    </>
  );
  function handleQrReaderOpen() {
    setIsQRReader(true);
  }

  function handleReadQrData(
    result: Result | undefined | null,
    error: Error | undefined | null
  ) {
    if (!result) {
      return;
    }

    setQrData(result.getText());
  }
  async function handleCatchDust() {
    // 여기에 파이어베이스에 먼지 잡는 로직 추가
    setIsQRReader(false);
    if (qrData?.includes(DUST)) {
      return;
    }
    router.push(`?${qrData}`);
  }
};

export default Qr;
