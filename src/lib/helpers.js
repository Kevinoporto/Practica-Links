const bcrypt = require('bcryptjs')
const helpers = {};

helpers.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

helpers.matchPassword = async(password, savedPassword)=>{
    try{

        const p = await bcrypt.compare(password, savedPassword);
        console.log(p);
        return p;
    }catch(e){
        console.log(e);
    };
};


module.exports = helpers;