import { getImages } from "@gen";
import { Client, Intents, Message } from "discord.js";

require("dotenv").config();

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            PREFIX: string;
            BASE_URL: string;
        }
    }
};

class ImagineThat {

    client: Client;

    constructor() {
        this.client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES ] });
        this.start();
    };

    start(): void {
        this.client.login(process.env.TOKEN);
        this.client.on("ready", async (client: Client) => {
            console.log(`Logged in as ${client.user?.tag}`);
            await this.commandHandler();
        });
    };

    async commandHandler(): Promise<void> {
        this.client.on("messageCreate", async (message: Message) => {
            if (message.content.split(" ")[0].toLowerCase() === process.env.PREFIX) {
                const query: string = message.content.toLowerCase().split(process.env.PREFIX)[1];
                console.log(`Serving ${query.trim()}...`);
                await message.reply("AI is thinking...");
                await getImages(message, query);
            };
        });
    };

};

new ImagineThat();
