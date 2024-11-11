import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../user/schemas/user.schema";

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  content: string[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId; // Reference to the User who created the post

  comments: string[]; // Virtual property for comments (not stored in MongoDB)
}

export const PostSchema = SchemaFactory.createForClass(Post);

// Set up a virtual field to populate comments dynamically
PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});
