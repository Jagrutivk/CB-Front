import React from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link} from 'react-router-dom'

//profile-header
import ProfileHeader from '../../../components/profile-header'

// image
import img1 from '../../../assets/images/page-img/profile-bg2.jpg'
import img2 from '../../../assets/images/page-img/profile-bg1.jpg'
import img3 from '../../../assets/images/page-img/profile-bg3.jpg'
import img4 from '../../../assets/images/page-img/profile-bg4.jpg'
import img5 from '../../../assets/images/page-img/profile-bg5.jpg'
import img6 from '../../../assets/images/page-img/profile-bg6.jpg'
import img7 from '../../../assets/images/page-img/profile-bg7.jpg'
import img8 from '../../../assets/images/page-img/profile-bg8.jpg'
import img9 from '../../../assets/images/page-img/profile-bg9.jpg'
import user05 from '../../../assets/images/user/05.jpg'
import user06 from '../../../assets/images/user/06.jpg'
import user07 from '../../../assets/images/user/07.jpg'
import user08 from '../../../assets/images/user/08.jpg'
import user09 from '../../../assets/images/user/09.jpg'
import user10 from '../../../assets/images/user/10.jpg'
import user13 from '../../../assets/images/user/13.jpg'
import user14 from '../../../assets/images/user/14.jpg'
import user15 from '../../../assets/images/user/15.jpg'
import user16 from '../../../assets/images/user/16.jpg'
import user17 from '../../../assets/images/user/17.jpg'
import user18 from '../../../assets/images/user/18.jpg'
import user19 from '../../../assets/images/user/19.jpg'


const Connections =() =>{
    return(
        <>
            <ProfileHeader title="Friend Lists" img={img3}/>
                <div id="content-page" className="content-page">
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img1} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user05} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Anna Sthesia</Link>
                                                                </h4>
                                                                <h6>@designer</h6>
                                                                <p>Lorem Ipsam</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body className="card-body profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img2} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user06} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Paul Molive</Link>
                                                                </h4>
                                                                <h6>@developer</h6>
                                                                <p>Google</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img4} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user07} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">AnnaMull Enterprise</Link>
                                                                </h4>
                                                                <h6>IT</h6>
                                                                <p>Pune</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img5} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user08} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Paige Turner Ltd</Link>
                                                                </h4>
                                                                <h6>Retail</h6>
                                                                <p>Mumbai</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img6} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user09} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Bob Frapples Electronics</Link>
                                                                </h4>
                                                                <h6>Consumer Electronics</h6>
                                                                <p>Chennai</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img7} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user10} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Barb Ackue Foods</Link>
                                                                </h4>
                                                                <h6>Food Processing</h6>
                                                                <p>Kolkata</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img8} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user13} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Greta Life Care</Link>
                                                                </h4>
                                                                <h6>Healthcare</h6>
                                                                <p>Hyderabad</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img9} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user14} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Ira Membrit Infotech</Link>
                                                                </h4>
                                                                <h6>IT</h6>
                                                                <p>Pune</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img2} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user15} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Pete Sariya</Link>
                                                                </h4>
                                                                <h6>@designer</h6>
                                                                <p>Nell Technolgies</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img1} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user16} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Monty Carlo</Link>
                                                                </h4>
                                                                <h6>Apparel</h6>
                                                                <p>Kolkata</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img5} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user17} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Ed Itorial</Link>
                                                                </h4>
                                                                <h6>Education</h6>
                                                                <p>Bangalore</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <Card className="card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img8} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user18} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Paul Issy</Link>
                                                                </h4>
                                                                <h6>R & D</h6>
                                                                <p>IIT Bombay</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img7} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user19} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Rick Shaw</Link>
                                                                </h4>
                                                                <h6>Coder</h6>
                                                                <p>TCS</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img9} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user07} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Ben Effit Sweets</Link>
                                                                </h4>
                                                                <h6>Foods</h6>
                                                                <p>Kolkata</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className=" card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img4} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user08} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Justin Case Ltd</Link>
                                                                </h4>
                                                                <h6>Manufacturing</h6>
                                                                <p>Pune</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="card-block card-stretch card-height">
                                    <Card.Body className=" profile-page p-0">
                                        <div className="profile-header-image">
                                            <div className="cover-container">
                                                <img loading="lazy" src={img1} alt="profile-bg" className="rounded img-fluid w-100"/>
                                            </div>
                                            <div className="profile-info p-4">
                                                <div className="user-detail">
                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                        <div className="profile-detail d-flex">
                                                            <div className="profile-img pe-4">
                                                                <img loading="lazy" src={user09} alt="profile-img" className="avatar-130 img-fluid" />
                                                            </div>
                                                            <div className="user-data-block">
                                                                <h4>
                                                                    <Link to="/dashboard/app/friend-profile">Aaron Ottix </Link>
                                                                </h4>
                                                                <h6>Designer</h6>
                                                                <p>Infosys</p>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Following</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
        </>
  )

}

export default Connections;