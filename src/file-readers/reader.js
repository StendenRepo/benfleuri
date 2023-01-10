import { extractPimmSolutionsFormData } from "./eml-reader/pimmFormReader";
import { extractWebbloemenData } from "./pdf-reader/webbloemenReader";
import { extractOrderFormData } from "./eml-reader/websiteFormReader";
import { extractEurofloristData } from "./pdf-reader/eurofloristReader";
import { extractWyBloemistenData } from "./pdf-reader/wyBloemistenReader";

export async function fileReader(file) {

    const fileName = file.originalFilename.toLowerCase()
    const filepath = file.filepath

    switch(true) {
        case fileName.includes("bestelformulier"):
            extractOrderFormData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("wybloem"):
            extractWyBloemistenData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("pimm"):
            extractPimmSolutionsFormData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("webbloemen"):
            extractWebbloemenData(filepath).then((res) => {console.log(res)})
            break
        case fileName.includes("euroflorist"):
            extractEurofloristData(filepath).then((res) => {console.log(res)})
            break
        default:
            console.log("Could not read file")
            return
    }
}