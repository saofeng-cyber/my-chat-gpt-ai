import { Injectable, Logger } from '@nestjs/common';
import { CompletionApiDto } from './dto/completion-api.dto';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
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
          temperature: 0.5,
          top_p: 1,
          n: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        // 添加代理，很重要
        {
          proxy: {
            host: '127.0.0.1',
            port: 7890,
            protocol: 'socks5',
          },
        },
      );
      const { id, choices } = completion.data;
      return {
        id,
        text: choices[0].text,
      };
    } catch (error) {
      this.logger.error(error.message);
      return error.message;
    }
  }
}
