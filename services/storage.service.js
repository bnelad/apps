export const storageService = {
    loadFromStorage,
    saveToStorage
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
    console.log('storage save')
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    console.log('storage load')
    return JSON.parse(val)
}