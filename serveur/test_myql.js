// SET NAMES 'utf8';
// SELECT [DISTINCT] *  FROM Animal  WHERE espece='chien' AND nom IS NOT NULL ORDER BY nom DESC [LIMIT 6 OFFSET 0];

/* 
CREATE TABLE DocData(
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	titleDoc VARCHAR(50) NOT NULL,
	description TEXT,
	file VARCHAR(200) NOT NULL,
	dateCreated DATETIME NOT NULL,
	viewed SMALLINT UNSIGNED NOT NULL,
	PRIMARY KEY(id)	
) 
ENGINE=INNODB;

CREATE TABLE BadgesInfo(
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	badgeName VARCHAR(50) NOT NULL,
	description VARCHAR(200),
	PRIMARY KEY(id)	
)
ENGINE=INNODB;
INSERT INTO BadgesInfo (badgeName, quantite, description) VALUES ('Le savant fou I', 1, 'Nombre de cours mis en ligne en Physique-Chimie');

CREATE TABLE BadgesUserGet (
	id VARCHAR(30) NOT NULL,
	badgesId SMALLINT UNSIGNED NOT NULL
)
ENGINE=INNODB;
INSERT INTO BadgesUserGet (id, badgesId) VALUES ("105330073880061291661", 1);

CREATE TABLE UserInfo(
	id VARCHAR(30) NOT NULL,
	userName VARCHAR(20) NOT NULL UNIQUE,
	firstName VARCHAR(30) NOT NULL, MUL
	lastName VARCHAR(30) NOT NULL, MUL
	biography TEXT,
	profileImage VARCHAR(70),
	location VARCHAR(30),
	docInfoId SMALLINT UNSIGNED	NOT NULL UNIQUE AUTO_INCREMENT,
	timeStayed TIME NOT NULL,
	firstAuth DATETIME NOT NULL,
	PRIMARY KEY(id)
) 
ENGINE=INNODB;

CREATE TABLE UserDoc(
	id SMALLINT UNSIGNED NOT NULL,
	docId SMALLINT UNSIGNED NOT NULL,
	status CHAR(1) NOT NULL
)
ENGINE=INNODB;


CREATE TABLE ForumData (
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	titleForum VARCHAR(200) NOT NULL,
	matiere VARCHAR(30) NOT NULL,
	dateCreated DATETIME NOT NULL,
	numberOfLikes SMALLINT UNSIGNED DEFAULT 0,
	numberOfViews SMALLINT UNSIGNED DEFAULT 0,
	postedBy VARCHAR(30) NOT NULL,
	tags varchar(40),
	numberOfMessages SMALLINT UNSIGNED DEFAULT 1,
	PRIMARY KEY(id)
)
ENGINE=INNODB;
INSERT INTO ForumData (titleForum, matiere, dateCreated, numberOfLikes, numberOfViews, numberOfMessages, postedBy, tags)
VALUES ('Where is Bryan ?', 'anglais', 20021225000000, 1234, 22332, 560, '103280688525027878680', '#whereIsBryan#relou');

CREATE TABLE ForumDataID3 (
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	message TEXT,
	likes SMALLINT UNSIGNED DEFAULT 0,
	datePosted DATETIME NOT NULL,
	messageOf VARCHAR(30) NOT NULL,
	acceptedResponse CHAR(1) DEFAULT 'F',
	PRIMARY KEY(id)
)
ENGINE=INNODB;
INSERT INTO ForumDataID3 (message, likes, datePosted, messageOf,acceptedResponse)
VALUES ('Since the last update, I have seen him larking in the living room with the lowest tax pay', 3, 20201006105409, '105849368460564083929', 'T');
*/




const express = require('express'), mysql = require('mysql'), cors = require('cors');
const app = express();
const informationConnection = {host: 'localhost', user: 'root',	password: 'david13042006',	database: 'hubrium'};
const fs = require('fs');
let idUrl = 1;

