import axios from 'axios';

const API_URL = "https://localhost:7290/api/Blockchain";

export const getChain = () => axios.get(`${API_URL}/chain`);
export const addTransaction = (transaction) => axios.post(`${API_URL}/transactions`, transaction);
export const mineBlock = async (minerAddress) => {
    try {
        await axios.post(`${API_URL}/mine`, minerAddress, {
            headers: {
                'Content-Type': 'application/json'  
            }
        });
    } catch (error) {
        console.error("Error during mining :", error);
    }
};
export const checkChainValidity = () => axios.get(`${API_URL}/valid`);


