
import {Body, Controller, Delete, Inject, Param, Post, Get} from '@nestjs/common';
import {BasketService} from "./basket.service";
import {AddToBasketDto} from "./dto/add-to-basket.dto";

@Controller('/')
export class BasketController {

    constructor(
        @Inject(BasketService) private basketService: BasketService
    ) {
    }

    @Get('/basket')
    getBasket() {
        return this.basketService.getBasket()
    }

    @Get('/basket/total-price')
    totalPrice() {
        return this.basketService.totalPrice();
    }

    @Post('/basket')
    addToBasket(
        @Body() addToBasket: AddToBasketDto
    ) {
        return this.basketService.addToBasket(addToBasket)
    }

    @Delete('/basket/:id')
    deleteFromBasket(
        @Param('id') id: string
    ) {
        return this.basketService.deleteFromBasket(id)
    }
}
