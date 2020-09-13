import { MyContext } from '../utils/interfaces';
import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { Item, ItemModel } from '../models/Item';
import { UserModel } from '../models/User';

@Resolver()
export class ItemResolver {
    @Query(() => [ Item ], { nullable: true })
    items(@Ctx() { user }: MyContext) {
        if (user && user.isAdmin) return ItemModel.find({});
        else return null;
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
        @Arg('department', () => String)
        itemDepartment: string
    ) {
        if (itemCategory === '') {
            itemCategory = 'unassigned';
        }

        const item = new ItemModel({
            name: itemName,
            category: itemCategory,
            department: itemDepartment,
            history: {
                name: itemDepartment,
                isDepartment: true
            }
        });

        try {
            await item.save();
            return '';
        } catch (err) {
            console.log(err);
            return 'Error';
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
                    history: { name: user.username, isDepartment: user.isAdmin }
                }
            }
        );

        return 'Success';
    }
}
