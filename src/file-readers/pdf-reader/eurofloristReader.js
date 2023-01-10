const fs = require('fs');
const pdfParse = require('pdf-parse');

export async function extractEurofloristData(filePath) {
  try {
    const readFile = await fs.promises.readFile(filePath);
    const parsedPdf = await pdfParse(readFile);

    // Extract the text from the PDF and split it into an array
    const filteredPdfLines = parsedPdf.text.trim();
    const dataArray = filteredPdfLines.split("\n")

    const deliveryDate = dataArray[0].match(/([0-9]+(-[0-9]+)+)/i)[0]

    const clientData = dataArray.slice(2, 8)
    const clientName = clientData[0].split(":")[1]
    const clientPhone = clientData[1].split(":")[1]
    const clientFax = clientData[2].split(":")[1]
    const clientEmail = clientData[3].split(":")[1]

    const recieverIndex = dataArray.findIndex(word => word.includes("Orderdatum:")) + 1
    const recieverData = dataArray.slice(recieverIndex, recieverIndex + 6)
    const recieverName = recieverData[0].split(":")[1]
    const adress = recieverData[1].split(":")[1]
    const postalCode = recieverData[2].split(":")[1]
    const city = recieverData[3].split(":")[1]
    // const phoneNumber = recieverData[5].split(":")[1]

    const descriptionIndex = dataArray.slice(7).findIndex(word => word.includes("Telefoon:"))
    const description = dataArray.slice(8).slice(descriptionIndex, dataArray.slice(8).findIndex(word => word.includes("Speciale instructies")))
    const descriptionAsString = description.join("\n")
    
    const commentsIndex = dataArray.indexOf("Speciale instructies") + 1
    const productIndex = dataArray.findIndex(word => word.includes("Stukken"))
    const comments = dataArray.slice(commentsIndex, productIndex).join("\n")

    const priceIndex = dataArray.findIndex(word => word.includes("Totaal:"))
    const price = parseFloat(dataArray[priceIndex].split(":")[1].split(" ")[0].replace(",", "."))
    const withDeliveryCosts = true

    const cardIndex = dataArray.lastIndexOf(dataArray.find(word => word.includes("0528"))) + 1
    
    var withCard = false
    var cardText = ""

    if(cardIndex != dataArray.length) {
      withCard = true
      cardText = dataArray.slice(cardIndex).join("\n")
    }
    

    const extractedData = {
        "subject": "Euroflorist",
        "deliveryDate": deliveryDate,
        "name": recieverName,
        "adress": adress,
        "postalCode": postalCode,
        "city": city,
        "description": descriptionAsString,
        "comments": comments,
        "price": price,
        "withDeliveryCosts": true,
        "withCard": withCard,
        "cardText": cardText,
        "client": {
            "name": clientName,
            "telNumber": clientPhone,
            "fax": clientFax,
            "email": clientEmail
        }
    }
    // console.log(extractedData)
    return extractedData
  } catch (error) {
    // console.error(error);
    return null
  }
}