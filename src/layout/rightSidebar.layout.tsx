import { useState } from "react";

import { useAppDispatch } from "../hooks/reduxHooks";
import { authLogout } from "../redux/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";

//images import
import { getAuth,signOut } from "firebase/auth";

// const
import INTERNAL_ROUTES from "../data/constants/internalRoutes";

const RightSidebar = (): JSX.Element => {
  // local variables
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  /* const [isDarkMode, setIsDarkMode] = useState<boolean>(false); */

  // local methods
  const logoutHandler = (): void => {
	const auth = getAuth();
    auth.signOut();
  };
  /* const handleTheme = (): void => {
		setIsDarkMode(!isDarkMode);
    isDarkMode ? document.body.classList.remove('theme-dark') : document.body.classList.add('theme-dark');
	}; */

  return (
    <div className="navbar-right">
      <ul className="navbar-nav">
        {/* <li className="dropdown">
					<button className="crm_button dropdown-toggle" title="App" data-bs-toggle="dropdown" role="button">
						<i className="zmdi zmdi-apps"></i>
					</button>
					<ul className="dropdown-menu slideUp2">
						<li className="header">App Sortcute</li>
						<li className="body">
							<ul className="menu app_sortcut list-unstyled">
								<li>
									<Link to={INTERNAL_PATHS.DASHBOARD_DEFAULT}>
										<div className="icon-circle mb-2 bg-blue">
											<i className="zmdi zmdi-camera"></i>
										</div>
										<p className="mb-0">Photos</p>
									</Link>
								</li>
								<li>
									<NavLink to="#" onClick={(e) => e.preventDefault()}>
										<div className="icon-circle mb-2 bg-amber">
											<i className="zmdi zmdi-translate"></i>
										</div>
										<p className="mb-0">Translate</p>
									</NavLink>
								</li>
								<li>
									<Link to={INTERNAL_PATHS.DASHBOARD_DEFAULT}>
										<div className="icon-circle mb-2 bg-green">
											<i className="zmdi zmdi-calendar"></i>
										</div>
										<p className="mb-0">Calendar</p>
									</Link>
								</li>
								<li>
									<Link to={INTERNAL_PATHS.DASHBOARD_DEFAULT}>
										<div className="icon-circle mb-2 bg-purple">
											<i className="zmdi zmdi-account-calendar"></i>
										</div>
										<p className="mb-0">Contacts</p>
									</Link>
								</li>
								<li>
									<NavLink to="#" onClick={(e) => e.preventDefault()}>
										<div className="icon-circle mb-2 bg-red">
											<i className="zmdi zmdi-tag"></i>
										</div>
										<p className="mb-0">News</p>
									</NavLink>
								</li>
								<li>
									<NavLink to="#" onClick={(e) => e.preventDefault()}>
										<div className="icon-circle mb-2 bg-grey">
											<i className="zmdi zmdi-map"></i>
										</div>
										<p className="mb-0">Maps</p>
									</NavLink>
								</li>
							</ul>
						</li>
					</ul>
				</li> */}
        {/* <li className="dropdown">
					<button className="crm_button dropdown-toggle" title="Notifications" data-bs-toggle="dropdown" role="button">
						<i className="zmdi zmdi-notifications"></i>
						<div className="notify">
							<span className="heartbit"></span>
							<span className="point"></span>
						</div>
					</button>
					<ul className="dropdown-menu slideUp2">
						<li className="header">Notifications</li>
						<li className="body">
							<ul className="menu list-unstyled">
								<li>
									<NavLink to="#" onClick={(e): void => e.preventDefault()}>
										<div className="icon-circle bg-blue">
											<i className="zmdi zmdi-account"></i>
										</div>
										<div className="menu-info">
											<h4>8 New Members joined</h4>
											<p>
												<i className="zmdi zmdi-time"></i> 14 mins ago{" "}
											</p>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="#" onClick={(e): void => e.preventDefault()}>
										<div className="icon-circle bg-amber">
											<i className="zmdi zmdi-shopping-cart"></i>
										</div>
										<div className="menu-info">
											<h4>4 Sales made</h4>
											<p>
												<i className="zmdi zmdi-time"></i> 22 mins ago{" "}
											</p>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="#" onClick={(e): void => e.preventDefault()}>
										<div className="icon-circle bg-red">
											<i className="zmdi zmdi-delete"></i>
										</div>
										<div className="menu-info">
											<h4>
												<b>Nancy Doe</b> Deleted account
											</h4>
											<p>
												<i className="zmdi zmdi-time"></i> 3 hours ago{" "}
											</p>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="#" onClick={(e): void => e.preventDefault()}>
										<div className="icon-circle bg-green">
											<i className="zmdi zmdi-edit"></i>
										</div>
										<div className="menu-info">
											<h4>
												<b>Nancy</b> Changed name
											</h4>
											<p>
												<i className="zmdi zmdi-time"></i> 2 hours ago{" "}
											</p>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="#" onClick={(e): void => e.preventDefault()}>
										<div className="icon-circle bg-grey">
											<i className="zmdi zmdi-comment-text"></i>
										</div>
										<div className="menu-info">
											<h4>
												<b>John</b> Commented your post
											</h4>
											<p>
												<i className="zmdi zmdi-time"></i> 4 hours ago{" "}
											</p>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="#" onClick={(e): void => e.preventDefault()}>
										<div className="icon-circle bg-purple">
											<i className="zmdi zmdi-refresh"></i>
										</div>
										<div className="menu-info">
											<h4>
												<b>John</b> Updated status
											</h4>
											<p>
												<i className="zmdi zmdi-time"></i> 3 hours ago{" "}
											</p>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="#" onClick={(e): void => e.preventDefault()}>
										<div className="icon-circle bg-light-blue">
											<i className="zmdi zmdi-settings"></i>
										</div>
										<div className="menu-info">
											<h4>Settings Updated</h4>
											<p>
												<i className="zmdi zmdi-time"></i> Yesterday{" "}
											</p>
										</div>
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="footer">
							<NavLink to="#" onClick={(e) => e.preventDefault()}>
								View All Notifications
							</NavLink>
						</li>
					</ul>
				</li> */}
        {/* <li className="dropdown">
					<button className="crm_button dropdown-toggle" data-bs-toggle="dropdown" role="button">
						<i className="zmdi zmdi-flag"></i>
						<div className="notify">
							<span className="heartbit"></span>
							<span className="point"></span>
						</div>
					</button>
					<ul className="dropdown-menu slideUp2">
						<li className="header">
							Tasks List{" "}
							<small className="float-right">
								<NavLink to="#" onClick={(e) => e.preventDefault()}>
									View All
								</NavLink>
							</small>
						</li>
						<li className="body">
							<ul className="menu tasks list-unstyled">
								<li>
									<div className="progress-container progress-primary">
										<span className="progress-badge">eCommerce Website</span>
										<div className="progress">
											<div
												className="progress-bar progress-bar-warning"
												role="progressbar"
												aria-valuenow={86}
												aria-valuemin={0}
												aria-valuemax={100}
												style={{ width: "86%" }}
											>
												<span className="progress-value">86%</span>
											</div>
										</div>
										<ul className="list-unstyled team-info">
											<li className="m-r-15">
												<small>Team</small>
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
										</ul>
									</div>
								</li>
								<li>
									<div className="progress-container">
										<span className="progress-badge">iOS Game Dev</span>
										<div className="progress">
											<div
												className="progress-bar progress-bar-warning"
												role="progressbar"
												aria-valuenow={45}
												aria-valuemin={0}
												aria-valuemax={100}
												style={{ width: "45%" }}
											>
												<span className="progress-value">45%</span>
											</div>
										</div>
										<ul className="list-unstyled team-info">
											<li className="m-r-15">
												<small>Team</small>
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
										</ul>
									</div>
								</li>
								<li>
									<div className="progress-container progress-warning">
										<span className="progress-badge">Home Development</span>
										<div className="progress">
											<div
												className="progress-bar progress-bar-warning"
												role="progressbar"
												aria-valuenow={29}
												aria-valuemin={0}
												aria-valuemax={100}
												style={{ width: "29%" }}
											>
												<span className="progress-value">29%</span>
											</div>
										</div>
										<ul className="list-unstyled team-info">
											<li className="m-r-15">
												<small>Team</small>
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
											<li>
												<img src={avatar} alt="Avatar" />
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</li> */}
        
        <li>
          <button 
            onClick={logoutHandler}
            className="crm_button"
            title="Cerrar sesión"
          >
            <i className="zmdi zmdi-power"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RightSidebar;
