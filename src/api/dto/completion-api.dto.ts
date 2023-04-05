import { IsNotEmpty, IsString } from 'class-validator';
export class CompletionApiDto {
  @IsNotEmpty({
    message: 'model is required',
  })
  @IsNotEmpty()
  @IsString()
  readonly model: string;
  readonly prompt: string;
  readonly max_tokens: number;
  readonly temperature: number;
  readonly top_p: number;
  readonly n: number;
  readonly frequency_penalty: number;
  readonly presence_penalty: number;
}
