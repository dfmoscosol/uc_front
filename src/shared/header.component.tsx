import INTERNAL_PATHS from "../data/constants/internalRoutes";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  children?: ReactNode;
};

const Header: React.FC<Props> = ({
  title,
  children,
}): JSX.Element => {
  const [openRightSidebar, setOpenRightSidebar] = useState<boolean>(false);

  const handleRightSidebar = (): void => {
    setOpenRightSidebar(!openRightSidebar);
    let bodyElement = document.getElementsByClassName("sidebar");
    bodyElement[0].className = openRightSidebar ? "sidebar" : "sidebar open";
    let bodyElementContent = document.getElementsByClassName("content");
    bodyElementContent[0].className = openRightSidebar ? "content" : "content open";
  };

  return (
    <div className="block-header" style={{ marginBottom: "0" }}>
      <div className="row mt-1">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h2 style={{ color: "#002856" }}>{title}</h2>
          
          <button
            onClick={handleRightSidebar}
            className="btn"
            id="mobile_menu"
            type="button"
          >
            <i className="zmdi zmdi-sort-amount-desc" style={{color:"white"}}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
