import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const KEEP_KEY = 'keepdb'
// NOTE_KEY

// _createKeeps()

export const keepsServis = {
    query,
    get,
    remove,
    save,
    // getEmptyNote,
    getDefaultFilter,
    getSpeedStats,
    getVendorStats,
    fetchBooks,
    // getEmptyBook,
    getEmptyNote
}

// function query(filterBy = {}) {
//     return storageService.query(KEEP_KEY).then(books => {
//         if (filterBy.txt) {
//             const regExp = new RegExp(filterBy.txt, 'i')
//             books = books.filter(book => regExp.test(book.title))
//         }
//         return books
//     })
// }

function query(filterBy = {}) {
    return storageService.query(KEEP_KEY).then(notes => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            notes = notes.filter(note => {
                if (note.type === 'NoteTxt') return regExp.test(note.info.txt)
                if (note.type === 'NoteImg') return regExp.test(note.info.title)
                return false
            })
        }
        return notes
    })
}

function get(noteId) {
    return storageService.get(KEEP_KEY, noteId)
        .then(note => {
            note = _setNextPrevNoteId(note)
            return note
        })
}
function remove(bookId) {
    return storageService.remove(KEEP_KEY, bookId)
}
function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
    return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
}


// function getEmptyNote(title = '', description = '', amount = 0) {
//   return {
//     createdAt,
//     type,
//     isPinned,
//     style: {
//       backgroundColo,
//     },
//     info: {
//       txt,
//     }

//   }
// }

function getEmptyNote(txt = '') {
    return {
        // id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            noteTitle: '',
            txt
        }
    }
}

function _createKeeps() {
    let notes = utilService.loadFromStorage(KEEP_KEY)
    console.log(notes);

    if (!notes || !notes.length) {

        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#f39f76'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            //   { 
            //     id: 'n102', 
            //     createdAt: 1112223, 
            //     type: 'NoteImg', 
            //     isPinned: false, 
            //     style: { 
            //       backgroundColor: '#0d0' 
            //     }, 
            //     info: { 
            //       url: 'img/h.png', 
            //       title: 'Bobi and Me' 
            //     } 
            //   },
            {
                id: 'n103',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#fff8b8'
                },
                info: {
                    txt: 'by!'
                }
            },
            {
                id: 'n105',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#f39f76'
                },
                info: {
                    txt: 'Fullst!'
                }
            },
            {
                id: 'n106',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#fff8b8'
                },
                info: {
                    txt: 'rinat!'
                }
            },
            {
                id: 'n104',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#f39f76'
                },
                info: {
                    url: 'img/h.png',
                    title: 'Bobi and Me'
                }
            },
            //   { 
            //     id: 'n103', 
            //     createdAt: 1112224, 
            //     type: 'NoteTodos', 
            //     isPinned: false, 
            //     style: { 
            //       backgroundColor: '#d00' 
            //     }, 
            //     info: { 
            //       title: 'Get my stuff together', 
            //       todos: [ 
            //         { txt: 'Driving license', isDone: true }, 
            //         { txt: 'Coding power', isDone: false } 
            //       ] 
            //     } 
            //   }

        ]
        // books= []
        // const vendors = ['audu', 'fiak', 'subali', 'mitsu']
        // for (let i = 0; i < 6; i++) {
        //     const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
        //     notes.push(_createNote(vendor, utilService.getRandomIntInclusive(80, 300)))
        // }
        utilService.saveToStorage(KEEP_KEY, notes)
    }
}
function _setNextPrevNoteId(note) {
    return storageService.query(KEEP_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}
// function getEmptyNote(vendor = '', maxSpeed = '') {
//     return { vendor, maxSpeed }
// }
// function getEmptyBook(title = '', description = '', amount = 0) {
//   return {
//     title,
//     description,
//     listPrice: {
//       amount,
//       currencyCode: 'EUR',
//       isOnSale: false
//     }
//   }
// }
function getDefaultFilter() {
    return { txt: '' }
}

function getSpeedStats() {
    return storageService.query(KEEP_KEY)
        .then(notes => {
            const noteCountBySpeedMap = _getNoteCountBySpeedMap(notes)
            const data = Object.keys(noteCountBySpeedMap).map(speedName => ({ title: speedName, value: noteCountBySpeedMap[speedName] }))
            return data
        })
}

function getVendorStats() {
    return storageService.query(KEEP_KEY)
        .then(notes => {
            const noteCountByVendorMap = _getNoteCountByVendorMap(notes)
            const data = Object.keys(noteCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((noteCountByVendorMap[vendor] / notes.length) * 100)
                }))
            return data
        })
}

// function _createNotes() {
//     let notes = utilService.loadFromStorage(NOTE_KEY)
//     if (!notes || !notes.length) {
//         notes = []
//         const vendors = ['audu', 'fiak', 'subali', 'mitsu']
//         for (let i = 0; i < 6; i++) {
//             const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
//             notes.push(_createNote(vendor, utilService.getRandomIntInclusive(80, 300)))
//         }
//         utilService.saveToStorage(NOTE_KEY, notes)
//     }
// }

function _createNote(vendor, maxSpeed = 250) {
    const note = getEmptyNote(vendor, maxSpeed)
    note.id = utilService.makeId()
    return note
}

function _setNextPrevNoteId(note) {
    return storageService.query(KEEP_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}

function _getNoteCountBySpeedMap(notes) {
    const noteCountBySpeedMap = notes.reduce((map, note) => {
        if (note.maxSpeed < 120) map.slow++
        else if (note.maxSpeed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return noteCountBySpeedMap
}

function _getNoteCountByVendorMap(notes) {
    const noteCountByVendorMap = notes.reduce((map, note) => {
        if (!map[note.vendor]) map[note.vendor] = 0
        map[note.vendor]++
        return map
    }, {})
    return noteCountByVendorMap
}
function save(note) {
    if (note.id) {
        return storageService.put(KEEP_KEY, note)
    } else {
        // book.thubnail=""
        return storageService.post(KEEP_KEY, note)
    }
}

function fetchBooks(term) {
    console.log(term);

    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${term}`)
        .then(books => {
            console.log(books);

            return books.data.items
        })
        .catch(err => {
            console.log(err)
            throw 'Oops... had a problem'
        })
        .finally(() => console.log('After service'))
}


// function ask() {
// 	return axios.get('https://yesno.wtf/api')
//         .then(res => res.data)
//         .catch(err => {
//             console.log(err)
//             throw 'Oops... had a problem'
//         })
//         .finally(() => console.log('After service'))
// }
