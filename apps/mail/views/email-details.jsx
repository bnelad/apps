import { emailService } from '../services/email.service.js'
const { Link } = ReactRouterDOM

export class EmailDetails extends React.Component {

    
    state = {
        email: null
    }

    componentDidMount() {
        console.log('mail details11')
        this.loadEmail()
        console.log('mail details22')
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('mail details12222')
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadEmail()
        }
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params
        emailService.getById(emailId)
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
            <h3>{email.subject}</h3>
            <h3>{email.from}</h3>
        </section> 
    }
}
