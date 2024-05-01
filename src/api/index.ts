'use server'

import axios from 'axios';

import { BASE_URL } from '@/lib/constants/api';

import { Form } from '@/types/educational-center';
import { FormLarge, FormSmall } from '@/types/language';


// Language
// SEND ??
export const send = async (formData: FormSmall) => {
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
        console.log(error)
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
        console.log(error)
    }
}

// Educational Center
// SEND CONTACT MESSAGE
export const sendContactMessage = async (formData: Form) => {
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
        console.log(error)
    }
}
