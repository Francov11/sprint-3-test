const payments = require('../models/payments.model')

const validateMethod = async (req, res, next) => {
    try {
        const { method } = req.body
        if (!method) return res.status(404).json({ msg: 'Faltan datos', status: 404 })

        const methodExists = await payments.exists({ method: method });
        methodExists ? res.status(404).json({ msg: 'The name already exists', status: 404 }) : next()

    } catch {
        res.status(404).json({ msg: 'Request denied. Check data', status: 404 });
    }
}

const validateMethodID = async (req, res, next) => {
    try {
        validateId = await payments.exists({ _id: req.params.idPayment })
        !validateId ? res.status(404).send({ msg: 'that id payment does not exist', status: 404 }) : next()
      } 
      catch {
        res.status(404).json({ msg: 'that id payment does not exist', status: 404 })
      }
}

module.exports = {
    validateMethod,
    validateMethodID
}