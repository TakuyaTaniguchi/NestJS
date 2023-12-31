import { Controller, Get,Post,Req,Query,Param ,Body ,ParseIntPipe, Render} from '@nestjs/common';
import { Request } from 'express';
import { CreateCustomerDto } from './create-customer.dto'
import { Customer } from './interfaces/customers.interface'
import { CustomerService } from './customers.service'

// https://zenn.dev/kisihara_c/books/nest-officialdoc-jp/viewer/overview-controllers#%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9

@Controller('customers')
export class CustomerController {
  constructor(
    private customerService: CustomerService
    ) {}


  // @Get(':id')
  // call(@Param() params): string {
  //   console.log(params.id);
  //   return `My Name is Tom_${params.id}`
  // }

  @Get()
  @Render('index')
  index(@Body() customer: Customer) {

    // this.customerService.call({
    //   id: 100,
    //   name: '111'
    // })

    return {
      message: 'Hello world!!!! Nest' ,
      user : {
       id: 100,
       name: 'taro'
      }
   };
  }

  @Post()
  addCustomer(@Body() customer:Customer){
    // dbにCustomerを追加する
    this.customerService.add({
      id:customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      isActive: customer.isActive
      })
  }

  @Post()
  getUser(@Body() customer: Customer){
    return this.customerService.call(customer)
  }

  @Get('user')
  callUsesr(@Query('id') id: number, @Req() request: Request): string {
    return `yes_Query__ ${id}`
  }
  @Get('user/member/:id')
  callUsesrMember(@Query('sort') sort: string,  @Param('id', ParseIntPipe) id: number) {
     return this.customerService.findOn(id)
  }
  @Post('user')
  create(@Body() createCustomerDto:CreateCustomerDto): string {
    // curl -X POST -H "Content-Type: application/json" -d '{"id":100, "firstName":"taro","lastName":"tanaka","isActive":true }' http://localhost:3000/customers/
    // curl -X POST -H "Content-Type: application/json" -d '{"name":"taro", "Age":"30"}' http://localhost:3000/customers/user
    console.log(createCustomerDto)
    return 'This action adds a new cat';
  }
  
}
