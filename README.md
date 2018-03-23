# hackathon2018-webservice

```
> export HACKATHON_PORT=3000
> npm install
> node index.js
> $curl -H "Content-Type: application/json" --data '{"tags":{"x":10,"y":[107.643, 519, 44]},"expression":"Math.log(tags.x)"}' http://localhost:3000/tagExpression
2.302585092994046
```
