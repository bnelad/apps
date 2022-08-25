import { emailService } from '../services/email.service.js'
const { Link } = ReactRouterDOM

export class EmailDetails extends React.Component {

    
    state = {
        email: null
    }

    componentDidMount() {
        console.log('mail details11111')
        this.loadEmail()
        console.log('mail details22')
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('mail details4444')
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadEmail()
        }
    }

    loadEmail = () => {
        const { mailId } = this.props.match.params
        console.log('aaaa', this.props)
        console.log('aaaaa22', mailId)
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
        console.log('mail details')
        const { email } = this.state
        if (!email) return 
        console.log('mail details4444')
        return<section className="email-details">
            <h2>{email.subject}</h2>
            <h3>{email.from}</h3>
            <h3>{email.body}</h3>
            <Link to={`/mail/`}><button>Go back</button></Link>
            {/* <button>Go back</button> */}
            {/* <button>Delete</button> */}
        </section> 
    }
}
