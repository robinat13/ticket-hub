import mongoose from "mongoose";
import { Password } from "../services/password";

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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //Searializing the Object to Json method to return custom properties
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
//This runs everytime before UserSchema.save
userSchema.pre("save", async function (done) {
  //Only rehash password if User is created for first time or User's password is modified
  if (this.isModified("password")) {
    const hashedPassowrd = await Password.toHash(this.get("password"));
    this.set("password", hashedPassowrd);
  }
  done();
});

// Because of typescript to create a new user use this fn
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
