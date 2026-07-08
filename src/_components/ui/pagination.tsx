import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import { iconSize } from "../../_utils/constants";

type PaginationProps = {
    previous?: number,
    next?: number,
    page: number,
    pages: number[],
    size?: number,
    sizes?: number[],
    total?: number,
    onClick: (page: number, size: number) => void,
    variant?: "danger" | "primary" | "success" | "secondary" | "dark" | "light",
}

export default function Pagination({
    previous, next, page, pages, onClick,
    variant = "secondary",
    size = 10, sizes, total }: PaginationProps) {
    return (
        <div className="w-auto d-flex justify-content-between">
            <div className="d-flex gap-2 align-items-center">
                {total && (
                    <InputGroup className="w-auto">
                        <InputGroup.Text>Total</InputGroup.Text>
                        <div className="form-control">{total}</div>
                    </InputGroup>
                )}
                {sizes && (
                    <InputGroup className="w-auto">
                        <InputGroup.Text>Size</InputGroup.Text>
                        <Form.Select onChange={e => onClick?.(page, Number(e.target.value))}>
                            {sizes.map((item, index) => <option key={index} value={item} selected={size == item}>{item}</option>)}
                        </Form.Select>
                    </InputGroup>
                )}
            </div>
            <div className="d-flex gap-2 align-items-center">
                {/* Previous */}
                {previous && (
                    <Button variant={`outline-${variant}`} onClick={() => onClick(previous, size)}><ChevronLeftIcon size={iconSize} /></Button>
                )}
                {/* Links start */}
                <ButtonGroup>
                    {pages.length < 5 ? (
                        pages.map(i => (
                            <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== i && onClick(i, size)} active={page === i}>{i}</Button>
                        ))
                    ) : (
                        pages.filter(i => i === page).map(i => (
                            <>
                                {i - 1 != 1 && i != 1 && (
                                    <>
                                        <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== 1 && onClick(1, size)} active={page === 1}>{1}</Button>
                                        {i - 1 - pages[0] > 1 && <div className="px-3">...</div>}
                                    </>
                                    )}
                                {i - 1 >= 1 && <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== i-1 && onClick(i-1, size)} active={page === i-1}>{i-1}</Button>}
                                <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== i && onClick(i, size)} active={page === i}>{i}</Button>
                                {i + 1 <= pages[pages.length - 1] && <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== i+1 && onClick(i+1, size)} active={page === i+1}>{i+1}</Button>}
                                {i + 1 != pages[pages.length - 1] && i != pages[pages.length - 1] && (
                                    <>
                                        {pages[pages.length - 1] - (i + 1) > 1 && <div className="px-3">...</div>}
                                        <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== pages[pages.length - 1] && onClick(pages[pages.length - 1], size)} active={page === pages[pages.length - 1]}>{pages[pages.length - 1]}</Button>
                                    </>
                                )}
                            </>
                        ))
                    )}
                </ButtonGroup>
                {/* Links end */}
                {/* Next */}
                {next && (
                    <Button variant={`outline-${variant}`} onClick={() => onClick(next, size)}><ChevronRightIcon size={iconSize} /></Button>
                )}
            </div>
        </div>
    )
}