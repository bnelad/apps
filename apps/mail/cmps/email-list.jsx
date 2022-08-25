import { EmailPreview } from "./email-preview.jsx"

export function EmailList({ emails }) {

    return <section className="mail-list">
                {emails.map(mail => <EmailPreview key={mail.id} mail={mail} />)}
    </section>
}
