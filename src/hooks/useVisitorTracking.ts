import { useEffect } from 'react';

interface VisitorTrackingOptions {
    enabled?: boolean;
    apiUrl?: string;
    educationalMode?: boolean;
}

// Get additional browser/device information
const getDeviceInfo = () => {
    const ua = navigator.userAgent;

    // Detect device type
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
    const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

    // Detect OS
    let os = 'Unknown';
    if (ua.indexOf('Win') !== -1) os = 'Windows';
    else if (ua.indexOf('Mac') !== -1) os = 'MacOS';
    else if (ua.indexOf('Linux') !== -1) os = 'Linux';
    else if (ua.indexOf('Android') !== -1) os = 'Android';
    else if (ua.indexOf('iOS') !== -1 || ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1) os = 'iOS';

    // Detect browser
    let browser = 'Unknown';
    if (ua.indexOf('Chrome') !== -1 && ua.indexOf('Edg') === -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
    else if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
    else if (ua.indexOf('Edg') !== -1) browser = 'Edge';
    else if (ua.indexOf('Opera') !== -1 || ua.indexOf('OPR') !== -1) browser = 'Opera';

    return {
        deviceType,
        os,
        browser,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack === '1',
    };
};

const getAdvancedTrackingData = () => {
    const data: any = {};

    data.fingerprint = {
        canvas: getCanvasFingerprint(),
        webgl: getWebGLFingerprint(),
        audio: 'AudioContext fingerprint available',
        fonts: getInstalledFonts(),
        plugins: getPluginsList(),
    };

    // 2. HARDWARE INFORMATION
    data.hardware = {
        cpuCores: navigator.hardwareConcurrency || 'unknown',
        deviceMemory: (navigator as any).deviceMemory || 'unknown',
        maxTouchPoints: navigator.maxTouchPoints,
        platform: navigator.platform,
    };

    // 3. NETWORK INFORMATION
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
        data.network = {
            effectiveType: connection.effectiveType, // 4G, 3G, etc.
            downlink: connection.downlink, // Mbps
            rtt: connection.rtt, // Round trip time
            saveData: connection.saveData,
        };
    }

    // 4. BATTERY STATUS (requires permission)
    data.battery = 'Requires Battery API permission';

    // 5. GEOLOCATION (requires permission)
    data.geolocation = 'Requires user permission';

    // 6. MEDIA DEVICES (cameras, microphones)
    data.mediaDevices = 'Requires permission';

    // 7. STORAGE DATA
    data.storage = {
        localStorageAvailable: typeof (Storage) !== 'undefined',
        sessionStorageAvailable: typeof (sessionStorage) !== 'undefined',
        indexedDBAvailable: typeof (indexedDB) !== 'undefined',
        cookiesAvailable: navigator.cookieEnabled,
    };

    // 8. BROWSER CAPABILITIES
    data.capabilities = {
        webGL: typeof (WebGLRenderingContext) !== 'undefined',
        webRTC: typeof (RTCPeerConnection) !== 'undefined',
        webWorkers: typeof (Worker) !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        notifications: 'Notification' in window,
        geolocation: 'geolocation' in navigator,
        bluetooth: 'bluetooth' in navigator,
        usb: 'usb' in navigator,
    };

    // 9. TIMING INFORMATION
    if (performance && performance.timing) {
        data.performance = {
            pageLoadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domReadyTime: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            networkLatency: performance.timing.responseEnd - performance.timing.fetchStart,
        };
    }

    return data;
};

// Canvas fingerprinting - creates unique ID based on how browser renders
function getCanvasFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return 'unavailable';

        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('Browser Fingerprint', 2, 15);

        return canvas.toDataURL().substring(0, 50) + '...';
    } catch (e) {
        return 'unavailable';
    }
}

// WebGL fingerprinting
function getWebGLFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
        if (!gl) return 'unavailable';

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            return {
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
            };
        }
        return 'available but limited';
    } catch (e) {
        return 'unavailable';
    }
}

// Detect installed fonts (fingerprinting technique)
function getInstalledFonts() {
    const testFonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Comic Sans MS'];
    // This is a simplified version - full implementation would test many more fonts
    return `${testFonts.length} common fonts detected`;
}

// Get browser plugins
function getPluginsList() {
    const plugins = [];
    for (let i = 0; i < navigator.plugins.length; i++) {
        plugins.push(navigator.plugins[i].name);
    }
    return plugins.length > 0 ? `${plugins.length} plugins` : 'none';
}

export const useVisitorTracking = (options: VisitorTrackingOptions = {}) => {
    const {
        enabled = true,
        // FORCE NGROK URL - Hardcoded to ensure it works on mobile
        apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/visitors',
        educationalMode = false // Enable advanced tracking for demo
    } = options;

    useEffect(() => {
        if (!enabled) return;

        const trackVisitor = async () => {
            try {
                const deviceInfo = getDeviceInfo();

                const data: any = {
                    page: window.location.pathname,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString(),
                    deviceInfo,
                    pageTitle: document.title,
                };

                // Add advanced tracking for educational/demo purposes
                if (educationalMode) {
                    data.advancedTracking = getAdvancedTrackingData();
                    // Educational warning removed as requested
                }

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (result.success) {
                    // Silently succeed
                }
            } catch (error) {
                // Fail silently to keep console clean for visitors
            }
        };

        // Track on mount
        trackVisitor();

        // Track page visibility changes
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                trackVisitor();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [enabled, apiUrl, educationalMode]);
};
