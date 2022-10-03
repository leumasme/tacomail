export interface AttachmentType {
    name: string;
    filename: string;
}

export interface MailType {
    id: string;
    from: {
        address: string;
        name: string;
    };
    to: {
        address: string;
        name: string;

    };
    subject: string;
    date: string;
    body: {
        text: string;
        html: string;
    };
    headers: Record<any, any>;
    attachments: AttachmentType[];
}