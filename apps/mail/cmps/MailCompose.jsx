const { useState, useEffect, useRef } = React

import { mailService } from '../services/mail.service.js'

export function MailCompose({ onClose, onSend, draftMail, onDraftSaved }) {
    const [mail, setMail] = useState(draftMail || {
        id: null,
        to: '',
        subject: '',
        body: ''
    })
    const [isMinimized, setIsMinimized] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const autoSaveTimer = useRef(null)
    const lastSavedContent = useRef(JSON.stringify({ to: '', subject: '', body: '' }))
    const mailRef = useRef(mail)

    // Keep mailRef in sync with mail state
    useEffect(() => {
        mailRef.current = mail
    }, [mail])

    useEffect(() => {
        // Initialize lastSavedContent with initial mail data
        if (draftMail) {
            lastSavedContent.current = JSON.stringify({ 
                to: draftMail.to, 
                subject: draftMail.subject, 
                body: draftMail.body 
            })
        }
        
        // Set up auto-save interval
        autoSaveTimer.current = setInterval(() => {
            saveDraft()
        }, 5000)

        return () => {
            // Clean up timer on unmount
            if (autoSaveTimer.current) {
                clearInterval(autoSaveTimer.current)
            }
        }
    }, [])

    useEffect(() => {
        // Update mail state when draftMail prop changes
        if (draftMail) {
            setMail(draftMail)
            lastSavedContent.current = JSON.stringify({ 
                to: draftMail.to, 
                subject: draftMail.subject, 
                body: draftMail.body 
            })
        }
    }, [draftMail])

    async function saveDraft() {
        const currentMail = mailRef.current
        const currentContent = JSON.stringify({ 
            to: currentMail.to, 
            subject: currentMail.subject, 
            body: currentMail.body 
        })
        
        // Only save if content has changed and there's something to save
        if (currentContent === lastSavedContent.current) return
        if (!currentMail.to && !currentMail.subject && !currentMail.body) return

        setIsSaving(true)
        try {
            const draftToSave = mailService.getEmptyMail()
            draftToSave.id = currentMail.id || null
            draftToSave.to = currentMail.to
            draftToSave.subject = currentMail.subject
            draftToSave.body = currentMail.body
            draftToSave.isDraft = true
            draftToSave.sentAt = currentMail.sentAt || Date.now()

            const savedDraft = await mailService.save(draftToSave)
            setMail(prev => ({ ...prev, id: savedDraft.id }))
            lastSavedContent.current = currentContent
            
            if (onDraftSaved) onDraftSaved(savedDraft)
        } catch (err) {
            console.error('Failed to save draft:', err)
        } finally {
            setIsSaving(false)
        }
    }

    function handleChange({ target }) {
        const { name, value } = target
        setMail(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        if (!mail.to) return
        
        // Clear the auto-save timer before sending
        if (autoSaveTimer.current) {
            clearInterval(autoSaveTimer.current)
        }
        
        onSend(mail)
    }

    function handleMinimize() {
        setIsMinimized(prev => !prev)
    }

    return (
        <div className={`mail-compose ${isMinimized ? 'minimized' : ''}`}>
            <header className="compose-header">
                <span>New Message</span>
                <div className="compose-actions">
                    <button 
                        className="minimize-btn" 
                        onClick={handleMinimize}
                        title={isMinimized ? 'Expand' : 'Minimize'}
                    >
                        {isMinimized ? '🔼' : '🔽'}
                    </button>
                    <button 
                        className="close-btn" 
                        onClick={onClose}
                        title="Close"
                    >
                        ✕
                    </button>
                </div>
            </header>
            
            {!isMinimized && (
                <form onSubmit={handleSubmit}>
                    <div className="compose-field">
                        <input
                            type="email"
                            name="to"
                            placeholder="To"
                            value={mail.to}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="compose-field">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={mail.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="compose-body">
                        <textarea
                            name="body"
                            placeholder="Write your message..."
                            value={mail.body}
                            onChange={handleChange}
                            rows="10"
                        />
                    </div>
                    <footer className="compose-footer">
                        <button type="submit" className="send-btn">
                            Send
                        </button>
                        {isSaving && <span className="saving-indicator">Saving draft...</span>}
                        {!isSaving && mail.id && <span className="saved-indicator">Draft saved</span>}
                        <button 
                            type="button" 
                            className="discard-btn"
                            onClick={onClose}
                            title="Close (draft will be saved)"
                        >
                            🗑️
                        </button>
                    </footer>
                </form>
            )}
        </div>
    )
}
