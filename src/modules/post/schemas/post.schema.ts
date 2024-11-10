import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../user/schemas/user.schema";
import { Comment } from "../../comment/schemas/comment.schema";

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  content: string[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId; // Reference to the User who created the post

  @Prop({ type: [{ type: Types.ObjectId, ref: Comment.name }] })
  comments: Types.ObjectId[]; // Array of references to Comment objects
}

export const PostSchema = SchemaFactory.createForClass(Post);
