import React, { useEffect, useRef, useState } from "react";

const Catch = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [myCurrentPosition, setMyCurrentPosition] = useState({
    lat: 37.496146,
    lng: 126.957487,
  });

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      console.log(position);
      setMyCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.

    paintDustPosition();
  }, []);

  return (
    <>
      <div>여기에 네이버 지도 나와야지~~</div>
      <div
        ref={mapElement}
        style={{ width: "500px", height: "500px" }}
        id={"map"}
      ></div>
    </>
  );

  function paintDustPosition() {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(
      myCurrentPosition.lat,
      myCurrentPosition.lng
    );

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      background: "#333333",
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
      icon: "https://picsum.photos/20/20",
      //     {
      //   url: "https://picsum.photos/250/250",
      //   size: new naver.maps.Size(30, 30),
      //   origin: new naver.maps.Point(0, 0),
      //   anchor: new naver.maps.Point(0, 0),
      // },
    });
  }
};

export default Catch;
