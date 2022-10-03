import axios from "axios";
import { MailType } from "./types";

const defaultServer = "https://tacomail.de"

export async function getMailForAddress(address: string, server = defaultServer): Promise<MailType[]> {
    let response = await axios.get(server + "/api/v1/mail/" + address);
    return response.data;
}

export async function getAvailableDomains(server = defaultServer): Promise<string[]> {
    let response = await axios.get(server + "/api/v1/domains");
    return response.data;
}

export async function deleteMail(address: string, mailId: string, server = defaultServer) {
    await axios.delete(server + "/api/v1/" + address + "/" + mailId);
}

export async function deleteAllMailForAddress(address: string, server = defaultServer) {
    await axios.delete(server + "/api/v1/" + address);
}

export async function downloadAttachment(address: string, mailId: string, attachment: string, server = defaultServer): Promise<ArrayBuffer> {
    let response = await axios.get(server + "/api/v1/" + address + "/" + mailId + "/" + attachment, {
        responseType: 'arraybuffer'
    });
    return response.data;
}