### blog
Welcome?
I've been wanting to make a dev diary for some time. Some of you maybe remember some old videos, from 2014-2015, about me coding the game, but the game does not have anything in common from the current game.

I created this blog to have a registry of the updates I'm gonna make weekly.
A lot of times It looks like nothing is done on [twitch](https://twitch.tv/voidpixelDev) or the images I publish on [discord](https://discord.gg/Xt9CCeJ) o [twitter](https://twitter.com/voidpixel), and that's because they don't have any context, well, this blog solves the problem.
My idea is to try to explain, technically, the updates I'm gonna doing on the game, because the **indev** versión does not gonna have any more updates. I'm currently working on the **alpha 1**, but you mostly you will see **alpha preview** on the images.

This blog is made with **react** and for the api I used **express**. You can find the code and make improvements on github:

- [voidpixel.net](https://github.com/voidpixel/blog.voidpixel.net)
- [apiblog.voidpixel.net](https://github.com/voidpixel/apiblog.voidpixel.net)

### voidpixel
This last week I did not work on the game, because I was making this blog from the ground, so, I'm gonna explain what I did two weeks ago. 

#### Target Position - Pathfinding
Right now, when you click on any part, inside the game, the user sends a petition to the server about the target position.

Before this change, the client was calculating the **pathfinding** to make the movements of the players.
Problems:
- When the client has not updated the position of some player, the pathfinding was related to where the player was and not on the original position.
- No always was a coordination between the movements of a player and what clients did, this caused jumps and players crossing forbidden places.
- The player was looking at places he was not really looking because the pathfinding was not the same between clients.
- Being not sure about the client, because he could cheat on the pathfinding, so I needed to calculate every time the position was interrupted or on the end of the path.

The solution to all these problems was clear, if the server needs to verify the pathfinding on the client because we don't know if he is cheating, do it on the server.
Works fine, I thought it would go slow, but works really fine. It will take more time to optimize the game with more things, but for the moment, the response between the click on the client and the server returning the pathfinding, is good enough. All the clients inside these chunks, are being notified.

When you are inside a chunk, you belong to a "room", and these "rooms" are not being updated when you move, yet. The idea is to send the pathfinding of the user across all the players inside these "rooms" or chunks. Now is only notified at the end of the path.


![](https://media.discordapp.net/attachments/401750633440608266/744724089117343774/unknown.png)
As you can see on the image, the chunks are divided by 128px width and 128px height, but at the game level, this division is isometric. This is because the image division is not practical to be done on isometric. In the indev I tried to make it the other way, but was a failure.

Thanks and welcome! :D
