const http  = require("http");
const fetch = require('node-fetch');
 

async function getUpdates(server, )
{

}


http.createServer(function (req, res) {

	if (req.url == "/api")
	{
		(async () => {

			let url = "https://api.vk.com/method/"
				+                    "groups.getLongPollServer"
				+ "?"              + "group_id=197891018" 
				+ "&access_token=" + "61aa356086d2f7a3729eb29cda2617e99a30066dbaf946751989e00fb806a0a1d680e7810372e10f63df3"
				+ "&v="            + "5.122";

			let response = await fetch(url);
			let body = await response.json();

			let server = body.response.server;
			let key    = body.response.key;
			let ts     = body.response.ts;

			console.log(server + " " + key + " " + ts + '\n');

			while (true)
			{
				url = body.response.server
					+ "?act=a_check"
					+ "&key=" + body.response.key
					+ "&ts=" + body.response.ts
					+ "&wait=25";

				response = await fetch(url);
				body = await response.json();

				let updates = body.updates;
				for (update of updates)
				{
					if (update.type == "message_new")
					{
						let userID  = update.object.message.from_id;
						let groupID = update.group_id;
						let messageID = update.object.message.conversation_message_id;

						console.log(update);
						console.log(userID);
						console.log(groupID);

						// (async () => {
							// url = "https://api.vk.com/method/"
							// 	+ "messages.send"
							// 	// + "?user_id="   + userID
							// 	+ "?random_id=" + Math.floor((1000000) * Math.random())
							// 	+ "&conversation_message_id=" + messageID
							// 	+ "&message="   + "хуй"
							// 	+ "&peer_id="   + (2000000000 + 1)
							// 	+ "&access_token=" + "61aa356086d2f7a3729eb29cda2617e99a30066dbaf946751989e00fb806a0a1d680e7810372e10f63df3"
							// 	+ "&v="            + "5.122";
						
							// response = await fetch(url);
							// body = await response.text();
							// console.log(body)
						
							res.end('\n');
						// })();
						// .then((state) => {
							// assert(state.action === 'DONE', 'should change state');
						// })
						// .catch((error) => {
							// assert.isNotOk(error,'Promise error');
						// });
					}
				}
			} 
		})();
	}

	console.log("Server running on http://localhost:3000");

}).listen(3000);