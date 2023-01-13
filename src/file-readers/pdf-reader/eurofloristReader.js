const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * This function takes in a pdf file from 'Euroflorist'
 * The contents of the file are extracted using the fs and pdf-parse modules.
 * Then, the document is split on every new line, and stores the lines in the dataArray
 * Next, to extract all the data, string manipulation is used to get the specific data that is needed
 * It stores every piece of data in a constant and adds it to the 'extractedData' JSON object
 * @param {*} filePath: path to where file is stored locally 
 * @returns extractedData: all data that needs to be extracted from the file in JSON format
 */

export async function extractEurofloristData(filePath) {
  try {
    const readFile = await fs.promises.readFile(filePath);
    const parsedPdf = await pdfParse(readFile);

    // Extract the text from the PDF and split it into an array
    const filteredPdfLines = parsedPdf.text.trim();
    const dataArray = filteredPdfLines.split("\n")

    const deliveryDate = dataArray[0].match(/([0-9]+(-[0-9]+)+)/i)[0]

    // Get personal info of the client (the person who ordered)
    const clientData = dataArray.slice(2, 8)
    const clientName = clientData[0].split(":")[1]
    const clientFirstName = clientName.split(" ")[0]
    const clientLastName = clientName.split(" ").slice(1).join(" ")
    const clientPhone = clientData[1].split(":")[1]
    const clientFax = clientData[2].split(":")[1]
    const clientEmail = clientData[3].split(":")[1]

    // Get personal info of the reciever
    const recieverIndex = dataArray.findIndex(word => word.includes("Orderdatum:")) + 1
    const recieverData = dataArray.slice(recieverIndex, recieverIndex + 6)
    const recieverName = recieverData[0].split(":")[1]
    const firstName = recieverName.split(" ")[0]
    const lastName = recieverName.split(" ").slice(1).join("")

    // Get living area info of the reciever
    const adress = recieverData[1].split(":")[1]
    const streetName = adress.split(" ").slice(0, -1).join(" ")
    const houseNumber = adress.split(" ").slice(-1).join(" ")

    const postalCode = recieverData[2].split(":")[1]
    const city = recieverData[3].split(":")[1]

    // Get product information
    const descriptionIndex = dataArray.slice(7).findIndex(word => word.includes("Telefoon:"))
    const description = dataArray.slice(8).slice(descriptionIndex, dataArray.slice(8).findIndex(word => word.includes("Speciale instructies")))
    const descriptionAsString = description.join("\n")
    
    // Get additional information
    const commentsIndex = dataArray.indexOf("Speciale instructies") + 1
    const productIndex = dataArray.findIndex(word => word.includes("Stukken"))
    const comments = dataArray.slice(commentsIndex, productIndex).join("\n")

    // Get price related info
    const priceIndex = dataArray.findIndex(word => word.includes("Totaal:"))
    const price = parseFloat(dataArray[priceIndex].split(":")[1].split(" ")[0].replace(",", "."))
    const withDeliveryCosts = true

    // Get card related info
    const cardIndex = dataArray.lastIndexOf(dataArray.find(word => word.includes("0528"))) + 1
    var withCard = "NONE"
    var cardText = ""

    if(cardIndex != dataArray.length) {
      withCard = "BASIC_CARD"
      cardText = dataArray.slice(cardIndex).join("\n")
    }
    
    const extractedData = {
        "subject": "Euroflorist",
        "deliveryDate": deliveryDate,
        "firstName": firstName,
        "lastName": lastName,
        "streetName": streetName,
        "houseNumber": houseNumber,
        "postalCode": postalCode,
        "city": city,
        "description": descriptionAsString,
        "comments": comments,
        "price": price,
        "withDeliveryCosts": withDeliveryCosts,
        "withCard": withCard,
        "cardText": cardText,
        "email": "",
        "phoneNumber": "",
        "client": {
            "firstName": clientFirstName,
            "lastName": clientLastName,
            "phoneNumber": clientPhone,
            "fax": clientFax,
            "email": clientEmail,
            'streetName': '',
            'houseNumber': '',
            'city': '',
            'postalCode': ''
        }
    }
  
    return extractedData
  } catch (error) {
    console.error(error)
    return null
  }
}