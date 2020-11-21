import axios from 'axios';

export default axios.create({
    baseURL: 'https://projects.premiumspread.com/api'
});