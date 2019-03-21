const server = require('./server');
const data = require('./data');

(async () => {
	let port;
	if (process.argv[2]) port = +process.argv[2];

	await data.init();
	server.start(port);
})();
