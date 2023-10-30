const geoip = require("geoip-lite");

const getContextData = (ip, useragent) => {
  const ipaddress = ip;
  const location = geoip.lookup(ip) || false;
  const city = location.city || "Unknown";
  const country = location.country || "Unknown";
  const isMobile = useragent.isMobile || false;
  const isDesktop = useragent.isDesktop || false;
  const isTablet = useragent.isTablet || false;
  const browser = useragent.browser || "Unknown";
  const version = useragent.version || "Unknown";
  const os = useragent.os || "Unknown";
  const platform = useragent.platform || "Unknown";
  const deviceType = isMobile
    ? "Mobile"
    : isDesktop
    ? "Desktop"
    : isTablet
    ? "Tablet"
    : "Unknown";

  return {
    ipaddress,
    city,
    country,
    deviceType,
    browser,
    version,
    os,
    platform,
  };
};

module.exports = getContextData;