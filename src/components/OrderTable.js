import { Fragment, useEffect } from 'react';
//We use HeadlessUI for the dropdown, because we had issues with formatting the HTML dropdowns.
import { Listbox, Menu, Transition } from '@headlessui/react';
//Used for hyperlinks.
import Link from 'next/link';
import { useState } from 'react';
//Used for SVG icons
import { ArrowPathIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
//Used for dynamically filling the table.
import { renderToString } from 'react-dom/server';
import { getAllCustomers, getAllOrders } from './sql';

//The current page of the table.
let currentPage = 1;

let statusDropdownValue = '';

/**
 * Gets the database data for the Order table.
 * Is used to update the data when the update button is pressed.
 *
 * @returns {Promise<{props: {findAllOrders: *, findAllCustomers: *}}>}
 */
export async function getOrderTableData() {
  const { findAllOrders } = await getAllOrders(
    'id customerId productInfo recieverId paymentMethod orderState dateOfDelivery price'
  );
  const { findAllCustomers } = await getAllCustomers('id firstName lastName');

  return {
    props: {
      findAllOrders,
      findAllCustomers,
    },
  };
}

/**
 * Table Header template.
 * @param children Values for the header.
 * @param center   If the cell contents should be centered.
 */
function TableHeaderCell({ children, widthPercent, center }) {
  let width = '';
  switch (widthPercent) {
    case '3':
      width = 'w-[3%] max-w-[3%]';
      break;
    case '5':
      width = 'w-[5%] max-w-[5%]';
      break;
    case '9':
      width = 'w-[9%] max-w-[9%]';
      break;
    case '10':
      width = 'w-[10%] max-w-[10%]';
      break;
    case '12':
      width = 'w-[12%] max-w-[12%]';
      break;
    case '15':
      width = 'w-[15%] max-w-[15%]';
      break;
    case '20':
      width = 'w-[20%] max-w-[20%]';
      break;
  }
  let className =
    'text-sm font-normal text-gray-400 px-4 py-2 text-left ' + width;
  if (center) {
    className += ' text-center';
  }
  //className = className.replace(/\\"/g, '"');
  return (
    <th
      scope="col"
      className={className}
    >
      {children}
    </th>
  );
}

/**
 * Table Button template.
 * @param orderID The ID of the order.
 */
function TableButtonCell({ orderID }) {
  return (
    <td
      className={`text-sm text-right text-gray-900 font-light px-6 py-0 whitespace-nowrap`}
    >
      <Link href={'/viewOrder?id=' + orderID}>
        <button
          id={`edit-` + orderID}
          className={`py-[2px] px-[4px] text-xs font-normal border-[#e5e7eb] border uppercase`}
        >
          Bekijk
        </button>
      </Link>
    </td>
  );
}
/**
 * Pill label template for the order status.
 * @param status the order status..
 */
function PillLabel({ status }) {
  let colorStyle = 'rounded px-2 py-0.5 ';
  let text = '';
  if (status === 'DELIVERED') {
    colorStyle += 'bg-yellow-400 text-black';
    text = 'Verzonden';
  } else if (status === 'CLOSED') {
    colorStyle += 'bg-[#009A40] text-white';
    text = 'Voltooid';
  } else if (status === 'OPEN') {
    colorStyle += 'bg-[#FF623F] text-black';
    text = 'Open';
  } else if (status === 'IN_PROGRESS') {
    colorStyle += 'bg-cyan-300 text-black';
    text = 'Geleverd maar niet thuis';
  } else {
    text = status;
  }

  return (
    <div className={'rounded px-px text-center'}>
      <span className={colorStyle}>{text}</span>
    </div>
  );
}

/**
 * Table cell template.
 *
 * @param children The values for the cell.
 * @param center If the text should be centered.
 */
function TableCell({ children, center }) {
  let className =
    'text-sm text-black font-normal px-4 py-2 whitespace-normal break-all';
  if (center) {
    className += ' text-center';
  }
  return <td className={className}>{children}</td>;
}

/**
 * Green Button template
 * @param children The value of the button.
 * @param link The hyperlink.
 * @param className The className for the button.
 */
export function GreenButton({ children, link, className = '' }) {
  return (
    <Link href={!link ? '' : link}>
      <button
        className={
          className +
          ` text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] disabled:bg-[#2d6930] text-white font-bold border-[#45a049] disabled:border-[#45a049]  rounded-lg hover:bg-[#45a049]`
        }
        type="button"
      >
        {children}
      </button>
    </Link>
  );
}

/**
 * Blue Button template
 * @param children The value of the button.
 * @param link The hyperlink.
 */
export function BlueButton({ children, onClick }) {
  return (
    <button
      className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#5da4e4] text-white font-bold border-[#5da4e4] rounded-lg`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

/**
 * Red Button template
 * @param children The value of the button.
 * @param link The hyperlink.
 */
export function RedButton({ children, onClick }) {
  return (
    <button
      className={`text-sm border-[1px] mt-[3%] py-[8px] px-[20px] font-['Roboto'] 
          bg-[#EA0101] text-white font-bold border-[#EA0101] rounded-lg`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

/**
 * White Button template
 * @param children The value of the button.
 * @param link The hyperlink.
 */
export function WhiteButton({ children, link }) {
  return (
    <Link href={!link ? '' : link}>
      <button
        className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white`}
        type="button"
      >
        {children}
      </button>
    </Link>
  );
}

/**
 * Table row template
 *
 * @param data A array containing the data for the table row.
 * @param number The table index, used for the dashboard.
 */
export function TableRow({ data, number }) {
  return (
    <tr className="border-b odd:bg-gray-100">
      <TableCell>
        <input
          id={`check-` + data[0]}
          className={'table-row-checkbox' + (number !== -1 ? '-' + number : '')}
          type="checkbox"
        />
      </TableCell>
      <TableCell center={true}>{data[0]}</TableCell>
      <TableCell>{data[1]}</TableCell>
      <TableCell>{data[2]}</TableCell>
      <TableCell>{data[3]}</TableCell>
      <TableCell>{data[4]}</TableCell>
      <TableCell>
        <PillLabel status={data[5]} />
      </TableCell>
      <TableCell>€{data[6]}</TableCell>
      <TableButtonCell orderID={data[0]} />
    </tr>
  );
}

/**
 * Order Table template
 *
 * @param data The HTML of the rows.
 * @param orders The order data.
 * @param customers The customer data.
 * @param number The index of the table, used for the dashboard.
 */
export function OrderTable({ data, number = -1, orders, customers }) {
  let numberString = number === -1 ? '' : '-' + number.toString();
  let status = [
    { name: 'Status', disabled: false },
    { name: 'Geleverd maar niet thuis', disabled: false },
    { name: 'Open', disabled: false },
    { name: 'Verzonden', disabled: false },
    { name: 'Voltooid', disabled: false },
  ];
  let sort = [
    { name: 'Sorteer op', disabled: false },
    { name: 'Order', disabled: false },
    { name: 'Besteller', disabled: false },
    { name: 'Bestelling', disabled: false },
    { name: 'Ontvanger', disabled: false },
    { name: 'Betaling', disabled: false },
    { name: 'Status', disabled: false },
    { name: 'Totaal geld', disabled: false },
  ];
  return (
    <div className="inline-block min-w-full">
      <div
        className={
          'bg-slate-100 flex max-lg:flex-col flex-row p-2 gap-x-4 rounded-t-lg'
        }
      >
        <div className="flex flex-grow gap-y-[5px]">
          <input
            id={'searchField' + numberString}
            className={`grow rounded-lg`}
            type="text"
            placeholder="Search.."
            onKeyDown={(event) => {
              if (event.key.toLowerCase() === 'enter') {
                event.preventDefault();
                document.getElementById('searchButton' + numberString).click();
              }
            }}
          ></input>
          <button
            id={'searchButton' + numberString}
            className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] text-white font-bold border-[#45a049] rounded-lg hover:bg-[#45a049]`}
            type="button"
            onClick={() => {
              updateOrderTable({
                startIndex: 0,
                findAllOrders: orders,
                number: number,
                findAllCustomers: customers,
              });
            }}
          >
            Zoek
          </button>
        </div>
        <div className="gap-x-[5px] flex inline-block">
          <div className="items-stretch flex flex-row ">
            <Dropdown
              id={'status'}
              findAllOrders={orders}
              findAllCustomers={customers}
              number={number}
              listValues={status}
              roundCorners="left"
            />
            <Dropdown
              id={'sort'}
              findAllOrders={orders}
              findAllCustomers={customers}
              number={number}
              listValues={sort}
              roundCorners="right"
            />
          </div>
          <div className="items-stretch flex flex-row">
            <input
              id={'datePicker-' + number}
              onChange={() =>
                updateOrderTable({
                  startIndex: 0,
                  number: number,
                  findAllOrders: orders,
                  findAllCustomers: customers,
                })
              }
              disabled={number !== -1}
              className="text-sm rounded font-['Roboto'] border-[1px] border-black bg-white disabled:bg-gray-300 text-black"
              type="date"
            />
          </div>
          <button
            disabled={number !== -1}
            onClick={async () => {
              let dbData = await getOrderTableData();
              updateOrderTable({
                startIndex: 0,
                number: number,
                findAllOrders: dbData.props.findAllOrders,
                findAllCustomers: dbData.props.findAllCustomers,
              });
            }}
            className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`}
            type="button"
          >
            <ArrowPathIcon
              className="h-5 w-5 "
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <table className="min-w-full max-w-full table-fixed whitespace-normal word-break: break-all;">
        <thead className="border-b border-t">
          <tr>
            <TableHeaderCell widthPercent={'3'}>
              <input
                onClick={(event) => checkAll(event.target, number)}
                className={'table-select-all-' + number}
                type="checkbox"
                name="select-all"
              />
            </TableHeaderCell>
            <TableHeaderCell
              widthPercent={'5'}
              center={true}
            >
              Order
            </TableHeaderCell>
            <TableHeaderCell widthPercent={'12'}>Besteller</TableHeaderCell>
            <TableHeaderCell widthPercent={'20'}>Bestelling</TableHeaderCell>
            <TableHeaderCell widthPercent={'12'}>Ontvanger</TableHeaderCell>
            <TableHeaderCell widthPercent={'9'}>Betaling</TableHeaderCell>
            <TableHeaderCell
              center={true}
              widthPercent={'15'}
            >
              Status
            </TableHeaderCell>
            <TableHeaderCell widthPercent={'10'}>Totaal</TableHeaderCell>
            <TableHeaderCell widthPercent={'3'}></TableHeaderCell>
          </tr>
        </thead>
        <tbody
          id={'tableContent' + numberString}
          dangerouslySetInnerHTML={{ __html: data }}
        ></tbody>
      </table>
    </div>
  );
}

/**
 * Update the select status of all the current table rows.
 * @param source The header select button.
 * @param number The table index, used for the dashboard page.
 */
function checkAll(source, number) {
  document
    .querySelectorAll(
      '.table-row-checkbox' + (number !== -1 ? '-' + number : '')
    )
    .forEach(function (node) {
      node.checked = source.checked;
    });
}

/**
 * Dropdown template using Headless UI.
 * @param id The ID of the dropdown, used for table update logic.
 * @param listValues The values of the list.
 * @param roundCorners If the ListBox should have rounded corners.
 * @param findAllOrders The loaded orders.
 * @param findAllCustomers The loaded customers.
 * @param number The table index, used for the dashboard page.
 */
function Dropdown({
  id,
  listValues,
  roundCorners,
  findAllOrders,
  findAllCustomers,
  number = -1,
}) {
  const [selected, setSelected] = useState(listValues[0]);

  if (id === 'status') {
    useEffect(() => {
      statusDropdownValue = selected.name;
      updateOrderTable({
        startIndex: 0,
        number: number,
        findAllOrders: findAllOrders,
        findAllCustomers: findAllCustomers,
      });
    }, [selected]);
  }
  let corners =
    roundCorners === 'left'
      ? 'rounded-l border-[1px]'
      : roundCorners === 'right'
      ? 'rounded-r border-y-[1px] border-r-[1px]'
      : roundCorners === 'both'
      ? 'rounded border-[1px]'
      : 'border-[1px]';
  return (
    <div className="items-stretch">
      <Listbox
        value={selected}
        onChange={setSelected}
      >
        <div className="h-full">
          <div className="relative h-full">
            <Listbox.Button
              className={
                corners +
                ' cursor-pointer h-full border-black w-full cursor-default ' +
                "text-sm font-['Roboto'] bg-white text-black py-2 pl-3 pr-10 text-left"
              }
            >
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute mt-1 max-h-60 overflow-auto
                        rounded-md bg-white py-1 text-base shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {listValues.map((listValue, listValueIdx) => (
                <Listbox.Option
                  key={listValueIdx}
                  className={({ active, disabled }) =>
                    `relative cursor-pointer select-none py-2 px-4 
                                        ${
                                          active
                                            ? 'bg-[#009a4040] text-[#009A40]'
                                            : 'text-gray-900'
                                        }
                                        ${
                                          disabled
                                            ? 'bg-gray-100 text-gray-300'
                                            : 'text-gray-900'
                                        } 
                                            `
                  }
                  value={listValue}
                  disabled={listValue.disabled}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {listValue.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

/**
 * Updates the order table with relevant filters.
 *
 * @param startIndex The index of the order data the table should start at. Is used for pages.
 * @param findAllOrders The order data.
 * @param findAllCustomers The customer data.
 * @param pageLoad If the page is still loading, should only be true on first load.
 * @param number The index of the table, used for the dashboard.
 *
 * @returns {string}
 * The new HTML content of the order table. Return value is only used on first load.
 * Otherwise, the HTML is directly set in this function.
 */
export function updateOrderTable({
  startIndex,
  findAllOrders,
  findAllCustomers,
  number = -1,
  pageLoad = false,
}) {
  let numberString = number === -1 ? '' : '-' + number.toString();
  let content = '';
  let searchInput = '';
  let limit = 5;
  let date = '';

  let status =
    statusDropdownValue !== 'Status' ? getStateName(statusDropdownValue) : '';

  if (startIndex === 0) {
    currentPage = 1;
  }
  if (!pageLoad) {
    //Only look at the buttons and search field if the page is loaded.
    document
      .querySelectorAll(
        '.table-row-checkbox' + (number !== -1 ? '-' + number : '')
      )
      .forEach(function (node) {
        node.checked = false;
      });

    document
      .querySelectorAll(
        '.table-select-all' + (number !== -1 ? '-' + number : '')
      )
      .forEach(function (node) {
        node.checked = false;
      });

    limit = parseInt(
      document.getElementById('orderCount' + numberString).value
    );
    searchInput = document
      .getElementById('searchField' + numberString)
      .value.toLowerCase();
    date = document.getElementById('datePicker-' + number).value;
  }
  let matchedOrders = {};
  //Loop over all the orders.
  findAllOrders.map((f) => {
    let customerName = '';
    let receiverName = '';
    let customerId = f.customerId;
    let receiverId = f.recieverId;

    //Find the customer of the order.
    for (let i = 0; i < findAllCustomers.length; i++) {
      let v = findAllCustomers[i];
      if (customerName !== '' && receiverName !== '') {
        continue;
      }
      let cID = v.id;
      if (cID === customerId) {
        customerName = v.firstName + ' ' + v.lastName;
      }
      if (cID === receiverId) {
        receiverName = v.firstName + ' ' + v.lastName;
      }
    }
    //Check the search input.
    if (searchInput !== '') {
      if (
        !customerName.toLowerCase().includes(searchInput) &&
        !receiverName.toLowerCase().includes(searchInput) &&
        !f.productInfo.toLowerCase().includes(searchInput)
      ) {
        return false;
      }
    }

    if (date !== '') {
      let dateObj = document.getElementById('datePicker-' + number).valueAsDate;
      let orderDate = new Date(+f.dateOfDelivery);
      if (
        orderDate.getFullYear() !== dateObj.getFullYear() ||
        orderDate.getMonth() !== dateObj.getMonth() ||
        orderDate.getDate() !== dateObj.getDate()
      ) {
        return false;
      }
    }

    if (status !== '') {
      console.log(status);
      console.log(f.orderState.toLowerCase());
      if (f.orderState.toLowerCase() !== status) {
        return false;
      }
    }
    //Add to object.
    matchedOrders[f.id] = {
      order: f,
      customerName: customerName,
      receiverName: receiverName,
    };
  });

  let index = 0;
  let amount = 0;
  let leftAmount = Object.keys(matchedOrders).length;
  //You now have an object containing only the rows that match the criteria.
  //Loop over this for the table.
  Object.keys(matchedOrders).forEach((key) => {
    if (index < startIndex) {
      //Is order from previous page.
      index++;
      leftAmount--;
      return false;
    }

    if (amount >= limit) {
      //Is order from next page.
      return false;
    }

    //Add HTML to string.
    let f = matchedOrders[key].order;
    content += renderToString(
      getTableRow(
        f,
        matchedOrders[key].customerName,
        matchedOrders[key].receiverName,
        number
      )
    );
    amount++;
    leftAmount--;
  });

  if (!pageLoad) {
    //Only look at the buttons and search field if the page is loaded.
    document
      .getElementById('prevButton' + numberString)
      .removeAttribute('disabled');
    document.getElementById('nextButton' + numberString).disabled =
      leftAmount <= 0;
    document.getElementById('prevButton' + numberString).disabled =
      startIndex - limit < 0;
    document.getElementById('tableContent' + numberString).innerHTML = content;
  }

  return content;
}

/**
 * Handles the next page button.
 *
 * @param findAllOrders The order data.
 * @param findAllCustomers The customer data.
 */
export function nextPage({ findAllOrders, findAllCustomers }) {
  currentPage++;
  let page = currentPage - 1;
  let limit = parseInt(document.getElementById('orderCount').value);
  let startIndex = page * limit;
  if (startIndex > findAllOrders.length) {
    //Should already be stopped by disabling the button.
    return;
  }

  updateOrderTable({ startIndex, findAllOrders, findAllCustomers });
}

/**
 * Handles the previous page button.
 *
 * @param findAllOrders The order data.
 * @param findAllCustomers The customer data.
 */
export function previousPage({ findAllOrders, findAllCustomers }) {
  if (currentPage === 0) {
    return;
  }
  let page = currentPage - 1;
  let limit = parseInt(document.getElementById('orderCount').value);
  let startIndex = page * limit - limit;
  if (startIndex < 0) {
    //Should already be stopped by disabling the button.
    return;
  }
  currentPage--;
  if (currentPage <= 0) {
    currentPage = 1;
  }
  updateOrderTable({ startIndex, findAllOrders, findAllCustomers });
}

function getStateName(state) {
  state = state.toLowerCase();
  if (state === 'verzonden') {
    return 'delivered';
  } else if (state === 'voltooid') {
    return 'closed';
  } else if (state === 'open') {
    return 'open';
  } else if (state === 'geleverd maar niet thuis') {
    return 'in_progress';
  }
}

/**
 * Gets a TableRow template, filled with the order/customer data.
 * @param order The order.
 * @param customerName The name of the customer.
 * @param receiverName The name of the receiver.
 * @param number The table index, used for the dashboard page.
 */
function getTableRow(order, customerName, receiverName, number = -1) {
  return (
    <TableRow
      number={number}
      data={[
        order.id,
        customerName,
        order.productInfo,
        receiverName,
        order.paymentMethod,
        order.orderState,
        order.price.toFixed(2),
      ]}
    ></TableRow>
  );
}
