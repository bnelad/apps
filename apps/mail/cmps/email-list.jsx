import { EmailPreview } from "./email-preview.jsx"

export function EmailList({ emails, onRemoveEmail }) {

    return <section className="mail-list">
                {emails.map(mail => 
                <div><EmailPreview key={mail.id} mail={mail} />
                <button onClick={()=>onRemoveEmail(mail.id)}>X</button>
                </div>
                )}
    </section>
}
