const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
/*
GET obtener recursos
POST almacenar o crear un recurso
PATCH modificar una parte de un recurso
PUT modificar un recurso
DELETE borrar un recurso
*/
app.get("/",(req,res,next)=>{
	return res.status(200).send("Bienvenido al Pokedex");
});

app.post('/pokemon',(req,res,next)=>{
	return res.status(200).send(req.body);
});

app.get('/pokemon',(req,res,next)=>{
	return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})',(req,res,next)=>{
	const id = req.params.id - 1;
	if (id >= 0 && id <= 150) {
		return res.status (200).send(pokemon [req.params.id - 1]);
	}
	return res.status(404).send("Pokémon no encontrado");
});

app.get('/pokemon/:name([A-Za-z]+)',(req,res,next)=>{
	const name = req.params.name;

	const pk = pokemon.filter((p) => { 
		return(p.name.toUpperCase() == name.toUpperCase()) ? p: null;
	});

	console.log(pk);

	(pk.length > 0) ?
		res.status(200).send(pk) : 
		res.status(404).send("Pokémon no encontrado");
});

app.listen(process.env.PORT || 3000,()=>{
	console.log("Server is running...");
});