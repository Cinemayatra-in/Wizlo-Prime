import React from 'react';
import { AdConfig } from '../types';

export const AdBanner: React.FC<AdConfig> = ({ width, height, placement }) => {
  // Determine Ad Key based on dimensions
  let adKey: string | null = null;
  
  if (width === 728 && height === 90) {
    adKey = '25612e5d3ad78b37ff3ce8ef2e4b67c9';
  } else if (width === 320 && height === 50) {
    adKey = '1f717fa9747ee74e080372bea43918e2';
  }

  if (adKey) {
    const srcDoc = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background-color: transparent; }</style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '${adKey}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/${adKey}/invoke.js"></script>
      </body>
      </html>
    `;

    // Special handling for 728x90 leaderboard to make it responsive via scaling
    if (width === 728 && height === 90) {
      return (
        <div className="w-full flex justify-center my-6 bg-transparent">
           {/* Desktop (>= 768px): Full Size */}
           <div className="hidden md:block" style={{ width: 728, height: 90 }}>
             <iframe
                title="ad-banner-desktop"
                width={728}
                height={90}
                srcDoc={srcDoc}
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
              />
           </div>

           {/* Tablet (640px - 767px): Scale 0.75 (approx 546px wide) */}
           <div className="hidden sm:block md:hidden relative" style={{ width: 546, height: 68 }}>
             <div className="absolute top-0 left-0 origin-top-left transform scale-75">
                <iframe
                    title="ad-banner-tablet"
                    width={728}
                    height={90}
                    srcDoc={srcDoc}
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                />
             </div>
           </div>

           {/* Mobile (< 640px): Scale 0.42 (approx 306px wide) to fit ~320px screens */}
           <div className="block sm:hidden relative" style={{ width: 306, height: 38 }}>
             <div className="absolute top-0 left-0 origin-top-left transform scale-[0.42]">
                <iframe
                    title="ad-banner-mobile"
                    width={728}
                    height={90}
                    srcDoc={srcDoc}
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                />
             </div>
           </div>
        </div>
      );
    }

    // Default for other sizes (like 320x50)
    // 320x50 fits on almost all devices naturally, so simple centering is sufficient responsiveness.
    return (
      <div className="flex justify-center my-6 overflow-hidden w-full">
        <iframe
          title={`ad-banner-${width}x${height}`}
          width={width}
          height={height}
          srcDoc={srcDoc}
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
        />
      </div>
    );
  }

  // Placeholder if no key is found or for development
  return (
    <div 
      className={`flex items-center justify-center bg-gray-50 border border-gray-100 mx-auto my-6 overflow-hidden rounded-md relative`}
      style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
    >
      <div className="text-center">
        <p className="text-[10px] text-gray-300 font-mono uppercase tracking-widest">Advertisement</p>
        <p className="text-[10px] text-gray-300">Adsterra {width}x{height}</p>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50 pointer-events-none"></div>
      </div>
    </div>
  );
};