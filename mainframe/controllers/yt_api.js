const YTMusic = require("ytmusic-api").default

//test code used for the ytAPi that will search for songs 
const ytmusic = new YTMusic()
const ytMusicFunction = {
    getSongUrl: async (req, res) => {
    try {
        await ytmusic.initialize();
        const searchResult = await ytmusic.searchSongs(req.body.artistname);
        const videoId = searchResult[0].videoId;
        const stringWithoutSpaces = "youtube.com/watch?v=" + videoId.replace(/\s+/g, '');
        res.status(200).json({ "url": stringWithoutSpaces });
        } catch (error) {
        res.status(500).json({ "error": 'An error occurred' });
        }
    }
    };
    
module.exports = ytMusicFunction