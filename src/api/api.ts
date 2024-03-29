import { PropertyType } from "../types/types";
import img1 from "../../public/images/properties/p1.webp";
import img2 from "../../public/images/properties/p2.webp";
import img3 from "../../public/images/properties/p3.webp";

export const PROPERTIES: PropertyType[] = [
    {
        id: '1',
        name: "Apartment HF Village",
        description: "Apartment HF Village is located in Rio de Janeiro, just 1.5 miles from Linkin Park.",
        img: img1,
        location: "Rio de Janeiro",
        rating: 9,
        price: 500
    },
    {
        id: '2',
        name: "Second Loft",
        description: "Second Loft offers accommodations in New York, a 15-minute walk from Top of the Rock and 0.6 miles from Museum of Modern Art.",
        img: img2,
        location: "New York",
        rating: 7.5,
        price: 250
    },
    {
        id: '3',
        name: "Tokio Hotel",
        description: "Newly renovated Tokio Hotel is conveniently located in the heart of... Tokio.",
        img: img3,
        location: "Tokio",
        rating: 8,
        price: 320
    },
];