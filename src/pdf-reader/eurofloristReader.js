const fs = require('fs');
const pdfParse = require('pdf-parse');

async function extractEurofloristData(filePath) {
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
    const phoneNumber = recieverData[5].split(":")[1]


    console.log()
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  const extractedData = await extractEurofloristData('euroflorist.pdf')
})()