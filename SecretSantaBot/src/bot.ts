import { config } from "dotenv";
import {
  Client,
  Message,
  TextChannel,
  GuildMember,
  DMChannel,
  CollectorFilter,
  AwaitReactionsOptions,
} from "discord.js";
import { db } from "./firebase";
config();

const client = new Client({
  partials: ["MESSAGE"],
});

const BOT_PREFIX = "$anta";
const START_SANTA_COMMAND = "start";
const SET_DESIRE_COMMAND = "want";
const ADD_DESIRE_COMMAND = "alsowant";
const REMOVE_DESIRE_COMMAND = "actuallydontwant";
const SET_UNWANTED_COMMAND = "dontwant";
const ADD_UNWANTED_COMMAND = "alsodontwant";
const REMOVE_UNWANTED_COMMAND = "actuallywant";
const SET_NAME_COMMAND = "setname";
const WHO_COMMAND = "who";
const WHAT_THEY_WANT_COMMAND = "whattheywant";
const WHAT_THEY_DONT_WANT_COMMAND = "whattheydontwant";
const HELP_COMMAND = "help";

const YES_REACTION = "";
const NO_REACTION = "";

client.on("guildCreate", guild => {

})

client.on("ready", () => {
  console.log("Bot is ready");
});

client.on("message", (message: Message) => {
  if (message.author.id === process.env.BOT_ID) {
    return;
  }
  let content = message.content.trim();
  if (content.startsWith(BOT_PREFIX)) {
    let command = content
      .substring(
        content.indexOf(" ") + 1,
        content.indexOf(" ", content.indexOf(" ") + 1)
      )
      .trim();
    let flags = content.match(/(?<=--)\w*/g)?.map((val, ind) => val.trim());
    let args = [content.substring(content.lastIndexOf(" "))];
    switch (command) {
      case START_SANTA_COMMAND:
        startSanta(message, args);
        break;
      case SET_DESIRE_COMMAND:
        setDesires(message, args);
        break;
      case ADD_DESIRE_COMMAND:
        addDesires(message, args);
        break;
      case REMOVE_DESIRE_COMMAND:
        removeDesires(message, args);
        break;
      case SET_UNWANTED_COMMAND:
        setUnwanted(message, args);
        break;
      case ADD_UNWANTED_COMMAND:
        addUnwanted(message, args);
        break;
      case REMOVE_UNWANTED_COMMAND:
        removeUnwanted(message, args);
        break;
      case SET_NAME_COMMAND:
        setName(message, args);
        break;
      case WHO_COMMAND:
        getSanta(message, args);
        break;
      case WHAT_THEY_DONT_WANT_COMMAND:
        getSantaUnwanted(message, args);
        break;
      case WHAT_THEY_WANT_COMMAND:
        getSantaDesires(message, args);
        break;
      case HELP_COMMAND:
        help(message, args);
        break;
      default:
        message.channel.send(`That ain't a command bub`);
        break;
    }
  }
});

interface Participant {
  desire: Array<string>;
  name: string;
  email: string;
  personDesire: Array<string>;
  person: string;
  unwanted: Array<string>;
  personUnwanted: Array<String>;
}

async function help(message: Message, args?: Array<string>) {
  let command = "",
    resp = "";
  const howToUse =
    "To type a command use $anta [command] [arguments]\nYou can specify one argument, but some commands don't need them\nExample commands:\n$anta start\n$anta addDesire video game\n\n";
  const commandList = "Command List:\n";
  if (args && args[0]) {
    command = args[0];
  }
  switch (command) {
    case START_SANTA_COMMAND:
      resp = "starts the drawing";
      break;
    case SET_DESIRE_COMMAND:
      resp = "clears all your wanted things and adds the ones you specify";
      break;
    case ADD_DESIRE_COMMAND:
      resp = "adds another thing you want";
      break;
    case REMOVE_DESIRE_COMMAND:
      resp = "removes one of the things you want";
      break;
    case SET_UNWANTED_COMMAND:
      resp = "clears all your unwanted things and adds the ones you specify";
      break;
    case ADD_UNWANTED_COMMAND:
      resp =
        "Adds something you dont want to your current list of unwanted items";
      break;
    case REMOVE_UNWANTED_COMMAND:
      resp = "Removes one of your unwanted items";
      break;
    case SET_NAME_COMMAND:
      resp =
        "sets your name to something recognizable so other ppl know who they have";
      break;
    case WHO_COMMAND:
      resp = "tells you who you have";
      break;
    case WHAT_THEY_DONT_WANT_COMMAND:
      resp = "tells you what the person you have does not want";
      break;
    case WHAT_THEY_WANT_COMMAND:
      resp = "Tells you what the person you have wants";
      break;
    case HELP_COMMAND:
      resp = "You actually need help with the help command";
      break;
    case "":
      resp = howToUse + commandList;
      break;
    default:
      resp = `That ain't a command bub`;
      break;
  }
  return await message.channel.send(resp);
}

