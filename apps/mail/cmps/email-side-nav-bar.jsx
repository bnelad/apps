const { NavLink } = ReactRouterDOM

export function EmailSideNavBar() {
    
    return <div className="email-side-nav-bar">
        <div>
            <NavLink to="/mail/edit">
                <button className="compose-btn"><i className="fa-solid fa-pencil"></i>&nbsp; Compose</button>
            </NavLink>
        </div>
        <ul className="folder-list">
            <li>
                <NavLink to="/mail/inbox">
                    <h4>Inbox</h4>
                </NavLink>
            </li>
            <li>
                <NavLink to="/mail/inbox">
                    <h4>Read</h4>
                </NavLink>
            </li>
            <li>
                <NavLink to="/mail/inbox">
                    <h4>Unread</h4>
                </NavLink>
            </li>
            <li>
                <NavLink to="/mail/sent">
                    <h4>Sent</h4>
                </NavLink>
            </li>
        </ul>
    </div>
}
