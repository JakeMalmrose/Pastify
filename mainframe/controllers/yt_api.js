const YTMusic = require("ytmusic-api").default

const ytmusic = new YTMusic()
const ytMusicFunction = {
    getSongsByArtist: async (req, res) => {
            try {
                await ytmusic.initialize();
                const artistID = await ytmusic.searchArtists(req.body.artistname)
                const searchResult = await ytmusic.getArtistSongs(artistID[0].artistId);
                let songList = {};
                for (let i = 0; i < searchResult.length; ++i) {
                    const videoId = searchResult[i].videoId;
                    const stringWithoutSpaces = "youtube.com/watch?v=" + videoId.replace(/\s+/g, '');
                    songList[searchResult[i].name] = stringWithoutSpaces;
                }
                return res.status(200).json(songList);
            } catch (error) {
                res.status(500).json({ "error": 'An error occurred' });
            }
    },
    getSongByName: async (req, res) =>{
        try {
            await ytmusic.initialize();
            const searchResult = await ytmusic.searchSongs(req.body.songname);
            const videoId = searchResult[0].videoId;
            const stringWithoutSpaces = "youtube.com/watch?v=" + videoId.replace(/\s+/g, '');
            res.status(200).json({ "url": stringWithoutSpaces });
            } catch (error) {
            res.status(500).json({ "error": 'An error occurred' });
            }
    }
    };
    
module.exports = ytMusicFunction