import { storageService } from '../../../services/storage.service.js'

const email = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
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
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: 'e104',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: 'e105',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
    }
]



// import { utilService } from './util.service.js'

export const emailService = {
    getById,
    query,
    // remove,
    // getVendors,
    // getNextemailId,
    // save
}

const KEY = 'emailsDB'
// var gVendors = ['audi', 'fiat', 'suzuki', 'honda', 'mazda']

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

    // if (filterBy) {
    //     let { vendor, minSpeed, maxSpeed } = filterBy
    //     if (!minSpeed) minSpeed = 0;
    //     if (!maxSpeed) maxSpeed = Infinity
    //     emails = emails.filter(email => (
    //         email.vendor.includes(vendor) &&
    //         email.speed >= minSpeed &&
    //         email.speed <= maxSpeed
    //     ))
    // }

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

// function remove(emailId) {
//     // return Promise.reject('Not now!!!')
//     let emails = _loadFromStorage()
//     emails = emails.filter(email => email.id !== emailId)
//     _saveToStorage(emails)
//     return Promise.resolve()
// }

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

// function getVendors() {
//     return gVendors
// }

// function _createemail(vendor, speed = utilService.getRandomIntInclusive(1, 200)) {
//     return {
//         id: utilService.makeId(),
//         vendor,
//         speed,
//         desc: utilService.makeLorem()
//     }
// }

// {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt : 1551133930594,
//     to: 'momo@momo.com'
// }

function _createEmail(email) {
    return {
        id: email.id,
        subject: email.subject,
        body: email.body,
        isRead: email.isRead,
        sentAt: email.sentAt,
        to: email.to
    }
}

function _createEmails() {
    console.log('emails:')
    const emails = []
    for (let i = 0; i < 5; i++) {
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