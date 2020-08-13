const express    = require("express")
const fetch      = require("node-fetch");
const bodyParser = require('body-parser')


const app = express();
app.use( bodyParser.json() );    
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", (req, res) => {

	res.end("<h1><Hello</h1>");

});


app.post("/api/update", (req, res) => {

	// console.log(req.body);

	let githubData = req.body;

	let project = githubData.repository;
	let commits = githubData.commits;

	// console.log(project);
	// console.log(commits);

	let message = "";

	message += "-> Событие: проект обновлен \n";
	message += ("-- Проект: " + project.name + "\n");
	message += "-> Коммиты: \n";

	let i = 0;
	for (commit of commits)
	{
		let commitMessage = "";
	
		commitMessage += ("-> " + i + ": \n");
		commitMessage += ("-- Автор: " + commit.author.name + "\n");
		// commitMessage += "-- Изменения: \n";

		commitMessage += "-> Добавлены: \n";
		if (commit.added.length > 0)
			commitMessage += ("-- " + commit.added.join(", ") + "\n");
		else
			commitMessage += "-- Нет, не добавлены \n";

		commitMessage += "-> Удалены: \n";
		if (commit.removed.length > 0)
			commitMessage += ("-- " + commit.removed.join(", ") + "\n");
		else
			commitMessage += "-- Нет, не удалены \n";

		commitMessage += "-> Изменены: \n";
		if (commit.modified.length > 0)
			commitMessage += ("-- " + commit.modified.join(", ") + "\n");
		else 
			commitMessage += "-- Нет, не изменены \n";


		message += commitMessage;
		message += "\n";
	}

	// console.log(message);

	(async () => {

		// let url = "https://api.vk.com/method/"
		// 	+                    "groups.getLongPollServer"
		// 	+ "?"              + "group_id=197891018" 
		// 	+ "&access_token=" + "61aa356086d2f7a3729eb29cda2617e99a30066dbaf946751989e00fb806a0a1d680e7810372e10f63df3"
		// 	+ "&v="            + "5.122";

		// let response = await fetch(url);
		// let body = await response.json();

		// let server = body.response.server;
		// let key    = body.response.key;
		// let ts     = body.response.ts;

		// console.log(server + " " + key + " " + ts + '\n');

		// let message = "я русский!!!"

		let url = "https://api.vk.com/method/"
			+ "messages.send"
			+ "?random_id=" + Math.floor((1000000) * Math.random())
			// + "&conversation_message_id=" + messageID
			+ "&message="   + encodeURI(message)
			+ "&peer_id="   + (2000000000 + 1)
			+ "&access_token=" + "61aa356086d2f7a3729eb29cda2617e99a30066dbaf946751989e00fb806a0a1d680e7810372e10f63df3"
			+ "&v="            + "5.122";
	
		console.log(url);

		let response = await fetch(url);
		let body = await response.text();

		console.log(body)

		res.end();

	})();
});


app.listen(3000, () => {

	console.log("Server running on http://localhost:3000");

	// (async () => {

	// 	let url = "https://api.vk.com/method/"
	// 		+                    "groups.getLongPollServer"
	// 		+ "?"              + "group_id=197891018" 
	// 		+ "&access_token=" + "61aa356086d2f7a3729eb29cda2617e99a30066dbaf946751989e00fb806a0a1d680e7810372e10f63df3"
	// 		+ "&v="            + "5.122";

	// 	let response = await fetch(url);
	// 	let body = await response.json();

	// 	let server = body.response.server;
	// 	let key    = body.response.key;
	// 	let ts     = body.response.ts;

	// 	console.log(server + " " + key + " " + ts + '\n');

	// 	while (true)
	// 	{
	// 		url = body.response.server
	// 			+ "?act=a_check"
	// 			+ "&key=" + body.response.key
	// 			+ "&ts=" + body.response.ts
	// 			+ "&wait=25";

	// 		response = await fetch(url);
	// 		body = await response.json();

	// 		let updates = body.updates;
	// 		for (update of updates)
	// 		{
	// 			if (update.type == "message_new")
	// 			{
	// 				let userID  = update.object.message.from_id;
	// 				let groupID = update.group_id;
	// 				let messageID = update.object.message.conversation_message_id;

	// 				console.log(update);
	// 				console.log(userID);
	// 				console.log(groupID);

	// 				// (async () => {
	// 					// url = "https://api.vk.com/method/"
	// 					// 	+ "messages.send"
	// 					// 	// + "?user_id="   + userID
	// 					// 	+ "?random_id=" + Math.floor((1000000) * Math.random())
	// 					// 	+ "&conversation_message_id=" + messageID
	// 					// 	+ "&message="   + "хуй"
	// 					// 	+ "&peer_id="   + (2000000000 + 1)
	// 					// 	+ "&access_token=" + "61aa356086d2f7a3729eb29cda2617e99a30066dbaf946751989e00fb806a0a1d680e7810372e10f63df3"
	// 					// 	+ "&v="            + "5.122";
					
	// 					// response = await fetch(url);
	// 					// body = await response.text();
	// 					// console.log(body)
					
	// 					res.end('\n');
	// 				// })();
	// 				// .then((state) => {
	// 					// assert(state.action === 'DONE', 'should change state');
	// 				// })
	// 				// .catch((error) => {
	// 					// assert.isNotOk(error,'Promise error');
	// 				// });
	// 			}
	// 		}
	// 	} 
	// })();


});