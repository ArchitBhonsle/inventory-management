import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
    @Field()
    @prop({ lowercase: true, required: true, unique: true })
    public username: string;

    @Field()
    @prop({ lowercase: true, required: true, unique: true })
    public email: string;

    @prop({ required: true })
    public password: string;
}

export const UserModel = getModelForClass(User);
