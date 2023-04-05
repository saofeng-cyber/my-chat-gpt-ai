import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ChatCompletionRequestMessage } from 'openai';
export class ChatApiDto {
  @IsNotEmpty({
    message: 'model is required',
  })
  @IsNotEmpty()
  @IsString()
  readonly model: string;
  @ArrayNotEmpty()
  readonly messages: Array<ChatCompletionRequestMessage>;
  readonly temperature: number;
  readonly top_p: number;
  readonly n: number;
  readonly frequency_penalty: number;
  readonly presence_penalty: number;
}
