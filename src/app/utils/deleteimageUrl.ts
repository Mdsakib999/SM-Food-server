/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

/**
 * Delete images from Cloudinary using their URLs.
 * @param {string[]} urls - Array of Cloudinary image URLs to delete.
 * @returns {Promise<{ result?: object; error?: Error }>} - Result of the deletion operation or an error object.
 */
export const deleteImageUrls = async (urls: string[]): Promise<{ result?: object; error?: Error }> => {
    try {
        // Ensure `urls` is always an array
        const urlArray = Array.isArray(urls) ? urls : [urls];

        // Extract public IDs from the URLs
        const publicIds = urlArray.map((url) => {
            try {
                const segments = new URL(url).pathname.split('/');
                return segments[segments.length - 1].split('.')[0]; // Extract public ID
            } catch (err) {
                console.error(`Invalid URL: ${url}`);
                throw new Error(`Invalid Cloudinary URL: ${url}`);
            }
        });

        // Use Cloudinary API to delete the images
        const result = await cloudinary.api.delete_resources(publicIds, {
            type: 'upload',
            resource_type: 'image',
        });

        return { result };
    } catch (error) {
        console.error('Error deleting images:', error);
        return { error: undefined };
    }
};
