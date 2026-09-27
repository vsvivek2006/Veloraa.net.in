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
      {/* Exact live GTA widget styles */}
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
        .gta-widget.gta-bar.GSC-BAR-SPbbFrxoIbbs {
          position: relative;
          top: 0;
          bottom: unset;
          right: 0;
          left: 0;
          z-index: 90;
          width: 100%;
        }
        .gta-content__container.GSC-BAR-SPbbFrxoIbbs {
          display: grid;
          grid-template-columns: 40px 1fr 40px;
          border: initial;
          background: #0c1832;
          max-width: 100%;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
        }
        .gta-content.GSC-BAR-SPbbFrxoIbbs {
          display: flex;
          flex-flow: var(--gta-content-direction) var(--gta-content-wrap);
          gap: var(--gta-content-desktop-gap);
          box-sizing: border-box;
          padding: 8px 28px;
          justify-content: center;
          align-items: center;
          max-width: 100%;
        }
        .gta-content__bar-texts.GSC-BAR-SPbbFrxoIbbs {
          display: flex;
          flex-flow: column nowrap;
        }
        .gta-content__text.text-wwkXTmJaNiaX {
          width: auto;
          text-align: center;
          font-family: inherit;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
          text-transform: unset;
          letter-spacing: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .gta-content__timer.timer-oaUdrVXCTwMm {
          display: inline-flex;
          vertical-align: middle;
          border: unset;
          background: unset;
          width: 224px;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-backdrop-filter: none;
        }
        .gta-timer__svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .gta-timer__wrapper.timer-oaUdrVXCTwMm {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin: 0;
          padding: 0;
          direction: ltr;
          height: 100%;
        }
        .gta-timer__unit.timer-oaUdrVXCTwMm {
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
          border: unset;
          background: unset;
          width: 95px;
          text-align: center;
        }
        .gta-timer__unit-value.timer-oaUdrVXCTwMm {
          color: #ffffff;
          font-size: 60px;
          font-family: inherit;
          font-weight: 600;
          line-height: 1;
          margin: 0;
          padding: 0;
        }
        .gta-timer__unit-label.timer-oaUdrVXCTwMm {
          color: #ffffff;
          font-size: 24px;
          font-family: inherit;
          font-weight: 500;
          text-transform: unset;
          line-height: 2;
          margin: 0;
          padding: 0;
        }
        .gta-timer__separator.timer-oaUdrVXCTwMm {
          color: #ebebeb;
          padding-bottom: 5px;
          font-size: 48px;
          line-height: 1;
          font-weight: 400;
        }
        .gta-bar__close-btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
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

        @media screen and (max-width: 768px) {
          .gta-content__container.GSC-BAR-SPbbFrxoIbbs {
            grid-template-columns: 28px 1fr 28px;
          }
          .gta-content.GSC-BAR-SPbbFrxoIbbs {
            gap: var(--gta-content-mobile-gap);
            justify-content: center;
            align-items: center;
            padding: 4px 0;
          }
          .gta-content__text.text-wwkXTmJaNiaX {
            font-size: 16px;
            line-height: 1.3;
          }
          .gta-content__timer.timer-oaUdrVXCTwMm {
            width: 160px;
          }
          .gta-bar__close-btn-container {
            justify-content: flex-start;
            align-items: flex-start;
            padding: 8px 8px 0 0;
          }
        }
      `}</style>

      <div className="gta-content__container GSC-BAR-SPbbFrxoIbbs">
        {/* Left spacer for symmetry */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>&nbsp;</div>

        {/* Center: text + timer */}
        <div className="gta-content GSC-BAR-SPbbFrxoIbbs">
          {/* Announcement text */}
          <div className="gta-content__bar-texts GSC-BAR-SPbbFrxoIbbs">
            <div className="gta-content__text text-wwkXTmJaNiaX">
              3rd Anniversary Sale is Live! &nbsp;Price Increases in 🔥
            </div>
          </div>

          {/* SVG Scaled Timer — Exact 224px width x 48.375px height (total bar = 64.375px) */}
          <div className="gta-content__timer timer-oaUdrVXCTwMm">
            <svg height="100%" viewBox="0 0 500 108" preserveAspectRatio="xMinYMin meet" className="gta-timer__svg">
              <foreignObject width="99.9%" height="100%" xmlns="http://www.w3.org/1999/xhtml">
                <div className="gta-timer__wrapper timer-oaUdrVXCTwMm">
                  <div className="gta-timer__unit timer-oaUdrVXCTwMm">
                    <h4 data-timer-days="true" className="gta-timer__unit-value timer-oaUdrVXCTwMm">{timeLeft.days}</h4>
                    <div className="gta-timer__unit-label timer-oaUdrVXCTwMm">Days</div>
                  </div>
                  <div className="gta-timer__separator timer-oaUdrVXCTwMm">:</div>
                  <div className="gta-timer__unit timer-oaUdrVXCTwMm">
                    <h4 data-timer-hours="true" className="gta-timer__unit-value timer-oaUdrVXCTwMm">{timeLeft.hours}</h4>
                    <div className="gta-timer__unit-label timer-oaUdrVXCTwMm">Hours</div>
                  </div>
                  <div className="gta-timer__separator timer-oaUdrVXCTwMm">:</div>
                  <div className="gta-timer__unit timer-oaUdrVXCTwMm">
                    <h4 data-timer-minutes="true" className="gta-timer__unit-value timer-oaUdrVXCTwMm">{timeLeft.minutes}</h4>
                    <div className="gta-timer__unit-label timer-oaUdrVXCTwMm">Minutes</div>
                  </div>
                  <div className="gta-timer__separator timer-oaUdrVXCTwMm">:</div>
                  <div className="gta-timer__unit timer-oaUdrVXCTwMm">
                    <h4 data-timer-seconds="true" className="gta-timer__unit-value timer-oaUdrVXCTwMm">{timeLeft.seconds}</h4>
                    <div className="gta-timer__unit-label timer-oaUdrVXCTwMm">Seconds</div>
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        {/* Right: close button */}
        <div className="gta-bar__close-btn-container">
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
