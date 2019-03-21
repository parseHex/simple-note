function clone(d) {
	return JSON.parse(JSON.stringify(d));
}

module.exports = { clone };