async function setName(message: Message, args?: Array<string>) {
  if (args && args[0]) {
    await db
      .collection("users")
      .doc(message.author.id)
      .update({ name: args[0] });
  }
}

async function setDesires(message: Message, args?: Array<string>) {
  let data = (
    await db.collection("users").doc(message.author.id).get()
  ).data() as Participant;
  data.desire = args ? args : [];
  await db.collection("users").doc(message.author.id).update(data);
}

async function addDesires(message: Message, args?: Array<string>) {
  let data = (
    await db.collection("users").doc(message.author.id).get()
  ).data() as Participant;

  if (args) {
    data.desire = [...data.desire, ...args];
  }
  await db.collection("users").doc(message.author.id).update(data);
}

async function removeDesires(message: Message, args?: Array<string>) {
  let data = (
    await db.collection("users").doc(message.author.id).get()
  ).data() as Participant;

  if (args) {
    let newDesires = data.desire;
    newDesires.filter((val, ind) => !args.includes(val));
    data.desire = newDesires;
  }
  await db.collection("users").doc(message.author.id).update(data);
}

async function setUnwanted(message: Message, args?: Array<string>) {
  let data = (
    await db.collection("users").doc(message.author.id).get()
  ).data() as Participant;

  data.unwanted = args ? args : [];
  await db.collection("users").doc(message.author.id).update(data);
}

async function addUnwanted(message: Message, args?: Array<string>) {
  let data = (
    await db.collection("users").doc(message.author.id).get()
  ).data() as Participant;

  if (args) {
    data.unwanted = [...data.unwanted, ...args];
  }
  await db.collection("users").doc(message.author.id).update(data);
}

async function removeUnwanted(message: Message, args?: Array<string>) {
  let data = (
    await db.collection("users").doc(message.author.id).get()
  ).data() as Participant;

  if (args) {
    let newUnwanted = data.unwanted;
    newUnwanted.filter((val, ind) => !args.includes(val));
    data.unwanted = newUnwanted;
  }
  await db.collection("users").doc(message.author.id).update(data);
}

async function startSanta(
  message: Message,
  args?: Array<string>,
  flags?: Array<string>
) {
  try {
    let channel = message.channel as TextChannel;
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

async function getParticipants(
  channel: TextChannel,
  members: Array<GuildMember>
): Promise<Array<GuildMember>> {
  let participants: Array<GuildMember> = [];
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
    undefined,
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

async function pairSantas(participants: Array<GuildMember>): Promise<void> {
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
        `Your special someone is ${santa.user.username} ;)))`
      );
      await updateSantaDB(participant.id, santa.id);
      remainingSantas.splice(randomIndex, 1);
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateSantaDB(participantID: string, santaID: string) {
  let santa = await db.collection("users").doc(santaID).get();
  let santaData = santa.data() as Participant;
  await db
    .collection("users")
    .doc(participantID)
    .update({ personDesire: santaData.desire, person: santaData.name });
}

async function getSanta(message: Message, args?: Array<string>) {
  let santa = await db.collection("users").doc(message.author.id).get();
  let data = santa.data() as Participant;
  return await message.author.dmChannel?.send(
    data.person.length > 0 ? data.person : "You don't got nobody"
  );
}

async function getSantaDesires(message: Message, args?: Array<string>) {
  let santa = await db.collection("users").doc(message.author.id).get();
  let data = santa.data() as Participant;
  return await message.author.dmChannel?.send(
    data.personDesire.length > 0 ? data.personDesire : "You don't got nobody"
  );
}

async function getSantaUnwanted(message: Message, args?: Array<string>) {
  let santa = await db.collection("users").doc(message.author.id).get();
  let data = santa.data() as Participant;
  return await message.author.dmChannel?.send(
    data.personUnwanted.length > 0
      ? data.personUnwanted
      : "You don't got nobody"
  );
}

async function yesOrNo(
  channel: TextChannel | DMChannel,
  question: string,
  reactionFilter?: CollectorFilter,
  collectorOptions?: AwaitReactionsOptions
) {
  let message = await channel.send(question);
  let reactions = await message.awaitReactions(
    reactionFilter ? reactionFilter : (reaction, user) => true,
    collectorOptions ? collectorOptions : {}
  );
  return reactions.size > 0 && reactions.array()[0].emoji.name !== NO_REACTION;
}

client.login(process.env.BOT_TOKEN);
