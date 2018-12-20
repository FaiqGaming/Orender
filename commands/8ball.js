exports.conf = {
    aliases: ['8b'],
    cooldown: '5'
}
exports.help = {
    name: "8ball",
    description: "Katakan pada 8 Ball yang hebat tentang keberuntunganmu.",
    usage: '8ball'
}
exports.run = async (client, message, args) => {
    let wishes = args.slice(0).join("");
    let author = message.author.username;
    /**
     * Get some random result from 8 ball
     * @param {String} wishes
     * @param {String} author
     */
    function get8ball(wishes, author) {
        /**
         * Lemme tell you, im not make this manually.
         * I have the ABSOLUTLY 8 BALL REFERENCES
         * https://en.wikipedia.org/wiki/Magic_8-Ball
         */
        const ballRef = [
            //affirmative answers
            "Yes sure.",,
            "Hmmmm.... Not Familier",
            "Yess.....",
            "You might depend on it.",
            "As I see, yes.",
            "The most liked.",
            "Looks good.",
            "Yes",
            "I think, yes.",

            //non-committal answers
            "Try Again",
            "Try Again Later.",
            "It's better not to tell you now.",
            "It can't be predicted now.",
            "Concentrate and try again.",

            //negative answers
            "Don't rely on it.",
            "I think, no",
            "Ohh, that doesn't look good.",
            "Very doubtful."
        ]
        let randomize = Math.floor(Math.random() * ballRef.length);
        if (!wishes) return "Say Something."
        return `\:8ball\: | ${ballRef[randomize]} \*\*${author}\*\*`
    }
    message.channel.send(get8ball(wishes, author));
}