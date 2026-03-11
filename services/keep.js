import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const KEEP_KEY = 'keepdb'
// CAR_KEY

_createKeeps()

export const keepsServis = {
    query,
    get,
    remove,
    save,
    // getEmptyCar,
    getDefaultFilter,
    getSpeedStats,
    getVendorStats,
    fetchBooks,
    // getEmptyBook,
    getEmptyNote
}

function query(filterBy = {}) {
    return storageService.query(KEEP_KEY).then(books => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            books = books.filter(book => regExp.test(book.title))
        }
        return books
    })
}

function get(carId) {
    return storageService.get(KEEP_KEY, carId)
        .then(car => {
            car = _setNextPrevCarId(car)
            return car
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
    isPinned: true, 
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
    isPinned: true, 
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
    isPinned: true, 
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
    isPinned: true, 
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
      url: '/img/h.png', 
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
        //     cars.push(_createCar(vendor, utilService.getRandomIntInclusive(80, 300)))
        // }
        utilService.saveToStorage(KEEP_KEY, notes)
    }
}
function _setNextPrevCarId(car) {
    return storageService.query(KEEP_KEY).then((cars) => {
        const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
        const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
        const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
        car.nextCarId = nextCar.id
        car.prevCarId = prevCar.id
        return car
    })
}
// function getEmptyCar(vendor = '', maxSpeed = '') {
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
function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
    return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
}

function getSpeedStats() {
    return storageService.query(KEEP_KEY)
        .then(cars => {
            const carCountBySpeedMap = _getCarCountBySpeedMap(cars)
            const data = Object.keys(carCountBySpeedMap).map(speedName => ({ title: speedName, value: carCountBySpeedMap[speedName] }))
            return data
        })
}

function getVendorStats() {
    return storageService.query(KEEP_KEY)
        .then(cars => {
            const carCountByVendorMap = _getCarCountByVendorMap(cars)
            const data = Object.keys(carCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((carCountByVendorMap[vendor] / cars.length) * 100)
                }))
            return data
        })
}

// function _createCars() {
//     let cars = utilService.loadFromStorage(CAR_KEY)
//     if (!cars || !cars.length) {
//         cars = []
//         const vendors = ['audu', 'fiak', 'subali', 'mitsu']
//         for (let i = 0; i < 6; i++) {
//             const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
//             cars.push(_createCar(vendor, utilService.getRandomIntInclusive(80, 300)))
//         }
//         utilService.saveToStorage(CAR_KEY, cars)
//     }
// }

function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
}

function _setNextPrevCarId(car) {
    return storageService.query(KEEP_KEY).then((cars) => {
        const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
        const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
        const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
        car.nextCarId = nextCar.id
        car.prevCarId = prevCar.id
        return car
    })
}

function _getCarCountBySpeedMap(cars) {
    const carCountBySpeedMap = cars.reduce((map, car) => {
        if (car.maxSpeed < 120) map.slow++
        else if (car.maxSpeed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return carCountBySpeedMap
}

function _getCarCountByVendorMap(cars) {
    const carCountByVendorMap = cars.reduce((map, car) => {
        if (!map[car.vendor]) map[car.vendor] = 0
        map[car.vendor]++
        return map
    }, {})
    return carCountByVendorMap
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
