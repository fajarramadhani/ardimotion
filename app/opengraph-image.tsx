import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ARDI MOTION Cinematic Visual Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A1A1A",
          color: "#DDE5D1",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3 }}>
          <span>ARDI MOTION</span>
          <span style={{ color: "#B7FF00" }}>CINEMATIC VISUAL STUDIO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 90, fontWeight: 700, lineHeight: 0.92 }}>
          <span>CHARACTER,</span>
          <span>SET IN MOTION.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
          <span>Automotive / Product / Post-production</span>
          <span>FRAME 001</span>
        </div>
      </div>
    ),
    size,
  );
}
