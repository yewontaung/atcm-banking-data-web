import { Button, Container, Image, Row } from "react-bootstrap";
import { defaultProfile, iconSize } from "../../_utils/constants";
import { CloudUploadIcon, MailIcon, SettingsIcon, TagIcon, User2Icon } from "lucide-react";
import TotalDataCard from "../../_components/totaldata-card";
import ThemeButton from "../../_components/theme-button";

export default function MeProfilePage() {
    return (
        <Container>
            <ThemeButton className="position-absolute end-0 me-3" />
            <Row>
                <div className="col-auto">
                    <div className="py-3">
                        <Image src={defaultProfile} className="d-block mx-auto" roundedCircle width={200} height={200} style={{objectFit: "cover"}} />
                        <div className="p-2 mt-3 d-flex flex-column row-gap-2">
                            <div><User2Icon className="me-3" size={iconSize} /> Ye Wont Aung</div>
                            <div><MailIcon className="me-3" size={iconSize} /> yewontaung708@gmail.com</div>
                            <div><TagIcon className="me-3" size={iconSize} /> Admin</div>
                            <Button className="mt-3"><CloudUploadIcon size={iconSize} /> Upload Profile</Button>
                            <Button variant="outline-primary" className=""><SettingsIcon size={iconSize} /> Change Password</Button>
                        </div>
                    </div>
                </div>
                <div className="col-auto flex-grow-1">
                    <Container className="py-3">
                        <h5>Collect Rate Summary</h5>
                        <div className="d-flex gap-3 mt-3">
                            <TotalDataCard label="Training Dataset" total={200} className="w-25" />
                            <TotalDataCard label="Validation Dataset" total={200} className="w-25" />
                            <TotalDataCard label="Testing Dataset" total={200} className="w-25" />
                        </div>
                    </Container>

                    {/* Permission List */}
                    <Container className="mt-3">
                        <h5>Permissions</h5>
                        <ul>
                            <li>Collect data</li>
                            <li>Review & approve pending dataset</li>
                            <li>Manage memebers (add members, change roles)</li>
                            <li>Add & edit intent data</li>
                            <li>Manage named entities</li>
                        </ul>
                    </Container>
                </div>
            </Row>
        </Container>
    )   
}