const http = require('http');
const data = require('./data');
const render = require('./render');

const server = http.createServer(async function (req, res) {
	const notes = data.get();
	const headers = {
		'content-type': 'text/html',
	};
	let resContent = '';
	let status = 200;

	const query = parseQ(req.url);

	if (req.url === '/') {
		resContent = render.home(notes);
	}
	if (req.url.includes('/delete-note')) {
		await deleteNote(query.id);
		headers.location = '/';
		status = 302;
	}
	if (req.url.includes('/edit-note')) {
		if (query.save) {
			await editNote(query.id, query.title, query.content);
			headers.location = '/';
			status = 302;
		} else {
			for (let i = 0; i < notes.length; i++) {
				if (notes[i].id === query.id) {
					resContent = render.editNote(notes[i]);
					break;
				}
				console.log("Couldn't find note id " + query.id);
			}
		}
	}
	if (req.url.includes('/new-note')) {
		if (query.save) {
			await createNote(query.title, query.content);
			headers.location = '/';
			status = 302;
		} else {
			resContent = render.newNote();
		}
	}

	res.writeHead(status, headers);
	res.write(resContent);
	res.end();
});

function parseQ(url) {
	url = url.replace(/\+/g, '%20');
	const q = {};
	const parts = url.substr(url.indexOf('?') + 1).split('&');
	for (let i = 0; i < parts.length; i++) {
		const item = parts[i].split('=').map(decodeURIComponent);
		q[item[0]] = item[1];
	}
	return q;
}

async function createNote(title, content) {
	const notes = data.get();
	const note = {
		updated: Date.now(),
		id: Math.floor(Math.random() * 1000000000000000).toString(),
		title,
		content,
	};
	notes.push(note);
	await data.set(notes);
}

async function editNote(id, title, content) {
	const notes = data.get();
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].id !== id) continue;
		notes[i].title = title;
		notes[i].content = content;
		notes[i].updated = Date.now();
	}
	await data.set(notes);
}

async function deleteNote(id) {
	const notes = data.get();
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].id !== id) continue;
		notes.splice(i, 1);
		break;
	}
	await data.set(notes);
}

function start(port = 8080) {
	server.listen(port, '0.0.0.0', function () {
		console.log('Server listening on port ' + port);
	});
}
module.exports = { start };
