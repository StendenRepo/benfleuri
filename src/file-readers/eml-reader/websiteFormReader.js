const fs = require('fs')
const mailparser = require('mailparser')

/**
 * This function take a eml file and reads all data that is needed from it by using string manipulation
 * This function is solely useable for mails from BenFleuri's own order form as the format is very specific
 */
export async function extractOrderFormData(emlFile) {
  try {
    const emlFileReader = await fs.promises.readFile(emlFile, 'utf8')
    const parsedMail = await mailparser.simpleParser(emlFileReader)

  // splits at every new line of the mail, putting the data in an array it then filters all of the empty entries out of the array
    const filteredMailLines = parsedMail.text.split('\n').filter(element => element != "")

  // gets the standard email header data
    const clientEmail = parsedMail.from['value'][0]['address']
    const clientName = parsedMail.from['value'][0]['name']
    const orderDate = parsedMail.date
    const subject = parsedMail.subject

  // uses regex to extract the deliveryDate from the text
    const deliveryDate = parsedMail.text.match(/([0-9]+(\/[0-9]+)+)/i)[0].replaceAll("/", "-")
    const name = filteredMailLines[filteredMailLines.indexOf('GEGEVENS ONTVANGER') + 1]

  // gets adress data by looking for specific text like 'bezorgingsadres', and returns the array element after it
    const adress = filteredMailLines[filteredMailLines.indexOf('BEZORGINGSADRES') + 1]
    const postalCode = filteredMailLines[filteredMailLines.indexOf('BEZORGINGSADRES') + 2].replace(" ", "").substring(0, 7).trim()
    const city = filteredMailLines[filteredMailLines.indexOf('BEZORGINGSADRES') + 2].replace(" ", "").substring(7)
    const description = filteredMailLines[filteredMailLines.lastIndexOf('GEGEVENS BESTELLING') + 1]

  // gets the info of the client, the person who placed the order
    const telNumber = filteredMailLines.find(word => word.includes("@")).split("/")[1].trim()

  // first finds the element that contains the word 'bedrag', then splits it into two at the : and replaces unnecessary characters
    const price = parseFloat(filteredMailLines.find(word => word.includes('Bedrag')).split(':')[1].replaceAll(" ", "").replaceAll("€", "").replace(",", "."))

    const findWithCard = filteredMailLines.find(word => word.includes('Kaartje toevoegen:')).split(':')[1].trim().toLowerCase()
    const withCard = findWithCard == 'ja' ? true : false

  // finds index of the element where the aanvullingen/opmerkingen beginnen
    const commentsIndex = filteredMailLines.indexOf(filteredMailLines.find(word => word.includes('AANVULLINGEN')))
    const comments = filteredMailLines.slice(commentsIndex + 1, -1).join(' ') // Joins all comments to a string

  // finds index of the element where the card text starts
    const cardTextIndex = filteredMailLines.indexOf(filteredMailLines.find(word => word.includes('Tekst kaartje:')))
    const cardText = filteredMailLines.slice(cardTextIndex, commentsIndex).join(" ").split(":")[1].trim()

    const extractedData = {
        'orderDate': orderDate,
        'subject': subject,
        'deliveryDate': deliveryDate,
        'name': name,
        'adress': adress,
        'postalCode': postalCode,
        'city': city,
        'description': description,
        'price': price,
        'withCard': withCard,
        'cardText': cardText,
        'comments': comments,
        'client': {
          'name': clientName,
          'email': clientEmail,
          'telNumber': telNumber
        }
    }
    console.log(extractedData)
    return extractedData
  } catch (error) {
    console.log(error)
    return error
  }
}
