const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(express.urlencoded());

mongoose.connect('mongodb://mongo/rossmann', { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
	name: String,
	password: String,
	email: String
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname + '/add.html')));

app.post('/add', async (req, res) => {
	const { name, password, email } = req.body;
	await User.create({ name, password, email });
	res.redirect('/add');
});

app.get('/users', async (req, res) => {
	const users = await User.find({});

	const content = users.reduce((render, user) => {
		render += `<tr><td>${user.name}</td><td>${user.password}</td><td>${user.email}</td></tr>`;
		return render;
	}, '');

	const table = `<table border="1">${content}</table>`;
	res.send(table);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
