import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
  
const gEmails = [
    {
        id: 'e101',
        subject: 'Hello',
        body: 'Thank you for letting me know',
        isRead: false,
        sentAt : 1551133930594,
        from: 'Jonah Hill',
        to: 'momo@momo.com'
    },
    {
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551137930594,
        from: 'Edward Norton',
        to: 'momo@momo.com'
    },
    {
        id: 'e103',
        subject: 'Shalom',
        body: 'Can you please fill out this form?',
        isRead: false,
        sentAt : 1551131930594,
        from: 'Jonah Hill',
        to: 'momo@momo.com'
    },
    {
        id: 'e104',
        subject: 'Hello',
        body: 'We are sorry to inform you that the meeting scheduled for Tuesday will have to be rescheduled. Would you be available on Sunday?',
        isRead: false,
        sentAt : 1571153930594,
        from: 'Seth Rogen',
        to: 'momo@momo.com'
    },
    {
        id: 'e105',
        subject: 'Hi',
        body: 'If you could please shed some light on this topic, I would really appreciate it.',
        isRead: false,
        sentAt : 1511133930594,
        from: 'Edward Norton',
        to: 'momo@momo.com'
    },
    {
        id: 'e106',
        subject: 'Miss you!',
        body: 'Please let me know what you think',
        isRead: false,
        sentAt : 1551133930594,
        from: 'Seth Rogen',
        to: 'momo@momo.com'
    },
    {
        id: 'e107',
        subject: 'Hey there!',
        body: 'We are sorry to inform you that the meeting scheduled for Tuesday will have to be rescheduled. Please let me know if this is OK with you.',
        isRead: false,
        sentAt : 1558133930594,
        from: 'Jonah Hill',
        to: 'momo@momo.com'
    },
    {
        id: 'e108',
        subject: 'Miss you!',
        body: 'It was great to see you on Thursday. What are your thoughts on this?',
        isRead: false,
        sentAt : 1551133930594,
        from: 'Edward Norton',
        to: 'momo@momo.com'
    },
    {
        id: 'e109',
        subject: 'Hey there!',
        body: 'See you on next week',
        isRead: false,
        sentAt : 1559133930594,
        from: 'Jonah Hill',
        to: 'momo@momo.com'
    },
    {
        id: 'e110',
        subject: 'Miss you!',
        body: 'Thank you for everything',
        isRead: false,
        sentAt : 1551133930594,
        from: 'Seth Rogen',
        to: 'momo@momo.com'
    },
    {
        id: 'e111',
        subject: 'Hello',
        body: 'Thank you for letting me know',
        isRead: false,
        sentAt : 1551133930594,
        from: 'Jonah Hill',
        to: 'momo@momo.com'
    },
    {
        id: 'e112',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551137930594,
        from: 'Edward Norton',
        to: 'momo@momo.com'
    }
]

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

const KEY = 'emailsDB'

export const emailService = {
    getById,
    query,
    remove,
    updateRead,
    save
}

function query(filterBy) {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _createEmails()
        _saveToStorage(gEmails)
    }
    if (filterBy) {
        let { subject } = filterBy
        emails = emails.filter(email => (
            email.subject.toUpperCase().includes(subject.toUpperCase()) 
        ))
    }
    return Promise.resolve(emails)
}

function getById(emailId) {
    if (!emailId) return Promise.resolve(null)
    const emails = _loadFromStorage()
    const email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

function remove(emailId) {
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    _saveToStorage(emails)
    return Promise.resolve()
}

function updateRead(emailId) {
    let emails = _loadFromStorage() || gEmails
    const email = emails.find(email => email.id === emailId)
    if (!email.isRead) {
        email.isRead = true
    }
    _saveToStorage(emails)
    return emails
}

function save(email) {
    return _add(email)
}

function _add(email) {
    let emails = _loadFromStorage()
    const newEmail = _composeEmail(email)
    emails = [newEmail, ...emails]
    _saveToStorage(emails)
    return Promise.resolve(email)
}

function _composeEmail(email) {
    return {
        id: utilService.makeId(),
        subject: email.subject,
        body: email.body,
        isRead: false,
        sentAt: Date.now(),
        from: 'Me',
        to: email.to
    }
}

function _createEmail(email) {
    return {
        id: email.id,
        subject: email.subject,
        body: email.body,
        isRead: email.isRead,
        sentAt: email.sentAt,
        from: email.from,
        to: email.to
    }
}

function _createEmails() {
    const emails = []
    for (let i = 0; i < 12; i++) {
        emails.push(_createEmail(gEmails[i]))
    }
    return emails
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
