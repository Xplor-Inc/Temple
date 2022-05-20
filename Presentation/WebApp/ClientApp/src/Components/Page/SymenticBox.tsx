import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { ContextAwareToggle } from "../Page/ContextAwareToggle";

interface IBoxProp {
    children: React.ReactNode,
    title?: string,
    key?: string
}

export const SymenticBox = ({ title, children, key }: IBoxProp) => {
    if (!key) key = "0";

    return (
        <div className="box" style={{ borderTop: title ? "0" :"1px solid #755139"}}>
            <Accordion defaultActiveKey={key}>
                {
                title &&
                <Card.Header>
                     <ContextAwareToggle eventKey={key}>
                            {title}
                        </ContextAwareToggle>
                    
                    </Card.Header>
                }
                <Accordion.Collapse eventKey={key}>
                    <Card.Body className={"w-100 " + (title ? "" : "p-0")}>
                        { children }
                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}