const EXECUTE = (connection, res, query, uploadURL=false, sendUrlFile=false) => {
	connection.connect((err) => {
		if (err) throw err;

		connection.query(...query, (err, result) => {
			if (res !== null) {
				if (err) res.send(`You have the an ${err.code} (${err.errno}) because ${err.sqlMessage}`);
	    		else {
	    			let resultAltered = result;
	    			if (uploadURL) {
	    				let rawdata = fs.readFileSync('./file.json');
						let jason = JSON.parse(rawdata);
						jason[idUrl] = uploadURL;
						idUrl ++;
						jason = JSON.stringify(jason);
						fs.writeFileSync('./file.json', jason);
	    			}

	    			if (sendUrlFile) {
	    				let rawdata = fs.readFileSync('./file.json');
	    				let jason = JSON.parse(rawdata);

	    				res.json([resultAltered, jason ]);
	    			} else {
	    				res.json(resultAltered);
	    			}
	    			
	    		}
			}
		});
	});
}

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(cors());

app.post('/getUserInfo/:id', (req, res) => {
	const connection1 = mysql.createConnection(informationConnection);
	const donnees = req.body[0];
	let currentDate = new Date(Date.now());
	if (donnees.gJ===undefined) donnees.gJ = 'https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418_1280.jpg'
	EXECUTE(connection1, null, [`INSERT IGNORE INTO UserInfo (ID, userName, firstName, lastName, profileImage, firstAuth, timeStayed, classe, lieuEtude) VALUES (?, ?, ?, ?, ?, NOW(), 000000, 'Unk', 'Unknown')`, [donnees.xS, donnees.It, donnees.hU, donnees.dS, donnees.gJ ] ]);

	const connection2 = mysql.createConnection(informationConnection);
	EXECUTE(connection2, res, [`SELECT * FROM UserInfo WHERE id = ?`, [[req.params.id]]]);
});

