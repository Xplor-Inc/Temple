import { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface IProp {
    children?: any,
    eventKey: string,
    callback?: any
}

export const ContextAwareToggle = ({ children, eventKey, callback }: IProp) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    return (
        <div className="p-1 ps-4 w-100 base-BG-Text bg-gradient"
            role="button"
            onClick={decoratedOnClick}>
            {children}
            <span>
                {activeEventKey !== eventKey && <FaChevronUp />}
                {activeEventKey === eventKey && <FaChevronDown />}
            </span>
        </div>
    );
}