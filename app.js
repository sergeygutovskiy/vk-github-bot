const express    = require("express")
const fetch      = require("node-fetch");
const bodyParser = require('body-parser')


const app = express();
app.use( bodyParser.json() );    
app.use(bodyParser.urlencoded({ extended: true })); 

class VK
{
	constructor(url, token, apiVersion)
	{
		this.apiURL = url;
		this.token  = token;
		this.v      = apiVersion;
	}

	async call(method, params)
	{
		let url = this.apiURL + method;

		url += "?";

		for (let key in params)
		{
			url += (key + "=" + params[key] + "&"); 
		}

		url += "access_token=" + this.token + "&";
		url += "v=" + this.v;

		let response = await fetch(url);
		let body     = await response.json();

		return body;
	}
}

function generateMessageFromGitHubInfo(info)
{
	let project = info.repository;
	let commits = info.commits;

	let message = "";

	message += ("+-----------");
	message += ("| Событие: проект обновлен \n");
	message += ("| -> Проект: " + project.name + "\n");
	message += ("+ Коммиты: \n");

	console.log(commits);

	let i = 0;
	for (commit of commits)
	{
		let commitMessage = "";
	
		commitMessage += ("| -> " + i + ": \n");
		commitMessage += ("| -- Автор: " + commit.author.name + "\n");

		if (commit.added.length > 0)
		{
			commitMessage += ("| -- Добавлены: ");
			commitMessage += (commit.added.join(", ") + "\n");
		}

		if (commit.removed.length > 0)
		{
			commitMessage += ("| -- Удалены: ");
			commitMessage += ("-- " + commit.removed.join(", ") + "\n");
		}

		if (commit.modified.length > 0)
		{
			commitMessage += "-> Изменены: ";
			commitMessage += ("-- " + commit.modified.join(", ") + "\n");
		}

		message += commitMessage;
		message += "\n";
	}

	message += ("+----------");

	return message;
}

const vk = new VK(
	"https://api.vk.com/method/",	
	"61aa356086d2f7a3729eb29cda2617e99a30066dbaf946751989e00fb806a0a1d680e7810372e10f63df3",
	"5.122"
);


app.get("/", (req, res) => {

	res.end("<h1><Hello</h1>");

});

app.post("/api/update", (req, res) => {

	let message = generateMessageFromGitHubInfo(req.body);

	console.log(message);

	// (async () => {


	// 	let response = await vk.call("messages.send", {
	// 		"random_id": Math.floor((1000000) * Math.random()),
	// 		"message"  : "just a test, nothing else...",
	// 		"peer_id"  : 2000000000 + 1
	// 	})

	// 	console.log(response);

	// })();

	// res.end();

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