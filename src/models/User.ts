import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
    @Field()
    @prop({ lowercase: true, required: true, unique: true })
    public username: string;

    @Field()
    @prop({ lowercase: true, required: true, unique: true, trim: true })
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

    @Field()
    @prop({ required: true })
    public designation: string;

    @Field()
    @prop({ required: true, default: '' })
    public bio: string;

    @Field()
    @prop({ required: true })
    public image: string;

    @Field()
    @prop({ required: true })
    public firstname: string;

    @Field()
    @prop({ required: true })
    public lastname: string;
}

export const UserModel = getModelForClass(User);
