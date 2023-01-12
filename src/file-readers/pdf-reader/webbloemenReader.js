const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * This function takes in a pdf file from 'Webbloemen'
 * The contents of the file are extracted using the fs and pdf-parse modules.
 * Then, the document is split on every new line, and stores the lines in the dataArray
 * Next, to extract all the data, string manipulation is used to get the specific data that is needed
 * It stores every piece of data in a constant and adds it to the 'extractedData' JSON object
 * @param {*} filePath: path to where file is stored locally 
 * @returns extractedData: all data that needs to be extracted from the file in JSON format
 */

export async function extractWebbloemenData(filePath) {
  try {
    const readFile = await fs.promises.readFile(filePath);
    const parsedPdf = await pdfParse(readFile);

    // Extract the text from the PDF and split it into an array
    const filteredPdfLines = parsedPdf.text.trim();
    const dataArray = filteredPdfLines.split("\n")
    const deliveryData = dataArray.slice(3, dataArray.indexOf(" "))

    // This function retrieves the date as a string with the month in letters and converts it to xx-xx-xxxx format
    const deliveryDate = () => {
      const dataAsString = deliveryData[0].toLowerCase().split(" ")
      dataAsString.shift()

      const monthInNumbers = {
        "januari": "01",
        "februari": "02",
        "maart": "03",
        "april": "04",
        "mei": "05",
        "juni": "06",
        "juli": "07",
        "augustus": "08",
        "september": "09",
        "oktober": "10",
        "november": "11",
        "december": "12"
      }
      dataAsString[1] = monthInNumbers[dataAsString[1]]
      const date = dataAsString.join("-")
      return date
    }

    // Get personal info
    const recieverName = deliveryData[2]
    const firstName = recieverName.split(" ")[0]
    const lastName = recieverName.split(" ").slice(1).join(" ")

    // Get living area info
    const adress = deliveryData[3] 
    const streetName = adress.split(" ").slice(0, -1).join(" ")
    const houseNumber = adress.split(" ").slice(-1).join(" ")

    const postalCode = deliveryData[4].split(" ")[0]
    const city = deliveryData[4].split(" ")[1]

    const cardText = deliveryData.slice(5, deliveryData.length - 1).join("\n")
    const subject = deliveryData[deliveryData.length - 1]

    const orderData = dataArray.slice(dataArray.indexOf(" ") + 1)
    const bouquet = orderData[0].substring(12).split("€")[0].toString()
    const bouquetPrice = parseFloat(orderData[0].substring(12).split("€")[1].trim())

    // Get card related information
    const cardIndex = orderData.indexOf(orderData.find(word => word.includes("kaartje")))
    const cardType = orderData[cardIndex].toLowerCase()
    var card = "NONE"
    if(cardType.includes("kaartje")){
        card = "BASIC_CARD"
    } 

    const color = orderData.slice(orderData.indexOf(" ") + 1, cardIndex).toString()
    const description = bouquet + "\n" + color

    // Get price related info
    const deliveryCostIndex = orderData.indexOf(orderData.find(word => word.includes("Bezorgkosten")))
    const cardPrice = parseFloat(orderData[deliveryCostIndex + 1].replace(",", "."))
    const deliveryPrice = parseFloat(orderData[deliveryCostIndex + 2])
    const withDeliveryCosts = deliveryPrice == 0 ? false : true
    const totalPrice = bouquetPrice + cardPrice + deliveryPrice

    // Get extra info / comments
    const commentsArray = orderData.slice(orderData.indexOf("Opmerking:"))
    const comments = commentsArray.slice(0, commentsArray.indexOf(" ")).join("\n")

    // Next section extracts data from the person who bought the flowers, if that data is present
    const clientData = orderData.findIndex(word => word == "Opdrachtgever")
    var clientName = ""
    var clientAdress = ""
    var clientPostalCode = ""
    var clientCity = ""
    var clientEmail = ""
    var clientPhone = ""
    var clientStreetName = ""
    var clientHousenumber = ""
    var clientFirstName = ""
    var clientLastName = ""

    if(clientData != -1) {
      clientName = orderData[clientData + 1]  
      clientFirstName = clientName.split(" ")[0]
      clientLastName = clientName.split(" ").slice(1).join(" ")
      clientAdress = orderData[clientData + 2]
      clientPostalCode = orderData[clientData + 3].split(" ")[0]
      clientCity = orderData[clientData + 3].split(" ")[1]
      clientEmail = orderData[clientData + 4]
      clientPhone = orderData[clientData + 5]
      clientStreetName = clientAdress.split(" ").slice(0, -1).join(" ")
      clientHousenumber = clientAdress.split(" ").slice(-1).join(" ")
    }

    const extractedData = {
        "subject": subject,
        "deliveryDate": deliveryDate(),
        "firstName": firstName,
        "lastName": lastName,
        "streetName": streetName,
        "houseNumber": houseNumber,
        "postalCode": postalCode,
        "city": city,
        "withCard": card,
        "cardText": cardText,
        "description": description,
        "price": totalPrice,
        "withDeliveryCosts": withDeliveryCosts,
        "phoneNumber": "",
        "email": "",
        "comments": comments,
        "client": {
          "firstName": clientFirstName,
          "lastName": clientLastName,
          "streetName": clientStreetName,
          "houseNumber": clientHousenumber,
          "postalCode": clientPostalCode,
          "city": clientCity,
          "email": clientEmail,
          "phoneNumber": clientPhone
        }
        
    }
 
    return extractedData
  } catch (error) {
    console.error(error);
    return null
  }
}
