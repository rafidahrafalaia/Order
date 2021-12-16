const dateFormat = require("dateformat");

module.exports = {
  mysqlDate,
};

function mysqlDate() {
  const now = new Date();
  return dateFormat(now, "yyyy-mm-dd HH:MM:ss");
}
