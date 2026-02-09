/**
 * Contact Service.
 * Handles contact form submissions.
 */
import { apiClient } from './api';

class ContactService {
    /**
     * Submit contact form data.
     * 
     * @param {Object} formData
     * @returns {Promise<Object>} Response data
     */
    async submitContactForm(formData) {
        return apiClient.post('/api/contact', formData);
    }
}

export const contactService = new ContactService();
