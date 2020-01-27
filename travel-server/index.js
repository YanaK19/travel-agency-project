const express = require('express')
const port = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'work;'
    })
})

app.listen(port, () => console.log(`Server has been started on ${port}`))
