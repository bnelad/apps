import { EmailFilter } from '../cmps/email-filter.jsx'
import { emailService } from '../services/email.service.js'
import { EmailList } from '../cmps/email-list.jsx'


export class EmailApp extends React.Component {
    
    state = {
        emails: [],
        filterBy: null,
        selectedemail: null,
        
    }

    componentDidMount() {
        console.log('init')
        this.loadEmails()
        console.log('init2')
        //up change
    }

    loadEmails = () => {
        console.log('load', this.state)
        emailService.query(this.state.filterBy)
            .then((emails) => this.setState({ emails }))
        // console.log('load:', emails) probl
        console.log('load:')
    }



    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadEmails()
        })
    }



    // onSelectemail = (emailId) => {
    //     emailService.getById(emailId)
    //         .then(email => this.setState({ selectedemail: email }))
    // }


    // onRemoveemail = (emailId) => {
    //     console.log('emailId from remove email', emailId);
    //     emailService.remove(emailId)
    //         .then(() => {
    //             const emails = this.state.emails.filter(email => email.id !== emailId)
    //             this.setState({ emails, selectedemail: null })
    //         })
    // }
    
    // <email-list></email-list>

    render() {
        const { emails } = this.state
        console.log('mail123')
        console.log('emails234: ', this.state)

        return <section className="mail">
            {/* <div>Mail App</div> */}

            {/* <EmailFilter onSetFilter={onSetFilter} /> */}

            <EmailList emails={emails} />

           
        </section>
    }
}
