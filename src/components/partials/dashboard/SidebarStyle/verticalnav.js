import React, { useState, useContext } from 'react'

//router
import { Link, useLocation, useNavigate } from 'react-router-dom'

//react-bootstrap
import { Accordion, useAccordionButton, AccordionContext, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap'

function CustomToggle({ children, eventKey, onClick }) {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) => onClick({ state: !active, eventKey: eventKey }));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Link to="#" aria-expanded={isCurrentEventKey ? 'true' : 'false'} className="nav-link" role="button" onClick={(e) => {
            decoratedOnClick(isCurrentEventKey)
        }}>
            {children}
        </Link>
    );
}

const VerticalNav = React.memo(() => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(false)
    const [active, setActive] = useState('')

    //location
    let location = useLocation();
    // console.log(document);
    // Replace 'userRole' with the key you've used to save the user role in localStorage
    const userRole = localStorage.getItem('role');

    //Logout fuctinallity
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token'); // assuming your token key is 'token'
            const response = await fetch('process.env.REACT_APP_API_URL/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // including the token in the headers
                },
                credentials: 'include', // This is important to include cookies
            });
            if (response.ok) {
                // Clear user data from localStorage upon successful logout
                localStorage.removeItem('userRole');
                localStorage.removeItem('token');
                localStorage.removeItem('member_id');

                // Redirect to the login page or any other desired page after logout
                navigate('/auth/sign-in');
            } else {
                // Handle the error if the logout request fails
                console.error('Logout request failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    //menu list for Admin 
    const renderAdminMenu = (
        // JSX for Admin menu
        <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
            <li className="nav-item static-item">
                <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                    <span className="default-icon">Social</span>
                    <span className="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
                </Link>
            </li>

            <li className={`${location.pathname === '/' ? 'active' : ''} nav-item `}>
                <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} aria-current="page" to="/">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Home</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            newspaper
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Home</span>
                </Link>
            </li>
            <li className={`${location.pathname === '/adminDashboard' ? 'active' : ''} nav-item `}>
                <Link className={`${location.pathname === '/adminDashboard' ? 'active' : ''} nav-link `} aria-current="page" to="/adminDashboard">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Dashboard</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            Dashboard
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Dashboard</span>
                </Link>
            </li>

            <li className={`${location.pathname === '"dashboards/app/renew-mship' ? 'active' : ''} nav-item `}>
                <Link className={`${location.pathname === '"dashboards/app/renew-mship' ? 'active' : ''} nav-link `} aria-current="page" to="dashboards/app/renew-mship">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Membership Requets</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            person
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Membership Requets</span>
                </Link>
            </li>

            <li className={`${location.pathname === '/dashboards/app/members' ? 'active' : ''} nav-item `}>
                <Link className={`${location.pathname === '/dashboards/app/members' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboards/app/members">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Members</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            person
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Members</span>
                </Link>
            </li>

            <Accordion.Item as="li" eventKey="members-menu" bsPrefix={`nav-item ${active === 'profile' ? 'active' : ''} `} onClick={() => setActive('profile')} >
                <CustomToggle eventKey="members-menu" onClick={(activeKey) => setActiveMenu(activeKey)}>
                    <OverlayTrigger placement="right" overlay={<Tooltip>Master Data </Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            groups
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Master Data</span>
                    <i className="right-icon material-symbols-outlined">chevron_right</i>
                </CustomToggle>
                <Accordion.Collapse eventKey="members-menu" >
                    <ul className="sub-nav">

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboards/app/mship-plans' ? 'active' : ''} nav-link`} to="dashboards/app/mship-plans">
                                <i className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Membership Plane</Tooltip>}>
                                    <i className="sidenav-mini-icon"> M </i>
                                </OverlayTrigger>
                                <span className="item-name"> Membership Plane </span>
                            </Link>
                        </Nav.Item>

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboards/app/mcategory' ? 'active' : ''} nav-link`} to="dashboards/app/mcategory">
                                <i className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Member Categories</Tooltip>}>
                                    <i className="sidenav-mini-icon"> P1 </i>
                                </OverlayTrigger>
                                <span className="item-name"> Member Categories</span>
                            </Link>
                        </Nav.Item>

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboards/app/chapters' ? 'active' : ''} nav-link`} to="dashboards/app/chapters">
                                <i className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Chapters</Tooltip>}>
                                    <i className="sidenav-mini-icon"> P2 </i>
                                </OverlayTrigger>
                                <span className="item-name"> Chapters</span>
                            </Link>
                        </Nav.Item>
                    </ul>
                </Accordion.Collapse>
            </Accordion.Item>


            {/* <Accordion.Item as="li" eventKey="referrals-menu" bsPrefix="nav-item">
                <CustomToggle eventKey="referrals-menu" onClick={(activeKey) => setActiveMenu(activeKey)}>
                    <OverlayTrigger placement="right" overlay={<Tooltip>Referrals</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            task_alt
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Referrals</span>
                    <i className="right-icon material-symbols-outlined">chevron_right</i>
                </CustomToggle>
                <Accordion.Collapse eventKey="referrals-menu" >
                    <ul className="sub-nav">

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboards/app/for-me' ? 'active' : ''} nav-link`} to="dashboards/app/for-me">
                                <i className="icon">
                                    <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>For Me</Tooltip>}>
                                    <i className="sidenav-mini-icon"> FM </i>
                                </OverlayTrigger>
                                <span className="item-name">For Me</span>
                            </Link>
                        </Nav.Item>

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboards/app/by-me' ? 'active' : ''} nav-link`} to="dashboards/app/by-me">
                                <i className="icon">
                                    <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>By Me</Tooltip>}>
                                    <i className="sidenav-mini-icon"> BM </i>
                                </OverlayTrigger>
                                <span className="item-name">By Me</span>
                            </Link>
                        </Nav.Item>

                    </ul>
                </Accordion.Collapse>
            </Accordion.Item> */}
            <Nav.Item as="li">
                <Link className={`${location.pathname === 'dashboard/app/referralsList' ? 'active' : ''} nav-link `} aria-current="page" to="dashboard/app/referralsList">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Referrals</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            task_alt
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Referrals</span>
                </Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Link className={`${location.pathname === 'dashboard/app/AllMeetingList' ? 'active' : ''} nav-link `} aria-current="page" to="dashboard/app/AllMeetingList">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Meetings</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            notifications
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Meetings</span>
                </Link>
            </Nav.Item>

            <Nav.Item as="li">
                <Link className={`${location.pathname === '/auth/sign-in' ? 'active' : ''} nav-link `} onClick={handleLogout} aria-current="page" to="/auth/sign-in">
                    <OverlayTrigger placement="right" overlay={<Tooltip>logout</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            logout
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">logout</span>
                </Link>
            </Nav.Item>

            <li className="nav-item static-item">
                <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                    <span className="default-icon">FEATURED</span>
                    <span className="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
                </Link>
            </li>

            <Nav.Item as="li">
                <Link className={`${location.pathname === '/dashboard/app/file' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboard/app/file">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Files</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            insert_drive_file
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Files</span>
                </Link>
            </Nav.Item>

            <Nav.Item as="li">
                <Link className={`${location.pathname === '/chat/index' ? 'active' : ''} nav-link `} aria-current="page" to="/chat/index" target='_blank noopener,noreferrer'>
                    <OverlayTrigger placement="right" overlay={<Tooltip>Chat</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            message
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Chat</span>
                </Link>
            </Nav.Item>

            <Nav.Item as="li">
                <Link className={`${location.pathname === '/dashboards/app/calendar' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboards/app/calendar">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Calendar</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            calendar_month
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Calendar</span>
                </Link>
            </Nav.Item>

            {/* <Nav.Item as="li">
            <Link className={`${location.pathname === '/adminDashboar' ? 'active' : ''} nav-link`} to="/adminDashboar">
                <OverlayTrigger placement="right" overlay={<Tooltip>Admin & Permission</Tooltip>}>  
                <i className="icon material-symbols-outlined">
                    admin_panel_settings
                </i>
                </OverlayTrigger>
                <span className="item-name">Admin</span>
            </Link>
        </Nav.Item> */}

        </Accordion>
    );

    //Menu list for Member
    const renderMemberMenu = (
        // JSX for Member menu
        <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
            <li className="nav-item static-item">
                <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                    <span className="default-icon">Social</span>
                    <span className="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
                </Link>
            </li>

            <li className={`${location.pathname === '/' ? 'active' : ''} nav-item `}>
                <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} aria-current="page" to="/">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Home</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            newspaper
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Home</span>
                </Link>
            </li>
            <li className={`${location.pathname === '/userDashboard' ? 'active' : ''} nav-item `}>
                <Link className={`${location.pathname === '/userDashboard' ? 'active' : ''} nav-link `} aria-current="page" to="/userDashboard">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Dashboard</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            Dashboard
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Dashboard</span>
                </Link>
            </li>

            {/* <li className={`${location.pathname === '/dashboards/app/members' ? 'active' : ''} nav-item `}>
                <Link className={`${location.pathname === '/dashboards/app/members' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboards/app/members">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Members</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            person
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Members</span>
                </Link>
            </li> */}
            <Accordion.Item as="li" eventKey="member-menu" bsPrefix="nav-item">
                <CustomToggle eventKey="member-menu" onClick={(activeKey) => setActiveMenu(activeKey)}>
                    <OverlayTrigger placement="right" overlay={<Tooltip>Members</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            person
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Members</span>
                    <i className="right-icon material-symbols-outlined">chevron_right</i>
                </CustomToggle>
                <Accordion.Collapse eventKey="member-menu" >
                    <ul className="sub-nav">

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboard/app/MembersList' ? 'active' : ''} nav-link`} to="dashboard/app/MembersList">
                                <i className="icon">
                                    <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Member List</Tooltip>}>
                                    <i className="sidenav-mini-icon"> FM </i>
                                </OverlayTrigger>
                                <span className="item-name">Member List</span>
                            </Link>
                        </Nav.Item>

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboard/app/friend-list' ? 'active' : ''} nav-link`} to="dashboard/app/friend-list">
                                <i className="icon">
                                    <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Connections</Tooltip>}>
                                    <i className="sidenav-mini-icon"> BM </i>
                                </OverlayTrigger>
                                <span className="item-name">Connections</span>
                            </Link>
                        </Nav.Item>

                    </ul>
                </Accordion.Collapse>
            </Accordion.Item>

            <Accordion.Item as="li" eventKey="referrals-menu" bsPrefix="nav-item">
                <CustomToggle eventKey="referrals-menu" onClick={(activeKey) => setActiveMenu(activeKey)}>
                    <OverlayTrigger placement="right" overlay={<Tooltip>Referrals</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            task_alt
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Referrals</span>
                    <i className="right-icon material-symbols-outlined">chevron_right</i>
                </CustomToggle>
                <Accordion.Collapse eventKey="referrals-menu" >
                    <ul className="sub-nav">

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboards/app/for-me' ? 'active' : ''} nav-link`} to="dashboards/app/for-me">
                                <i className="icon">
                                    <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Referrals Received</Tooltip>}>
                                    <i className="sidenav-mini-icon"> FM </i>
                                </OverlayTrigger>
                                <span className="item-name">Referrals Received</span>
                            </Link>
                        </Nav.Item>

                        <Nav.Item as="li">
                            <Link className={`${location.pathname === 'dashboards/app/by-me' ? 'active' : ''} nav-link`} to="dashboards/app/by-me">
                                <i className="icon">
                                    <svg className="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <OverlayTrigger placement="right" overlay={<Tooltip>Referrals Sent</Tooltip>}>
                                    <i className="sidenav-mini-icon"> BM </i>
                                </OverlayTrigger>
                                <span className="item-name">Referrals Sent</span>
                            </Link>
                        </Nav.Item>

                    </ul>
                </Accordion.Collapse>
            </Accordion.Item>

            <Nav.Item as="li">
                <Link className={`${location.pathname === 'dashboards/app/meeting' ? 'active' : ''} nav-link `} aria-current="page" to="dashboards/app/meeting">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Meetings</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            notifications
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Meetings</span>
                </Link>
            </Nav.Item>

            <Nav.Item as="li">
                <Link className={`${location.pathname === '/auth/sign-in' ? 'active' : ''} nav-link `} aria-current="page" to="/auth/sign-in">
                    <OverlayTrigger placement="right" overlay={<Tooltip>logout</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            logout
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Logout</span>
                </Link>
            </Nav.Item>

            <li className="nav-item static-item">
                <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                    <span className="default-icon">FEATURED</span>
                    <span className="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">-</span>
                </Link>
            </li>

            <Nav.Item as="li">
                <Link className={`${location.pathname === '/dashboard/app/file' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboard/app/file">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Files</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            insert_drive_file
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Files</span>
                </Link>
            </Nav.Item>

            <Nav.Item as="li">
                <Link className={`${location.pathname === '/chat/index' ? 'active' : ''} nav-link `} aria-current="page" to="/chat/index" target='_blank noopener,noreferrer'>
                    <OverlayTrigger placement="right" overlay={<Tooltip>Chat</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            message
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Chat</span>
                </Link>
            </Nav.Item>

            <Nav.Item as="li">
                <Link className={`${location.pathname === '/dashboards/app/calendar' ? 'active' : ''} nav-link `} aria-current="page" to="/dashboards/app/calendar">
                    <OverlayTrigger placement="right" overlay={<Tooltip>Calendar</Tooltip>}>
                        <i className="icon material-symbols-outlined">
                            calendar_month
                        </i>
                    </OverlayTrigger>
                    <span className="item-name">Calendar</span>
                </Link>
            </Nav.Item>

            {/* <Nav.Item as="li">
                    <Link className={`${location.pathname === '/adminDashboar' ? 'active' : ''} nav-link`} to="/adminDashboar">
                        <OverlayTrigger placement="right" overlay={<Tooltip>Admin & Permission</Tooltip>}>  
                        <i className="icon material-symbols-outlined">
                            admin_panel_settings
                        </i>
                        </OverlayTrigger>
                        <span className="item-name">Admin</span>
                    </Link>
                </Nav.Item> */}

        </Accordion>
    );


    const renderMenu = userRole === 'ADMIN' ? renderAdminMenu : renderMemberMenu;
    return (
        <React.Fragment>{renderMenu}</React.Fragment>
    )
})

export default VerticalNav
