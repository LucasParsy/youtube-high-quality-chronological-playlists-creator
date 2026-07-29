### youtube high-quality chronological playlists creator 

*aka: my siiva script 2026*

[some Youtube channels](https://www.youtube.com/playlist?list=UU9ecwl3FTG66jIKA9JRDtmg) upload very regularly, and you want to catch up on them. Problems: Youtube is broken on big playlists (refuses to play after 5 videos), and you have them on reverse chronological order (newest from oldest)

This scripts allows you to choose in a range of videos in a playlist, and generate smaller (ex: 100 videos) sub-playlists in chronological order for easy consumption. 


*tested on Youtube's "new" UI July 2026*

### how to use

- be connected on youtube
- open the youtube playlist you want to generate smaller playlists from
- scroll down to the video you want to start from
- hover your mouse on this video: you should see it's index number (`...&index=42&...`) at the bottom left of your browser
    - alternatively open the video on a new tab, and the index number is shown in the playlist UI 
- open the JS console and paste the [script content](ytPlaylist.js)
- call the method with your start index. ex: `createPlaylists(42)`
- watch the playlists be generated, with the browser automatically clicking on the UI to create them.
    - I added a 1/2 minutes delay between playlist creation because I'm superstitious of Youtube "botting" ban.
- wait until the script says "script finished!"
- go check on your youtube playlists.

### createPlaylists parameters

`createPlaylists(startIndex, endIndex = 0, playlistSize = 100, playlistNamePrefix = "siiva ")`
| name | default | use |
|---|---|---|
| startIndex | - | video to start from |
| endIndex | 0 | end video. 0: latest video in the playlist. Cannot be after *startIndex* (for now) |
| playlistSize | 100 | number of videos by generated playlists. bugs after 200/300+ |
| playlistNamePrefix | "siiva " | How your playlist will be named. for now `playlistNamePrefix + DD_MM_date + counter`. |


### FAQ

- I don't want to be logged in on Youtube!

Fair point, you can remove the call to `save_playlist` and it should just generate a temporary playlist.
(Edit `endIndex` and `playlistSize` so it doesn't try to loop creating multiple playlists)

- I found another project / extension that does just like you but better!

Please tell me where, I didn't found any when I searched (for about 10 minutes I admit)

- why not use brubsby.com/randomsiiva/?

Really great project, but it sometime skipped some rips I think, and missed rips don't show in my YT history.

- It doesn't work!

It's a script that accesses specific elements of the Youtube UI with hardcoded paths, sot it may break at any YT update, or even on different browsers (tested on Firefox). Pull requests welcome!

- Can't you use the Youtube API?

Public API is a bit a hassle to use, and apparently quite rate limited. ( I wanted to create my monthly 900 music catchup playlist!) 
Private APi is private and using protobuf, good luck reversing that!

### Todo

- more personnalization? (ex: reverse chronological order)
- A browser extension if people really find it useful.

### AI disclaimer

**No AI** was used to generate this script. 
Expect it to have bugs!