"use client"

import { useRef } from "react"
import Script from 'next/script'

declare global {
  interface Window {
    vw: any
  }
}

export function VWorldMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const isMapInitialized = useRef(false)

  const handleScriptLoad = () => {
    if (!mapContainer.current || !window.vw || isMapInitialized.current) {
        return;
    }

    try {
        mapContainer.current.classList.add("vw-map-ready")

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
        });
        isMapInitialized.current = true;
    } catch (e) {
        console.error("VWorld map initialization failed:", e)
        if (mapContainer.current) {
          mapContainer.current.classList.remove("vw-map-ready")
        }
    }
  }

  return (
    <>
        <Script
            src={`https://map.vworld.kr/js/apis/openapi/v2.0/openapi.js?key=${process.env.NEXT_PUBLIC_VWORLD_API_KEY}`}
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
            onError={(e) => console.error('VWorld script failed to load:', e)}
        />
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
    </>
  )
}
