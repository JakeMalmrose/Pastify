const YTMusic = require("ytmusic-api").default

//test code used for the ytAPi that will search for songs 
const ytmusic = new YTMusic()
const ytMusicFunction = {
    getSongUrl: async (req, res) =>{
        ytmusic.initialize().then(() => {
        ytmusic.searchSongs(req.body['artistname']).then(res => {
            let resString = res[0].videoId

            console.log(resString)
            
            const stringWithoutSpaces = ("youtube.com/watch?v=" + resString.replace(/\s+/g, ''));
            
            console.log(stringWithoutSpaces)
            })
        })
        res.status(200).json(stringWithoutSpaces)
    }
}

module.exports = ytMusicFunction