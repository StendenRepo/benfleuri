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


    const deliveryDate = parsedMail.text.match(/([0-9]+(\/[0-9]+)+)/i)[0]
    const reciever = filteredMailLines[filteredMailLines.indexOf('gegevens ontvanger') + 1]


    const deliveryAdress = filteredMailLines[filteredMailLines.indexOf('bezorgingsadres') + 1]
    const deliveryPostalCode = filteredMailLines[filteredMailLines.indexOf('bezorgingsadres') + 2].replace(" ", "").substring(0, 7)
    const city = filteredMailLines[filteredMailLines.indexOf('bezorgingsadres') + 2].replace(" ", "").substring(7)
    const description = filteredMailLines[filteredMailLines.lastIndexOf('gegevens bestelling') + 1]

})

