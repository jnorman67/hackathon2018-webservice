const port = process.env.HACKATHON_PORT
const express = require('express');
const app = express();
const showdown = require('showdown'),
      converter = new showdown.Converter();

const googleCloudAPIkey = process.env.GOOGLE_CLOUD_API_KEY;

const Sync = require('sync');
const googleTranslate = require('google-translate')(googleCloudAPIkey);

const mustache = require('mustache');

app.use(express.json());

app.get('/', (req, res) => res.send('42'));



async function translatePromise(phrase, from, to) {
	return new Promise(function(resolve) {
		googleTranslate.translate(phrase, from, to, function(err, result) {
			resolve(result.translatedText);	
		});
	});
}

var hackathon = {
	translate: async function(phrase, from, to) {
		try {
			let result = await translatePromise(phrase, from, to);
			return result;
		} catch (error) {
		}
	},
	count: function(vals) {
		return vals.length;
	},
	sum: function(vals) {
		return vals.reduce((total, v) => total + v);
	},
	avg: function(vals) {
		return vals.map(v=>v/vals.length).reduce((total,v) =>(total+v)); 
	}
}

app.post('/tagMustache', (req, res) => {
	let must = req.body.mustache,
		tags = req.body.tags;

	let view = {
		tags: tags
	};

	must = must.split('\n').join("\n");
	must = mustache.render(must, view);

	let html = converter.makeHtml(must);

	//res.send(mustache.render(html, view) + "\n");
	res.send(html + "\n");
});


app.post('/tagMarkdown', (req, res) => {
	let markdown = req.body.markdown,
		tags = req.body.tags;

	// infuse the markdown with tags
	let md = eval('`' + markdown + '`');

	res.send(converter.makeHtml(md) + "\n");
});

app.post('/tagExpression', async (req, res) => {
	let expression = req.body.expression,
		tags = req.body.tags;

	let result = await eval(expression);
	res.send(result + "\n");
});

app.listen(port, () => console.log('Hackathon is listening on port ' + port));

