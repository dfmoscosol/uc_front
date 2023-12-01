import React, { Children, ReactNode } from "react";
import { Badge } from "react-bootstrap";
import { MdCheckCircle, MdVideoCameraFront } from "react-icons/md";

type Props = {
    icon: ReactNode;
    title: string;
    title2: string;
    description: number | string;
    presencial: boolean;
};

const KPIView: React.FC<Props> = ({
    icon,
    title,
    title2,
    description,
    presencial
}): JSX.Element => {
    return (
        <>{!presencial && title2 === 'i' ?

            <a href={title} target="_blank" className="kpi-container-a">
                <div className="kpi-text">
                    {title2 == 'i' ? <>{presencial ? <p className="kpi-title">{title}</p> : ''}</> : <p className="kpi-title">{title}</p>}
                    {title2 == 'i' ? <>{presencial ? <p className="kpi-title"><b>Presencial</b></p> : <p className="kpi-virtual"><b>Virtual</b></p>}</> : <p className="kpi-title">{title2}</p>}
                    {title2 == 'i' ? <></> : <p className="kpi-description">{description}</p>}
                </div>
                <div className="kpi-icon">
                    {icon}
                </div>
            </a>
            :
            <div className="kpi-container">
                <div className="kpi-text">
                    {title2 == 'i' ? <>{presencial ? <p className="kpi-title">{title}</p> : ''}</> : <p className="kpi-title">{title}</p>}
                    {title2 == 'i' ? <>{presencial ? <p className="kpi-title"><b>Presencial</b></p> : <p className="kpi-virtual">Virtual</p>}</> : <p className="kpi-title">{title2}</p>}
                    {title2 == 'i' ? <></> : <p className="kpi-description">{description}</p>}
                </div>
                <div className="kpi-icon">
                    {icon}
                </div>
            </div>}

        </>
    );
};


export default KPIView;
