import fs from "fs"
import formidable from "formidable"
import path, { resolve } from "path"
import { extractWebbloemenData } from '../../file-readers/pdf-reader/webbloemenReader'

export const config = {
    api: {
        bodyParser: false
    }
}

const extractData = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, async function (err, fields, files) {
        // if(err) resolve(err)
        await extractWebbloemenData(files.file.filepath)
    })
    return res.status(201).send("Success")
}


export default (req, res) => {
      if(req.method === "POST") {
        extractData(req, res)
      } else {
        res.status(404).send("")
      }
  }