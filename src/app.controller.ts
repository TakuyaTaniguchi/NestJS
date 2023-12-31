import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {
       message: 'Hello world!!!! Nest' ,
       user : {
        id: 100,
        name: 'taro'
       }
    };
  }
}
