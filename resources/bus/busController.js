const Bus = require('./bus.model');
const validation = require('./busValidation')

const addBus = async (req,res) =>{
    try{
        const { error } = validation.validateBus(req.body)
        if (error) {
            return res.status(422).json({
                message: error.details[0].message
            })
        }
        const { number_plate, year, manufacturer, model, capacity } = req.body

        let doc = await Bus.findOne({number_plate})
        if(doc) {
           return res.status(409).json({
                message:'Bus already exists'
            })
        }

        doc = new Bus({
            number_plate,
            year,
            manufacturer,
            model,
            capacity
        })
            await doc.save();

            return res.status(201).json({
                message:'Bus added successfuly',
                bus:doc
            })

    }
    catch(error){
        return res.status(500).json({
            status: 500,
            error:error.message || 'Something went wrong'
        }
        )}

}

module.exports = { addBus }