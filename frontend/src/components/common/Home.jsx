import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import AllCourses from './AllCourses';
import bgImage from '../../assets/Images/bg.jpg';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        id='home-container' 
        className='first-container'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        {/* Navbar Section */}
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand><h2>EduSphere</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />
              <Nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Hero Content */}
        <div className="content-home">
          <p>
            Empowering Minds, Inspiring Futures: <br />
            Your Gateway to Online Learning with <br />
            <span className="highlighted-text">EduSphere</span>
          </p>
          <Link to={'/register'}>
            <Button variant='primary' className='m-2' size='md'>Explore Courses</Button>
          </Link>
        </div>
      </div>

      {/* Trending Courses Section */}
      <Container className="second-container">
        <h2 className="text-center my-4">Trending Courses</h2>
        <AllCourses />
      </Container>
    </div>
  );
};

export default Home;
