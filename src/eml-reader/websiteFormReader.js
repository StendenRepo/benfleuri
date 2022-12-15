const fs = require('fs')
const mailparser = require('mailparser')

const emlFile = fs.readFileSync('sample.eml', 'utf8')

mailparser.simpleParser(emlFile, (error, parsedMail) => {
    if(error) {
        console.log(error)
        return
    }
})