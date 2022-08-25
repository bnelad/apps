const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {


    state = {
        mail: null
    }

    componentDidMount() {
        this.setState({ mail: this.props.mail })
    }

    onReadMail = () => {
        this.setState((prevState) => ({
        mail: { ...prevState, isRead: true }
        }))
    }

  getMailClass = (mail) => {
    const mailClass = mail.isRead ? 'mail-preview read' : 'mail-preview not-read'
    return mailClass
  }

  render() {
    const { mail } = this.state
    console.log('from:', mail)
    if (!mail) return <span></span>

    return <Link to={"/mail/" + mail.id}> <article onClick={this.onReadMail} className={this.getMailClass(mail)}>
      <div className="from"> {mail.from}</div>
      <div className="subject">{mail.subject}</div>
      <div className="mail-body">{mail.body}</div>
      <div className="sent-at">{mail.sentAt}</div>
    </article></Link>
  }
}