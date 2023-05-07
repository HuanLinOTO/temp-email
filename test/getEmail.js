const { getTempEmail } = require("../lib/index.js");
getTempEmail(10).then((data) => console.log(data));