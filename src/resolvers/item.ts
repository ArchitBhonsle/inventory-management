import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { Item, ItemModel } from '../models/Item';

@Resolver()
export class ItemResolver {
    @Query(() => [ Item ])
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
    createItem(
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
            item.save();
            return '';
        } catch (err) {
            console.log(err);
            return 'Error';
        }
    }
}
