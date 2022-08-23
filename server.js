const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { readdirSync } = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { info } = require('console');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
	fileUpload({
		useTempFiles: true,
	}),
);

// --------------------------deployment------------------------------

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
} else {
	app.get('/', (req, res) => {
		res.send('API is running..');
	});
}
// --------------------------deployment------------------------------

//routes
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

//database
mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
	})
	.then(() => console.log('database connected successfully'))
	.catch((err) => console.log('error connecting to mongodb', err));

app.listen(process.env.PORT || 8000, function () {
	console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
