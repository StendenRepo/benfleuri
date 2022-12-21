const { data } = require('autoprefixer');
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

    const recieverName = deliveryData[2]
    const deliveryAdress = deliveryData[3] 
    const postalCode = deliveryData[4].split(" ")[0]
    const city = deliveryData[4].split(" ")[1]
    const cardText = deliveryData.slice(5, deliveryData.length - 1).join("\n")
    const subject = deliveryData[deliveryData.length - 1]


    const extractedData = {
        "subject": subject,
        "name": recieverName,
        "adress": deliveryAdress,
        "postalCode": postalCode,
        "city": city,
        "cardText": cardText,
    }

    console.log(deliveryData);
  } catch (error) {
    console.error(error);
  }
}

parsePdf('webbloemen2.pdf');
