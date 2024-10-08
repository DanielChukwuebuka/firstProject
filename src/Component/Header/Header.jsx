import "./Header.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "animate.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activenav, setActiveNav] = useState("./");
  const [show, setShow] = useState(false);
  const Nav = useNavigate();

  // Safely accessing the user object from the store
  const user = useSelector((state) => state.stores.user);
  const User = user?.UserName || ""; // Safely handle undefined or null user
  const writer = useSelector((state) => state.stores.formDataWriter);
  const WriterId = writer?.id || ""; // Safely handle undefined or null writer

  console.log(user);
  console.log(User);
  console.log(writer);
  console.log(WriterId);

  const handleNavItem = (navItem) => {
    setActiveNav(navItem);
    setSidebarOpen(false);
  };

  const handleUserClick = () => {
    if (user) {
      Nav("/signout");
    } else if (writer) {
      Nav("/usersignout");
    } else {
      Nav("/login");
    }
    setSidebarOpen(false);
  };

  const Navigate = (path) => {
    Nav(path);
    setSidebarOpen(false);
  };

  const handleNavItemClick = () => {
    if (Object.keys(user).length !== 0) {
      Nav("/adminpage/admindashhome");
    } else {
      Nav("/login");
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    Nav();
  }, [Nav]);

  return (
    <div>
      <header className="head">
        <div className="headerwrap">
          <div className="Logo">
            <img src="./realbluelogo.png" alt="LOGO" />
          </div>

          <div className="centerNav">
            <ul>
              <li
                onClick={() => {
                  setActiveNav("./");
                  Nav("./");
                }}
                className={`activeNavItem ${
                  activenav === "./" ? "active" : ""
                }`}
              >
                Home
              </li>
              <li
                onClick={() => {
                  setActiveNav("./contactus");
                  Nav("./contactus");
                }}
                className={`activeNavItem ${
                  activenav === "./contactus" ? "active" : ""
                }`}
              >
                Contact us
              </li>
              <li
                onClick={() => {
                  setActiveNav("./about");
                  Nav("./about");
                }}
                className={`activeNavItem ${
                  activenav === "./about" ? "active" : ""
                }`}
              >
                About
              </li>
              <li className="usericons">
                {User ? (
                  <div className="optUser" onMouseOver={() => setShow(!show)}>
                    {User?.charAt(0)}
                  </div>
                ) : (
                  <FaRegCircleUser
                    className="users"
                    onMouseOver={() => setShow(!show)}
                  />
                )}
              </li>
            </ul>
            {show ? (
              <div className="LogSign">
                <ul className="UnBox">
                  {User ? (
                    <li
                      onClick={() => Nav("../signout")}
                      style={{
                        fontSize: "18px",
                        marginTop: "35%",
                        fontWeight: "500",
                      }}
                    >
                      Sign Out
                    </li>
                  ) : (
                    <li>
                      <div
                        style={{
                          fontSize: "18px",
                          marginTop: "15%",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        <span onClick={() => Nav("../signup")}>Sign up</span>
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          marginTop: "15%",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        <span onClick={() => Nav("../login")}>Login</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="CTA1">
            {User ? (
              <div
                className="Dash"
                onClick={() => Nav("../adminpage/admindashhome")}
              >
                <MdOutlineSpaceDashboard className="Dashboard" />
                Dashboard
              </div>
            ) : (
              <button onClick={() => Nav("./Login")}>Get Started</button>
            )}
          </div>

          <div className="ham">
            <GiHamburgerMenu
              onClick={() => setSidebarOpen(true)}
              className="hamb"
            />
          </div>
        </div>

        {sidebarOpen && (
          <div className="sidebarDiv">
            <div className="close">
              <AiOutlineClose
                className="closeicon"
                onClick={() => setSidebarOpen(false)}
              />
            </div>
            <div className="contents">
              {User ? (
                <div className="div">
                  <div className="optUsers" onMouseOver={() => setShow(!show)}>
                    {User?.charAt(0)}
                  </div>
                  <p onClick={() => Nav("./signout")}>Sign Out</p>
                </div>
              ) : (
                <div onClick={() => Nav("./Login")} className="useR">
                  <FaRegCircleUser className="aUser" />
                  <p>Sign In</p>
                </div>
              )}

              <div className="centerNav1">
                <ul className="sidebarsss">
                  {User ? (
                    <div
                      className="Dash1"
                      onClick={() => Nav("../adminpage/admindashhome")}
                    >
                      <MdOutlineSpaceDashboard className="Dashboard1" />
                      Dashboard
                    </div>
                  ) : (
                    <div className="Dash1" onClick={() => Navigate("/")}>
                      <AiOutlineHome />
                      Home
                    </div>
                  )}

                  <div className="Dash1" onClick={() => Navigate("/contactus")}>
                    <IoIosContact />
                    Contact Us
                  </div>
                  <div className="Dash1" onClick={() => Navigate("/about")}>
                    <FcAbout />
                    About
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
