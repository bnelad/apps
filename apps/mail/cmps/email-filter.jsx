export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            subject: ''
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    goSearch = () => {
        this.inputRef.current.focus()
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { subject } = this.state.filterBy
        return <section className="email-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-vendor">🔍</label>
                <input
                    ref={this.inputRef}
                    type="text"
                    placeholder="Search in mail.."
                    id="by-vendor"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
            </form>
        </section>
    }
}