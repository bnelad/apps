import { emailService } from '../services/email.service.js'
const { Link } = ReactRouterDOM

export class EmailDetails extends React.Component {

    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadEmail()
        }
    }

    loadEmail = () => {
        const { mailId } = this.props.match.params
        emailService.getById(mailId)
            .then((email) => {
                if (!email) return this.onGoBack()
                this.setState({ email })
            })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    render() {
        const { email } = this.state
        if (!email) return 
        return<section className="email-details">
            <h2>{email.subject}</h2><br />
            <h4>{email.from}</h4><br />
            <p>{email.body}</p><br />
            <Link to={`/mail/`}><button className="go-back-btn">Go back</button></Link>
        </section> 
    }
}
