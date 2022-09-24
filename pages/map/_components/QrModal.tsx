import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import Modal from "../../../components/modal";
import { dustApi } from "../../../apis/dust";
import { Catch, dustColors } from "../../../apis/dust/types";

type Props = {
  setMyCatch: Dispatch<SetStateAction<Catch[]>>;
  uid: string;
};

const QrModal: React.FC<Props> = ({ setMyCatch, uid }) => {
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
              scanDelay={1000}
            />
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

  function handleReadQrData(result: Result | undefined | null) {
    result && setQrData(result.getText() as dustColors);
  }

  async function handleCatchDust() {
    if (!qrData) {
      alert("먼지 잡기를 실패하셨습니다! 다시 시도해주세요");
      setQrData(null);
      setIsModal(false);
      return;
    }

    await dustApi.catchDust(uid, qrData);

    setMyCatch((prev) => [...prev, { itemId: qrData, caughtAt: new Date() }]);
    setIsQRReader(false);
    setQrData(null);
    setIsModal(false);
  }
};

export default QrModal;
