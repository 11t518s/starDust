import React, { useEffect, useRef, useState } from "react";
import { DustPositionsMock } from "../../../mock/dustPositionsMock";

const NaverMap = () => {
  const { naver } = window;

  const mapElement = useRef<HTMLDivElement | null>(null);
  const [myCurrentPosition, setMyCurrentPosition] = useState({
    lat: 37.496146,
    lng: 126.957487,
  });

  const mapLocation = new naver.maps.LatLng(
    myCurrentPosition.lat,
    myCurrentPosition.lng
  );

  const mapOptions: naver.maps.MapOptions = {
    center: mapLocation,
    zoom: 16,
    zoomControl: true,
    zoomControlOptions: {
      position: naver.maps.Position.TOP_RIGHT,
    },
  };

  // mapElement가 있다고 강제
  const map =
    mapElement.current && new naver.maps.Map(mapElement.current, mapOptions);

  useEffect(() => {
    painDefaultMap();

    //

    // rePaintMyPosition();
    // return () => {
    //   clearInterval(timer);
    // };

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
  }, []);

  return (
    <div>
      <div
        ref={mapElement}
        style={{ width: "500px", height: "500px" }}
        id={"map"}
      />
    </div>
  );
  function painDefaultMap() {
    if (!map || !naver) return;
    DustPositionsMock.map((mock) => {
      const { lat, lng } = mock;
      const dustLocation = new naver.maps.LatLng(lat, lng);

      new naver.maps.Marker({
        position: dustLocation,
        map,
        icon: "https://picsum.photos/20/20",
      });
    });

    const myPosition = new naver.maps.LatLng(37.496146, 126.957487);

    new naver.maps.Marker({
      position: myPosition,
      map,
      icon: "https://picsum.photos/20/20",
    });
  }

  function rePaintMyPosition() {
    // 해당 로직으로 내 위치로 추적 가능
    const timer = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error)
      );
    }, 1000);
    return clearInterval(timer);
  }
};

export default NaverMap;
