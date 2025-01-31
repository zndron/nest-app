import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}

export class UpdateProjectDto extends CreateProjectDto {}
