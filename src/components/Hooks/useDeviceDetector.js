/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

export default function useDeviceDetector() {
    function getDeviceType() {
        var deviceType = ""
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
                navigator.userAgent
            )
        ) {
            deviceType = "Mobile";
        } else {
            deviceType = "Desktop";
        }
        return {
            deviceType,
        };
    }

    const [checkDeviceType, setCheckDeviceType] = useState(getDeviceType());

    useEffect(() => {
        function handleResize() {
            setCheckDeviceType(getDeviceType);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return checkDeviceType;
};