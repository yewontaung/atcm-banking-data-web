import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button, ButtonGroup, Container, Form, InputGroup } from "react-bootstrap";
import { iconSize } from "../../_utils/constants";

type PaginationProps = {
    page: number,
    size?: number,
    sizes?: number[],
    total: number,
    onChange?: (page: number, size: number) => void,
    variant?: "danger" | "primary" | "success" | "secondary" | "dark" | "light",
}

export default function Pagination({
    page, total, onChange,
    variant = "secondary",
    size = 10, sizes = [10, 20, 30] }: PaginationProps) {

    const pages = Math.ceil(total / size)
    const pageLinks = Array.from({ length: pages }).map((_, i) => i + 1)

    return (
        <Container>
            <div className="row gap-3 justify-content-between">
                <div className="col-auto d-flex gap-2 align-items-center">
                    {total > 0 && (
                        <InputGroup className="w-auto">
                            <InputGroup.Text>Total</InputGroup.Text>
                            <div className="form-control">{total}</div>
                        </InputGroup>
                    )}
                    {total > 0 && sizes && (
                        <InputGroup className="d-none d-md-flex d-lg-flex w-auto">
                            <InputGroup.Text>Size</InputGroup.Text>
                            <Form.Select defaultValue={size} onChange={e => onChange?.(page, Number(e.target.value))}>
                                {sizes.map((item, index) => <option key={index} value={item}>{item}</option>)}
                            </Form.Select>
                        </InputGroup>
                    )}
                </div>

                <div className="col-auto d-flex gap-2 ms-auto mx-md-0 align-items-center">
                    {/* Previous */}
                    <Button disabled={page == 1} variant={`outline-${variant}`} onClick={() => onChange?.(page - 1, size)}><ChevronLeftIcon size={iconSize} /></Button>
                    {/* Links start */}
                    <ButtonGroup>

                        {pages < 5 ? (
                            pageLinks.map(i => (
                                <Button key={i} className="px-3" variant={`outline-${variant}`} onClick={() => page !== i && onChange?.(i, size)} active={page === i}>{i}</Button>
                            ))
                        ) : (
                            pageLinks.filter(i => i === page).map(i => (
                                <>
                                    {i - 1 != 1 && i != 1 && (
                                        <>
                                            <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== 1 && onChange?.(1, size)} active={page === 1}>{1}</Button>
                                            {i - 1 - pageLinks[0] > 1 && <div className="px-3">...</div>}
                                        </>
                                    )}
                                    {i - 1 >= 1 && <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== i - 1 && onChange?.(i - 1, size)} active={page === i - 1}>{i - 1}</Button>}
                                    <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== i && onChange?.(i, size)} active={page === i}>{i}</Button>
                                    {i + 1 <= pageLinks[pages - 1] && <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== i + 1 && onChange?.(i + 1, size)} active={page === i + 1}>{i + 1}</Button>}
                                    {i + 1 != pageLinks[pages - 1] && i != pageLinks[pages - 1] && (
                                        <>
                                            {pageLinks[pages - 1] - (i + 1) > 1 && <div className="px-3">...</div>}
                                            <Button className="px-3" variant={`outline-${variant}`} onClick={() => page !== pageLinks[pages - 1] && onChange?.(pageLinks[pages - 1], size)} active={page === pageLinks[pages - 1]}>{pageLinks[pages - 1]}</Button>
                                        </>
                                    )}
                                </>
                            ))
                        )}
                    </ButtonGroup>
                    {/* Links end */}
                    {/* Next */}
                    <Button disabled={page == pages} variant={`outline-${variant}`} onClick={() => onChange?.(page + 1, size)}><ChevronRightIcon size={iconSize} /></Button>
                </div>

            </div>
        </Container>
    )
}