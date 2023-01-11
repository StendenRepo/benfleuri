import fs from "fs"
import formidable from "formidable"
import { fileReader } from "../../file-readers/reader"

export const config = {
    api: {
        bodyParser: false
    }
}

const extractData = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async function (err, fields, files) {
        const data = await fileReader(files.file)
    })
    return res.status(201).send("")
}

export default (req, res) => {
      if(req.method === "POST") {
        extractData(req, res)
      } else {
        res.status(404).send("")
      }
  }