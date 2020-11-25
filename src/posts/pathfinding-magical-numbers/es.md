### Onion layers
The other day I wanted to fix a bug related to the character's movement,
I threw myself into the fix until the very moment I discovered yet another bug, this time related to the pathfinding 
on the server side, I wanted to fix it since it prevented me from fixing the other two problems 
on the upper layers.

In this last bug, I found a suprise from the past, they have been there
since the **indev** and I did not refactor them when I moved to the "alpha-preview-

4, 8, 15, 16, 23, 42... **128, 160**

Those 2 numbers have drive me crazy for few months already,
even though I totally forgot about them until the last week.


### How does it work?

#### Sprite
The first thing we generate is a sprite which represents the chunk that we will render.
In the image we can see the chunk `x: 0 y: 0`.

The sprite's first fragments corresponds to the pathfinding, where the pixels in black represent
the obstacles and the white ones the places where we can walk. The gray point is the spawn.
The rest of the images are the compositions, which are represented in the spritesheet by their zindex.
![Sample image with chunk `0 0`](https://media.discordapp.net/attachments/586914620451848234/780925752157798439/Screenshot_2020-11-24_at_23.36.05.png)

As you can imagine, this representation is just a simple square matrix of 128 pixels,
as we mention in the [previous post](./welcome-to-the-blog).
The problem is that it only represents this, a 2D plane of an isometric image,
hence, we can not work with this information:
- It does not have a realistic representation of the game's isometry.
- It contains many more points (double in the Y-axis) than the ones we want to process.
It would be a waste of time to process these positions since the user won't be able to move 
to those hipotetic points in the 2D plane.

#### Pixels to Isometric 2D
![](https://media.discordapp.net/attachments/586914620451848234/780925754622869514/Screenshot_2020-11-24_at_23.39.00.png)

This image represents the solution to the previous problem. The problem is that to reflect all the
chunks, we need to state how many chunks, height x width, we want to have in consideration.
In this case, I have been working with a grid of 5 by 3.

### Problems

When I decided to use those 2 values to indicate where the user could move, I few rules were established.
I had the obligation to offset the pathfinding's entry points to correctly perform the search, once the search was done,
I needed to return the points to their original location.

Alright.

Everything was great, but this rules only applied when we work with a 5x3 grid,
any adjustment to the grid will mess with the pathfinding algorithm, since I had hardcoded those numbers (128x160) with
no documentation whatsoever of where they came from.

I spent the last 2 weeks, during the streamings and outside them, trying to find where did they come from,
trying everything I could, but I just complicated things more than I should.
[cout970@github](https://github.com/cout970) found the solution thanks to a graphical representation of the problem.
 
 ![](https://cdn.discordapp.com/attachments/586914620451848234/780931084426805268/Screenshot_2020-11-25_at_00.01.06.png)

In thhe moment I saw the image, I perfectly remembered the reasons and motivations, totally outdated and replaceable,
but I just couldn't fix it because I did not know where they come from.
Basicaly, the first chunk that we represent is `x: 0 y: -1`, although this chunk 
was specified as `x: 3 y: 0` to avoid negative numbers in the chunk's rows.

To make sure everyone understands:
- The center chunk represents where the user is at the given time.
- The center chunk corresponds to `x: 0 y: 0`.
- The center chunk ALSO CORRESPONDS (after the offset) to `x: 1 y: 2`, and here, is where things start getting ugly.

To correct these positions regarding the initial point I was substracting **128** to x and **160** to y.

![](https://media.discordapp.net/attachments/586914620451848234/780932867424387072/Screenshot_2020-11-25_at_00.08.04.png)

Someone may think this was an odd job, but consider that this was part of the experiments during the indev, when it all made sense but
I just forgot to translate it to the new system, staying there as it was.

*Translated by @PeopleNArthax*
