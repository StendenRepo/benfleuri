import Link from "next/link";

/**
 * Table cell template.
 *
 * @param children The values for the cell.
 * @param center If the text should be centered.
 */
export function TableCell({children, center}) {
    let className = "text-sm text-black font-normal px-4 py-2 whitespace-normal break-all"
    if (center) {
        className += " text-center"
    }
    return <td className={className}>
        {children}
    </td>
}

/**
 * Green Button template
 * @param children The value of the button.
 * @param link The hyperlink.
 * @param className The className for the button.
 */
export function GreenButton({children, link, className = ""}) {
    return (
        <Link href={!link ? "" : link}>
            <button className={className + ` text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] disabled:bg-[#2d6930] text-white font-bold border-[#45a049] disabled:border-[#45a049]  rounded-lg hover:bg-[#45a049]`} type="button">{children}
            </button>
        </Link>
    )
}

/**
 * Blue Button template
 * @param children The value of the button.
 * @param link The hyperlink.
 */
export function BlueButton({children, onClick}) {
    return (
        <button className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#5da4e4] text-white font-bold border-[#5da4e4] rounded-lg`} onClick={onClick} type="button">{children}
        </button>
    )
}