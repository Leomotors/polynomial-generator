import { Root } from "../main/root";
import { parseRoot } from "../main/root/parseUtils";

export function checkRoot(key: Root[], ans: string) {
    const answers = [
        ...new Set(
            ans
                .replace(/,/g, " ")
                .split(" ")
                .filter((x) => x.length > 0)
        ),
    ].map((x) => JSON.stringify(parseRoot(x)));

    const keySetStr = [...new Set(key.map((k) => JSON.stringify(k)))];

    if (answers.length != keySetStr.length) return false;

    keySetStr.sort();
    answers.sort();

    for (let index = 0; index < keySetStr.length; index++) {
        if (keySetStr[index] != answers[index]) return false;
    }

    return true;
}
