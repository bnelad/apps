export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            subject: '',
            vendor: '',
            minSpeed: '',
            maxSpeed: ''
        },
    }

    inputRef = React.createRef()

    componentDidMount() {
        // console.log('inputRef', this.inputRef);
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
        console.log('subject12:', subject)
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
                <button>Filter</button>
            </form>
            <button className="search-btn" onClick={this.goSearch}>Go Search</button>
        </section>
    }
}