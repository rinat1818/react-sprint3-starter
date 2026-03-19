import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const KEEP_KEY = 'keepdb'

_createKeeps()

export const keepsServis = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getSpeedStats,
    getVendorStats,
    getEmptyNote
}

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
            // Text Notes (12 total, 4 in Japanese)
            {
                id: 'n101',
                createdAt: 1709251200000,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#faafa8' },
                info: {
                    noteTitle: 'Sprint 3 Goals',
                    txt: 'Complete React project with notes and mail apps. Focus on component architecture and state management.'
                }
            },
            {
                id: 'n102',
                createdAt: 1709337600000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#fff8b8' },
                info: {
                    noteTitle: 'Shopping List',
                    txt: 'Milk, Eggs, Bread, Cheese, Tomatoes, Olive oil, Pasta, Chicken'
                }
            },
            {
                id: 'n103',
                createdAt: 1709424000000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#e2f6d3' },
                info: {
                    noteTitle: 'Meeting Notes',
                    txt: 'Discussed project timeline. Deadline moved to next Friday. Need to finalize UI designs by Wednesday.'
                }
            },
            {
                id: 'n104',
                createdAt: 1709510400000,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#d4e4ed' },
                info: {
                    noteTitle: '日本語の勉強 (Japanese Study)',
                    txt: '毎日30分日本語を勉強する。漢字を20個覚える。アニメを字幕なしで見る練習をする。'
                }
            },
            {
                id: 'n105',
                createdAt: 1709596800000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#f39f76' },
                info: {
                    noteTitle: 'Workout Plan',
                    txt: 'Monday: Chest & Triceps\nWednesday: Back & Biceps\nFriday: Legs & Shoulders\nSunday: Cardio & Core'
                }
            },
            {
                id: 'n106',
                createdAt: 1709683200000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#b4ddd3' },
                info: {
                    noteTitle: 'Book Recommendations',
                    txt: 'Clean Code by Robert Martin, The Pragmatic Programmer, You Don\'t Know JS, Eloquent JavaScript'
                }
            },
            {
                id: 'n107',
                createdAt: 1709769600000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#d3bfdb' },
                info: {
                    noteTitle: '料理レシピ (Recipe)',
                    txt: '味噌汁の作り方：だし汁を沸かし、味噌を溶かす。豆腐とわかめを入れて完成！'
                }
            },
            {
                id: 'n108',
                createdAt: 1709856000000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#aeccdc' },
                info: {
                    noteTitle: 'Project Ideas',
                    txt: '1. Weather app with React\n2. Task manager with drag & drop\n3. Recipe finder API project\n4. Portfolio website redesign'
                }
            },
            {
                id: 'n109',
                createdAt: 1709942400000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#f6e2dd' },
                info: {
                    noteTitle: '旅行計画 (Travel Plans)',
                    txt: '東京：浅草寺、秋葉原、渋谷スクランブル交差点\n京都：金閣寺、伏見稲荷大社\n大阪：道頓堀、大阪城'
                }
            },
            {
                id: 'n110',
                createdAt: 1710028800000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#e9e3d4' },
                info: {
                    noteTitle: 'Birthday Gift Ideas',
                    txt: 'For Mom: Spa voucher, cookbook, plant\nFor Dad: Watch, golf accessories\nFor Sister: Headphones, art supplies'
                }
            },
            {
                id: 'n111',
                createdAt: 1710115200000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#efeff1' },
                info: {
                    noteTitle: 'Code Review Checklist',
                    txt: '✓ No console.logs\n✓ Proper naming conventions\n✓ Comments where needed\n✓ Error handling\n✓ Performance optimized'
                }
            },
            {
                id: 'n112',
                createdAt: 1710201600000,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#fff8b8' },
                info: {
                    noteTitle: '今日のタスク (Today\'s Tasks)',
                    txt: '朝：メールをチェック\n午後：プロジェクトミーティング\n夕方：コードレビュー\n夜：ジムに行く'
                }
            },

            // Image Notes (12 total, 4 in Japanese)
            {
                id: 'n201',
                createdAt: 1710288000000,
                type: 'NoteImg',
                isPinned: true,
                style: { backgroundColor: '#ffffff' },
                info: {
                    noteTitle: 'Birthday Wishlist',
                    url: 'img/gift.png',
                    txt: 'New mechanical keyboard, noise-canceling headphones, or a coffee machine!'
                }
            },
            {
                id: 'n202',
                createdAt: 1710374400000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#b4ddd3' },
                info: {
                    noteTitle: 'LEGO Collection',
                    url: 'img/lego.png',
                    txt: 'Building the Star Wars Millennium Falcon set - 7541 pieces!'
                }
            },
            {
                id: 'n203',
                createdAt: 1710460800000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#d3bfdb' },
                info: {
                    noteTitle: 'Cute Teddy Bear',
                    url: 'img/bear.png',
                    txt: 'Found this adorable bear at the vintage shop. Perfect for the bedroom!'
                }
            },
            {
                id: 'n204',
                createdAt: 1710547200000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#aeccdc' },
                info: {
                    noteTitle: 'Dream Vacation',
                    url: 'img/fly.png',
                    txt: 'Planning a trip to Japan next spring. Cherry blossom season!'
                }
            },
            {
                id: 'n205',
                createdAt: 1710633600000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#faafa8' },
                info: {
                    noteTitle: 'プレゼントアイデア',
                    url: 'img/gift.png',
                    txt: '彼女へのプレゼント：ネックレス、香水、花束、手作りのカード'
                }
            },
            {
                id: 'n206',
                createdAt: 1710720000000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#fff8b8' },
                info: {
                    noteTitle: 'LEGO Architecture',
                    url: 'img/lego.png',
                    txt: 'Next project: Tokyo Skyline set. Features Tokyo Tower and Tokyo Skytree!'
                }
            },
            {
                id: 'n207',
                createdAt: 1710806400000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#e2f6d3' },
                info: {
                    noteTitle: 'くまのぬいぐるみ',
                    url: 'img/bear.png',
                    txt: '子供の頃からの大切なテディベア。思い出がいっぱい詰まっている。'
                }
            },
            {
                id: 'n208',
                createdAt: 1710892800000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#f39f76' },
                info: {
                    noteTitle: 'Flight Booked!',
                    url: 'img/fly.png',
                    txt: 'Confirmation #AB12345 - Tel Aviv to Tokyo, March 25th. Window seat!'
                }
            },
            {
                id: 'n209',
                createdAt: 1710979200000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#d4e4ed' },
                info: {
                    noteTitle: 'Anniversary Gift',
                    url: 'img/gift.png',
                    txt: 'Ordered matching couple watches. Should arrive by next week.'
                }
            },
            {
                id: 'n210',
                createdAt: 1711065600000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#f6e2dd' },
                info: {
                    noteTitle: 'レゴで東京タワー',
                    url: 'img/lego.png',
                    txt: '東京タワーのレゴを完成させた！3時間かかったけど楽しかった。'
                }
            },
            {
                id: 'n211',
                createdAt: 1711152000000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#e9e3d4' },
                info: {
                    noteTitle: 'Vintage Teddy',
                    url: 'img/bear.png',
                    txt: '1950s vintage teddy bear from estate sale. Great condition!'
                }
            },
            {
                id: 'n212',
                createdAt: 1711238400000,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#efeff1' },
                info: {
                    noteTitle: '飛行機からの景色',
                    url: 'img/fly.png',
                    txt: '富士山が窓から見えた！素晴らしい景色だった。写真を撮るのを忘れずに。'
                }
            }
        ]
        
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
      
        return storageService.post(KEEP_KEY, note)
    }
}


