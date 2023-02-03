import {Fragment, useEffect} from 'react'
//We use HeadlessUI for the dropdown, because we had issues with formatting the HTML dropdowns.
import {Listbox, Menu, Transition} from '@headlessui/react'
//Used for hyperlinks.
import Link from 'next/link'
import { useState } from 'react'
//Used for SVG icons
import { ArrowPathIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
//Used for dynamically filling the table.
import {renderToString} from "react-dom/server";
import {getAllCustomers, getAllEmployees} from "./sql";
import {TableCell} from "./Table";

let currentPage = 1;

/**
 * Gets the database data for the Customer table.
 * Is used to update the data when the update button is pressed.
 *
 * @returns {Promise<{props: {findAllCustomers: *}}>}
 */
export async function getEmployeeTableData(){
    const {findAllEmployees} = await getAllEmployees("id name isAdmin password")

    return {
        props: {
            findAllEmployees
        },
    }
}

/**
 * Table Header template.
 * @param children Values for the header.
 * @param widthPercent The column width as a percentage.
 * @param center   If the cell contents should be centered.
 */
function TableHeaderCell({children, widthPercent, center}) {
    let width = ""
    switch (widthPercent) {
        case "3":
            width =  "w-[3%] max-w-[3%]"
            break
        case "5":
            width =  "w-[5%] max-w-[5%]"
            break
        case "9":
            width = "w-[9%] max-w-[9%]"
            break
        case "10":
            width = "w-[10%] max-w-[10%]"
            break
        case "12":
            width = "w-[12%] max-w-[12%]"
            break
        case "15":
            width = "w-[15%] max-w-[15%]"
            break
        case "20":
            width = "w-[20%] max-w-[20%]"
            break
    }
    let className = "text-sm font-normal text-gray-400 px-4 py-2 text-left " + width
    if (center) {
        className += " text-center"
    }

    return <th scope="col" className={className}>
        {children}
    </th>
}

/**
 * Table row template
 *
 * @param data A array containing the data for the table row.
 */
export function TableRow({data}) {
    return (
        <tr className="border-b odd:bg-gray-100">
            <TableCell center={true}>{data[0]}</TableCell>
            <TableCell>{data[1]}</TableCell>
            <TableCell>{data[2]}</TableCell>
            <TableButtonCell employeeID={data[0]}/>
        </tr>
    );
}

/**
 * Emplyee Table template
 *
 * @param data The HTML of the rows.
 * @param customers The customer data.
 */
export function EmployeeTable({data, employees}) {
    return (
        <div className="inline-block min-w-full">
            <div className={"bg-slate-100 flex max-lg:flex-col flex-row p-2 gap-x-4 rounded-t-lg"}>
                <div className="flex flex-grow gap-y-[5px]">
                    <input id={"searchField"} className={`grow rounded-lg`} type="text" placeholder="Search.." onKeyDown={(event) => {
                        if(event.key.toLowerCase() === "enter"){
                            event.preventDefault();
                            document.getElementById("searchButton").click();
                        }
                    }}></input>
                    <button id={"searchButton"} className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] text-white font-bold border-[#45a049] rounded-lg hover:bg-[#45a049]`} type="button" onClick={() =>{
                        updateEmployeeTable({startIndex: 0, findAllEmployees: employees})}
                    }>Zoek
                    </button>
                </div>
                <div className="gap-x-[5px] flex inline-block">
                    <button onClick={async () => {
                        let dbData = await getEmployeeTableData();
                        updateEmployeeTable({startIndex: 0,
                            findAllEmployees: dbData.props.findAllEmployees})
                    }
                    } className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`} type="button">
                        <ArrowPathIcon className="h-5 w-5 " aria-hidden="true"/></button>
                </div>
            </div>
            <table className="min-w-full max-w-full table-fixed whitespace-normal word-break: break-all;">
                <thead className="border-b border-t">
                <tr>
                    <TableHeaderCell widthPercent={"10"} center={true}>ID</TableHeaderCell>
                    <TableHeaderCell widthPercent={"40"}>Naam</TableHeaderCell>
                    <TableHeaderCell widthPercent={"40"}>Recht</TableHeaderCell>
                    <TableHeaderCell widthPercent={"10"}></TableHeaderCell>
                </tr>
                </thead>
                <tbody id={"tableContent"} dangerouslySetInnerHTML={{"__html": data}}>
                </tbody>
            </table>
        </div>
    );
}

/**
 * Table Button template.
 * @param orderID The ID of the order.
 */
export function TableButtonCell({employeeID}) {
    return <td className={`text-sm text-right text-gray-900 font-light px-6 py-0 whitespace-nowrap`}>
        <Link href={"/admin/changeUser?id=" + employeeID}><button id={`edit-` + employeeID}
                                                        className={`py-[2px] px-[4px] text-xs font-normal border-[#e5e7eb] border uppercase`}>Wijzig
        </button></Link>
    </td>
}

/**
 * Updates the employee table with relevant filters.
 *
 * @param startIndex The index of the order data the table should start at. Is used for pages.
 * @param findAllEmployees The employee data.
 * @param pageLoad If the page is still loading, should only be true on first load.
 *
 * @returns {string}
 * The new HTML content of the order table. Return value is only used on first load.
 * Otherwise, the HTML is directly set in this function.
 */
export function updateEmployeeTable({startIndex, findAllEmployees, pageLoad = false}) {
    let content = "";
    let searchInput = ""
    let limit = 5;

    if(startIndex === 0){
        currentPage = 1;
    }
    if(!pageLoad) {
        //Only look at the buttons and search field if the page is loaded.
        limit = parseInt(document.getElementById("employeeCount").value);
        searchInput = document.getElementById("searchField").value.toLowerCase();
    }
    let matchedEmployees = {}
    //Loop over all the orders.
    findAllEmployees.map(f => {
        //Check the search input.
        if(searchInput !== ""){
            if(
                !f.name.toLowerCase().includes(searchInput)) {
                return false;
            }
        }
        //Add to object.
        matchedEmployees[f.id] = {"employee": f}
    })

    let index = 0;
    let amount = 0;
    let leftAmount = Object.keys(matchedEmployees).length;
    //You now have an object containing only the rows that match the criteria.
    //Loop over this for the table.
    Object.keys(matchedEmployees).forEach(key => {
        if(index < startIndex){
            //Is order from previous page.
            index++;
            leftAmount--
            return false;
        }

        if (amount >= limit) {
            //Is order from next page.
            return false;
        }

        //Add HTML to string.
        let f = matchedEmployees[key].employee
        content += renderToString(getTableRow(f));
        amount++
        leftAmount--
    })

    if(!pageLoad) {
        //Only look at the buttons and search field if the page is loaded.
        document.getElementById("prevButton").removeAttribute('disabled')
        document.getElementById("nextButton").disabled = leftAmount <= 0;
        document.getElementById("prevButton").disabled = startIndex - limit < 0;
        document.getElementById("tableContent").innerHTML = content
    }

    return content;
}

/**
 * Handles the next page button.
 *
 * @param findAllEmployees The employee data.
 */
export function nextPage({findAllEmployees}){
    currentPage++;
    let page = currentPage - 1;
    let limit = parseInt(document.getElementById("employeeCount").value);
    let startIndex = (page * limit);
    if(startIndex > findAllEmployees.length){
        //Should already be stopped by disabling the button.
        return;
    }

    updateEmployeeTable({startIndex, findAllEmployees});
}

/**
 * Handles the previous page button.
 *
 * @param findAllEmployees The employee data.
 */
export function previousPage({findAllEmployees}){
    if(currentPage === 0){
        return;
    }
    let page = currentPage - 1;
    let limit = parseInt(document.getElementById("employeeCount").value);
    let startIndex = (page * limit)  - (limit)
    if(startIndex < 0){
        //Should already be stopped by disabling the button.
        return;
    }
    currentPage--
    if(currentPage <= 0){
        currentPage = 1;
    }
    updateEmployeeTable({startIndex, findAllEmployees});
}


/** Gets a TableRow template, filled with the employee data.
* @param employee The employee.
*/
function getTableRow(employee){
    return (
        <TableRow data={[employee.id, employee.name, employee.isAdmin ? "Admin" : "Gebruiker"]}></TableRow>
    )
}