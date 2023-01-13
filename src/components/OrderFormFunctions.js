/**
 * Updated the total price field when a relevant value in the form is changed.
 */
export function updateTotalPriceField() {
    let price = parseFloat(document.getElementById("orderPrice").value);
    if (document.querySelector('input[name="includeDeliveryCosts"]:checked').value
        === "yes") {
        if (document.getElementById("receiverPlace").value.toLowerCase() === "hoogeveen") {
            price += 4.50;
        } else {
            price += 5.95;
        }
    }
    document.getElementById("totalPrice").value = price
}

/**
 * Validate given elements.
 *
 * @param missingInput The current missingInput value.
 * @param elements The elements to be validated.
 *
 * @returns {boolean} If an element was missing or the previous value.
 */
export function validateElements(missingInput, elements) {
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i]
        if (element.hasAttribute("required")) {
            console.log("required")
            if (element.value === "") {
                element.style.border = "solid #ff0000"
                missingInput = true;
            } else {
                element.style.border = ""
            }
        } else {
            element.style.border = ""
        }
    }
    return missingInput;
}