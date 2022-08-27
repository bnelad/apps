import { EmailFilter } from '../cmps/email-filter.jsx'
import { emailService } from '../services/email.service.js'
import { EmailList } from '../cmps/email-list.jsx'
import { EmailSideNavBar } from "../cmps/email-side-nav-bar.jsx"

const { Link } = ReactRouterDOM
export class EmailApp extends React.Component {
    
    state = {
        emails: [],
        filterBy: null,
        selectedemail: null,
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy)
            .then((emails) => this.setState({ emails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    onRemoveEmail = (emailId) => {
        emailService.remove(emailId)
            .then(() => {
                const emails = this.state.emails.filter(email => email.id !== emailId)
                this.setState({ emails, selectedemail: null })
            })
    }
    
    render() {
        const { emails } = this.state
        const { onSetFilter,  onRemoveEmail} = this
        return <section className="full email-index">
            <EmailFilter onSetFilter={onSetFilter} />
            <div className="main-content">
                <EmailSideNavBar className="side-nav-bar"/>
                <EmailList className="email-list" emails={emails} onRemoveEmail={onRemoveEmail}/>
            </div>
        </section>
    }
}
