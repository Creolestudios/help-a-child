const findIp = async () => {
  const ipAddressResponse = await fetch("https://api.ipify.org?format=json");
  const ipAddressData = await ipAddressResponse.json();
  const ipAddress = ipAddressData.ip;
  return ipAddress;
};

export { findIp };
