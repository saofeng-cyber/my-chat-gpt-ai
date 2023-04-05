import { PartialType } from '@nestjs/mapped-types';
import { CompletionApiDto } from './completion-api.dto';

export class UpdateApiDto extends PartialType(CompletionApiDto) {}
