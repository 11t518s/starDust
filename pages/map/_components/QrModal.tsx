import React, { Dispatch, SetStateAction, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import Modal from "../../../components/modal";
import { dustApi } from "../../../apis/dust";
import { Catch, dustColors } from "../../../apis/dust/types";

type Props = {
  setMyCatch: Dispatch<SetStateAction<Catch[]>>;
};

const QrModal: React.FC<Props> = ({ setMyCatch }) => {
  const [isModal, setIsModal] = useState(false);
  const [isQRReader, setIsQRReader] = useState(false);
  const [qrData, setQrData] = useState<dustColors | null>(null);

  return (
    <>
      <button onClick={handleQrReaderOpen}>
        버튼을 눌러서 먼지를 잡아주세요
      </button>
      <Modal isModal={isModal} closeModal={handleCloseModal}>
        {qrData && <button onClick={handleCatchDust}>먼지 잡기</button>}
        {isQRReader && (
          <div>
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={handleReadQrData}
              scanDelay={300}
            />
            <button onClick={test}>이거 누르면 purple 보낼거임</button>
          </div>
        )}
      </Modal>
    </>
  );
  function handleQrReaderOpen() {
    setIsQRReader(true);
    setIsModal(true);
  }

  function handleCloseModal() {
    setIsModal(false);
  }

  function handleReadQrData(
    result: Result | undefined | null,
    error: Error | undefined | null
  ) {
    if (!qrData || !result) {
      return;
    }

    setQrData("purple");
    setQrData(result.getText() as dustColors);
  }

  function test() {
    setQrData("white");
  }

  async function handleCatchDust() {
    // 여기에 파이어베이스에 먼지 잡는 로직 추가
    if (!qrData) {
      alert("먼지 잡기를 실패하셨습니다! 다시 시도해주세요");

      return;
    }

    await dustApi.catchDust("1", qrData);

    setMyCatch((prev) => [...prev, { itemId: qrData, caughtAt: new Date() }]);
    setIsQRReader(false);
    setIsModal(false);
  }
};

export default QrModal;
