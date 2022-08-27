import { EmailPreview } from "./email-preview.jsx"

export function EmailList({ emails, onRemoveEmail }) {

    return <section className="mail-list">
                {emails.map(mail => 
                <div key={mail.id} className="div-email-preview"><EmailPreview mail={mail} />
                <div className="btn-delete-div"><button className="btn-delete" onClick={()=>onRemoveEmail(mail.id)}>X</button></div>
                </div>
                )}
    </section>
}
