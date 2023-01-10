const fs = require('fs')
const mailparser = require('mailparser')

/**
 * This function take a eml file and reads all data that is needed from it by using string manipulation
 * This function is solely useable for mails from pimm solutions as the format is very specific
 */
export async function extractPimmSolutionsFormData(emlFile) {
  try {
      const emlFileReader = await fs.promises.readFile(emlFile, 'utf8')
      const parsedMail = await mailparser.simpleParser(emlFileReader)

      // splits at every new line of the mail, putting the data in an array it then filters all unnecesary data out of the array
      var filteredMailLines = parsedMail.text.split('\n').filter(element => element != "" && !element.includes("https") && !element.includes("Klik voor"))

      // remove the last table row because it contains unnecessary content
      filteredMailLines = filteredMailLines.slice(0, filteredMailLines.lastIndexOf("1 x") - 1)
      
      // counts the amount of table rows so that that it is possible to decide if there is a card with text in the order
      var tableRowCount = 0
      filteredMailLines.forEach(element => {
          if(element == "1 x") {
            tableRowCount++
          }
      })

      // gets the standard email header data
      const clientEmail = parsedMail.from['value'][0]['address']
      const clientName = parsedMail.from['value'][0]['name']
      const orderDate = parsedMail.date
      const subject = parsedMail.subject

      // Gets the delivery date by searching for "afleverdatum", then splits at the semicolon and extracts the date from the remaining part
      const deliveryDate = filteredMailLines.find(word => word.includes("afleverdatum:")).split(":")[1].match(/([0-9]+(-[0-9]+)+)/i)[0]

      const companyName = filteredMailLines[1]
      const name = filteredMailLines[2]

      const adress = filteredMailLines[3]

      // City and postalcode are in the same array element, so it is split in two parts and city gets popped from the array. The remaining part is the postalCode
      const postalCodeAndCity = filteredMailLines[4].split(/\s+/)
      const city = postalCodeAndCity.pop()
      const postalCode = postalCodeAndCity.join(" ").replace(" ", "")

      const telNumber = filteredMailLines[5].trim()
    
      // The order description follows after the first occurance of "1 x". 
      const descriptionIndex = filteredMailLines.indexOf("1 x")
      var description = filteredMailLines.slice(descriptionIndex).join(" ")

      // Gets the price, replaces the comma with a period so that it can be parsed into a float
      const price = parseFloat(filteredMailLines[descriptionIndex + 1].split("-")[1].trim().split(" ")[1].replace(",", "."))

      var cardTextAsString = ""

      // checks if there is a card included in the order, gets information accordingly
      const withCard = tableRowCount > 1 ? true : false
      if(withCard) {
          cardTextAsString = filteredMailLines.slice(filteredMailLines.lastIndexOf("1 x") + 2).join("\n")
          description = filteredMailLines.slice(descriptionIndex, filteredMailLines.lastIndexOf("1 x") - 1).join(" ")
      }

      const extractedData = {
        'orderDate': orderDate,
        'subject': subject,
        'deliveryDate': deliveryDate,
        'companyName': companyName,
        'name': name,
        'adress': adress,
        'city': city,
        'postalCode': postalCode,
        'description': description,
        'price': price,
        'withCard': withCard,
        'cardText': cardTextAsString,
        'comments': '',
        'client': {
          'name': clientName,
          'email': clientEmail,
          'telNumber': telNumber
        }
      }
      // console.log(extractedData)
      return extractedData
    } catch (error) {
      // console.log(error)
      return null
    }
}


  