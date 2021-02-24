var fs = require("fs");

var arguments = process.argv.splice(2);
if (arguments.length === 0) {
	console.log('missing directory name param');
	process.exit();
}

var page  = arguments[0];
var appName = '<%= appname %>'.toLocaleLowerCase();


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
// update js template
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
var vueTpl = [];
vueTpl.push("<template>");
vueTpl.push("<div class='"+page+"'>hello " + page + " component</div>");
vueTpl.push("</template>");
vueTpl.push("<script>");
vueTpl.push("</script>");
vueTpl.push("<style >");
vueTpl.push("."+page+"{}");
vueTpl.push("</style>");
vueTpl = vueTpl.join('\n');


function writeFile (filename, content) {
	fs.open(filename, 'w', '0644', function (e, fd) {

		if(e) throw e;

		fs.write(fd, content, function(e){
			if(e) throw e;
			fs.closeSync(fd);
		});
	});
}


writeFile ('src/views/' + page + '.vue', vueTpl);


console.log('Create component Success!');