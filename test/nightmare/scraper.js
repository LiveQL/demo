var Nightmare = require('Nightmare');



function addingComment () { //adds a comment after liking something
	let comments = ["first time in this forum",
									"how do these dudes not drown?",
									"OMG!!!",
									"SO COOL!",
									"kelly slater grew up in florida did you know that?",
									"I like rip curl wetsuits, do you think these guys are wearing rip curl?"
									]
	// let comments = ["is that water salty?",
	// 	"these guys are talented",
	// 	"wowzers!!",
	// 	"I wonder how cold the water is",
	// 	"so funny when they fall",
	// 	"I want to surf but I live in Madison WI, I guess I'll move to palms"
	// ]
	new Nightmare({show:true})
		.goto("https://quiet-lake-84075.herokuapp.com/")
		.inject('js', 'jquery-3.3.1.min.js')
		.wait(1000)
		.click('#commentInput')
		.type('input',  comments[Math.floor(Math.random() * Math.floor(comments.length))])
		.wait(2000)
		.type('input', '\u000d') // press enter
		.wait(3000)
		.evaluate(function(){
			return "we added a comment";
		})
		.end()
		.then(function(result){
			console.log(result);
		});
}

function addReply () {
	let replys = ["i love this video!", "I've seen better, honestly", "whatever, I'm unimpressed", "i like the beach", "this inspires my surfing", "I can't believe the waves are so BIG!", "I don't like it when sand gets in my trunks", "sand feels icky!", "You are probably a boogie boarder", "boogie boarders aren't allowed in this forum! SHAME!"]
	//let replys = ["looks dangerous", "are there sharks", "I subscribe to surfer mag", "my girlfriend surf and that's awesome!", "im moving to mexico", "are these guys sponsored?", "so much water!", "and over the falls he goes!", "could you boogie board this?", "boogie boarders are just as cool...said nobody ever"]
	new Nightmare({show:true})
		.goto("https://quiet-lake-84075.herokuapp.com/")
		.inject('js', 'jquery-3.3.1.min.js')
		.wait(4000)
		.type('.comments #reply5ab445ecaa67170014e9d13b', replys[Math.floor(Math.random() * Math.floor(replys.length))])
		.wait(2000)
		.type('.comments #reply5ab445ecaa67170014e9d13b', '\u000d') // press enter
		.type('.comments #reply5ab445ecaa67170014e9d13b', replys[Math.floor(Math.random() * Math.floor(replys.length))])
		.wait(2000)
		.type('.comments #reply5ab445ecaa67170014e9d13b', '\u000d') // press enter
		.wait(3000)
		.evaluate(function(){
			return "we added a reply";
		})
		.end()
		.then(function(result){
			console.log(result);
		});
}

function likeMachine () {
	new Nightmare({show:true})
		.goto("https://quiet-lake-84075.herokuapp.com/")
		.inject('js', 'jquery-3.3.1.min.js')
		.wait(1000)
		.evaluate(() => {
			elems = document.getElementsByClassName('like-button');
			$(elems[Math.floor(Math.random() * Math.floor(elems.length))]).trigger("click")
		})
		.wait(1000)
		.evaluate(() => {
			elems = document.getElementsByClassName('like-button');
			$(elems[Math.floor(Math.random() * Math.floor(elems.length))]).trigger("click")
		})
		.wait(1000)
		.evaluate(() => {
			elems = document.getElementsByClassName('like-button');
			$(elems[Math.floor(Math.random() * Math.floor(3))]).trigger("click")
		})
		.wait(1000)
		.evaluate(() => {
			elems = document.getElementsByClassName('like-button');
			$(elems[Math.floor(Math.random() * Math.floor(3))]).trigger("click")
			return "just liked a reply";
		})
		.end()
		.then((results) => console.log(results));
}

function headlessFactory (num) {
	for (let i = 0; i <= num; i++) {
		addingComment();
		addReply();
	}
	for (let i = 0; i <= num; i++) {
		likeMachine();
	}
}

headlessFactory(2);
