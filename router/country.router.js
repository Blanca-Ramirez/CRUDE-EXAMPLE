const router = require('express').Router();

const mongoose = require('mongoose');
var status = require('http-status');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/countries', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Country = require('../models/country.model');

module.exports = () => {
    /** Insertar paises */
    router.post('/', (req, res) => {
        country = req.body;
        Country.create(country)
            .then(
                (data) => {
                    res.json({
                        code: status.OK,
                        msg: 'Se inserto correctamente',
                        data: data
                    })
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json(
                            {
                                code: status.BAD_REQUEST,
                                msg: 'Ocurrio un error',
                                err: err.name,
                                detal: err.message
                            }
                        )
                }
            )
    });

    /**Consulta general de paises */
    router.get('/', (req, res) => {
        Country.find({})
            .then(
                (countries) => {
                    res.json({
                        code: status.OK,
                        msg: 'Consulta correcta',
                        data: countries
                    })
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la peticion',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    })

    /**Consulta de un pais por _id */
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        Country.findOne({ _id: id })
            .then(
                (country) => {
                    if (country)
                        res.json({
                            code: status.OK,
                            msg: 'Consulta correcta',
                            data: country
                        });
                    else
                        res.status(status.NOT_FOUND)
                    res.json({
                        code: status.NOT_FOUND,
                        msg: 'No se encontro el elemento'
                    });
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la peticion',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    })

    /**Actualizacion */
    router.put('/:id', (req, res) => {
        id = req.params.id;
        country = req.body;
        Country.findByIdAndUpdate(id, country, { new: true })
            .then(
                (data) => {
                    console.log(data);
                    res.json({
                        code: status.OK,
                        msg: 'Se actualizo correctamente',
                        data: data
                    });
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST);
                    res.json({
                        code: status.BAD_REQUEST,
                        msg: 'Error en la aplicacion',
                        err: err.name,
                        detail: err.message
                    })
                }
            )
    })

    /** Eliminacion */
    router.delete('/:id', (req, res) => {
        id = req.params.id;
        Country.findByIdAndRemove(id)
            .then(
                (data) => {
                    if (data)
                        res.json({
                            code: status.OK,
                            msg: 'Se elimino correctamente',
                            data: data
                        })
                    else
                        res.status(status.NOT_FOUND)
                            .json({
                                code: status.NOT_FOUND,
                                msg: 'No se encontro elemento'
                            })
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la peticion',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    })

    return router;

}
