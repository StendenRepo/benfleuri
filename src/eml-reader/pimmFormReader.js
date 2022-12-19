const fs = require('fs')
const mailparser = require('mailparser')


function extractPimmSolutionsFormData() {
  const emlFile = fs.readFileSync('sample3.eml', 'utf8')

  mailparser.simpleParser(emlFile, (error, parsedMail) => {
      if(error) {
          console.log(error)
          return
      }

    // splits at every new line of the mail, putting the data in an array it then filters all of the empty entries out of the array
      const filteredMailLines = parsedMail.text.split('\n').filter(element => element != "" && !element.includes("https") && !element.includes("Klik voor"))

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

      const companyName = filteredMailLines[1]
      const name = filteredMailLines[2]

      const adress = filteredMailLines[3]

      const postalCodeAndCity = filteredMailLines[4].split(/\s+/)
      const city = postalCodeAndCity.pop()
      const postalCode = postalCodeAndCity.join(" ").replace(" ", "")

      const telNumber = filteredMailLines[5].trim()
    
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

      const amountOfTableRows = tableRowCount

      const deliveryDate = filteredMailLines.find(word => word.includes("afleverdatum:")).split(":")[1].match(/([0-9]+(-[0-9]+)+)/i)[0]

      const extractedData = {
        'fromEmail': fromEmail,
        'from': from,
        'orderDate': orderDate,
        'subject': subject
      }
      console.log(cardTextAsString)
  })
}

extractPimmSolutionsFormData()