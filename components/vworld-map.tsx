"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    vw: any
    initMap?: () => void // initMap이 없을 수도 있음을 타입에 명시합니다.
  }
}

export function VWorldMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const isMapInitialized = useRef(false)

  useEffect(() => {
    const initMap = () => {
      if (!mapContainer.current || isMapInitialized.current) {
        return
      }

      // 지도 컨테이너에 vw-map-ready 클래스를 추가하여 로딩 메시지를 숨깁니다.
      mapContainer.current.classList.add("vw-map-ready")
      
      try {
        new window.vw.ol3.Map(mapContainer.current.id, {
          basemapType: "street",
          control: true,
          interaction: true,
          terrain: false,
          layers: [],
          initPosition: {
            x: 126.978,
            y: 37.5665,
            z: 1000,
            tilt: 0,
            bearing: 0,
          },
        })
        isMapInitialized.current = true
      } catch (e) {
        console.error("VWorld map initialization failed:", e)
        // 실패 시 로딩 메시지를 다시 표시할 수 있습니다.
        mapContainer.current.classList.remove("vw-map-ready")
      }
    }

    // 전역 스코프에 initMap 함수를 노출시킵니다.
    window.initMap = initMap

    // VWorld API 스크립트가 이미 로드되었는지 확인합니다.
    if (window.vw) {
      initMap()
    }

    // 컴포넌트 언마운트 시 전역 함수 정리 (delete 대신 undefined 할당)
    return () => {
      window.initMap = undefined
    }
  }, [])

  return (
    // 스타일과 CSS 클래스를 사용하여 로딩 상태를 관리합니다.
    <div ref={mapContainer} id="vworld-map" className="vworld-map-container" style={{ width: "100%", height: "100%" }}>
      <div className="map-loading-message">
        <p>지도 API를 불러오는 중입니다...</p>
      </div>
      <style jsx>{`
        .vworld-map-container .map-loading-message {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .vworld-map-container.vw-map-ready .map-loading-message {
          display: none;
        }
      `}</style>
    </div>
  )
}
