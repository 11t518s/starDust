import React, { useEffect, useRef, useState } from "react";

const Catch = () => {
  const mapElement = useRef(null);
  const [myCurrentPosition, setMyCurrentPosition] = useState({
    lat: 37.496146,
    lng: 126.957487,
  });

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    navigator.geolocation.watchPosition((position) => {
      setMyCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return (
    <>
      <div>여기에 네이버 지도 나와야지~~</div>
      <div
        ref={mapElement}
        style={{ width: "100px", height: "100px" }}
        id={"map"}
      ></div>
    </>
  );
};

export default Catch;
