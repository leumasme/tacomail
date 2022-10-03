import { getAvailableDomains, getMailForAddress, deleteAllMailForAddress, deleteMail, downloadAttachment } from "./routes"
import { AttachmentType, MailType } from "./types"

export class TacomailClient {
    private domains: string[] | null = null;
    constructor(private server = "https://tacomail.de") { }
    async getDomains(): Promise<string[]> {
        if (this.domains == null) {
            this.domains = await getAvailableDomains(this.server);
        }
        return this.domains;
    }
    getInbox(address: string): Inbox {
        return new Inbox(address, this.server);
    }
    async getRandomInbox(): Promise<Inbox> {
        let domains = await this.getDomains();
        let domain = domains[Math.floor(Math.random() * domains.length)];
        let prefix = Math.random().toString(36).substring(2, 15);
        return new Inbox(prefix + "@" + domain, this.server);
    }
}

class Inbox {
    constructor(public address: string, private server: string) { }
    async getAllMail(): Promise<Mail[]> {
        return (await getMailForAddress(this.address, this.server))
            .map((mail) => new Mail(mail, this.address, this.server));
    }
    async deleteAllMail() {
        await deleteAllMailForAddress(this.address, this.server);
    }
    async waitForMail(filter = (m: Mail) => true, timeout = 120000, interval = 2000): Promise<Mail> {
        let start = Date.now();
        while (Date.now() - start < timeout) {
            let mails = await this.getAllMail();
            for (const mail of mails) {
                if (filter(mail)) {
                    return mail;
                }
            }
            await new Promise((resolve) => setTimeout(resolve, interval));
        }
        throw new Error("Timeout");
    }
}

export class Mail implements MailType {
    id: string;
    from: { address: string; name: string; };
    to: { address: string; name: string; };
    subject: string;
    date: string;
    body: { text: string; html: string; };
    headers: Record<any, any>;
    attachments: Attachment[];
    constructor(mail: MailType, private address: string, private server: string) {
        this.id = mail.id;
        this.from = mail.from;
        this.to = mail.to;
        this.subject = mail.subject;
        this.date = mail.date;
        this.body = mail.body;
        this.headers = mail.headers;
        this.attachments = mail.attachments
            .map(attachment => new Attachment(attachment, this.address, this.id, this.server));
    }
    async delete() {
        await deleteMail(this.address, this.id, this.server);
    }
}
class Attachment implements AttachmentType {
    name: string;
    filename: string;
    constructor(attachment: AttachmentType, private address: string, private mailId: string, private server: string) {
        this.name = attachment.name;
        this.filename = attachment.filename;
    }
    async download(): Promise<ArrayBuffer> {
        return await downloadAttachment(this.address, this.mailId, this.name, this.server);
    }
}