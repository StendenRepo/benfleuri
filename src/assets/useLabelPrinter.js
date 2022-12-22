// loads all supported printers into a combo box
function loadPrinters() {}

// prints the label
_label = dymo.label.framework.openLabelXml(xml);
if (!_label) {
  alert('Load label before printing');
  return;

  //alert(printersSelect.value);
  _label.print(printers[0]);
}

import React, { useState, useEffect } from 'react';

function useLabelPrinter(props) {
  const [name, setName] = useState(null);
  useEffect(() => {
    var printers = dymo.label.framework.getPrinters();
    if (printers.length == 0) {
      alert('No DYMO printers are installed. Install DYMO printers.');
      return;
    }
  });
}
