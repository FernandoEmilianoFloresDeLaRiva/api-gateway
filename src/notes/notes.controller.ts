import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TRANSPORT_CONSTANTS } from 'src/common/constants/transports.constant';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NoteDTO } from './dtos/notes.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('notes')
@ApiTags('Notes')
@ApiBearerAuth('JWT-auth')
export class NotesController {
  constructor(
    @Inject(TRANSPORT_CONSTANTS.NOTES) private readonly client: ClientProxy,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllNotes() {
    return await this.client.send({ cmd: 'note.findAll' }, {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getNotesByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.client.send({ cmd: 'note.findByUser' }, userId).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNote(@Body() note: NoteDTO) {
    return await this.client.send({ cmd: 'note.create' }, note).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
