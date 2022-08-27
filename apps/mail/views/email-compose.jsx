import { emailService } from '../services/email.service.js'

export class EmailCompose extends React.Component {

    state = {
        email: {
            subject: '',
            body: '',
            to: '',
        }
    }

    componentDidMount() {
        this.loadEmail()
    }
    loadEmail = () => {
        const { emailId } = this.props.match.params
        if (!emailId) return
        emailService.getById(emailId).then(email => this.setState({ email }))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(({email}) => ({
            email: { ...email, [field]: value }
        }))
    }

    onSaveEmail = (ev) => {
        ev.preventDefault()
        emailService.save(this.state.email)
            .then(() => {
                this.props.history.push('/mail')
            })
    }

    render() {
        const {subject, body, to} = this.state.email
        const {onSaveEmail, handleChange} = this
        return <section className="email-add">
            <h4>New Message</h4>
            <form className="flex column align-center" onSubmit={onSaveEmail}>
                <label htmlFor="to">To</label>
                <input type="text" name="to"
                    value={to} id="to"
                    onChange={handleChange}
                />
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject"
                    value={subject} id="subject"
                    onChange={handleChange}
                />
                <label htmlFor="body">body</label>
                <input type="text" name="body" size="40"
                    value={body} id="body"
                    onChange={handleChange}
                />
                <br /><button className="send-btn">Send</button>
            </form>
        </section>
    }
}