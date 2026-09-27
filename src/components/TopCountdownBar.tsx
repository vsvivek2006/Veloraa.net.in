"use client";

import React, { useState, useEffect } from "react";

export default function TopCountdownBar() {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "03",
    minutes: "14",
    seconds: "55",
  });

  useEffect(() => {
    let totalSeconds = 3 * 3600 + 14 * 60 + 55;
    const interval = setInterval(() => {
      totalSeconds = totalSeconds > 0 ? totalSeconds - 1 : 3 * 3600 + 14 * 60 + 55;
      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="gta-widget gta-bar GSC-BAR-SPbbFrxoIbbs"
      style={{ backgroundColor: "#0c1832", width: "100%", position: "relative", zIndex: 90 }}
    >
      {/* Embedded styles exactly matching live site GTA app */}
      <style>{`
        .gta-widget.GSC-BAR-SPbbFrxoIbbs {
          --gta-banner-desktop-ratio: 100%;
          --gta-banner-mobile-ratio: 100%;
          --gta-banner-justify-content: center;
          --gta-banner-align-items: center;
          --gta-content-direction: row;
          --gta-content-wrap: wrap;
          --gta-content-desktop-width: 400px;
          --gta-content-mobile-width: 100%;
          --gta-content-desktop-gap: 24px;
          --gta-content-mobile-gap: 6px;
        }
        .gta-content__container.GSC-BAR-SPbbFrxoIbbs {
          display: grid;
          grid-template-columns: 40px 1fr 40px;
          background-color: #0c1832;
        }
        .gta-content__wrap.GSC-BAR-SPbbFrxoIbbs {
          display: flex;
          flex-flow: var(--gta-content-direction) var(--gta-content-wrap);
          justify-content: center;
          align-items: center;
          gap: var(--gta-content-desktop-gap);
          padding: 8px 28px;
        }
        .gta-content__bar-texts.GSC-BAR-SPbbFrxoIbbs {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: 0;
          text-align: center;
        }
        .gta-timer__wrapper {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 0;
          overflow: visible;
          direction: ltr;
        }
        .gta-timer__unit {
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
          width: 60px;
          max-width: 60px;
          overflow: hidden;
        }
        .gta-timer__unit-number {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1;
          text-align: center;
          letter-spacing: 0;
          margin: 0;
          display: block;
        }
        .gta-timer__unit-label {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1.4;
          display: block;
          text-align: center;
        }
        .gta-timer__separator {
          font-family: serif;
          font-size: 22px;
          color: #ebebeb;
          padding-bottom: 8px;
          line-height: 1;
          margin: 0 2px;
        }
        .gta-content__close-btn {
          background-color: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          width: 16px;
          height: 16px;
          line-height: 0 !important;
          transition: all .2s;
        }
        .gta-content__close-btn > svg { width: 16px; height: 16px; }
        .gta-content__close-btn:hover { transform: rotate(90deg); filter: opacity(.7); }
      `}</style>

      <div className="gta-content__container GSC-BAR-SPbbFrxoIbbs">
        {/* Left spacer for close button balance */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>&nbsp;</div>

        {/* Center: text + timer */}
        <div className="gta-content__wrap GSC-BAR-SPbbFrxoIbbs">
          {/* Announcement text */}
          <div className="gta-content__bar-texts GSC-BAR-SPbbFrxoIbbs">
            3rd Anniversary Sale is Live! &nbsp;Price Increases in 🔥
          </div>

          {/* Timer */}
          <div className="gta-timer__wrapper">
            <div className="gta-timer__unit">
              <span className="gta-timer__unit-number">{timeLeft.days}</span>
              <span className="gta-timer__unit-label">Days</span>
            </div>
            <span className="gta-timer__separator">:</span>
            <div className="gta-timer__unit">
              <span className="gta-timer__unit-number">{timeLeft.hours}</span>
              <span className="gta-timer__unit-label">Hours</span>
            </div>
            <span className="gta-timer__separator">:</span>
            <div className="gta-timer__unit">
              <span className="gta-timer__unit-number">{timeLeft.minutes}</span>
              <span className="gta-timer__unit-label">Minutes</span>
            </div>
            <span className="gta-timer__separator">:</span>
            <div className="gta-timer__unit">
              <span className="gta-timer__unit-number">{timeLeft.seconds}</span>
              <span className="gta-timer__unit-label">Seconds</span>
            </div>
          </div>
        </div>

        {/* Right: close button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button
            className="gta-content__close-btn"
            onClick={() => setVisible(false)}
            aria-label="Close"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M14 2L2 14M14 14L2 2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
