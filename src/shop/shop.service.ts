import { Injectable } from '@nestjs/common';
import {GetAllItemsInterface} from "../interface/get-all-items.interface";

@Injectable()
export class ShopService {

    getAllItems(): GetAllItemsInterface[] {
        return (
            [
                {
                    name: 'Chipsy',
                    description: 'Pyszne cziperki, mniam mniam',
                    netPrice: 3.99,
                    available: 5
                },
                {
                    name: 'Piwo',
                    description: 'Zdrowa bo dobre',
                    netPrice: 4.99,
                    available: 12
                },
                {
                    name: 'Baton',
                    description: 'Zjedz sobie',
                    netPrice: 0.99,
                    available: 3
                },
            ])
    }

    getPriceOfItem(name: string): number {
        const index: number = this.getAllItems().findIndex(el => el.name === name);
        if (index >= 0) {
            return this.getAllItems()[index].netPrice;
        }
    }
}
