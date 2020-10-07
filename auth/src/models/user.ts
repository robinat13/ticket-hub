import mongoose from "mongoose";

// Interface that describes properties required to create this model
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes properties that user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Interface that describes properties that user document have
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Because of typescript to create a new user use this fn
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
