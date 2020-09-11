import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Types } from 'mongoose';

@ObjectType()
export class User {
    @Field(() => String)
    public id: Types.ObjectId;

    @Field()
    @prop({ lowercase: true, required: true, unique: true })
    public username: string;

    @Field()
    @prop({ lowercase: true, required: true, unique: true })
    public email: string;

    @prop({ required: true })
    public password: string;

    @Field(() => [ String ])
    @prop({ required: true, default: [] })
    public items: string[];

    @Field(() => String)
    @prop({ required: true, lowercase: true, index: true })
    public department: string;

    @Field()
    @prop({ required: true, default: false })
    public isAdmin: boolean;
}

export const UserModel = getModelForClass(User);
