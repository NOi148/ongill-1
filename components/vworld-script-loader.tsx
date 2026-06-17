"use client"

import Script from 'next/script'

// window 객체에 initMap이 있을 수 있음을 TypeScript에 알려줍니다.
declare global {
    interface Window {
      initMap?: () => void
    }
}

export function VWorldScriptLoader() {
  console.log("VWorldScriptLoader: 컴포넌트 렌더링됨. 스크립트 로딩 시도...");

  return (
    <Script
      strategy="beforeInteractive"
      src={`https://map.vworld.kr/js/webglMapInit.js.do?version=3.0&apiKey=${process.env.NEXT_PUBLIC_VWORLD_API_KEY}`}
      onLoad={() => {
        console.log("VWorldScriptLoader: 스크립트 로딩 성공 (onLoad 실행됨).");
        // 스크립트 로드가 완료되면 전역 initMap 함수를 호출합니다.
        if (window.initMap) {
          console.log("VWorldScriptLoader: window.initMap 함수를 찾음. 이제 호출합니다.");
          window.initMap()
        } else {
          console.error("VWorldScriptLoader: 스크립트는 로딩됐지만 window.initMap 함수를 찾을 수 없습니다!");
        }
      }}
      onError={(e) => {
        console.error("VWorldScriptLoader: VWorld 스크립트 로딩 실패.", e);
      }}
    />
  )
}
