const express = require('express');
const path = require('path');





const app = express();
const PORT = 3000;
app.listen(PORT);




app.use(express.static(path.join(__dirname, './client')));
//THE ABOVE LINE MEANS I DON'T EVEN NEED TO USE THE BELOW GET METHOD TO SERVE UP MY INDEX.HTML
// app.get('/reportGen', (req, res) => {
// 	res.sendFile(path.join(__dirname, './client/'))
// });



app.post('/reportGen', (req, res) => {
	res.send("hello, world")
})



