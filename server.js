// Module dependencies
var http = require('http'),
		express = require('express'),
 		app = express(),
 		server = http.Server(app),
 		io = require('socket.io').listen(server),
 		bodyParser = require('body-parser'),
 		Horseman = require("node-horseman"),
 		$ = require('cheerio');

// App vars & params
// var userArray = ['2-250-A0-0085-2','2-250-A0-0124-2','2-250-A0-0296-2','2-250-A0-0364-2','2-250-A0-0416-2','2-250-A0-0441-2','2-250-A0-0481-2','2-250-A0-0581-2','2-250-A0-0603-2','2-250-A0-0684-2','2-250-A0-0717-2','2-250-A0-0822-2','2-250-A0-0902-2','2-250-A0-0903-2','2-250-A0-0932-2','2-250-A0-0937-2','2-250-A0-0962-2','2-250-A0-0966-2','2-251-46-0049-6','2-251-46-0050-0','2-251-56-0002-6','2-251-56-0003-0','2-251-56-0004-1','2-251-56-0005-2','2-251-56-0006-3','2-251-56-0007-4','2-251-56-0008-5','2-251-56-0009-6','2-251-56-0010-0','2-251-56-0013-3','2-251-56-0014-4','2-251-56-0015-5','2-251-56-0016-6','2-251-56-0017-0','2-251-56-0019-2','2-252-56-0001-6','2-252-56-0003-1','2-252-56-0004-2','2-252-56-0005-3','2-252-56-0006-4','2-252-56-0007-5','2-252-56-0008-6','2-252-56-0009-0','2-252-56-0010-1','2-252-56-0011-2','2-252-56-0012-3','2-252-56-0014-5','2-252-56-0016-0','2-252-56-0017-1','2-252-56-0018-2','2-252-56-0019-3','2-252-56-0020-4','2-252-56-0022-6','2-252-56-0023-0','2-253-46-0023-3','2-253-46-0027-0','2-253-56-0001-0','2-253-56-0002-1','2-253-56-0003-2','2-253-56-0004-3','2-253-56-0005-4','2-253-56-0006-5','2-253-56-0007-6','2-253-56-0008-0','2-256-46-0078-5','2-256-50-0008-0','2-256-50-0159-4','2-256-50-0631-0','2-256-56-0001-3','2-256-56-0002-4','2-256-56-0003-5','2-256-56-0004-6','2-256-56-0005-0','2-256-56-0006-1','2-256-56-0008-3','2-256-56-0009-4','2-256-56-0010-5','2-256-56-0011-6','2-256-56-0012-0','2-256-56-0014-2','2-256-56-0015-3','2-256-56-0016-4','2-256-56-0017-5','2-256-56-0018-6','2-256-56-0019-0','2-256-56-0020-1','2-256-56-0022-3','2-256-56-0023-4','2-256-56-0024-5','2-256-56-0026-0','2-256-56-0027-1','2-256-56-0028-2','2-256-56-0029-3','2-256-56-0030-4','2-256-56-0031-5','2-256-56-0032-6','2-256-56-0033-0','2-256-56-0034-1','2-256-56-0035-2','2-256-56-0036-3','2-256-56-0037-4','2-256-56-0038-5','2-256-56-0039-6','2-256-56-0040-0','2-256-56-0041-1','2-256-56-0042-2','2-256-56-0043-3','2-256-56-0044-4','2-256-56-0045-5','2-256-56-0046-6','2-256-56-0047-0','2-256-56-0051-4','2-256-56-0053-6','2-257-N0-0023-2','2-257-N0-0074-2','2-257-N0-0101-2','2-257-N0-0110-2','2-257-N0-0195-2','2-257-N0-0215-2','2-257-N6-0001-2','2-257-N6-0002-2','2-257-N6-0003-2','2-257-N6-0005-2','2-258-40-2805-1','2-258-40-2818-0','2-258-46-0256-3','2-258-46-0283-2','2-258-46-0288-0','2-258-46-0289-1','2-258-50-0003-4','2-258-50-0035-1','2-258-50-0047-6','2-258-50-0116-5','2-258-50-0229-6','2-258-50-0273-1','2-258-50-0384-0','2-258-50-0401-3','2-258-50-0585-5','2-258-50-0628-6','2-258-50-0644-1','2-258-50-0678-0','2-258-50-0890-2','2-258-50-1029-1','2-258-50-1052-3','2-258-50-1090-6','2-258-50-1095-4','2-258-50-1376-5','2-258-50-1441-0','2-258-50-1571-4','2-258-50-1577-3','2-258-50-1707-0','2-258-50-1784-0','2-258-50-1818-6','2-258-50-1822-3','2-258-50-1882-0','2-258-50-2037-1','2-258-50-2159-4','2-258-56-0001-5','2-258-56-0002-6','2-258-56-0003-0','2-258-56-0004-1','2-258-56-0005-2','2-258-56-0006-3','2-258-56-0007-4','2-258-56-0008-5','2-258-56-0009-6','2-258-56-0010-0','2-258-56-0011-1','2-258-56-0012-2','2-258-56-0013-3','2-258-56-0014-4','2-258-56-0015-5','2-258-56-0016-6','2-258-56-0017-0','2-258-56-0018-1','2-258-56-0019-2','2-258-56-0020-3','2-258-56-0021-4','2-258-56-0023-6','2-258-56-0024-0','2-258-56-0026-2','2-258-56-0027-3','2-258-56-0028-4','2-258-56-0029-5','2-258-56-0030-6','2-258-56-0031-0','2-258-56-0032-1','2-258-56-0033-2','2-258-56-0034-3','2-258-56-0035-4','2-258-56-0037-6','2-258-56-0038-0','2-258-56-0039-1','2-258-56-0040-2','2-258-56-0041-3','2-258-56-0042-4','2-258-56-0043-5','2-258-56-0045-0','2-258-56-0046-1','2-258-56-0047-2','2-258-56-0048-3','2-258-56-0049-4','2-258-56-0050-5','2-258-56-0051-6','2-258-56-0052-0','2-258-56-0053-1','2-258-56-0054-2','2-258-56-0055-3','2-258-56-0056-4','2-258-56-0057-5','2-258-56-0058-6','2-258-56-0061-2','2-258-56-0062-3','2-258-56-0063-4','2-258-56-0064-5','2-258-56-0065-6','2-258-56-0066-0','2-258-56-0069-3','2-258-56-0071-5','2-258-56-0072-6','2-258-56-0073-0','2-258-56-0074-1','2-258-56-0076-3','2-258-56-0077-4','2-258-56-0079-6','2-258-56-0080-0','2-258-56-0081-1','2-258-56-0082-2','2-258-56-0083-3','2-258-56-0084-4','2-258-56-0085-5','2-258-56-0086-6','2-258-56-0087-0','2-258-56-0089-2','2-258-56-0090-3','2-258-56-0091-4','2-258-56-0092-5','2-258-56-0093-6','2-258-56-0094-0','2-258-56-0095-1','2-258-56-0096-2','2-258-56-0097-3','2-258-56-0099-5','2-258-56-0100-6','2-258-56-0101-0','2-258-56-0102-1','2-258-56-0103-2','2-258-56-0104-3','2-258-56-0106-5','2-258-56-0107-6','2-258-56-0108-0','2-258-56-0109-1','2-258-56-0110-2','2-258-56-0111-3','2-258-56-0112-4','2-258-56-0113-5','2-258-56-0114-6','2-258-56-0116-1','2-258-56-0117-2','2-258-56-0118-3','2-258-56-0119-4','2-258-56-0120-5','2-258-56-0121-6','2-258-56-0122-0','2-258-56-0123-1','2-258-56-0124-2','2-258-56-0125-3','2-258-56-0126-4','2-258-56-0127-5','2-258-56-0128-6','2-258-56-0129-0','2-258-56-0130-1','2-258-56-0131-2','2-258-56-0132-3','2-258-56-0133-4','2-258-56-0134-5','2-258-56-0135-6','2-258-56-0136-0','2-258-56-0137-1','2-258-56-0138-2','2-258-56-0139-3','2-258-56-0140-4','2-258-56-0141-5','2-258-56-0142-6','2-258-56-0144-1','2-258-56-0145-2','2-258-56-0146-3','2-258-56-0148-5','2-258-56-0149-6','2-258-56-0150-0','2-258-56-0151-1','2-258-56-0152-2','2-258-56-0154-4','2-258-56-0155-5','2-258-56-0156-6','2-258-56-0157-0','2-258-56-0158-1','2-258-56-0159-2','2-258-56-0161-4','2-258-56-0162-5','2-258-56-0163-6','2-258-56-0165-1','2-258-56-0167-3','2-258-56-0169-5','2-258-56-0170-6','2-258-56-0171-0','2-258-56-0172-1','2-258-56-0173-2','2-258-56-0174-3','2-258-56-0175-4','2-258-56-0183-5','2-258-56-0188-3','2-259-40-0027-3','2-259-56-0001-6','2-259-56-0003-1'];
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
			console.log(i, arr.length);
			horseman = new Horseman();

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
			console.log(arr);
			horseman = new Horseman();

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

								//console.log(html);
								var jQuery = $.load(html);
								console.log('findNotesAndPush : '+$(html).find("input[value='C'], input[value='I']").length);
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


											console.log('copy : '+ copy);
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

														// user[2] += $(html).find("input[value='I']").length;
														// user[2] += $(html).find("input[value='C']").length;
														findNotesAndPush(html);


														if(j < pages*2){
															j++;
															getNotesOnPage();

														}
														else if( j === pages*2){

															//console.log('data ready : ', copies);
															io.emit('list notes ready', { copies : copies, name : name});
															horseman
																.viewport(800,600)
																.screenshot('last-step.png')
																.type('[name="F3_19"]', 'BYE')
																.click('[name="DFH_ENTER"]')
																.waitForNextPage()
																.close();
															i++;
															if(i === userArray.length){

															}

														}
													});

									};
					//console.info('get note on first page for user :'+userID.join('-'));
					// user[2] += $(html).find("input[value='I']").length;
					// user[2] += $(html).find("input[value='C']").length;
					findNotesAndPush(html);

					j++;
					//console.log(html);
					getNotesOnPage();










			  });
		},

		horsemanCloseSession = function () {

			horseman = new Horseman();

			horseman
			  .open(url)
				// LOG
			  .type('[name="tdsmon"]', log.mon)
				.type('[name="tdsuser"]', log.pass)
				.type('[name="tdspasswd"]', log.pass)
				.click('[name="DFH_ENTER"]')
				.waitForNextPage()
				// GAEL Home | OK
				.type('[name="F14_1"]', 'BYE')
				.type('[name="F3_19"]', 'BYE')
				.type('[name="F3_15"]', 'BYE')
				.click('[name="DFH_ENTER"]')
				.waitForNextPage()
				.html()
				.then(function(html){
					console.log(html);
					horseman.close();
					console.info('GAEL Session closed');
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
  res.sendFile("/index.html");
});

app.post('/', function(req, res) {
    userArray = req.body.userArray;
		console.info('Request started with : ', userArray);
		userArray = userArray.split(' ');
		i = 0;
		data = [];
		horsemanIterate(userArray);
});
app.get("/userList", function (req, res) {

	res.sendFile(publicDir+"/list-all-users.html");

});
app.post('/closeSession', function(req, res) {
		horsemanCloseSession();
		//res.sendFile("/index.html");
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
server.listen(1234);
