export function encrypt(text: string) {
    return text + 1;
}

export function decrypt(text: string) {
    return text.substr(0, text.length -1);
}

module.exports = {encrypt, decrypt};
