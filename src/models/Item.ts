import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Types } from 'mongoose';

@ObjectType()
class HistoryEntry {
    @Field() name: string;

    @Field() isDepartment: boolean;

    @Field() timeOfTransfer: Date;
}

@ObjectType()
export class Item {
    @Field(() => String)
    public id: Types.ObjectId;

    @Field()
    @prop({ required: true, lowercase: true, index: true })
    public name: string;

    @Field()
    @prop({
        required: true,
        lowercase: true,
        default: 'unassigned',
        index: true
    })
    public category: string;

    @Field()
    @prop({ required: true, lowercase: true, index: true })
    public department: string;

    @Field()
    @prop({ required: true, lowercase: true, index: true })
    public location: string;

    @Field()
    @prop({ required: true })
    public description: string;

    @Field()
    @prop({ required: true })
    public image: string;

    @Field(() => [ HistoryEntry ])
    @prop({ required: true, default: [] })
    public history: HistoryEntry[];
}

export const ItemModel = getModelForClass(Item);
