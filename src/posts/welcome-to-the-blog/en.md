### blog
Welcome?
I've been wanting to make a dev diary for some time. Some of you might even remember some older videos from 2014 or 2015 about me coding the game, however that version of the game has practicaly nothing in common to the current one.

I created this blog to give a weekly update on my advancements with the game.
A lot of times It looks like I'm doing nothing trough [twitch](https://twitch.tv/voidpixelDev) or trough the images I publish on [discord](https://discord.gg/Xt9CCeJ) and [twitter](https://twitter.com/voidpixel), this is because they lack any context. This blog's purpose is solving that issue.
My idea is to try to explain any updates to the game with a technical-ish standpoint, since the **indev** version won't have any more updates and I'm currently working on the **alpha 1** version. Regardless, you'll most likely see **alpha preview** on the images instead.

This blog is made with **react**. Using the **express** api. You will be able to find the code and suggest improvements via github:

- [voidpixel.net](https://github.com/voidpixel/blog.voidpixel.net)
- [apiblog.voidpixel.net](https://github.com/voidpixel/apiblog.voidpixel.net)

### voidpixel
This past week I haven't done work on the game because I was making this blog instead, so instead, I'm gonna explain what I did a couple of weeks ago. 

#### Target Position - Pathfinding
Currently, when you click on any part of the screen within the game, the user sends a request to the server containing the target destination.

But previously, the client needed to calculate the **pathfinding** in order to move the players.

Problems:
- When the client had not updated the position of a player properly, the pathfinding was calculated in relation to where the player was, not using on the original position.
- There wasn't always a coordination between the player movement and the client's calculation, this caused rips in the space-time continuum where player crossed into forbidden locations. We don't want that.
- The player might happen to look at places they where not really looking at because the pathfinding was not the same between clients.
- Being unsure about weather the client is making the pathfinding improperly or if there's cheating involved, instead having to verify any interrupted movement as well as arrivals to a destination.

The solution to all these problems was clear, if the server needs to verify the pathfinding on the client to figure out if the user is cheating, simply calculate the pathfinding in the server.
It works alright, I thought it would be slow, but it actually works fine. Obviously it will need more optimization when the game has more stuff, but for the moment, the response between the click on the client and the server returning the pathfinding is good enough. All clients inside the respective chunks are being notified.

About Chunks, there's clear problems with sending information of any player movement or event to another player who isn't close by. Therefore, when a player moves, they get assigned a "room" according to their location, the "room" being the chunk. It is never reflected visually. This isn't complete as of now, because this "room" change is assigned once the pathfinding has been completed and not WHILE it's occurring.


![](https://media.discordapp.net/attachments/401750633440608266/744724089117343774/unknown.png)
As you can see on the image, the chunks are divided in 2D using 128 pixels for both width and height, even if the division is not isometric from the game's perspective. This is because image divisions are not practical when done isometrically, I did experiment with that method In the indev, but was a failure; The images would have to be rectangular.

And that's that! This blog will get more updates, but for now. Thanks and welcome! :D
