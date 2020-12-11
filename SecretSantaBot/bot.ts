require("dotenv").config();

const Discord = require("discord.js");

const client = new Discord.Client({
  partials: ["MESSAGE"],
});

const BOT_PREFIX = "$anta";
const START_SANTA_COMMAND = "start";
const YES_REACTION = "";
const NO_REACTION = "";

client.on("ready", () => {
  console.log("Bot is ready");
});

client.on("message", (message) => {
  if (message.content.startsWith(BOT_PREFIX)) {
    let command = message.content.substring(
      message.content.indexOf(BOT_PREFIX) + BOT_PREFIX.length + 1
    );

    switch (command) {
      case START_SANTA_COMMAND:
        startSanta(message);
        break;
      default:
        message.channel.send(`That ain't a command bub`);
        break;
    }
  }
});

async function startSanta(message) {
  try {
    let channel = message.channel;
    let members = channel.members.array();

    await channel.send(
      "Collecting participants, react to confirm your participation"
    );
    let participants = await getParticipants(channel, members);

    if (participants.length <= 0) {
      return;
    }
    await pairSantas(participants);
    await channel.send("Sent all santas!!");
  } catch (error) {
    console.log(error);
  }
}

async function getParticipants(channel, members) {
  let participants = [];
  let collectors = [];
  for (let i = 0; i < members.length; i++) {
    let member = members[i];
    if (member.id === process.env.BOT_ID) {
      continue;
    }
    let message = await channel.send(`Is ${member.displayName} participating?`);
    let collector = message.createReactionCollector(
      (reaction, user) => user.id === member.id,
      { max: 1 }
    );
    collector.on("end", (collected) => {
      if (
        collected.size > 0 &&
        collected.array()[0].emoji.name !== NO_REACTION
      ) {
        participants.push(member);
      }
    });
    collectors[i] = collector;

    // let reactions = await message.awaitReactions(
    //   (reaction, user) => user.id === member.id,
    //   {
    //     max: 1,
    //   }
    // );
    // if (reactions.size > 0) {
    //   participants.push(member);
    // }
  }
  let resp = await yesOrNo(
    channel,
    "Would you like to move on to drawing names? (Once you move on no more participants can be added)",
    null,
    { max: 1 }
  );
  collectors.forEach((collector) => {
    collector.stop();
  });
  if (participants.length <= 1) {
    await channel.send(
      `Need more than 1 participant :(( You only had ${
        participants.length
      } participant${participants.length === 1 ? "" : "s"}`
    );
    return [];
  }

  if (!resp) {
    await channel.send("Cancelled Santa :(");
    return [];
  }
  return participants;
}

async function pairSantas(participants) {
  try {
    let remainingSantas = [...participants];
    for (let i = 0; i < participants.length; i++) {
      let participant = participants[i];
      let randomIndex = Math.floor(Math.random() * remainingSantas.length);
      let santa = remainingSantas[randomIndex];

      while (santa.id === participant.id) {
        randomIndex = Math.floor(Math.random() * remainingSantas.length);
        santa = remainingSantas[randomIndex];
      }

      await participant.send(
        `Your special someone is ${santa.displayName} ;)))`
      );
      remainingSantas.splice(randomIndex, 1);
    }
  } catch (error) {
    console.log(error);
  }
}

async function yesOrNo(channel, question, reactionFilter, collectorOptions) {
  let message = await channel.send(question);
  let reactions = await message.awaitReactions(
    reactionFilter ? reactionFilter : (reaction, user) => true,
    collectorOptions ? collectorOptions : {}
  );
  return reactions.size > 0 && reactions.array()[0].emoji.name !== NO_REACTION;
}

client.login(process.env.BOT_TOKEN);
