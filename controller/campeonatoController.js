const campeonatoModel = require('../model/campeonatoModel')

class CampeonatoController{
    get(){
        return campeonatoModel.get()
    }
}

module.exports = new CampeonatoController()