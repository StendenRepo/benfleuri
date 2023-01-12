const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * This function takes in a pdf file from 'wyBloemisten'
 * The contents of the file are extracted using the fs and pdf-parse modules.
 * Then, the document is split on every new line, and stores the lines in the dataArray
 * Next, to extract all the data, string manipulation is used to get the specific data that is needed
 * It stores every piece of data in a constant and adds it to the 'extractedData' JSON object
 * @param {*} filePath: path to where file is stored locally 
 * @returns extractedData: all data that needs to be extracted from the file in JSON format
 */

export async function extractWyBloemistenData(filePath) {
  try {
    const readFile = await fs.promises.readFile(filePath);
    const parsedPdf = await pdfParse(readFile);

    // Extract the text from the PDF and split it into an array
    const filteredPdfLines = parsedPdf.text.trim();
    const dataArray = filteredPdfLines.split("\n")
    const deliveryData = dataArray.shift().toLowerCase().split(":")[2].split(" ").slice(2)


    const benFleuriNumberIndex = dataArray.indexOf("0528-750619")
    const extraInfo = () => {
      var info = ""
      if (dataArray.slice(0, benFleuriNumberIndex).length >= 5) {
          info = dataArray[benFleuriNumberIndex - 4]
      } 
      return info
    }

    // Get living area data
    const postalCodeAndCity = dataArray[benFleuriNumberIndex - 1].split("7905GZ")[0].split(" ")
    const city = postalCodeAndCity.pop()
    const postalCode = postalCodeAndCity.join("")
    const postalCodeAndCityAsString = postalCodeAndCity.join(" ") + " " + city

    const adress = dataArray[benFleuriNumberIndex - 2].split("De Wielewaal")[0].trim()
    const streetName = adress.split(" ").slice(0, -1).join(" ")
    const houseNumber = adress.split(" ").slice(-1).join(" ")

    // get personal data of the reciever
    const recieverName = dataArray[benFleuriNumberIndex - 3].split("BenFleuri")[0].split(" ").slice(-2).join(" ")
    const firstName = recieverName.split(" ")[0]
    const lastName = recieverName.split(" ").slice(1).join(" ")

    // get all info about the card
    const cardTextIndex = dataArray.findIndex(element => element.includes("Ordernummer:"))
    const cardText = dataArray.slice(benFleuriNumberIndex + 1, cardTextIndex).join("\n").trim()
    const withCard = dataArray.includes(dataArray.find(element => element.includes("kaartje")))
    const card = withCard == true ? "BASIC_CARD" : "NONE"

    // Adds all parts of description into one string
    const totalPriceIndex = dataArray.findIndex(word => word == "Totaal")
    var description = ""
    const descriptionArray = dataArray.slice(cardTextIndex + 2, totalPriceIndex - 1).map(element => {
        description += element.split("€")[0] + "\n"
    })

    const price = parseFloat(dataArray[totalPriceIndex + 1].split(" ")[1])

    const commentsIndex = dataArray.findIndex(word => word == "OntvangerBesteller")
    var comments = extraInfo()
    comments += "\n" + dataArray.slice(totalPriceIndex + 2, commentsIndex - 1).join("\n")

    const clientPhone = dataArray.pop()
    const clientPostalCodeAndCity = dataArray.pop().trim().split(postalCodeAndCityAsString)[1].trim()
    const clientPostalCode = clientPostalCodeAndCity.split(" ")[0]
    const clientCity = clientPostalCodeAndCity.split(" ")[1]
    const clientAdress = dataArray.pop().split(adress)[1]
    const clientStreetName = clientAdress.split(" ").slice(0, -1).join(" ")
    const clientHousenumber = clientAdress.split(" ").slice(-1).join(" ")
    const clientName = dataArray.pop().split(recieverName)[1]
    const clientFirstName = clientName.split(" ")[0]
    const clientLastName = clientName.split(" ").slice(1).join(" ")

    const deliveryDate = () => {
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
        deliveryData[1] = monthInNumbers[deliveryData[1]]
        const date = deliveryData.join("-")
        return date
      }

    const extractedData = {
        "subject": "Wybloemisten",
        "deliveryDate": deliveryDate(),
        "firstName": firstName,
        "lastName": lastName,
        "streetName": streetName,
        "houseNumber": houseNumber,
        "postalCode": postalCode,
        "city": city,
        "description": description,
        "comments": comments,
        "price": price,
        "withDeliveryCosts": true,
        "withCard": card,
        "cardText": cardText,
        "email": "",
        "phoneNumber": "",
        "client": {
            "firstName": clientFirstName,
            "lastName": clientLastName,
            "phoneNumber": clientPhone,
            "city": clientCity,
            "streetName": clientStreetName,
            "houseNumber": clientHousenumber,
            "postalCode": clientPostalCode,
            "email": ''
        }
    }
    // console.log(extractedData)
    return extractedData
  } catch (error) {
    // console.error(error);
    return null
  }
}