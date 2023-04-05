import { Injectable, Logger } from '@nestjs/common';
import { CompletionApiDto } from './dto/completion-api.dto';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { ChatApiDto } from './dto/chat-api.dto';
dotenv.config();

@Injectable()
export class ApiService {
  public openai: OpenAIApi;
  private readonly logger = new Logger(ApiService.name);

  async onModuleInit() {
    await this.initGpt();
  }
  async initGpt() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY missing');
    }
    try {
      this.logger.log('Initializing GPT...');
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.openai = new OpenAIApi(configuration);
      this.logger.log('GPT initialized');
    } catch (error) {
      this.logger.error(error);
    }
  }
  async sendCompletionMessage(completionApiDto: CompletionApiDto) {
    try {
      const completion = await this.openai.createCompletion(
        {
          model: completionApiDto.model,
          prompt: completionApiDto.prompt,
          max_tokens: completionApiDto.max_tokens,
          temperature: completionApiDto.temperature,
          top_p: completionApiDto.top_p,
          n: completionApiDto.n,
          frequency_penalty: completionApiDto.frequency_penalty,
          presence_penalty: completionApiDto.presence_penalty,
        },
        // 添加代理，很重要(部署的时候需要注释掉)
        // {
        //   proxy: {
        //     host: 'localhost',
        //     port: 7890,
        //     protocol: 'socks5',
        //   },
        // },
      );
      const { id, choices, usage } = completion.data;
      this.logger.log(`Completion ID: ${id},Choices: ${choices}`);
      return {
        id,
        text: choices[0].text,
        usage,
      };
    } catch (error) {
      this.logger.error(error.message);
      return error.message;
    }
  }
  async sendChatMessage(chatApiDto: ChatApiDto) {
    try {
      const completion = await this.openai.createChatCompletion(
        {
          model: chatApiDto.model,
          messages: chatApiDto.messages,
          temperature: chatApiDto.temperature,
          top_p: chatApiDto.top_p,
          n: chatApiDto.n,
          frequency_penalty: chatApiDto.frequency_penalty,
          presence_penalty: chatApiDto.presence_penalty,
        },
        // 添加代理，很重要(部署的时候需要注释掉)
        // {
        //   proxy: {
        //     host: 'localhost',
        //     port: 7890,
        //     protocol: 'socks5',
        //   },
        // },
      );
      const { id, choices, usage } = completion.data;
      this.logger.log(`Completion ID: ${id},Choices: ${choices}`);
      return {
        id,
        content: choices[0].message.content,
        usage,
      };
    } catch (error) {
      this.logger.error(error.message);
      return error.message;
    }
  }
}
