import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DustPositionType } from "../../../apis/dust/types";
import { adminApi } from "../../../apis/admin";

const DustInfo = () => {
  const [dustPosition, setDustPosition] = useState<DustPositionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetDustPosition();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>저장하는 중입니당</div>
      ) : (
        <ul>
          {dustPosition.map((dust, index) => (
            <li key={`${index}_${dust.imagePath}`}>
              <Image
                alt={"먼지 이미지"}
                src={dust.imagePath}
                width={100}
                height={100}
              />
              <div>
                먼지 위치 {dust.lat}, {dust.lng}
              </div>

              <button onClick={() => handleUpdateDust(dust.id)}>
                먼지 위치 바꾸기
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  async function handleUpdateDust(dustId: DustPositionType["id"]) {
    setIsLoading(true);

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          await adminApi.updateDustInfo(
            dustId,
            position.coords.latitude,
            position.coords.longitude
          );
          setIsLoading(false);
          alert("성공적으로 먼지 위치를 수정했습니다!");
        });
      } else {
        alert("그,, 혹시,, 지도 허용 안했니... 다시켜서 해줘,,");
      }
    } catch (error) {
      alert("지도가 허용되지있지 않습니다!");
    }
  }

  async function handleGetDustPosition() {
    setIsLoading(true);
    const dustInfo = await adminApi.getDustPosition();
    setDustPosition(dustInfo);
    setIsLoading(false);
  }
};

export default DustInfo;
