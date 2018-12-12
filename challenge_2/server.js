const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// const Helper = require('./client/app.js')



const app = express();
const PORT = 3000;
app.listen(PORT);




app.use(express.static(path.join(__dirname, './client')));
//THE ABOVE LINE MEANS I DON'T EVEN NEED TO USE THE BELOW GET METHOD TO SERVE UP MY INDEX.HTML
// app.get('/reportGen', (req, res) => {
// 	res.sendFile(path.join(__dirname, './client/'))
// });


// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



app.post('/', (req, res) => {
	// console.log(req.body.message)
	res.send(`<!DOCTYPE html>
<html>
<head>
	<title>CSV Report Generator</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
	<div id="main">
		<h1>CSV Report Generator</h1>
		<form class="form-submit" action="/" method="post">
			<textarea id='text-area' name="message" rows="10" cols="30"></textarea>
			<button id="submit">Submit Form</button>
		</form>
	<div>${convert(req.body.message)}</div>
	</div>
</body>
</html>`)
})

var convert = (json) => {
	//itterate over the keys in the first object and for each key concatenate a string seperated by a space
		//if the key is 'children', then set json = children[0]

		var obj = JSON.parse(json);

		var collumnNames = '';

		for (var key in obj) {
			if (key !== 'children') {
			collumnNames += key + ' ';
			} 
		}

	
		var csv = `${collumnNames}\n`

		var inner = (data) => {

			for (var key in data) {
				if (key !== 'children') {

					csv+=data[key] + ' '

				} else if (key === 'children') {
					csv+='\n'
					data[key].forEach(ele => {
						inner(ele)
					})
				}
			}
			
			csv+='\n' 
			  
		}


		inner(obj)
		return csv;

}

//as the data comes into the server, I can parse it and then reformat the data 






