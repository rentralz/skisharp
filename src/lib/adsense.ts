// The AdSense publisher ID, used only when it has AdSense's own format, so the
// ownership meta tag and the ad script are either both present or both absent.
const RAW_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "";

export const ADSENSE_PUB_ID = /^ca-pub-\d+$/.test(RAW_PUB_ID) ? RAW_PUB_ID : "";
