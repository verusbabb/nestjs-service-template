import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../user/schemas/user.schema";
import { Post } from "../../post/schemas/post.schema";

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId; // Reference to the User who made the comment

  @Prop({ type: [String], required: true })
  content: string[]; // Array of strings, each representing a paragraph

  @Prop({ type: Types.ObjectId, ref: Post.name, required: true })
  post: Types.ObjectId; // Reference to the Post that this comment pertains to
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
