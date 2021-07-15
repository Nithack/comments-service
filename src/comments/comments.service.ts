import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ResponseCommentDto } from './dto/response-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
  ): Promise<ResponseCommentDto> {
    try {
      const newComment = await this.commentRepository.save(createCommentDto);
      return ResponseCommentDto.factory(true, newComment);
    } catch (error) {
      return ResponseCommentDto.factory(false, error.message);
    }
  }

  async findAll(): Promise<ResponseCommentDto> {
    try {
      const findComments = (await this.commentRepository.find()) || null;
      if (!findComments)
        return ResponseCommentDto.factory(false, 'no comments');
      return ResponseCommentDto.factory(true, findComments);
    } catch (error) {
      return ResponseCommentDto.factory(false, error.message);
    }
  }

  async findOne(uuid: string): Promise<ResponseCommentDto> {
    try {
      const findComments =
        (await this.commentRepository.find({ uuid })) || null;
      if (!findComments)
        return ResponseCommentDto.factory(false, 'comment not found');
      return ResponseCommentDto.factory(true, findComments);
    } catch (error) {
      return ResponseCommentDto.factory(false, error.message);
    }
  }

  async update(
    uuid: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<ResponseCommentDto> {
    try {
      const findComment =
        (await this.commentRepository.findOne({ uuid })) || null;
      if (!findComment) return ResponseCommentDto.factory(false, 'test');
      Object.assign(findComment, updateCommentDto);
      const saveComment = await this.commentRepository.save(findComment);
      console.log(saveComment);
      return ResponseCommentDto.factory(true, saveComment);
    } catch (error) {
      return ResponseCommentDto.factory(false, error.message);
    }
  }

  async remove(uuid: string): Promise<ResponseCommentDto> {
    try {
      await this.commentRepository.delete(uuid);
      return ResponseCommentDto.factory(true, 'test');
    } catch (error) {
      return ResponseCommentDto.factory(false, error.message);
    }
  }
}
