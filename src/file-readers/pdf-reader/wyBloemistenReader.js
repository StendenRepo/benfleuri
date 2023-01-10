const fs = require('fs');
const pdfParse = require('pdf-parse');

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

    const postalCodeAndCity = dataArray[benFleuriNumberIndex - 1].split("7905GZ")[0].split(" ")
    const city = postalCodeAndCity.pop()
    const postalCode = postalCodeAndCity.join("")
    const postalCodeAndCityAsString = postalCodeAndCity.join(" ") + " " + city

    const adress = dataArray[benFleuriNumberIndex - 2].split("De Wielewaal")[0].trim()
    const recieverName = dataArray[benFleuriNumberIndex - 3].split("BenFleuri")[0].split(" ").slice(-2).join(" ")

    const cardTextIndex = dataArray.findIndex(element => element.includes("Ordernummer:"))
    const cardText = dataArray.slice(benFleuriNumberIndex + 1, cardTextIndex).join("\n").trim()
    const withCard = dataArray.includes(dataArray.find(element => element.includes("kaartje")))

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
    const clientName = dataArray.pop().split(recieverName)[1]

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
        "name": recieverName,
        "adress": adress,
        "postalCode": postalCode,
        "city": city,
        "description": description,
        "comments": comments,
        "price": price,
        "withDeliveryCosts": true,
        "withCard": withCard,
        "cardText": cardText,
        "client": {
            "name": clientName,
            "telNumber": clientPhone,
            "city": clientCity,
            "adress": clientAdress,
            "postalCode": clientPostalCode
        }
    }
    console.log(extractedData)
    return extractedData
  } catch (error) {
    console.error(error);
    return error
  }
}