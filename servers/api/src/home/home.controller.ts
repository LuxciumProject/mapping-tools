import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('home')
export class HomeController {
  @Get()
  sayHello(@Query() query: any) {
    console.log('HomeController created', query);
    return 'HomeController created';
  }

  @Post()
  getHello(@Body() body: CreateMessageDto) {
    console.log(body);
    return body;
  }
  // some comment
  @Get('/:id')
  getHelloById(@Param('id') id: string, @Query() query: any) {
    console.log(id, query);
    return id;
  }
}
