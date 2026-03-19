const { NavLink } = ReactRouterDOM

export function MailFolderList({ unreadCount }) {
    const folders = [
        { name: 'Inbox', icon: '📥', status: 'inbox' },
        { name: 'Starred', icon: '⭐', status: 'starred' },
        { name: 'Sent', icon: '📤', status: 'sent' },
        { name: 'Drafts', icon: '📝', status: 'draft' },
        { name: 'Trash', icon: '🗑️', status: 'trash' }
    ]

    return (
        <nav className="mail-folder-list">
            <ul>
                {folders.map(folder => (
                    <li key={folder.status}>
                        <NavLink 
                            to={`/mail?status=${folder.status}`}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <span className="folder-icon">{folder.icon}</span>
                            <span className="folder-name">{folder.name}</span>
                            {folder.status === 'inbox' && unreadCount > 0 && (
                                <span className="unread-count">{unreadCount}</span>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
