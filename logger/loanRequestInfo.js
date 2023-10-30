const getContextData = require("../utils/getContextData");

const loanRequestInfo = async (req, message, type) => {
  try {
    const ip = req?.clientIp;
    const useragent = req?.useragent;
    const { 
      ipaddress,
      city,
      country,
      deviceType,
      browser,
      version,
      os,
      platform,
    } = getContextData(ip, useragent);
    const context = `IP ADDRESS: ${ipaddress}, CITY: ${city}, COUNTRY: ${country}, DEVICETYPE: ${deviceType}, BROWSER: ${browser}, VERSION: ${version}, OS: ${os}, PLATFORM: ${platform}`;
    return {
        context,
        message,
        type
    }

  } catch (err) {
    return {
        context: "Unavailable",
        message,
        type
    }
  }
};

module.exports = loanRequestInfo;