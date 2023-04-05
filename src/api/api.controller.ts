import { Body, Controller, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { CompletionApiDto } from './dto/completion-api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('sendMessage')
  sendMessage(@Body() completionApiDto: CompletionApiDto) {
    return this.apiService.sendCompletionMessage(completionApiDto);
  }
}
