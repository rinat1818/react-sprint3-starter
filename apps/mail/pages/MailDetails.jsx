const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    async function loadMail() {
        try {
            const mailData = await mailService.get(mailId)
            // Mark as read when opened
            if (!mailData.isRead) {
                mailData.isRead = true
                await mailService.save(mailData)
            }
            setMail(mailData)
        } catch (err) {
            console.error('Failed to load mail:', err)
            navigate('/mail')
        }
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    async function onDelete() {
        try {
            if (mail.removedAt) {
                await mailService.remove(mail.id)
            } else {
                mail.removedAt = Date.now()
                await mailService.save(mail)
            }
            navigate('/mail')
        } catch (err) {
            console.error('Failed to delete mail:', err)
        }
    }

    async function onToggleStar() {
        try {
            mail.isStarred = !mail.isStarred
            const savedMail = await mailService.save(mail)
            setMail({ ...savedMail })
        } catch (err) {
            console.error('Failed to toggle star:', err)
        }
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div className="loading">Loading...</div>

    return (
        <section className="mail-details">
            <header className="mail-details-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <div className="mail-details-actions">
                    <button 
                        className={`star-btn ${mail.isStarred ? 'starred' : ''}`}
                        onClick={onToggleStar}
                    >
                        {mail.isStarred ? '⭐' : '☆'}
                    </button>
                    <button className="delete-btn" onClick={onDelete}>
                        🗑️
                    </button>
                </div>
            </header>

            <article className="mail-details-content">
                <h1 className="mail-subject">{mail.subject}</h1>
                
                <div className="mail-meta">
                    <div className="mail-sender-info">
                        <div className="sender-avatar">
                            {mail.from.charAt(0).toUpperCase()}
                        </div>
                        <div className="sender-details">
                            <span className="sender-name">{mail.from}</span>
                            <span className="recipient">to {mail.to}</span>
                        </div>
                    </div>
                    <div className="mail-timestamp">
                        {formatDate(mail.sentAt)}
                    </div>
                </div>

                <div className="mail-body">
                    {mail.body}
                </div>
            </article>
        </section>
    )
}
