import { useEffect, useRef, useState } from "react";
import { dustApi } from "../../../apis/dust";
import styled from "@emotion/styled";
import { Catch } from "../../../apis/dust/types";
import { catchClause } from "@babel/types";

const FIRST_CENTER_LAT = 37.49638;
const FIRST_CENTER_LNG = 126.95788;

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);

  const [myCurrentPosition, setMyCurrentPosition] = useState({
    lat: FIRST_CENTER_LAT,
    lng: FIRST_CENTER_LNG,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { naver } = window;

    if (!mapElement.current) return;

    // 내 기본 좌표를 출제 부스 앞으로 설정

    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(FIRST_CENTER_LAT, FIRST_CENTER_LNG),
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // 기본 지도를 그림
    const snapShotMyLocation = navigator.geolocation.watchPosition(
      (position) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          map,
        });
      }
    );

    // 먼지 위치를 가져오는 로직
    paintDustPosition(naver, map);
    const dustTimer = setInterval(() => {
      paintDustPosition(naver, map);
    }, 30000);

    return () => {
      navigator.geolocation.clearWatch(snapShotMyLocation);
      clearInterval(dustTimer);
    };
  }, []);

  return (
    <NaverMapContainer>
      <NaverMapElement ref={mapElement} id={"map"} />
    </NaverMapContainer>
  );

  /**
   * 먼지 위치 나타내는 로직
   * TODO 30초에 한번 받아오는 것으로 수정해야함
   */
  async function paintDustPosition(naver: any, map: naver.maps.Map) {
    const dustPosition = await dustApi.getDustPosition();

    dustPosition.map((dust) => {
      const { lat, lng, imagePath } = dust;

      const dustLocation = new naver.maps.LatLng(lat, lng);

      new naver.maps.Marker({
        position: dustLocation,
        map,
        icon: { url: imagePath, scaledSize: new naver.maps.Size(30, 30) },
      });
    });
  }
};

export default NaverMap;

const NaverMapElement = styled.div`
  width: 100vw;
  max-width: 600px;
  height: 90vh;
`;

const NaverMapContainer = styled.div`
  margin: 0 auto;
`;
