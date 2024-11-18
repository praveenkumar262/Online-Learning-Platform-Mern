import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Dashboard from "./components/common/Dashboard";
import CourseContent from "./components/user/student/CourseContent";
import { getCourses } from "./api"; // Import the API call for fetching courses
import LogoutComponent from './components/LogoutComponent'; // Import the LogoutComponent
import bg from "../src/assets/Images/bg.jpg";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [isLoading, setIsLoading] = useState(true); // State for loading indication

  // Function to get user data from localStorage
  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch user data on mount
  }, []);

  // Fetch courses when the Dashboard is loaded
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const coursesData = await getCourses(); // Get courses from the backend
        console.log("Fetched courses:", coursesData); // Log the fetched courses for debugging
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error); // Error handling
      } finally {
        setIsLoading(false);
      }
    };

    if (userLoggedIn) {
      fetchCourses();
    }
  }, [userLoggedIn]);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Conditional route rendering */}
              {userLoggedIn ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courseSection/:courseId/:courseTitle" element={<CourseContent />} />
                  <Route
                    path="/courses"
                    element={
                      <div>
                        <h1>Available Courses</h1>
                        {isLoading ? (
                          <p>Loading courses...</p>
                        ) : (
                          <ul>
                            {courses.length === 0 ? (
                              <p>No courses available.</p>
                            ) : (
                              courses.map((course) => (
                                <li key={course._id}> {/* Ensure `_id` matches the unique identifier */}
                                  {course.title} - {course.description}
                                </li>
                              ))
                            )}
                          </ul>
                        )}
                      </div>
                    }
                  />
                  <Route path="/logout" element={<LogoutComponent />} /> {/* Add Logout route */}
                </>
              ) : (
                <Route path="/dashboard" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </div>
          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">
              © {date} Copyright: EduSphere
            </div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
