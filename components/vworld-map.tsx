"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    vw: any
  }
}

export function VWorldMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [isApiReady, setApiReady] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.vw) {
        setApiReady(true)
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isApiReady && mapContainer.current && mapContainer.current.childElementCount === 0) {
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
      } catch (e) {
        console.error("VWorld map initialization failed:", e)
      }
    }
  }, [isApiReady])

  return (
    <div ref={mapContainer} id="vworld-map" style={{ width: "100%", height: "100%" }}>
      {!isApiReady && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <p>지도 API를 불러오는 중입니다...</p>
        </div>
      )}
    </div>
  )
}
