const path = require('path');






//For showing role page
exports.getError = (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,'../','view','error.html'));
};

