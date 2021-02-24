var fs = require("fs");

var arguments = process.argv.splice(2);
if (arguments.length === 0) {
	console.log('missing directory name param');
	process.exit();
}

var components  = arguments[0];
var appName = '<%= appname %>'.toLocaleLowerCase();




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
// update js template
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
var vueTpl = [];
vueTpl.push("<template>");
vueTpl.push("<div class='"+components+"'>hello " + components + " component</div>");
vueTpl.push("</template>");
vueTpl.push("<script>");
vueTpl.push("export default { name:'"+components+"'}");
vueTpl.push("</script>");
vueTpl.push("<style >");
vueTpl.push("."+components+"{}");
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


writeFile ('src/components/' + components + '.vue', vueTpl);


console.log('Create component Success!');