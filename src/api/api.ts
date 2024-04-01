/*  I created this file to simulate an API response.
    Feel free to add new properties (:
*/

import { PropertyType } from "../types/types";

export const PROPERTIES: PropertyType[] = [
    {
        id: '1',
        name: "Apartment HF Village",
        description: "Apartment HF Village is located in Rio de Janeiro, just 1.5 miles from Linkin Park.",
        img: "/images/properties/p1.webp",
        location: "Rio de Janeiro",
        rating: 9,
        price: 500
    },
    {
        id: '2',
        name: "Second Loft",
        description: "Second Loft offers accommodations in New York, a 15-minute walk from Top of the Rock and 0.6 miles from Museum of Modern Art.",
        img: "/images/properties/p2.webp",
        location: "New York",
        rating: 7.5,
        price: 250
    },
    {
        id: '3',
        name: "Tokio Hotel",
        description: "Newly renovated Tokio Hotel is conveniently located in the heart of... Tokio.",
        img: "/images/properties/p3.webp",
        location: "Tokio",
        rating: 8,
        price: 325
    },
];