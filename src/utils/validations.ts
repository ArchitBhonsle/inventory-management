export function isEmail(value: string): boolean {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(value);
}

export function isUsername(value: string): boolean {
    const re = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/;
    return re.test(value);
}
