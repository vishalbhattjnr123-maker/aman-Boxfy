/**
 * Robust video utility functions supporting:
 * - YouTube: standard watch, short youtu.be, shorts, live, embed, nocookie, and raw 11-char ID
 * - Vimeo: standard and player embeds
 * - Google Drive: file/d/ preview embeds
 * - Direct video files: MP4, WebM, MOV, OGG, M4V, HLS (.m3u8), Cloudinary, S3, Firebase, CDN
 * - Generic web video / iframe embeds
 */

export function getYouTubeId(url: string = ""): string {
    if (!url) return "";
    const cleanUrl = url.trim();

    // 1. Check if string is directly an 11-character YouTube video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
        return cleanUrl;
    }

    // 2. Match standard youtube formats including shorts, live, embed, nocookie, and query parameters
    const patterns = [
        /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+?&v=|shorts\/|live\/))([\w-]{11})/i,
        /[?&]v=([\w-]{11})/,
        /embed\/([\w-]{11})/,
    ];

    for (const pattern of patterns) {
        const match = cleanUrl.match(pattern);
        if (match && match[1] && match[1].length === 11) {
            return match[1];
        }
    }

    return "";
}

export function getGoogleDriveId(url: string = ""): string {
    if (!url) return "";
    const cleanUrl = url.trim();
    const match = cleanUrl.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
    return match && match[1] ? match[1] : "";
}

export function getVimeoId(url: string = ""): string {
    if (!url) return "";
    const cleanUrl = url.trim();
    const match = cleanUrl.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    return match && match[1] ? match[1] : "";
}

export type VideoType = "youtube" | "vimeo" | "drive" | "mp4" | "hls" | "embed" | "unknown";

export function getVideoType(url: string = ""): VideoType {
    if (!url) return "unknown";
    const cleanUrl = url.trim().toLowerCase();

    // Check for YouTube
    if (
        cleanUrl.includes("youtube.com") ||
        cleanUrl.includes("youtu.be") ||
        cleanUrl.includes("youtube-nocookie.com") ||
        getYouTubeId(url) !== ""
    ) {
        return "youtube";
    }

    // Check for Vimeo
    if (cleanUrl.includes("vimeo.com")) {
        return "vimeo";
    }

    // Check for Google Drive
    if (cleanUrl.includes("drive.google.com")) {
        return "drive";
    }

    // Check for HLS Stream
    if (cleanUrl.includes(".m3u8")) {
        return "hls";
    }

    // Check for Direct Video Files (supporting query strings from CDNs/Cloudinary/Firebase/S3)
    const directExtensions = [".mp4", ".webm", ".mov", ".m4v", ".ogg", ".mkv"];
    for (const ext of directExtensions) {
        if (cleanUrl.includes(ext)) {
            return "mp4";
        }
    }

    // Cloud storage direct video heuristics
    if (
        cleanUrl.includes("firebasestorage.googleapis.com") ||
        cleanUrl.includes("storage.googleapis.com") ||
        cleanUrl.includes("cloudinary.com") ||
        cleanUrl.includes("s3.amazonaws.com")
    ) {
        return "mp4";
    }

    // If it's a generic web embed
    if (cleanUrl.includes("/embed/") || cleanUrl.includes("player")) {
        return "embed";
    }

    // If starts with http, treat as direct or playable stream
    if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
        return "mp4";
    }

    return "unknown";
}

export function isDirectVideo(type: string): boolean {
    return type === "mp4" || type === "hls";
}

export function isIframeVideo(type: string): boolean {
    return type === "youtube" || type === "vimeo" || type === "drive" || type === "embed";
}

export interface VideoUrlOptions {
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    origin?: string;
}

export function normalizeVideoUrl(
    url: string,
    type: VideoType,
    options: VideoUrlOptions = {}
): string {
    if (!url) return "";
    const cleanUrl = url.trim();

    const {
        autoPlay = true,
        muted = false,
        controls = true,
        loop = false,
        playsInline = true,
        origin = "",
    } = options;

    if (type === "youtube") {
        const videoId = getYouTubeId(cleanUrl);
        if (!videoId) return cleanUrl;

        const params = new URLSearchParams();
        if (autoPlay) params.set("autoplay", "1");
        if (muted) params.set("mute", "1");
        params.set("controls", controls ? "1" : "0");
        params.set("rel", "0");
        params.set("modestbranding", "1");
        if (playsInline) params.set("playsinline", "1");
        params.set("iv_load_policy", "3");
        params.set("enablejsapi", "1");

        if (origin) {
            params.set("origin", origin);
        }

        if (loop) {
            params.set("loop", "1");
            params.set("playlist", videoId);
        }

        // Always use youtube-nocookie.com for maximum reliability and privacy on live domains
        return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
    }

    if (type === "vimeo") {
        const vimeoId = getVimeoId(cleanUrl);
        if (vimeoId) {
            const params = new URLSearchParams();
            if (autoPlay) params.set("autoplay", "1");
            if (muted) params.set("muted", "1");
            if (loop) params.set("loop", "1");
            if (playsInline) params.set("playsinline", "1");
            return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
        }
    }

    if (type === "drive") {
        const driveId = getGoogleDriveId(cleanUrl);
        if (driveId) {
            return `https://drive.google.com/file/d/${driveId}/preview`;
        }
    }

    return cleanUrl;
}

/**
 * Returns a high quality poster image for any movie/video, with reliable fallback
 */
export function getVideoPoster(movie: { poster?: string; backdrop?: string; videoUrl?: string }): string {
    if (movie.backdrop && !movie.backdrop.includes("placeholder")) {
        return movie.backdrop;
    }
    if (movie.poster && !movie.poster.includes("placeholder")) {
        return movie.poster;
    }

    const videoId = getYouTubeId(movie.videoUrl || "");
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    return "/images/boxfylogo-white.png";
}
