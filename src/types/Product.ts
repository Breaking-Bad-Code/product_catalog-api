import { Category } from './Category';

export interface Phone {
    id: number,
    category: Category,
    phoneId: string,
    itemId: string,
    name: string,
    fullPrice: number,
    price: number,
    screen: string,
    capacity: string,
    color: string,
    ram: string,
    year: number,
    image: string,
} 
