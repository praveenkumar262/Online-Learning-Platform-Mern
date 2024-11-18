import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axiosInstance from './AxiosInstance';  // Ensure this file is set up correctly
import Dropdown from 'react-bootstrap/Dropdown';

const Register = () => {
   const navigate = useNavigate();
   const nameInputRef = useRef(null);
   const [selectedOption, setSelectedOption] = useState('Select User');
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      type: "",
   });

   const handleSelect = (eventKey) => {
      setSelectedOption(eventKey);
      setData({ ...data, type: eventKey });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      console.log("Submitting form with data:", data);  // Log the data being submitted
      // Validation check
      if (!data?.name || !data?.email || !data?.password || !data?.type) {
         alert("Please fill all fields");
         nameInputRef.current.focus();  // Focus on Full Name if validation fails
         return;
      }

      try {
         console.log("Making POST request to /api/register");  // Log before making the request
         const response = await axiosInstance.post('/api/register', data);
         console.log("Received response:", response);  // Log the response object

         if (response.data.success) {
            console.log("Registration successful:", response.data.message);  // Log success message
            alert(response.data.message);
            navigate('/login');
         } else {
            console.log("Registration failed:", response.data.message);  // Log error message from backend
            alert("Error: " + response.data.message);
         }
      } catch (error) {
         console.error("Error during registration:", error);  // Log the error object if request fails
         alert("Error: Please try again later.");
      }
   };

   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2>EduSphere</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>
                  <Nav>
                     <Link to={'/'}>Home</Link>
                     <Link to={'/login'}>Login</Link>
                     <Link to={'/register'}>Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div className="first-container">
            <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Box sx={{
                  marginTop: 8,
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px',
                  background: '#dddde8db',
                  border: '1px solid lightblue',
                  borderRadius: '5px'
               }}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }} />
                  <Typography component="h1" variant="h5">Register</Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate>
                     <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        autoComplete="name"
                        autoFocus
                        inputRef={nameInputRef}
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoComplete="email"
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                     />
                     <Dropdown className='my-3'>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                           {selectedOption}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           <Dropdown.Item onClick={() => handleSelect("Student")}>Student</Dropdown.Item>
                           <Dropdown.Item onClick={() => handleSelect("Teacher")}>Teacher</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>

                     <Box mt={2}>
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} style={{ width: '200px' }}>
                           Sign Up
                        </Button>
                     </Box>

                     <Grid container>
                        <Grid item>
                           Already have an account?
                           <Link style={{ color: "blue" }} to={'/login'} variant="body2">
                              {" Sign In"}
                           </Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Container>
         </div>
      </>
   );
}

export default Register;
