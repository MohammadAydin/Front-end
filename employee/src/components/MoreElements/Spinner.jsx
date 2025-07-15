import React from "react";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";

const Spinner = ({ message, size = "w-12 h-12" }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Load Lottie Web Component script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js";
    script.type = "module";
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
      <div className="flex flex-col items-center space-y-4">
        {/* Lottie Animation */}
        <dotlottie-wc
          src="https://lottie.host/0af3c5cc-711e-43f5-95b4-12e7dd5548bb/yxZrdF4SKq.lottie"
          style={{ width: "120px", height: "120px" }}
          speed="1"
          autoplay
          loop
        ></dotlottie-wc>

        <p
          id="loading-label"
          className="text-gray-600 font-medium"
          aria-live="polite"
        >
          {message || t('accessibility.loadingContent')}
        </p>
      </div>
    </div>
  );
};

export default Spinner;
