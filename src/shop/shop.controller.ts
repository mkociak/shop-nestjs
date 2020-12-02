import {Controller, Get, Inject} from '@nestjs/common';
import {GetAllItemsInterface} from "../interface/get-all-items.interface";
import {ShopService} from "./shop.service";

@Controller('/')
export class ShopController {

    constructor(
        @Inject(ShopService) private shopService: ShopService
    ) {
    }

    @Get('/shop')
    allItems(): GetAllItemsInterface[] {
        return this.shopService.getAllItems()
    }
}
