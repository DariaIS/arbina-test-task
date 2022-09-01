import { faker } from '@faker-js/faker';
import { tableType } from "@types";

const newRow = (): tableType => {
    return {
        username: faker.internet.userName(),
        action: faker.git.commitMessage(),
        action_created_at: faker.date.past(),
    }
}

export function makeTableDate(len: number) {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(newRow());
    }
    console.log(arr)
    return arr;
}