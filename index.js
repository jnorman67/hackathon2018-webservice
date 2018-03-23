const port = process.env.HACKATHON_PORT
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('42'));


var hackathon = {
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

app.post('/tagExpression', (req, res) => {
	let expression = req.body.expression,
		tags = req.body.tags;

	let result = eval(expression);

	res.send(result + "\n");
});

app.listen(port, () => console.log('Hackathon is listening on port ' + port));

