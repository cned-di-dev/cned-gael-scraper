// Module dependencies
var http = require('http'),
		express = require('express'),
 		app = express(),
 		server = http.Server(app),
 		io = require('socket.io').listen(server),
 		bodyParser = require('body-parser'),
 		Horseman = require("node-horseman"),
 		$ = require('cheerio'),
		phantomjs = require('phantomjs'),
		port = 7777;

// App vars & params
var	url = 'http://dglin038.cned.org:8080/TPXJ2EE/doLogon.jsp?1240,1024',
		log = {
				mon: 'GAEL',
				pass: '8PDPTE01'
		},
		i = 0,
 		publicDir =  __dirname + '/public',
 		userArray,
 		data = [],
 		horseman,
		userID,
		pages = 0,
 		horsemanIterate = function (arr) {
			//console.log(i, arr.length);
			horseman = new Horseman({
				phantomPath : phantomjs.path
			});

			 userID = arr[i].split('-');
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
									user = [userID.join('-'), name, count];
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
							var getNotesOnPage = function () {
												console.info('get note on page '+j+' for user :'+userID.join('-'));
												horseman
													.click('[name="DFH_ENTER"]')
													.waitForNextPage()
													.html()
													.then(function (html) {

														user[2] += $(html).find("input[value='I']").length;
														user[2] += $(html).find("input[value='C']").length;

														console.log('count = '+ user[2]);
														console.log('pages = ', pages, ' - j = ', j);
														if(j < pages*2){
															console.log('line 108, j = ',j);
															j++;
															getNotesOnPage();

														}
														else if( j === pages*2){
															data.push(user);
															console.log('last notes page');
															io.emit('user found', { user : user});
															horseman
																.viewport(800,600)
																.screenshot('last-step.png')
																.type('[name="F3_19"]', 'BYE')
																.click('[name="DFH_ENTER"]')
																.waitForNextPage()
																.close();
															i++;
															if(i < userArray.length){
																console.log('horsemanIterate ',userArray, i);
																horsemanIterate(userArray);

															}
															else if(i === userArray.length){
																console.log('data ready : ', data);
																io.emit('list users ready', { data : data});
															}

														}
													});

									};
					console.info('get note on first page for user :'+userID.join('-'));
					user[2] += $(html).find("input[value='I']").length;
					user[2] += $(html).find("input[value='C']").length;

					if(name !== ''){
						j++;
						getNotesOnPage();

					}
					else {
						io.emit('error GAEL', { msg : 'Il y a un problème de connexion avec GAEL, êtes-vous sûr d\'avoir fermé la connexion à GAEL ?'});

					}









			  });
		},
		horsemanGetUser = function (arr) {
			//console.log(arr);
			horseman = new Horseman({
				phantomPath : phantomjs.path
			});

			 userID = arr.split('-');
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
												//console.info('get note on page '+j+' for user :'+userID.join('-'));
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

															io.emit('list notes ready', { copies : copies, name : name});
															horseman
																.viewport(800,600)
																.screenshot('last-step.png')
																.type('[name="F3_19"]', 'BYE')
																.click('[name="DFH_ENTER"]')
																.waitForNextPage()
																.close();
															i++;

														}
													});

									};
					findNotesAndPush(html);
					j++;
					getNotesOnPage();










			  });
		},

		horsemanCloseSession = function () {

			horseman = new Horseman({
				phantomPath : phantomjs.path
			});

			horseman
			  .open(url)
				// LOG
			  .click('a:contains("8PDPTE01")')
				.click('[name="DFH_ENTER"]')
				.waitForNextPage()
				.html()
				.then(function(html){
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
  res.redirect('/usersList');
});

app.post('/', function(req, res) {
    userArray = req.body.userArray;
		console.info('Request started with : ', userArray);
		userArray = userArray.split(' ');
		i = 0;
		data = [];
		horsemanIterate(userArray);
});
app.get("/usersList", function (req, res) {

	res.sendFile(publicDir+"/list-all-users.html");

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
app.get("/userInfo", function (req, res) {

	userArray = req.query.id;
	console.info('Request started with : ', userArray);

	res.sendFile(publicDir+"/user-info.html");
	horsemanGetUser(userArray);
});
app.post('/closeSession', function(req, res) {
		horsemanCloseSession();
		//res.sendFile("/index.html");
});
// Server launch
server.listen(port, function () {
	console.info('Gael Scraper is running on 127.0.0.1:'+port+' :)');

});
