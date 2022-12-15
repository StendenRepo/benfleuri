const fs = require('fs')
const mailparser = require('mailparser')

const emlFile = fs.readFileSync('sample.eml', 'utf8')

mailparser.simpleParser(emlFile, (error, parsedMail) => {
    if(error) {
        console.log(error)
        return
    }


  // splits at every new line of the mail, putting the data in an array it then filters all of the empty entries out of the array
    const splitUpMailLines = parsedMail.text.split('\n').filter(element => element != "")

    const filteredMailLines = splitUpMailLines.map(element => element.toLowerCase())

  // gets the standard email header data
    const fromEmail = parsedMail.from['value'][0]['adress']
    const from = parsedMail.from['value'][0]['name']
    const orderDate = parsedMail.date
    const subject = parsedMail.subject

  // uses regex to extract the deliveryDate from the text
    const deliveryDate = parsedMail.text.match(/([0-9]+(\/[0-9]+)+)/i)[0]
    const reciever = filteredMailLines[filteredMailLines.indexOf('gegevens ontvanger') + 1]

  // gets adress data by looking for specific text like 'bezorgingsadres', and returns the array element after it
    const deliveryAdress = filteredMailLines[filteredMailLines.indexOf('bezorgingsadres') + 1]
    const deliveryPostalCode = filteredMailLines[filteredMailLines.indexOf('bezorgingsadres') + 2].replace(" ", "").substring(0, 7)
    const city = filteredMailLines[filteredMailLines.indexOf('bezorgingsadres') + 2].replace(" ", "").substring(7)
    const description = filteredMailLines[filteredMailLines.lastIndexOf('gegevens bestelling') + 1]

  // first finds the element that contains the word 'bedrag', then splits it into two at the : and replaces unnecessary characters
    const price = filteredMailLines.find(word => word.includes('bedrag')).split(':')[1].replaceAll(" ", "").replace("€", "")

    const findWithCard = filteredMailLines.find(word => word.includes('kaartje toevoegen:')).split(':')[1].replace(" ", "")
    const withCard = findWithCard == 'ja' ? true : false

    const cardText = filteredMailLines.find(word => word.includes('tekst kaartje:')).split(':')[1]

  //finds index of the element where the aanvullingen/opmerkingen beginnen
    const commentsIndex = filteredMailLines.indexOf(filteredMailLines.find(word => word.includes('aanvullingen')))

  // takes all elements that belong to aanvullingen/opmerkingen and joins them to a string
    const comments = filteredMailLines.slice(commentsIndex + 1, -1).join(' ')

    const extractedData = {
        'from': from,
        'fromEmail': fromEmail,
        'orderDate': orderDate,
        'subject': subject,
        'deliveryDate': deliveryDate,
        'reciever': reciever,
        'deliveryAdress': deliveryAdress,
        'deliveryPostalCode': deliveryPostalCode,
        'city': city,
        'description': description,
        'price': price,
        'withCard': withCard,
        'cardText': cardText,
        'comments': comments
    }

    console.log(extractedData)
})

