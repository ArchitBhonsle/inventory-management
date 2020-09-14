import { UserModel } from '../models/User';

const userSeed = [
    {
        items: [],
        isAdmin: true,
        isDepartment: false,
        username: 'abc',
        email: 'abc@abc.com',
        password:
            '$argon2i$v=19$m=4096,t=3,p=1$8dNNA/YmKhnVbP4ccROQEw$r6eyuZ9ALTPSNj1GhJ5dxkHGeNKxh2mHebs334H1Ajo',
        department: 'a'
    },
    {
        items: [],
        isAdmin: false,
        isDepartment: false,
        username: 'def',
        email: 'def@def.com',
        password:
            '$argon2i$v=19$m=4096,t=3,p=1$e1buArNlfFwo1z4DhxIeyg$45ftcUxJN7T7gq/MM3uZcAdGP40qgIXe/GRcWT3C3oA',
        department: 'a'
    },
    {
        items: [],
        isAdmin: false,
        isDepartment: false,
        username: 'ghi',
        email: 'ghi@ghi.com',
        password:
            '$argon2i$v=19$m=4096,t=3,p=1$02q1hErHNY+FNxnqS3r0Ew$tixUauDC85Vh21dBEi2ryM0D8LhhCa64lsY1wMJENLs',
        department: 'a'
    },
    {
        items: [],
        isAdmin: false,
        isDepartment: false,
        username: 'rst',
        email: 'rst@rst.com',
        password:
            '$argon2i$v=19$m=4096,t=3,p=1$i6oFEhhalguh41640Dpm6w$sdU1TLj7x3Uve20HtEc1s/1Ug9tE36yor117JehsTi4',
        department: 'z'
    },
    {
        items: [],
        isAdmin: false,
        isDepartment: false,
        username: 'uvw',
        email: 'uvw@uvw.com',
        password:
            '$argon2i$v=19$m=4096,t=3,p=1$wxX6Ju0V608/cqCQGr1wyQ$9holKgtUR3RiIs0we0T/ihk27nmft/3s0I6CN5gMv+c',
        department: 'z'
    },
    {
        items: [],
        isAdmin: true,
        isDepartment: false,
        username: 'xyz',
        email: 'xyz@xyz.com',
        password:
            '$argon2i$v=19$m=4096,t=3,p=1$+ozQRkObVY9d4iHjKg8Faw$MxeUF7oQXZ2xJfkc5UMYfhDaZNwDEqbuIvMNAVEhTMc',
        department: 'z'
    },
    {
        items: [],
        isAdmin: true,
        isDepartment: true,
        username: 'a',
        email: 'a@a.com',
        password:
            '$argon2i$v=19$m=4096,t=3,p=1$FzyfBI0RH3z8lYnyYwDIVw$Ga2IsQq8Dq836wm3FsIE9Qpze3FgS0oRsgQZauNIpvk',
        department: 'a'
    },
    {
        items: [],
        isAdmin: true,
        isDepartment: true,
        username: 'z',
        email: 'z@z.com',
        password:
            '$argon2i$v=19$m=4096,t=3,p=1$gEALFknBGNn20e97iLv24A$2fT/CjyJPiZBWWopef03B0KQ/HcxDChca3HlyGafSdQ',
        department: 'z'
    }
];

async function seedUsers() {
    await UserModel.deleteMany({});
    await UserModel.insertMany(userSeed);
}

export async function seed() {
    await seedUsers();
    console.log('------ users seeded ------');
}
