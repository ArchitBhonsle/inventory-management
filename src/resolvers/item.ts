import { isAdmin } from '../utils/auth';
import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { Item, ItemModel } from '../models/Item';
import { UserModel } from '../models/User';
import { MyContext } from '../utils/misc';

@Resolver()
export class ItemResolver {
    @Query(() => [ Item ], { nullable: true })
    items() {
        return ItemModel.find({});
    }

    @Query(() => [ Item ])
    getItemsByName(
        @Arg('name', () => String)
        itemName: string
    ) {
        return ItemModel.find({ name: itemName });
    }

    @Query(() => [ Item ])
    getItemsByCategoryName(
        @Arg('category', () => String)
        itemCategoryName: string
    ) {
        return ItemModel.find({ category: itemCategoryName });
    }
    @Query(() => [ Item ])
    getItemsByDepartment(
        @Arg('department', () => String)
        deptName: string
    ) {
        return ItemModel.find({ department: deptName });
    }

    @Query(() => [ Item ])
    getItemById(
        @Arg('id', () => String)
        itemID: string
    ) {
        return ItemModel.findById(itemID);
    }

    @Mutation(() => String)
    async createItem(
        @Arg('name', () => String)
        itemName: string,
        @Arg('category', () => String)
        itemCategory: string,
        @Arg('location', () => String)
        itemLocation: string,
        @Arg('description', () => String)
        itemDescription: string,
        @Arg('image', () => String)
        itemImage: string,
        @Ctx() { username }: MyContext
    ) {
        const user = await isAdmin(username);
        if (!user) return 'not authorized';

        if (itemCategory === '') {
            itemCategory = 'unassigned';
        }

        const item = new ItemModel({
            name: itemName,
            category: itemCategory,
            department: user.username,
            location: itemLocation,
            description: itemDescription,
            image: itemImage,
            history: {
                name: user.username,
                isDepartment: true,
                timeOfTransfer: new Date()
            }
        });

        try {
            await item.save();
            return '';
        } catch (err) {
            console.log(err);
            return 'Unknown error, please try again';
        }
    }

    @Mutation(() => String)
    async transferItem(
        @Arg('id', () => String)
        itemId: string,
        @Arg('username', () => String)
        username: string
    ) {
        const item = await ItemModel.findById(itemId);
        if (!item) {
            return 'Item doesn\'t exist';
        }

        const lastUserUsername = item.history[item.history.length - 1].name;
        await UserModel.findOneAndUpdate(
            { username: lastUserUsername },
            { $pull: { items: itemId } },
            { new: true }
        );

        const user = await UserModel.findOneAndUpdate(
            { username: username },
            { $push: { items: itemId } },
            { new: true }
        );
        if (!user) {
            return 'User doesn\'t exist';
        }

        await ItemModel.findOneAndUpdate(
            { _id: itemId },
            {
                $push: {
                    history: {
                        name: user.username,
                        isDepartment: user.isAdmin,
                        timeOfTransfer: new Date()
                    }
                }
            }
        );

        return 'Success';
    }
}
