import { classToClass, plainToClass } from 'class-transformer';
export class ResponseCommentDto {
  success: boolean;
  data: any;
  public static factory(success: boolean, data: any): ResponseCommentDto {
    const resultDataDto = plainToClass(
      ResponseCommentDto,
      { success, data },
      {
        ignoreDecorators: true,
      },
    );
    return classToClass(resultDataDto);
  }
}
