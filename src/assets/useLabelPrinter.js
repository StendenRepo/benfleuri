import labelTemplate from "./labelTemplate";
import cardTextTemplate from "./cardTextTemplate";

// loads all supported printers into a combo box
export async function loadPrinters(data) {
    try {
        var printers = dymo.label.framework.getPrinters();
        if(printers.length == 0) {
            return
        }
        
        var xml
        if(data.length == 1) {
            xml = await cardTextTemplate(data[0])
        } 
        if(data.length > 1) {
            xml = await labelTemplate(data[0], data[1], data[2], data[3])
        }

        var label = await dymo.label.framework.openLabelXml(xml)
        var printerName = printers[0].name;
        label.print(printerName)
    } catch(err) {
        console.log(err)
        return err
    }
}
