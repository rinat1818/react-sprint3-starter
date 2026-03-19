const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onToggleStar, onToggleRead, onOpenDraft, isDraftFolder }) {
    if (!mails || mails.length === 0) {
        return (
            <div className="mail-list empty">
                <div className="empty-state">
                    <span className="empty-icon">📭</span>
                    <p>No emails found</p>
                </div>
            </div>
        )
    }

    function handleMailClick(ev, mail) {
        if (mail.isDraft && onOpenDraft) {
            ev.preventDefault()
            onOpenDraft(mail.id)
        }
    }

    return (
        <div className="mail-list">
            {mails.map(mail => (
                <Link 
                    key={mail.id} 
                    to={mail.isDraft ? '#' : `/mail/${mail.id}`}
                    className="mail-link"
                    onClick={(ev) => handleMailClick(ev, mail)}
                >
                    <MailPreview 
                        mail={mail}
                        onToggleStar={onToggleStar}
                        onToggleRead={onToggleRead}
                        isDraft={mail.isDraft}
                    />
                </Link>
            ))}
        </div>
    )
}

