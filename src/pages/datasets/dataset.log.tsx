import { Badge, Container, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import type { DatasetModificationLogListItem } from "../../_models/outputs";
import { resolveProfileImage } from "../../services/account.service";
import { AppProfile } from "../../_components/app-profile";
import { formateDate } from "../../_utils/date-formats";
import { useQuery } from "@tanstack/react-query";
import * as logService from "../../services/log.service"
import { AppLoading } from "../../_components/app-loading";
import Pagination from "../../_components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import type { LogSearch } from "../../_models/searches";

export default function DatasetLogPage() {

    const [searchParams, setSearchParams] = useSearchParams()
    const search:LogSearch = {
        page: Number(searchParams.get("page") ?? 1),
        size: Number(searchParams.get("size") ?? 10)
    }

    const {data:pageResult, isLoading} = useQuery({
        queryKey: ["datasetlogs", search],
        queryFn: () => logService.search(search)
    })

    return (
        <MainContentDecorator title="Modification Log">
            <Container className="p-3">
                <Table hover responsive>
                    <thead>
                        <tr className="align-middle">
                            <th className="text-nowrap">Log ID</th>
                            <th>Member</th>
                            <th className="text-nowrap pe-2 text-end">Dataset ID</th>
                            <th>Modification</th>
                            <th className="text-nowrap">Modified At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageResult?.items?.map(item => <DatasetLogTableRow key={item.logId} item={item} />)}
                    </tbody>
                </Table>
                {isLoading && <AppLoading />}
                {pageResult?.items && pageResult.items.length > 0 && <Pagination page={pageResult.page} total={pageResult.total} size={pageResult.size} onChange={(page, size) => setSearchParams({page: size === pageResult.size ? page.toString() : "1", size: size.toString()})} />}
            </Container>
        </MainContentDecorator>
    )
}

function DatasetLogTableRow({item:{logId, profileUrl, accountEmail, datasetId, modificationType, modifiedAt}}:{item:DatasetModificationLogListItem}) {
    return (
        <tr className="align-middle">
            <td>{logId}</td>
            <td className="text-nowrap">
                <AppProfile className="me-2" img={resolveProfileImage(profileUrl)} /> {accountEmail}
            </td>
            <td className="pe-2 text-end">{datasetId}</td>
            <td>
                {modificationType === "Approve" && <Badge bg="success">{modificationType}</Badge>}
                {modificationType === "Edit" && <Badge bg="primary">{modificationType}</Badge>}
            </td>
            <td className="text-nowrap">{formateDate(modifiedAt)}</td>
        </tr>
    )
}