const fs = require('fs');
const pdfParse = require('pdf-parse');

async function parsePdf(filePath) {
  try {
    const readFile = await fs.promises.readFile(filePath);
    const parsedPdf = await pdfParse(readFile);

    // Extract the text from the PDF
    const filteredPdfLines = parsedPdf.text.trim();
    const dataArray = filteredPdfLines.split("\n")
    const deliveryData = dataArray.slice(3, dataArray.indexOf(" "))
    // const opdr = dataArray.slice(-1)

    const recieverName = deliveryData[2]
    const deliveryAdress = deliveryData[3] 
    const postalCode = deliveryData[4].split(" ")[0]
    const city = deliveryData[4].split(" ")[1]
    const cardText = deliveryData.slice(5, deliveryData.length - 1).join("\n")
    const subject = deliveryData[deliveryData.length - 1]

    const orderData = dataArray.slice(dataArray.indexOf(" ") + 1)
    const bouquet = orderData[0].substring(12).split("€")[0].toString()
    const bouquetPrice = parseFloat(orderData[0].substring(12).split("€")[1].trim())

    const cardIndex = orderData.indexOf(orderData.find(word => word.includes("kaartje")))
    const card = orderData[cardIndex]

    const color = orderData.slice(orderData.indexOf(" ") + 1, cardIndex).toString()
    const description = bouquet + "\n" + color

    const deliveryCostIndex = orderData.indexOf(orderData.find(word => word.includes("Bezorgkosten")))
    const cardPrice = parseFloat(orderData[deliveryCostIndex + 1].replace(",", "."))
    const deliveryPrice = parseFloat(orderData[deliveryCostIndex + 2])
    const totalPrice = bouquetPrice + cardPrice + deliveryPrice

    // const comments =  

    const extractedData = {
        "subject": subject,
        "name": recieverName,
        "adress": deliveryAdress,
        "postalCode": postalCode,
        "city": city,
        "cardText": cardText
    }

    console.log(description);
  } catch (error) {
    console.error(error);
  }
}

parsePdf('webbloemen2.pdf');
