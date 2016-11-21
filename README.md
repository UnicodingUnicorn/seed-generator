# seed-generator

Just a simple module for generating strings of a specified size, probably for use in things like secrets for stuff like passport or oauth, from a markov generator of a seed text, in this case the Communist Manifesto. Not the most efficient or secure method by far, but fun nonetheless.

##Usage

```
var secret_generator = require("secret_generator");

//Generate
secret = secret_generator(10); //(size)

//Seed
secret_generator.seed(1479708950); //(posix timestamp/32-bit integer)
secret = secret_generator(10)
```
