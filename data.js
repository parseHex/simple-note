const fs = require('fs');
const path = require('path');
const util = require('./util');

let data;
const p = path.resolve(__dirname, 'data.json');

function init() {
	return new Promise(function (resolve) {
		fs.readFile(p, { encoding: 'utf8' }, function (err, d) {
			if (err) {
				data = [];
			} else {
				data = JSON.parse(d);
			}
			resolve();
		});
	});
}

function get() {
	return util.clone(data);
}

async function set(newData) {
	data = util.clone(newData);
	await save();
}

function save() {
	return new Promise(function (resolve) {
		fs.writeFile(p, JSON.stringify(data), { encoding: 'utf8' }, resolve);
	});
}

module.exports = { init, get, set };
