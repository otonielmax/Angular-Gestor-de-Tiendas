import { Product } from './../product/product';
import { Store } from './../store/store';

export class Inventory {
    id: number = 0;
    store: Store;
    product: Product;
    quantity: number;
    date_buy: string;
}
