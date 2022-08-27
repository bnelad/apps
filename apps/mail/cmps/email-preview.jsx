import { utilService } from "../../../services/util.service.js"
import { emailService } from '../services/email.service.js'

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    state = {
        mail: null
    }

    componentDidMount() {
        this.setState({ mail: this.props.mail })
    }

    onReadMail = () => {
        const { mail } = this.state
        emailService.updateRead(mail.id)
    }

    getMailClass = () => {
        const { mail } = this.state
        const mailClass = mail.isRead ? 'mail-preview read' : 'mail-preview unread'
        return mailClass
    }

    render() {
        const { mail } = this.state
        if (!mail) return
        const sentAt = utilService.getDatePreview(mail.sentAt, true)
        return <Link to={"/mail/" + mail.id}> <article onClick={this.onReadMail} className={this.getMailClass(mail)}>
            <div className="from"> {mail.from}</div>
            <div className="subject">{mail.subject}</div>
            <div className="mail-body hide-long-text">{mail.body}</div>
            <div className="sent-at">{sentAt}</div>
        </article></Link>
    }
}
