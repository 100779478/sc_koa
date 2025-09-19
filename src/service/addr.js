const Address = require("../model/addr");

class AddrService {
    async addAddress(user_id, params) {
        console.log({user_id, ...params})
        const res = await Address.create({user_id, ...params})
        console.log(res)
        return res;
    }
}

module.exports = new AddrService()