app.get('/getCourseUserId/:userId', (req, res)=>{
	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT * FROM CourseData WHERE creator = ?`, [[req.params.userId]]]);
});

app.post('/getCourses', (req, res) => {
	let [queries, search] = req.body;
	if (queries===null) queries=[]
	else if (search===null) search=""

	let where = "WHERE 1=1", orderBy = ` ORDER BY MATCH(description,titleDoc,tags) AGAINST ("${search}") DESC`;

	for (let x of queries) {
		const quer = x.slice(0, -2), category = x.slice(-1);

		if (category==0) where += ` AND creator = "${quer}"`;
		else if (category==1) where += ` AND matiere = ${quer!=="all" ? `"${quer}"` : "matiere"}`
		else if (category==2) where += ` AND dateCreated > SUBDATE(NOW(), INTERVAL ${quer.replace("_"," ")})`
		else if (category==3) where += ` AND type = "${quer}"`;
		else if (category==5) orderBy += `, ${x.slice(5, -2)} DESC`;
	}

	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT CourseData.*, UserInfo.userName FROM CourseData INNER JOIN UserInfo ON UserInfo.id = CourseData.creator ${where+orderBy} LIMIT 0,15`]);
});
app.get('/getCourse/:docId', (req, res) => {
	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT * FROM CourseData WHERE id = ?`, [[req.params.docId]]], false,true);
});
app.get('/likedContent/:docId', (req, res) => {
	const connection1 = mysql.createConnection(informationConnection);
	EXECUTE(connection1, res, [`UPDATE CourseData SET liked = liked + ${req.query.like} WHERE id = ?`, [[req.params.docId]]]);

	const connection2 = mysql.createConnection(informationConnection);
	EXECUTE(connection2, null, [`UPDATE UserInfo SET courseLikes = courseLikes + 1 WHERE id = ?`, [[req.query.creatorId]]]);
});
app.get('/viewContent/:docId', (req, res) => {
	const connection1 = mysql.createConnection(informationConnection);
	EXECUTE(connection1, res, [`UPDATE CourseData SET viewed = viewed + 1 WHERE id = ?`, [[req.params.docId]]]);

	const connection2 = mysql.createConnection(informationConnection);
	EXECUTE(connection2, null, [`UPDATE UserInfo SET courseViews = courseViews + 1 WHERE id = ?`, [[req.query.creatorId]]]);
});
app.get('/getBadges', (req, res) => {
	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT * FROM BadgesInfo`]);
});
app.get('/getBadgesUser/:userId', (req, res) => {
	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT * FROM BadgesUserGet WHERE id = ?`, [req.params.userId]]);
});
app.get('/getBadgesUserGetTypes/:userId', (req, res) => {
	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT BadgesInfo.badgeName as badgeName FROM BadgesUserGet INNER JOIN BadgesInfo ON BadgesUserGet.badgesId = BadgesInfo.id WHERE BadgesUserGet.id = ?`, [req.params.userId]]);;
});
app.get('/getForums', (req, res) => {
	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT ForumData.*, UserInfo.profileImage, UserInfo.userName FROM ForumData INNER JOIN UserInfo ON ForumData.postedBy = UserInfo.ID`]);
});
app.get('/likedForum/:forumId', (req, res) => {
	const connection1 = mysql.createConnection(informationConnection);
	EXECUTE(connection1, res, [`UPDATE ForumData SET numberOfLikes = numberOfLikes + ${req.query.like} WHERE id = ?`, [[req.params.forumId]]]);
});
app.get('/getForum/:forumId', (req, res) => {
	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT * FROM ForumData WHERE id = ?`, [[req.params.forumId]]]);
});
app.get('/getPostsFromForum/:forumId', (req, res) => {
	const connection = mysql.createConnection(informationConnection);
	EXECUTE(connection, res, [`SELECT ForumDataID${req.params.forumId}.*, UserInfo.profileImage, UserInfo.userName FROM ForumDataID${req.params.forumId} INNER JOIN UserInfo ON ForumDataID${req.params.forumId}.messageOf = UserInfo.ID`]);
});
app.get('/likedMessage/:forumId', (req, res) => {
	const connection1 = mysql.createConnection(informationConnection);
	EXECUTE(connection1, res, [`UPDATE ForumDataID${req.params.forumId} SET likes = likes + ${req.query.like} WHERE id = ?`, [[req.query.messageId]]]);
});
app.post('/createDoc', (req, res) => {
	const connection = mysql.createConnection(informationConnection);

	const {title, description, URL, tags, matiere, type, creator} = req.body;
	console.log([`INSERT INTO CourseData (titleDoc, description, file, dateCreated, tags, matiere, type, creator) VALUES ("${title}", "${description}", ${idUrl}, NOW(), "${tags}", "${matiere}", "${type}", "${creator}")`]);
	EXECUTE(connection, res, [`INSERT INTO CourseData (titleDoc, description, file, dateCreated, tags, matiere, type, creator) VALUES ("${title}", "${description}", ${idUrl}, NOW(), "${tags}", "${matiere}", "${type}", "${creator}")`], uploadURL=URL);
});
app.post('/editDoc/:id', (req, res) => {
	const connection = mysql.createConnection(informationConnection);

	const {title, description, tags, matiere, docId} = req.body;
	EXECUTE(connection, res, [`UPDATE CourseData SET titleDoc = "${title}", description = "${description}", tags = "${tags}", matiere = "${matiere}" WHERE id=${docId}`]);
});
app.post('/postMessageOnForumId/:forumId', (req, res) => {
	const connection = mysql.createConnection(informationConnection);

	const {message, messageOf, forumId} = req.body;
	EXECUTE(connection, res, [`INSERT INTO ForumDataID${forumId} (message, datePosted, messageOf) VALUES ("${message}", NOW(), "${messageOf}")`]);
});

app.listen(3001);

//INSERT_VALUES(connection, 'UserInfo',  [['213123213233', 'SSSSS', 'Sarah', 'Nouvellon', 'Ok aarrete', 'https://profile.google.image/9009dwdewd', 'Haiti', 4, 123409, 20191201034500]]);
// GET_VALUES(connection, 'UserInfo', [43223452423423]); 