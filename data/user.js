const mongodb = require('mongodb');
const connection = require ('./connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function addUser(user){
	const connectiondb = await connection.getConnection();
	
	//primer parámetro lo que se encripta
	//segunda parámetro (salt), número de iteraciones para hacer la encripción
	user.password = bcrypt.hashSync(user.password,8);

	const result = await connection.db('TPFinal-TP2')
		.collection('Users')
		.insertOne(user);
	
	return result;
}

async function findByCredentials(email,password){
	const connectiondb = await connection.getConnection();
	const user = await connection.db('TPFinal-TP2')
		.collection('Users')
		.findOne({email:email});
	if(!user){
		throw new Error('Usuario inexistente');
	}

	const isMatch = bcrypt.compareSync(password, user.password);

	if(!isMatch){
		throw new Error('Contraseña inválida');
	}

	return user;

}


async function generateJWT(user){
// tercer parámetro es un key de la aplicación
	const token = jwt.sign({_id: user._id, email:user.email}, 'secret123', {expiresIn: '1h'})
	return token;
}


module.exports = {addUser, findByCredentials, generateWT};