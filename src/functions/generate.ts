import req from "@Requests";
import { Message } from "discord.js";
import { AxiosResponse } from "axios";
import { rmSync, readFileSync, writeFileSync } from "fs";

export async function getImages(message: Message, query: string): Promise<void> {
    let generated = false;
    while (!generated) {
        const resp : AxiosResponse = await req.request({ url: process.env.BASE_URL, data: { prompt: query } });
        if (resp.status === 200) {
            generated = true;
            const images = resp.data.images;
            for (let base64 of images) {
                const buffer = Buffer.from(base64, "base64");
                writeFileSync("image.png", buffer);
                await message.reply({ files: [ readFileSync("image.png") ] });
            };
            rmSync("image.png");
        } else {
            console.log("Ratelimited waiting...");
            await new Promise(resolve => setTimeout(resolve, 10000));
        };
    };
};
