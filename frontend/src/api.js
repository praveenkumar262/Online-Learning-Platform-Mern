import axios from 'axios';

const API_URL = 'http://localhost:5001'; // Backend URL

// Function to fetch courses
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/courses`); // Fetch courses from the backend
    return response.data;  // Return the fetched courses
  } catch (error) {
    console.error('Error fetching courses:', error);  // Error handling
    throw error;
  }
};

// Function to create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API_URL}/api/courses`, courseData); // Send new course to backend
    return response.data;  // Return the created course data
  } catch (error) {
    console.error('Error creating course:', error);  // Error handling
    throw error;
  }
};
