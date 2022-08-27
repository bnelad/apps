import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { EmailApp } from "./apps/mail/views/email-app.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { EmailDetails } from "./apps/mail/views/email-details.jsx"
import { EmailCompose } from "./apps/mail/views/email-compose.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>
                <Route path="/mail/edit/:mailId?" component={EmailCompose} />
                <Route path="/mail/:mailId" component={EmailDetails} />
                <Route path="/mail" component={EmailApp} />
                <Route path="/note" component={NoteIndex} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}

