import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { ChatApiDto } from './dto/chat-api.dto';
import { CompletionApiDto } from './dto/completion-api.dto';
import { SecretGuard } from 'src/secret/secret.guard';

@Controller('api')
@UseGuards(SecretGuard)
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('sendMessage')
  sendMessage(@Body() completionApiDto: CompletionApiDto) {
    return this.apiService.sendCompletionMessage(completionApiDto);
  }

  @Post('sendChatMessage')
  sendChatMessage(@Body() chatApiDto: ChatApiDto) {
    return this.apiService.sendChatMessage(chatApiDto);
  }
}
