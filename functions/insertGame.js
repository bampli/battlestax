const { getGamesCollection } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  let gameId;
  let gamePayload;
  try {

    // let's set the game id
    gameId = event.path.split("insertGame/")[1];
    // let's parse the incoming payload
    gamePayload = JSON.parse(event.body);
  } catch (e) {
    // let's return a 400 if we can't parse the game id or body
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "must provide a valid game ID" }),
    };
  }

  const gamesCollection = await getGamesCollection();

  try {
    // let's create a new game with the gamesCollection
    const res = await gamesCollection.create(gameId, gamePayload);
    // let's return a 200 with the resoponse from astra
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    console.error(e);
    // let's return a 500 on error
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
