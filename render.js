const css = `
body {
	background-color: #F5F5F5;
}
textarea {
	font-size: 14.5px;
	padding: 8px;
	line-height: 16px;
}
`;
const head = /*html*/`<head><style>${css}</style></head>`;

function home(notes) {
	const rows = [];

	for (let i = 0; i < notes.length; i++) {
		const { title, id, updated } = notes[i];
		const date = new Date(updated).toString().replace(/ gmt.+$/i, '');
		const editLink = /*html*/`<a href="/edit-note?id=${id}">Edit</a>`;
		const deleteLink = /*html*/`<a href="/delete-note?id=${id}">Delete</a>`;

		rows.push(/*html*/`
			<tr>
				<td>${title}</td>
				<td>${date}</td>
				<td>
					${editLink}
					${deleteLink}
				</td>
			</tr>
		`);
	}

	return /*html*/`
		<!doctype html>
		<html>
		${head}
		<body>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Updated Date</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					${rows.join('')}
					<tr>
						<td><a href="/new-note">Make new note</a></td>
					</tr>
				</tbody>
			</table>
		</body>
		</html>
	`;
}

function newNote() {
	return /*html*/`
		<!doctype html>
		<html>
		${head}
		<body>
			<form>
				<input
					placeholder="Note title"
					id="title"
					name="title"
					type="text"
				/>
				<br />
				<textarea
					placeholder="Note content"
					id="content"
					name="content"
					rows="35"
					cols="80"
				></textarea>
				<br />
				<button type="submit" name="save" value="1">Save</button>
			</form>
		</body>
		</html>
	`;
}

function editNote(note) {
	return /*html*/`
		<!doctype html>
		<html>
		${head}
		<body>
			<form>
				<input
					placeholder="Note title"
					id="title"
					name="title"
					type="text"
					value="${note.title}"
				/>
				<br />
				<textarea
					placeholder="Note content"
					id="content"
					name="content"
					rows="35"
					cols="80"
				>${note.content}</textarea>
				<br />
				<button type="submit" name="save" value="1">Save</button>
			</form>
		</body>
		</html>
	`;
}

module.exports = { home, newNote, editNote };
