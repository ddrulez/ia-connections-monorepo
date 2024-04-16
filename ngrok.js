const ngrok = require("ngrok");
(async function () {
  const url = await ngrok.connect({
    proto: "http", // http|tcp|tls, defaults to http
    addr: 3000, // port or network address, defaults to 80
    authtoken: "YOUR_NGROK_AUTH_TOKEN", // your authtoken from ngrok.com
  });
  console.log(`Ngrok tunnel is active: ${url}`);
})();
