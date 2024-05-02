'use server'

import axios from 'axios';

import { BASE_URL } from '@/lib/constants/api';

import { Form } from '@/types/educational-center';
import { FormLarge, FormSmall } from '@/types/language';


// Language
// SEND CONTACT US
export const sendContactUsLanguage = async (contactUs: FormSmall) => {
    try {
        // const response = await axios.post(BASE_URL, null, {
        //     params: { contactUs },
        //     timeout: 10000
        // });

        return {
            status: 200//response.status
        };
    } catch (error) {
        return error
    }
}

// SEND A REQUEST
export const sendRequest = async (formData: FormLarge) => {
    try {
        console.log(formData)
        const response = await axios.post(BASE_URL, null, {
            params: { formData },
            timeout: 10000
        });

        return {
            status: response.status
        };
    } catch (error) {
        return error
    }
}

// Educational Center
// SEND CONTACT US
export const sendContactUsEducational = async (contactUs: Form) => {
    try {
        console.log(contactUs)
        const response = await axios.post(BASE_URL, null, {
            params: { contactUs },
            timeout: 10000
        });

        return {
            status: response.status
        };
    } catch (error) {
        return error
    }
}
