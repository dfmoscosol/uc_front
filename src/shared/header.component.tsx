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
  const [openLeftSidebar, setOpenLeftSidebar] = useState<boolean>(false);
  const [openRightSidebar, setOpenRightSidebar] = useState<boolean>(false);

  /* const handleLeftSidebar = (): void => {
    setOpenLeftSidebar(!openLeftSidebar);
    let bodyElement = document.getElementsByClassName("theme-blush");
    bodyElement[0].className = openLeftSidebar
      ? "theme-blush"
      : "theme-blush right_icon_toggle";
  }; */

  const handleRightSidebar = (): void => {
    setOpenRightSidebar(!openRightSidebar);
    let bodyElement = document.getElementsByClassName("sidebar");
    bodyElement[0].className = openRightSidebar ? "sidebar" : "sidebar open";
    let bodyElementContent = document.getElementsByClassName("content");
    bodyElementContent[0].className = openRightSidebar ? "content" : "content open";
  };

  return (
    <div className="block-header" style={{ marginBottom: "0" }}>
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h2 style={{ color: "#002856" }}>{title}</h2>
          {/* <ul className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to={INTERNAL_PATHS.HOME} style={{ color: "#A51008" }}>
                Inicio
              </Link>
            </li>
            {breadcrumbs.map(
              (b, index, row): JSX.Element => (
                <li
                  key={index}
                  className={`breadcrumb-item ${index + 1 === row.length && "active"
                    }`}
                >
                  {!b.link ? b.title : <Link style={{ color: "#A51008" }} to={b.link}>{b.title}</Link>}
                </li>
              )
            )}
          </ul> */}
          <button
            onClick={handleRightSidebar}
            className="btn btn-primary btn-icon"
            id="mobile_menu"
            type="button"
          >
            <i className="zmdi zmdi-sort-amount-desc"></i>
          </button>
        </div>
        {/* <div className="col-lg-5 col-md-6 col-sm-12">
          <button
            onClick={handleLeftSidebar}
            className="btn btn-black btn-icon float-end right_icon_toggle_btn"
            type="button"
          >
            <i className="zmdi zmdi-arrow-right"></i>
          </button>
          {children}

        </div> */}
      </div>
    </div>
  );
};

export default Header;
