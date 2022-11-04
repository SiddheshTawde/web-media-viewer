import { useState, useEffect } from "react";

const DeviceDetect = () => {
    const [isMobile, setDeviceType] = useState(false);

    useEffect(() => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
                navigator.userAgent
            )
        ) {
            setDeviceType(true);
        } else {
            setDeviceType(false);
        }
    }, []);

    return isMobile;
};

export default DeviceDetect;