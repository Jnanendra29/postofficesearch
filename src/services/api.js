import axios from 'axios';

const BASE_API_URL = "https://api.postalpincode.in/pincode/";
const BASE_API_URL_NAME = "https://api.postalpincode.in/postoffice/"

export const searchByPincode = async (pincode) => {
    try {
      const response = await axios.get(`${BASE_API_URL}${pincode}`) ;
      return response.data[0].PostOffice || []; 
    } catch (error) {
        console.error('Error fetching pincode data: ', error)
    }
};

export const searchByName = async (name) => {
    try {
        const response = await axios.get(`${BASE_API_URL_NAME}${name}`);
        return response.data[0].PostOffice || [];
    } catch (error) {
        console.error('Error in fetching data: ', error)
    }
}