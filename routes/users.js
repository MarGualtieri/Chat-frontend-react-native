var express = require('express');
var router = express.Router();
const data = require('..data/user');

router.get('/',(req,res)=>{
	res.send('respond with a resource')
});

router.post('/',async (req,res)=>{
	const result = await data.addUser(req.body);
	res.JSON(result);
});

router.post('/login', async(req,res)=>{
	try{
		const user = await data.findByCredentials(req.body.email,req.body.password);
		const token = await data.generateJWT(user);
		res.send({user,token})
	} catch (error){
		res.status(401).send(error.message);
	}


});
