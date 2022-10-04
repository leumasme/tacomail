import tacomail from "tacomail-client";

(async () => {
    let inbox = await tacomail.getRandomInbox();
    console.log("Generated Address:", inbox.address);

    //
    // Do some things here that send emails to the inbox.address
    //

    // We can wait for a specific mail
    let mail = await inbox.waitForMail((m) => m.subject == "Hello World");
    console.log(mail.from.address);

    // Or we can get all mails
    let mails = await inbox.getAllMail();
    console.log("Received emails:", mails.length);
    for (const mail of mails) {
        // Do something with the mail
        console.log(mail.body.html);
    }

    // We can delete a specific mail
    await mail.delete();
    // or all mails in an inbox
    await inbox.deleteAllMail();
})()