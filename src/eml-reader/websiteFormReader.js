const fs = require('fs')
const mailparser = require('mailparser')

const emlFile = fs.readFileSync('sample.eml', 'utf8')

mailparser.simpleParser(emlFile, (error, parsedMail) => {
    if(error) {
        console.log(error)
        return
    }


    const splitUpMailLines = parsedMail.text.split('\n').filter(element => element != "")

    const filteredMailLines = splitUpMailLines.map(element => element.toLowerCase())

    const fromEmail = parsedMail.from['value'][0]['adress']
    const from = parsedMail.from['value'][0]['name']
    const orderDate = parsedMail.date
    const subject = parsedMail.subject
})

