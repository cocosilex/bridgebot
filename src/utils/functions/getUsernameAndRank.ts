export default function getUsernameAndRank(message: string): { username: string; rank: string } {
    let username;
    let rank = '';
    if (message.startsWith('[') && message.indexOf('[') === message.lastIndexOf('[')) {
        username = message.slice(message.indexOf(']') + 2, message.indexOf(' ', 8));
        rank = message.slice(1, message.indexOf(']'));
    } else {
        username = message.slice(0, message.indexOf(' ', 1));
    }

    return { username, rank };
}
