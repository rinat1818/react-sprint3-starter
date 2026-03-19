import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getLoggedInUser,
    getUnreadCount
}

async function query(filterBy = {}) {
    let mails = await storageService.query(MAIL_KEY)
    
    if (filterBy.status) {
        switch (filterBy.status) {
            case 'inbox':
                mails = mails.filter(mail => mail.to === loggedInUser.email && !mail.removedAt)
                break
            case 'sent':
                mails = mails.filter(mail => mail.from === loggedInUser.email && !mail.removedAt)
                break
            case 'trash':
                mails = mails.filter(mail => mail.removedAt)
                break
            case 'draft':
                mails = mails.filter(mail => mail.isDraft && !mail.removedAt)
                break
            case 'starred':
                mails = mails.filter(mail => mail.isStarred && !mail.removedAt)
                break
        }
    }
    
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => 
            regex.test(mail.subject) || 
            regex.test(mail.body) || 
            regex.test(mail.from)
        )
    }
    
    if (filterBy.isRead !== undefined && filterBy.isRead !== 'all') {
        const isRead = filterBy.isRead === 'read'
        mails = mails.filter(mail => mail.isRead === isRead)
    }
    
    // Sort by date, newest first
    mails.sort((a, b) => b.sentAt - a.sentAt)
    
    return mails
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

async function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail.sentAt = Date.now()
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null,
        isDraft: false,
        from: loggedInUser.email,
        to: ''
    }
}

function getDefaultFilter() {
    return { status: 'inbox', txt: '', isRead: 'all' }
}

function getLoggedInUser() {
    return loggedInUser
}

async function getUnreadCount() {
    const mails = await storageService.query(MAIL_KEY)
    return mails.filter(mail => 
        mail.to === loggedInUser.email && 
        !mail.isRead && 
        !mail.removedAt
    ).length
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (mails && mails.length) return

    mails = [
        {
            id: utilService.makeId(),
            subject: 'Welcome to Appsus Mail!',
            body: 'Hello and welcome to your new inbox! We hope you enjoy using Appsus Mail. This is your central hub for all communications. Feel free to explore all the features we have to offer.',
            isRead: false,
            isStarred: true,
            sentAt: Date.now() - 1000 * 60 * 60,
            removedAt: null,
            isDraft: false,
            from: 'support@appsus.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Your Weekly Report',
            body: 'Here is your weekly productivity report. You have completed 15 tasks this week, which is a 20% increase from last week. Keep up the great work! We are proud of your progress.',
            isRead: true,
            isStarred: false,
            sentAt: Date.now() - 1000 * 60 * 60 * 24,
            removedAt: null,
            isDraft: false,
            from: 'reports@company.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Meeting Tomorrow at 10 AM',
            body: 'Reminder: We have a team meeting scheduled for tomorrow at 10 AM. Please prepare your project updates and any blockers you might have. Looking forward to seeing everyone there!',
            isRead: false,
            isStarred: true,
            sentAt: Date.now() - 1000 * 60 * 60 * 3,
            removedAt: null,
            isDraft: false,
            from: 'manager@company.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'New Feature Release',
            body: 'We are excited to announce a new feature in our application! The dark mode is now available. Go to settings to enable it. We hope you enjoy this new addition to enhance your experience.',
            isRead: true,
            isStarred: false,
            sentAt: Date.now() - 1000 * 60 * 60 * 48,
            removedAt: null,
            isDraft: false,
            from: 'updates@appsus.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Invoice #12345',
            body: 'Please find attached your invoice for this month. The total amount due is $99.99. Payment is due within 30 days. Thank you for your business!',
            isRead: false,
            isStarred: false,
            sentAt: Date.now() - 1000 * 60 * 60 * 72,
            removedAt: null,
            isDraft: false,
            from: 'billing@service.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Re: Project proposal',
            body: 'Thank you for sending the proposal. I have reviewed it and I think it looks great! Let us schedule a call to discuss the next steps and timeline.',
            isRead: true,
            isStarred: false,
            sentAt: Date.now() - 1000 * 60 * 30,
            removedAt: null,
            isDraft: false,
            from: 'user@appsus.com',
            to: 'client@business.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Old Newsletter',
            body: 'This is an old newsletter that was moved to trash.',
            isRead: true,
            isStarred: false,
            sentAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
            removedAt: Date.now() - 1000 * 60 * 60,
            isDraft: false,
            from: 'newsletter@spam.com',
            to: 'user@appsus.com'
        }
    ]

    utilService.saveToStorage(MAIL_KEY, mails)
}