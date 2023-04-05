import { IsNotEmpty, IsString } from 'class-validator';
export class CompletionApiDto {
  @IsNotEmpty({
    message: 'model is required',
  })
  @IsString()
  readonly model: string;
  readonly prompt: string;
  readonly temperature: number;
  readonly top_p: number;
  readonly n: number;
  readonly frequency_penalty: number;
  readonly presence_penalty: number;
}