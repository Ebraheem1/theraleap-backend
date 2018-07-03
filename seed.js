const config = require('./config/DB');
module.exports = {
	"undefined": config.DB,
	"dev": config.DB,
	"prod": config.DB
}
