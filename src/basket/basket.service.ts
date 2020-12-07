import { Body, forwardRef, Inject, Injectable } from "@nestjs/common";
import {AddToBasketDto} from "./dto/add-to-basket.dto";
import { AddToBasketInterface, RemoveFromBasketInterface } from "../interface/add-to-basket.interface";
import {ShopService} from "../shop/shop.service";

@Injectable()
export class BasketService {

    constructor(
        @Inject(forwardRef(() => ShopService)) private shopService: ShopService
    ) {
    }

    private basket: AddToBasketDto[] = [];
    addToBasket(addToBasket: AddToBasketDto): AddToBasketInterface {
        if(
            typeof addToBasket.name !== 'string' ||
            typeof addToBasket.quantity !== 'number' ||
            addToBasket.name === '' ||
            addToBasket.quantity < 1 ||
            this.shopService.getAllItems().findIndex(el => el.name === addToBasket.name) === -1
        ) {
            return {
                isSuccess: false
            }
        } else {
            const index: number = this.basket.push(addToBasket) - 1
            return {isSuccess: true, index}
        }

    }

    deleteFromBasket(id: string): RemoveFromBasketInterface {
        const {basket} = this;
        const index = parseInt(id);
        if (basket[index] !== undefined) {
            basket.splice(index, 1);
            return {isSuccess: true}
        } else {
            return {isSuccess: false}
        }
    }

    getBasket(): AddToBasketDto[] {
        return this.basket;
    }

    totalPrice(): number {
        let total: number = 0;
        this.basket.map(el => {
            total += (this.shopService.getPriceOfItem(el.name) * el.quantity * 1.23)
        })
        return Number(total.toFixed(2))
    }

    countPromo():number {
        return this.totalPrice() > 10 ? 1 : 0;
    }
}
