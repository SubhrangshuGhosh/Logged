const ensureAuthenticated = require('../Middlewares/Auth');



const router = require('express').Router();
console.log("Product Router loaded")

router.get('/',ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobbile",
            price: 10000
        },
        {
            name: "laptop",
            price: 10250
        }
    ])
})

module.exports = router;