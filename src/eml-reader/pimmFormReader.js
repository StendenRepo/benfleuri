const fs = require('fs')
const mailparser = require('mailparser')


function extractPimmSolutionsFormData() {
  const emlFile = fs.readFileSync('sample2.eml', 'utf8')

  mailparser.simpleParser(emlFile, (error, parsedMail) => {
      if(error) {
          console.log(error)
          return
      }

      // splits at every new line of the mail, putting the data in an array it then filters all unnecesary data out of the array
      const filteredMailLines = parsedMail.text.split('\n').filter(element => element != "" && !element.includes("https") && !element.includes("Klik voor"))

      // counts the amount of table rows so that that information can be used later on
      var tableRowCount = 0;
      filteredMailLines.forEach(element => {
          if(element == "1 x") {
            tableRowCount++
          }
      });
      
      // gets the standard email header data
      const fromEmail = parsedMail.from['value'][0]['address']
      const from = parsedMail.from['value'][0]['name']
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
      const description = filteredMailLines.slice(descriptionIndex, descriptionIndex + 4).join(" ")

      const price = filteredMailLines[descriptionIndex + 1].split("-")[1].trim().split(" ")[1]

      var cardTextAsString = ""

      const withCard = tableRowCount > 2 ? true : false
      if(withCard) {
          const removeableContentIndex = filteredMailLines.lastIndexOf("1 x")
          var cardText = filteredMailLines.slice(descriptionIndex, removeableContentIndex - 1)
          cardTextAsString = cardText.slice(cardText.lastIndexOf("1 x") + 2).join("\n")
      }


      const extractedData = {
        'fromEmail': fromEmail,
        'from': from,
        'orderDate': orderDate,
        'subject': subject,
        'deliveryDate': deliveryDate,
        'companyName': companyName,
        'name': name,
        'adress': adress,
        'city': city,
        'postalCode': postalCode,
        'telNumber': telNumber,
        'description': description,
        'price': price,
        'withCard': withCard,
        'cardText': cardTextAsString,
        'comments': ''
      }
      console.log(description)
  })
}

extractPimmSolutionsFormData()