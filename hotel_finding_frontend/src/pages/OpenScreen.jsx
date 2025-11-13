import React, { useEffect } from 'react';
import { i18n } from '../i18n/i18n';

/**
 * PUBLIC_INTERFACE
 * Lightweight wrapper around Figma-generated Open Page (10:33).
 * Embeds the static layout via linked CSS and images served from /assets.
 */
export default function OpenScreen() {
  useEffect(() => {
    // Attach page-specific bootstrap if present
    const script = document.createElement('script');
    script.src = '/assets/app.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 16 }}>
      {/* Include the page-specific CSS in a shadowless manner */}
      <link rel="stylesheet" href="/assets/common.css" />
      <link rel="stylesheet" href="/assets/open-page-10-33.css" />
      <div
        id="screen_open-page_10_33"
        className="screen-container open-page-10-33"
        role="main"
        aria-label="Open Page"
        style={{ boxShadow: 'var(--shadow-soft, 0 1px 2px rgba(0,0,0,0.06))' }}
      >
        <img
          className="root-bg"
          src="/assets/figma_image_10_33.png"
          alt="Open Page Background"
        />
        <p id="el-10-34">
          {i18n.t('copy', 'welcome')}
          {'\n\n'}
          {i18n.t('copy', 'appName')}
        </p>
        <div id="el-10-35" aria-label="carbon:next-outline">
          {/* Decorative vectors omitted in assets; keep placeholders */}
          <div id="el-10-36" aria-hidden="true" />
          <div id="el-10-37" aria-hidden="true" />
        </div>
        <p id="el-10-38">
          We have best in class{'\n\n'}
          Recommendations of hotels distributed in all across India.
        </p>
        <div id="el-10-316" aria-label="Status Bar">
          <p className="time">9:41 AM</p>
          <div className="right-side" aria-label="Right Side">
            <div className="battery" aria-label="Battery">
              <div className="path-1" aria-hidden="true" />
              <div className="path-2" aria-hidden="true" />
              <div className="terminal" aria-hidden="true" />
              <div className="reserve" aria-hidden="true" />
            </div>
            <p className="percent">100%</p>
            <div className="alarm" aria-label="Alarm" />
            <div className="bluetooth" aria-label="Bluetooth" />
          </div>
          <div className="left-side" aria-label="Left Side">
            <div className="mobile-signal" aria-label="Mobile Signal">
              <div className="signal" aria-hidden="true" />
            </div>
            <p className="carrier">Figma</p>
            <div className="wifi" aria-label="Wifi">
              <div className="wifi-icon" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div id="el-10-349" aria-label="Home Indicator">
          <div className="home-indicator-bar" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
