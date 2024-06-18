const { deletedFilms } = require('../../../data/deletedData.js')
const {getAllFilms, getFilmByID, getFilmByDirector} = require('../../domain/films/films.js')
const newID = require('../../functions/createID.js')

let newFilm = {
    id: 0,
    title: 'string',
    director: 'string'
}

const getAll = (req, res) => {
    res.status(200).json({
        films: getAllFilms()
    })
}

const addFilm = (req, res) => {
    newFilm.id = newID(getAllFilms())
    newFilm.title = req.body.title
    newFilm.director = req.body.director

    getAllFilms().push(newFilm)
    res.status(201).json({
        film: newFilm
    })
}

const getByID = (req, res) => {
    const id = Number(req.params.id)
    const found = getFilmByID(id)
    res.status(200).json({
        film: found
    })
}

const removeFIlm = (req, res) => {
    const id = Number(req.params.id)
    const found = getFilmByID(id)

    deletedFilms.push(found)
    const index = getAllFilms().indexOf(found)
    getAllFilms().splice(index, 1)
    res.status(200).json({
        film: found
    })
}

const updateFilm = (req, res) => {
    const id = Number(req.params.id)
    const found = getFilmByID(id)

    if (typeof id !== "number") {
        throw new InvalidDataError("ID must be a number")
    }

    if (!found) {
        throw new NotFoundError("Film not found")
    }

    found.title = req.body.title
    found.director = req.body.director

    if (
        found.title === "" ||
        found.director === ""
    ) {
        throw new FieldMissing("Missing fields")
    }

    res.status(200).json({
        film: found
    })
}

const filterByDirector = (req, res) => {
    const director = req.query.director
    
    const found = getFilmByDirector(director)
    
    res.status(200).json({
        films: found
    })
}

module.exports = {
    getAll,
    addFilm,
    getByID,
    removeFIlm,
    updateFilm,
    filterByDirector
}