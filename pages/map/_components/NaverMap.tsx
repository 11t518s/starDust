import React, { useEffect, useRef, useState } from "react";
import { dustPosition } from "../../../mock/dustPositionsMock";
import { dustApi } from "../../../apis/dust";

const FIRST_CENTER_LAT = 37.496146;
const FIRST_CENTER_LNG = 126.957487;

const NaverMap = () => {
  const { naver } = window;

  const mapElement = useRef<HTMLDivElement | null>(null);

  const [myCurrentPosition, setMyCurrentPosition] = useState({
    lat: FIRST_CENTER_LAT,
    lng: FIRST_CENTER_LNG,
  });

  // 내 지금 좌표를 숭실대 가운데 어딘가로 가정
  const mapLocation = new naver.maps.LatLng(FIRST_CENTER_LAT, FIRST_CENTER_LNG);

  const mapOptions: naver.maps.MapOptions = {
    center: mapLocation,
    zoom: 16,
    zoomControl: true,
    zoomControlOptions: {
      position: naver.maps.Position.TOP_RIGHT,
    },
  };

  useEffect(() => {
    if (!mapElement.current) return;
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // 기본 지도를 그림
    const snapShotMyLocation = () =>
      navigator.geolocation.watchPosition((position) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          map,
        });
        // setMyCurrentPosition({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        // });
      });

    snapShotMyLocation();
    paintMyPosition(naver, map);
    paintDustPosition(naver, map);
    return () => {};
  }, []);

  useEffect(() => {}, [myCurrentPosition]);

  return (
    <div>
      <div
        ref={mapElement}
        style={{ width: "400px", height: "30vh" }}
        id={"map"}
      />
    </div>
  );

  /**
   * 먼지 위치 나타내는 로직
   * TODO 30초에 한번 받아오는 것으로 수정해야함
   */
  async function paintDustPosition(naver: any, map: naver.maps.Map) {
    // const dustPosition = await dustApi.getDustPosition();

    dustPosition.map((dust) => {
      const { lat, lng, imagePath } = dust;
      const dustLocation = new naver.maps.LatLng(lat, lng);

      new naver.maps.Marker({
        position: dustLocation,
        map,
        icon: "https://picsum.photos/20/20",
        // icon: imagePath,
      });
    });
  }

  /**
   * 내 위치 아이콘
   * TODO 실시간 위치 가져와야함
   */

  function paintMyPosition(naver: any, map: naver.maps.Map) {
    // const myLocation = new naver.maps.LatLng(
    //   myCurrentPosition.lat,
    //   myCurrentPosition.lng
    // );
    // new naver.maps.Marker({
    //   position: myLocation,
    //   map,
    // });
  }
};

export default NaverMap;
