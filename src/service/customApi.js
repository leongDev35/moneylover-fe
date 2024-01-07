import axios from "axios";
import { SITE } from "../App";

const customAPI = () => {
    return axios.create({
    baseURL: SITE,
    headers: {
        Authorization : `Bearer ${localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).token:""}`
    }
});
}
export default customAPI;