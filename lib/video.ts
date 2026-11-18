export function getYouTubeId(url: string = ""): string {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2]?.length === 11 ? match[2] : "";
}

export function getVideoType(url: string = ""): "mp4" | "youtube" | "vimeo" | "hls" | "unknown" {
    if (!url) return "unknown";

    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) return "youtube";
    if (lowerUrl.includes("vimeo.com")) return "vimeo";
    if (lowerUrl.endsWith(".m3u8")) return "hls";
    if (lowerUrl.endsWith(".mp4") || lowerUrl.endsWith(".webm") || lowerUrl.includes("sample")) return "mp4";

    return "unknown";
}

export function isDirectVideo(type: string): boolean {
    return type === "mp4" || type === "hls";
}

export function isIframeVideo(type: string): boolean {
    return type === "youtube" || type === "vimeo";
}

export interface VideoUrlOptions {
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    loop?: boolean;
    playsInline?: boolean;
}

export function normalizeVideoUrl(
    url: string,
    type: string,
    options: VideoUrlOptions = {}
): string {
    if (!url) return "";

    const {
        autoPlay = true,
        muted = false,
        controls = true,
        loop = false,
        playsInline = true,
    } = options;

    if (type === "youtube") {
        const videoId = getYouTubeId(url);
        if (!videoId) return url;

        const params = new URLSearchParams();
        if (autoPlay) params.set("autoplay", "1");
        if (muted) params.set("mute", "1");
        params.set("controls", controls ? "1" : "0");
        params.set("rel", "0");
        params.set("modestbranding", "1");
        if (playsInline) params.set("playsinline", "1");
        params.set("iv_load_policy", "3");
        params.set("enablejsapi", "1");

        if (loop) {
            params.set("loop", "1");
            params.set("playlist", videoId);
        }

        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }

    if (type === "vimeo") {
        if (url.includes("vimeo.com/")) {
            const parts = url.split("/");
            const videoId = parts[parts.length - 1]?.split("?")[0];
            if (videoId && !url.includes("player.vimeo.com")) {
                const params = new URLSearchParams();
                if (autoPlay) params.set("autoplay", "1");
                if (muted) params.set("muted", "1");
                if (loop) params.set("loop", "1");
                return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
            }
        }
    }

    return url;
}
