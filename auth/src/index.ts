import express from 'express';
import "express-async-errors"
import { json } from 'body-parser';
import mongoose from "mongoose";

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async() => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startUp = async() =>{
  await mongoose.connect("mongodb://auth-mongo-srv:27017/auth",{useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true}).catch(err=>{
    console.log(err);
  });
  console.log('Connected to db');
  
  app.listen(3000, () => {
    console.log('Auth service started on port 3000');
  });
}
startUp();

