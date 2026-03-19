export function MailPreview({ mail, onToggleStar, onToggleRead, isDraft }) {
    
    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const now = new Date()
        const isToday = date.toDateString() === now.toDateString()
        
        if (isToday) {
            return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            })
        }
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        })
    }

    function handleStarClick(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        onToggleStar(mail.id)
    }

    function handleReadClick(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        onToggleRead(mail.id)
    }

    const senderName = isDraft ? `To: ${mail.to || '(no recipient)'}` : mail.from.split('@')[0]
    const previewText = mail.body.substring(0, 80) + (mail.body.length > 80 ? '...' : '')

    return (
        <article className={`mail-preview ${mail.isRead ? 'read' : 'unread'} ${isDraft ? 'draft' : ''}`}>
            <div className="mail-actions">
                <button 
                    className={`star-btn ${mail.isStarred ? 'starred' : ''}`}
                    onClick={handleStarClick}
                    title={mail.isStarred ? 'Unstar' : 'Star'}
                >
                    {mail.isStarred ? '⭐' : '☆'}
                </button>
                <button 
                    className="read-btn"
                    onClick={handleReadClick}
                    title={mail.isRead ? 'Mark as unread' : 'Mark as read'}
                >
                    {mail.isRead ? '📭' : '📬'}
                </button>
            </div>
            <div className="mail-sender">
                {isDraft && <span className="draft-label">Draft </span>}
                {senderName}
            </div>
            <div className="mail-content">
                <span className="mail-subject">{mail.subject || '(no subject)'}</span>
                <span className="mail-separator"> - </span>
                <span className="mail-body-preview">{previewText || '(no content)'}</span>
            </div>
            <div className="mail-date">{formatDate(mail.sentAt)}</div>
        </article>
    )
}
