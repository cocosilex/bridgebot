export default function getUsernameAndRank(message: string): { username: string; rank: string } {
    let username;
    let rank = '';
    if (message.startsWith('[')) {
        username = message.slice(message.indexOf(']') + 2, message.indexOf(' ', 8));
        rank = message.slice(1, message.indexOf(']'));
    } else {
        username = message.slice(8, message.indexOf(' ', 9));
    }
    return { username, rank };
}
