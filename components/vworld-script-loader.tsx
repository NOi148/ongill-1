"use client"

import Script from 'next/script'

// window 객체에 initMap이 있을 수 있음을 TypeScript에 알려줍니다.
declare global {
    interface Window {
      initMap?: () => void
    }
}

export function VWorldScriptLoader() {
  return (
    <Script
      strategy="beforeInteractive"
      src={`https://map.vworld.kr/js/webglMapInit.js.do?version=3.0&apiKey=${process.env.NEXT_PUBLIC_VWORLD_API_KEY}`}
      onLoad={() => {
        // 스크립트 로드가 완료되면 전역 initMap 함수를 호출합니다.
        if (window.initMap) {
          window.initMap()
        }
      }}
    />
  )
}
