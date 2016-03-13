'use strict'

const config = {
	REDISURL: getEnv('REDISURL'),
	PORT: getEnv('PORT'),

};

function getEnv(name){
	var returnEnv = process.env[name];
	if (process.env[name] == undefined)
	{
		returnEnv = "";
	}

	return returnEnv;
}
