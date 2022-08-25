import { storageService } from '../../../services/storage.service.js'

const email = {
    id: 'e101',
    subject: 'Hello',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    from: 'Jonah Hill',
    to: 'momo@momo.com'
}
    
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
        sentAt : 1551133930594,
        from: 'Edward Norton',
        to: 'momo@momo.com'
    },
    {
        id: 'e103',
        subject: 'Shalom',
        body: 'Can you please fill out this form?',
        isRead: false,
        sentAt : 1551133930594,
        from: 'Jonah Hill',
        to: 'momo@momo.com'
    },
    {
        id: 'e104',
        subject: 'Hello',
        body: 'It was great to see you on Thursday',
        isRead: false,
        sentAt : 1551133930594,
        from: 'Seth Rogen',
        to: 'momo@momo.com'
    },
    {
        id: 'e105',
        subject: 'Hi',
        body: 'Thank you for sharing',
        isRead: false,
        sentAt : 1551133930594,
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
        body: 'I hope you had a great trip',
        isRead: false,
        sentAt : 1551133930594,
        from: 'Jonah Hill',
        to: 'momo@momo.com'
    },
    {
        id: 'e108',
        subject: 'Miss you!',
        body: 'Would you be available on Sunday?',
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
        sentAt : 1551133930594,
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
    }
]



// import { utilService } from './util.service.js'

export const emailService = {
    getById,
    query,
    remove,
    // getVendors,
    // getNextemailId,
    // save
}

const KEY = 'emailsDB1'


function query(filterBy) {
    console.log('query')
    let emails = _loadFromStorage()
    if (!emails) {
        console.log('query22')
        emails = _createEmails()
        _saveToStorage(gEmails)
        console.log('query33')
    }
    console.log('query', gEmails)
    console.log('query', emails)

    if (filterBy) {
        console.log('filterBy:', filterBy)
        let { subject } = filterBy
        console.log('subject:', subject)
        emails = emails.filter(email => (
            // email.subject.includes(subject) 
            email.subject.toUpperCase().includes(subject.toUpperCase()) 
        ))
        console.log('emails :', emails)
    }

    return Promise.resolve(emails)
}

function getById(emailId) {
    if (!emailId) return Promise.resolve(null)
    const emails = _loadFromStorage()
    const email = emails.find(email => emailId === email.id)
    return Promise.resolve(email)
}

// function getNextemailId(emailId) {
//     let emails = _loadFromStorage()
//     const emailIdx = emails.findIndex(email => email.id === emailId)
//     const nextemailIdx = emailIdx + 1 === emails.length ? 0 : emailIdx + 1
//     return emails[nextemailIdx].id
// }

function remove(emailId) {
    console.log('remove12')
    let emails = _loadFromStorage()
    emails = emails.filter(email => email.id !== emailId)
    _saveToStorage(emails)
    return Promise.resolve()
}

// function save(email) {
//     if(email.id) return _update(email)
//     else return _add(email)
// }

// function _add({ vendor, speed }) {
//     let emails = _loadFromStorage()
//     const email = _createemail(vendor, speed)
//     emails = [email, ...emails]
//     _saveToStorage(emails)
//     return Promise.resolve(email)
// }

// function _update(emailToUpdate) {
//     let emails = _loadFromStorage()
//     emails = emails.map(email => email.id === emailToUpdate.id ? emailToUpdate : email)
//     _saveToStorage(emails)
//     return Promise.resolve(emailToUpdate)
// }


// function _createemail(vendor, speed = utilService.getRandomIntInclusive(1, 200)) {
//     return {
//         id: utilService.makeId(),
//         vendor,
//         speed,
//         desc: utilService.makeLorem()
//     }
// }



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
    console.log('emails:')
    const emails = []
    for (let i = 0; i < 10; i++) {
    //     const email = emails[i]
        // const vendor = gVendors[utilService.getRandomIntInclusive(0, gVendors.length - 1)]
        emails.push(_createEmail(gEmails[i]))
    //     emails.push(email)
    }
    console.log('emails:', emails)
    return emails
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

// localStorage.clear()

// 🔍🔎📩📧✉️📩📫📪