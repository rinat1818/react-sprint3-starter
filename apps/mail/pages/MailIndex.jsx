
const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [unreadCount, setUnreadCount] = useState(0)
    const [isComposing, setIsComposing] = useState(false)
    const [currentDraft, setCurrentDraft] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const status = searchParams.get('status') || 'inbox'
        setFilterBy(prev => ({ ...prev, status }))
    }, [searchParams])

    useEffect(() => {
        loadMails()
        loadUnreadCount()
    }, [filterBy])

    async function loadMails() {
        try {
            const mailsData = await mailService.query(filterBy)
            setMails(mailsData)
        } catch (err) {
            console.error('Failed to load mails:', err)
        }
    }

    async function loadUnreadCount() {
        try {
            const count = await mailService.getUnreadCount()
            setUnreadCount(count)
        } catch (err) {
            console.error('Failed to load unread count:', err)
        }
    }

    function onFilter(newFilter) {
        setFilterBy(prev => ({ ...prev, ...newFilter }))
    }

    async function onToggleStar(mailId) {
        try {
            const mail = await mailService.get(mailId)
            mail.isStarred = !mail.isStarred
            await mailService.save(mail)
            loadMails()
        } catch (err) {
            console.error('Failed to toggle star:', err)
        }
    }

    async function onToggleRead(mailId) {
        try {
            const mail = await mailService.get(mailId)
            mail.isRead = !mail.isRead
            await mailService.save(mail)
            loadMails()
            loadUnreadCount()
        } catch (err) {
            console.error('Failed to toggle read:', err)
        }
    }

    async function onSendMail(mailToSend) {
        try {
            const mail = mailService.getEmptyMail()
            mail.id = mailToSend.id || null // Keep ID if editing a draft
            mail.to = mailToSend.to
            mail.subject = mailToSend.subject
            mail.body = mailToSend.body
            mail.isDraft = false // Mark as sent, not draft
            mail.sentAt = Date.now()
            await mailService.save(mail)
            setIsComposing(false)
            setCurrentDraft(null)
            loadMails()
        } catch (err) {
            console.error('Failed to send mail:', err)
        }
    }

    async function onOpenDraft(mailId) {
        try {
            const draft = await mailService.get(mailId)
            if (draft && draft.isDraft) {
                setCurrentDraft(draft)
                setIsComposing(true)
            }
        } catch (err) {
            console.error('Failed to open draft:', err)
        }
    }

    function onDraftSaved(savedDraft) {
        setCurrentDraft(savedDraft)
        // Refresh mail list if on drafts folder
        if (filterBy.status === 'draft') {
            loadMails()
        }
    }

    function onCloseCompose() {
        setIsComposing(false)
        setCurrentDraft(null)
        // Refresh to show new draft in list
        if (filterBy.status === 'draft') {
            loadMails()
        }
    }

    function getStatusTitle() {
        const status = filterBy.status
        return status.charAt(0).toUpperCase() + status.slice(1)
    }

    if (!mails) return <div className="loading">Loading...</div>

    return (
        <section className="mail-index">
            <aside className="mail-sidebar">
                <button 
                    className="compose-btn"
                    onClick={() => setIsComposing(true)}
                >
                    <span className="compose-icon">✏️</span>
                    <span>Compose</span>
                </button>
                <MailFolderList unreadCount={unreadCount} />
            </aside>

            <main className="mail-main">
                <MailFilter filterBy={filterBy} onFilter={onFilter} />
                <div className="mail-header">
                    <h2>{getStatusTitle()}</h2>
                    <span className="mail-count">{mails.length} emails</span>
                </div>
                <MailList 
                    mails={mails} 
                    onToggleStar={onToggleStar}
                    onToggleRead={onToggleRead}
                    onOpenDraft={onOpenDraft}
                    isDraftFolder={filterBy.status === 'draft'}
                />
            </main>

            {isComposing && (
                <MailCompose 
                    onClose={onCloseCompose}
                    onSend={onSendMail}
                    draftMail={currentDraft}
                    onDraftSaved={onDraftSaved}
                />
            )}
        </section>
    )
}

