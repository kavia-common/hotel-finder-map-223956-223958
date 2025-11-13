import React, { useEffect } from 'react';
import { i18n } from '../i18n/i18n';

/**
 * PUBLIC_INTERFACE
 * Wrapper for Figma Home Page (10:441). Loads CSS and JS from /assets.
 */
export default function HomeFigmaScreen() {
  useEffect(() => {
    const scripts = [
      '/assets/app.js',
      '/assets/home-page-10-441.js',
    ].map((src) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
      return s;
    });
    return () => {
      scripts.forEach((s) => document.body.removeChild(s));
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 16 }}>
      <link rel="stylesheet" href="/assets/common.css" />
      <link rel="stylesheet" href="/assets/home-page-10-441.css" />
      <div
        id="screen_home-page_10_441"
        className="screen-container home-page-10-441"
        role="main"
        aria-label="Home Page"
        style={{ boxShadow: 'var(--shadow-soft, 0 1px 2px rgba(0,0,0,0.06))' }}
      >
        <img
          className="root-bg"
          src="/assets/figma_image_10_441.png"
          alt="Home Page Background"
        />
        <p id="el-10-485">Places</p>
        <div id="el-17-184" aria-label="Rectangle 1" />
        <div id="el-17-186" aria-label="Rectangle 2" />
        <div id="el-17-181" aria-label="ci:hamburger">
          <div className="group" aria-hidden="true">
            <div className="vector-17-183" aria-hidden="true" />
          </div>
        </div>

        <div id="el-22-202" aria-label="Frame 3">
          <div className="frame-2" aria-label="Frame 2">
            <div className="frame-1" aria-label="Frame 1">
              <div className="group-45" aria-label="Group 45">
                <img className="img-10-480" src="/assets/figma_image_10_480.png" alt="unsplash:J4Ui2ch3oRU" />
                <img className="img-10-481" src="/assets/figma_image_10_481.png" alt="unsplash:bJ__24dHcGE" />
                <img className="img-10-484" src="/assets/figma_image_10_484.png" alt="unsplash:EUpkkNip4mE" />
                <img className="img-10-483" src="/assets/figma_image_10_483.png" alt="unsplash:2VHTAW_p2UM" />

                <div className="arr-17-173" aria-label="flat-color-icons:next">
                  <div className="v-17-174" aria-hidden="true" />
                </div>
                <div className="arr-17-175" aria-label="flat-color-icons:next">
                  <div className="v-17-176" aria-hidden="true" />
                </div>
                <div className="arr-17-177" aria-label="flat-color-icons:next">
                  <div className="v-17-178" aria-hidden="true" />
                </div>
                <div className="arr-17-179" aria-label="flat-color-icons:next">
                  <div className="v-17-180" aria-hidden="true" />
                </div>

                <p className="tx-10-490">Mumbai</p>
                <p className="tx-10-491">Financial Capital of India</p>
                <p className="tx-10-492">Chennai</p>
                <p className="tx-10-493">Home of Temples</p>
                <p className="tx-10-494">Delhi</p>
                <p className="tx-10-495">Capital of India</p>
                <p className="tx-10-496">Kolkata</p>
                <p className="tx-10-497">City loved for literature</p>

                <div className="rect-22-173" aria-label="unsplash:J4Ui2ch3oRU" />
                <div className="rect-22-175" aria-label="unsplash:bJ__24dHcGE" />
                <div className="rect-22-176" aria-label="unsplash:EUpkkNip4mE" />
                <div className="rect-22-174" aria-label="unsplash:2VHTAW_p2UM" />

                <div className="arr-22-177" aria-label="flat-color-icons:next"><div className="v" aria-hidden="true" /></div>
                <div className="arr-22-183" aria-label="flat-color-icons:next"><div className="v" aria-hidden="true" /></div>
                <div className="arr-22-179" aria-label="flat-color-icons:next"><div className="v" aria-hidden="true" /></div>
                <div className="arr-22-181" aria-label="flat-color-icons:next"><div className="v" aria-hidden="true" /></div>

                <p className="tx-22-185">Mumbai</p>
                <p className="tx-22-189">Financial Capital of India</p>
                <p className="tx-22-188">Chennai</p>
                <p className="tx-22-192">Home of Temples</p>
                <p className="tx-22-186">Delhi</p>
                <p className="tx-22-190">Capital of India</p>
                <p className="tx-22-187">Kolkata</p>
                <p className="tx-22-191">City loved for literature</p>
              </div>
            </div>
          </div>
        </div>

        <div id="el-10-443" aria-label="Home Indicator">
          <div className="home-indicator-bar" aria-hidden="true" />
        </div>

        <div id="el-10-442" aria-label="Status Bar">
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

        <div id="el-10-474" aria-label="Input/Text">
          <div className="bg" aria-hidden="true" />
          <p className="placeholder">{i18n.t('copy', 'searchPlaceholder')}</p>
        </div>

        <div id="el-10-478" aria-label="bx:bx-search">
          <div className="v-10-479" aria-hidden="true" />
        </div>
        <div id="el-10-498" aria-label="ic:baseline-gps-fixed">
          <div className="v-10-499" aria-hidden="true" />
        </div>
        <div id="el-10-500" aria-label="fa-solid:bell">
          <div className="v-10-501" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
