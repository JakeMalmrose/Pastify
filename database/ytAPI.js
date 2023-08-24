const YTMusic = require("ytmusic-api").default


//test code used for the ytAPi that will search for songs 
const ytmusic = new YTMusic()
ytmusic.initialize().then(() => {
	ytmusic.searchSongs("Yung Gravy").then(res => {
		//console.log(res)

        let resString = res[0].videoId

        console.log(resString)
    
        const stringWithoutSpaces = ("youtube.com/watch?v=" + resString.replace(/\s+/g, ''));

        console.log(stringWithoutSpaces)
	})
})