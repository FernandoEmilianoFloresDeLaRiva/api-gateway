import { Module } from "@nestjs/common";
import { NoteTransport } from "src/common/transports/note.transport";
import { NotesController } from "./notes.controller"
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports : [NoteTransport, AuthModule],
    controllers : [NotesController]
})
export class NotesModule{}