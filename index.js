var fs = require("fs");

var Random = require("random-js");
var mt = Random.engines.mt19937();

mt.seed((new Date()).getTime());

var data = fs.readFileSync("manifesto.txt", "utf8");
var words = data.split(' ');
var cache = {};

if(words.length < 3){
	console.err("Seed file too short!");
}
for(var i = 0; i < words.length - 2; i++){
	var w1 = words[i].replace(/\s/g,'');
	var w2 = words[i+1].replace(/\s/g,'');
	var w3 = words[i+2].replace(/\s/g,'');
	var key = [w1, w2];
	if(key in cache){
		cache[[w1, w2]].push(w3);
	}else{
		cache[[w1, w2]] = [w3];
	}
}

module.exports = function(size){
	var success = false;
	var output_string = "";
	while(!success){
		var seed = Math.abs(mt() % (words.length - 3));
		var w1 = words[seed];
		var w2 = words[seed + 1];
		output_string = "";
		success = true;
		for(var i = 0; i < size; i++){
			try{
				output_string += " " + w1;
				var choices = cache[[w1, w2]];
				w1 = w2;
				w2 = choices[Math.abs(mt() % choices.length)];
			}catch(err){
				success = false;
				break;
			}
		}
		if(success) output_string += " " + w2;
	}
	return output_string;
};
module.exports.seed = function(seed){
	mt.seed(seed);
};