// Module dependencies
var http = require('http'),
		express = require('express'),
 		app = express(),
		fs = require('fs'),
 		server = http.Server(app),
 		io = require('socket.io').listen(server),
 		bodyParser = require('body-parser'),
 		Horseman = require("node-horseman"),
 		$ = require('cheerio'),
		phantomjs = require('phantomjs'),
		port = process.argv[2] || 7777,
		conf = require('./data/conf.json'),
		users = require('./data/users.json');


// App vars & params
var	i = 0,
 		publicDir =  __dirname + '/public',
 		userArray,
		usersAsJson = [],
		usersNb = users.length,
 		data = [],
 		horseman,
		userID,
		pages = 0
		url = conf.url,
		log = conf.log;


// Main functions
// -- updateAndEmitProgression ==> Set new progression percent and emit as socket event
function updateAndEmitProgression (i, usersNb) {
		var percent = (parseInt(i)/parseInt(usersNb))*100;
		io.emit('update progression', { percent : percent });
}
// -- horsemanGetUser ==> Horseman instance to get user informations (name, copies)
function horsemanGetUser (arr, iterate) {
	horseman = new Horseman({
		phantomPath : phantomjs.path
	});
	 userID = arr.split('-');
 	console.info('Request started with : ', userID);
	horseman
  .on('consoleMessage', function( msg ){
    console.log(msg);
  });
	horseman
	  .open(url)
		// LOG
	  .type('[name="tdsmon"]', log.mon)
		.type('[name="tdsuser"]', log.pass)
		.type('[name="tdspasswd"]', log.pass)
		.click('[name="DFH_ENTER"]')
		.waitForNextPage()
		// GAEL Home | OK
		.type('[name="F14_1"]', 'CNED')
		.click('[name="DFH_ENTER"]')
		.waitForNextPage()
		// Choix institut | OK
		.type('[name="F7_48"]', '2')
		.click('[name="DFH_ENTER"]')
		.waitForNextPage()
		// Choix institut done | OK
		// Go to MODEL
		.type('[name="F3_14"]', 'MODEL')
		.click('[name="DFH_ENTER"]')
		.waitForNextPage()
		//  Ecran MODEL
		.type('[name="F3_42"]', userID[0])
		.type('[name="F3_45"]', userID[1])
		.type('[name="F3_49"]', userID[2])
		.type('[name="F3_52"]', userID[3])
		.type('[name="F3_57"]', userID[4])
		.click('[name="DFH_ENTER"]')
		.waitForNextPage()
		//  Ecran MODEL filled, go to NOTES
		.type('[name="F3_15"]', 'NOTES')
		.click('[name="DFH_ENTER"]')
		.waitForNextPage()
		// Ecran NOTES
		.html()
		.then(function(html){
					var j = 1,
							name = $(html).find('.line4.col57').text(),
							count = 0,
							user = [userID.join('-'), name, count],
							copies = [];
						switch(userID[1]){
							case "251":
						    pages = 2;
						    break;
							case "252":
								pages = 4;
								break;
							case "253":
								pages = 2;
								break;
							case "256":
								pages = 8;
								break;
							case "257":
								pages = 1;
								break;
							case "258":
								pages = 8;
								break;
							case "259":
								pages = 3;
								break;
						}
					if(name === ''){
						io.emit('error GAEL', { msg : 'Il y a un problème de connexion avec GAEL, êtes-vous sûr d\'avoir fermé la connexion à GAEL ?'});
					}
					var findNotesAndPush = function (html) {
						var jQuery = $.load(html);
						$(html).find("input[value='C'], input[value='I']").each(function(){
							var that = $(this),
									allClasses = that.attr('class'),
									regex = /(?:^|\W)line(\w+)(?!\w)/g,
									line = '.'+regex.exec(allClasses)[0].replace(' ', '');
								var copy = {
									arrivedDay : jQuery(line+'.col52').val(),
									arrivedMonth : jQuery(line+'.col55').val(),
									arrivedYear : jQuery(line+'.col58').val(),
									returnDay : jQuery(line+'.col65').val(),
									returnMonth : jQuery(line+'.col68').val(),
									returnYear : jQuery(line+'.col71').val(),
									note : jQuery(line+'.col28').val(),
									currentStatus : jQuery(line+'.col18').val(),
									corrId : jQuery(line+'.col39').val()
								};
								copies.push(copy);
							});
					};
					var getNotesOnPage = function () {
						horseman
							.click('[name="DFH_ENTER"]')
							.waitForNextPage()
							.html()
							.then(function (html) {
								findNotesAndPush(html);

								if(j < pages*2){
									j++;
									getNotesOnPage();

								}
								else if( j === pages*2){
									horseman
										.type('[name="F3_19"]', 'BYE')
										.click('[name="DFH_ENTER"]')
										.waitForNextPage()
										.then(function(){
											io.emit('list notes ready', { copies : copies, name : name});
											var toPush = {
												id: arr,
												name: name,
												copies: copies
											};
											usersAsJson.push(toPush);
											updateAndEmitProgression(i, users.length);
											if(iterate && i < users.length){
												horsemanGetUser('2-'+users[i][0],true);
												i++;
											}
											else {
												io.emit('list all finished');
												fs.writeFile(  __dirname + "/cache/users-"+Date.now()+".json", JSON.stringify( usersAsJson ), "utf8");
											}

										})
										.close();
								}
							});
			};
			findNotesAndPush(html);
			j++;
			getNotesOnPage();
	  });
}
// -- horsemanCloseSession ==> Helper to close GAEL session
function horsemanCloseSession () {
	horseman = new Horseman({
		phantomPath : phantomjs.path
	});

	horseman
	  .open(url)
		// LOG
	  .click('#ListSessions a')
		.waitForNextPage()
		.type('[name="tdsmon"]', log.mon)
		.type('[name="tdsuser"]', log.pass)
		.type('[name="tdspasswd"]', log.pass)
		.click('[name="DFH_ENTER"]')
		.waitForNextPage()
		.type('[name="F14_1"]', 'BYE')
		.type('[name="F3_19"]', 'BYE')
		.type('[name="F3_14"]', 'BYE')
		.type('[name="F3_15"]', 'BYE')
		.click('[name="DFH_ENTER"]')
		.waitForNextPage()
		.html()
		.then(function(html){
			console.log(html);
			horseman.close();

			console.info('GAEL Session closed');
			io.emit('gael session closed');
		})

};

// Server config & middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(publicDir));

// Server routes
app.get("/", function (req, res) {
  res.sendFile(publicDir+"/index.html");
});

// TODO: Handle post request to close session
app.post('/closeSession', function(req, res) {
		horsemanCloseSession();
		//res.sendFile("/index.html");
});
app.get('/closeSession', function(req, res) {
		horsemanCloseSession();
		res.sendFile(publicDir+"/close-session.html");
});
app.get('/usersJson', function(req, res) {
		res.send(users);
});
app.get('/listAllUsers', function(req, res) {
		i = 1;
		usersAsJson = [];
		horsemanGetUser('2-'+users[0][0], true);
		res.sendFile(publicDir+"/all-users-info.html");
});
app.post("/userInfo", function (req, res) {
	userArray = req.body.id;
	horsemanGetUser(userArray);
});
app.get("/userInfo", function (req, res) {
	userArray = req.query.id,
	asJson = req.query.json;
	res.sendFile(publicDir+"/user-info.html");
	horsemanGetUser(userArray);
});

// Server launch & listen
server.listen(port, function () {
	console.info('Gael Scraper is running on 127.0.0.1:'+port+' :)');
});
