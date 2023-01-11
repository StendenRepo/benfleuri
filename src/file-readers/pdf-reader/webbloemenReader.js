const fs = require('fs');
const pdfParse = require('pdf-parse');

export async function extractWebbloemenData(filePath) {
  try {
    const readFile = await fs.promises.readFile(filePath);
    const parsedPdf = await pdfParse(readFile);

    // Extract the text from the PDF and split it into an array
    const filteredPdfLines = parsedPdf.text.trim();
    const dataArray = filteredPdfLines.split("\n")
    const deliveryData = dataArray.slice(3, dataArray.indexOf(" "))

    /**
     * This function retrieves the date as a string with the month in letters and converts it to xx-xx-xxxx format
     */
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

    // Get all the data using string manipulation
    const recieverName = deliveryData[2]
    const firstName = recieverName.split(" ")[0]
    const lastName = recieverName.split(" ")[1]

    const deliveryAdress = deliveryData[3] 
    const streetName = deliveryAdress.split(" ")[0]
    const houseNumber = deliveryAdress.split(" ")[1]

    const postalCode = deliveryData[4].split(" ")[0]
    const city = deliveryData[4].split(" ")[1]
    const cardText = deliveryData.slice(5, deliveryData.length - 1).join("\n")
    const subject = deliveryData[deliveryData.length - 1]

    const orderData = dataArray.slice(dataArray.indexOf(" ") + 1)
    const bouquet = orderData[0].substring(12).split("€")[0].toString()
    const bouquetPrice = parseFloat(orderData[0].substring(12).split("€")[1].trim())

    const cardIndex = orderData.indexOf(orderData.find(word => word.includes("kaartje")))
    const cardType = orderData[cardIndex].toLowerCase()
    var card = "NONE"
    if(cardType.includes("kaartje")){
        card = "BASIC_CARD"
    } 

    const color = orderData.slice(orderData.indexOf(" ") + 1, cardIndex).toString()
    const description = bouquet + "\n" + color

    const deliveryCostIndex = orderData.indexOf(orderData.find(word => word.includes("Bezorgkosten")))
    const cardPrice = parseFloat(orderData[deliveryCostIndex + 1].replace(",", "."))
    const deliveryPrice = parseFloat(orderData[deliveryCostIndex + 2])
    const withDeliveryCosts = deliveryPrice == 0 ? false : true
    const totalPrice = bouquetPrice + cardPrice + deliveryPrice

    const commentsArray = orderData.slice(orderData.indexOf("Opmerking:"))
    const comments = commentsArray.slice(0, commentsArray.indexOf(" ")).join("\n")


    /**
     * Next section extracts data from the person who bought the flowers, if that data is present
     */
    const clientData = orderData.findIndex(word => word == "Opdrachtgever")
    var clientName = ""
    var clientAdress = ""
    var clientPostalCode = ""
    var clientCity = ""
    var clientEmail = ""
    var clientPhone = ""

    if(clientData != -1) {
      clientName = orderData[clientData + 1]  
      clientAdress = orderData[clientData + 2]
      clientPostalCode = orderData[clientData + 3].split(" ")[0]
      clientCity = orderData[clientData + 3].split(" ")[1]
      clientEmail = orderData[clientData + 4]
      clientPhone = orderData[clientData + 5]
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
        "comments": comments,
        "client": {
          "name": clientName,
          "adress": clientAdress,
          "postalCode": clientPostalCode,
          "city": clientCity,
          "email": clientEmail,
          "phoneNum": clientPhone
        }
        
    }
 
    // console.log(extractedData);
    return extractedData
  } catch (error) {
    // console.error(error);
    return null
  }
}
