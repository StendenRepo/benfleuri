const fs = require('fs')
const mailparser = require('mailparser')


function extractPimmSolutionsFormData() {
  const emlFile = fs.readFileSync('sample2.eml', 'utf8')

  mailparser.simpleParser(emlFile, (error, parsedMail) => {
      if(error) {
          console.log(error)
          return
      }

    // splits at every new line of the mail, putting the data in an array it then filters all of the empty entries out of the array
      const filteredMailLines = parsedMail.text.split('\n').filter(element => element != "")

      
    // gets the standard email header data
      const fromEmail = parsedMail.from['value'][0]['address']
      const from = parsedMail.from['value'][0]['name']
      const orderDate = parsedMail.date
      const subject = parsedMail.subject

      const postalCode = parsedMail.text

      const deliveryDate = filteredMailLines.find(word => word.includes("afleverdatum:")).split(":")[1].match(/([0-9]+(-[0-9]+)+)/i)[0]

      const extractedData = {
        'fromEmail': fromEmail,
        'from': from,
        'orderDate': orderDate,
        'subject': subject
      }
      console.log(postalCode)
  })
}

extractPimmSolutionsFormData()