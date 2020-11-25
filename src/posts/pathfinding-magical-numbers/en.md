### Pixels are like onions, they have layers
The few day ago, I wanted to fix a bug related to character movement,
I got down to fixing it until the very moment I discovered yet another bug, this time related to server-side 
pathfinding. The bug was so problematic, it became a priority to fix it, since it prevented me from fixing 
another two problems present on the upper layers.

Fixing this big was a complete challenge, a challenge I myself created in the past,
way back during the change from the **indev** stage to the "alpha-preview" stage.

And it all lies on a sequence of magical numbers:

4, 8, 15, 16, 23, 42... **128, 160**

These last 2 numbers had driven me crazy for the past few months already,
and I was about done with their mischievousness, even though I totally forgot about them until just last week.


### How does it work?

#### Sprite
To understand this issue, you might need a little extra information.
Every chunk we generate has a sprite assigned to represent it whenever we render.
As you can see in the image, portraying the chunk `x: 0 y: 0`.

The sprite's first fragments corresponds to the pathfinding, where the pixels in black represent
the obstacles and the white ones the places we can walk trough. The gray point is the spawn.
The rest of the images are the compositions, which are represented in the spritesheet as the zindex.
![Sample image with chunk `0 0`](https://media.discordapp.net/attachments/586914620451848234/780925752157798439/Screenshot_2020-11-24_at_23.36.05.png)

As you can imagine, this representation is just a square matrix with 128 pixels,
as mentioned in the [previous post](./welcome-to-the-blog).
The problem is that it only represents a 2D plane for an isometric image,
hence, we can not work with this information as is because:

- It does not have a realistic representation of the game's isometry.
- It contains many more points (double in the Y-axis) than the ones we want to process.
It would be a waste of time to process these positions since the user won't be able to move 
to those hypothetic spots in the 2D plane.

#### Pixels to Isometric 2D
![](https://media.discordapp.net/attachments/586914620451848234/780925754622869514/Screenshot_2020-11-24_at_23.39.00.png)

This image represents the solution to the previous problem. prety much, to draw all of the
chunks, we need to state how many of them we want to have in consideration, given a certain width and height.
In this case, I had been working with a grid of 3 by 5.

### Issues

When I decided to use those 2 values to indicate where the user could move, a few rules were established:
I had the obligation to offset the pathfinding's entry points to correctly perform the search, once the search was done,
I needed to return the points to their original location.

That's all fine and dandy.

Everything was great, however, these rules could only apply when we work with a 5x3 grid, and
any adjustment to the grid would mess with the pathfinding algorithm since I had hardcoded those numbers (128x160).
Coincidentally, no documentation whatsoever of where they came from was created.

I spent the last 2 weeks, while streaming and outside them, trying to find where they come from,
trying everything I could; and constantly complicating everything more than I should. Until
[cout970@github](https://github.com/cout970) found the solution during a stream thanks to a graphical representation of the problem.
 
 ![](https://cdn.discordapp.com/attachments/586914620451848234/780931084426805268/Screenshot_2020-11-25_at_00.01.06.png)

The moment I glanced at the image, I perfectly remembered every reason and motivation, totally outdated and replaceable.
However, I was unable to fix it because I did not know where they come from.
Basically, the first chunk that we represent is `x: 0 y: -1`, although this chunk 
was specified as `x: 3 y: 0` in order to avoid negative numbers in the chunk's rows.

To make sure everyone understands:
- The center chunk represents where the user is at the given time.
- The center chunk corresponds to `x: 0 y: 0`.
- The center chunk ALSO CORRESPONDS (after the offset) to `x: 1 y: 2`, and here, is where things start getting ugly.

To correct these positions between the initial and final points I was (very expertly) subtracting **128** to x and **160** to y.

![](https://media.discordapp.net/attachments/586914620451848234/780932867424387072/Screenshot_2020-11-25_at_00.08.04.png)

Some of you may think this was stupid... and it was, but remember that this was part of the experiments during the indev, when it all made sense.
I just forgot to pass it to the new system, and it remained there as it was.

Indeed, 2 numbers where enough to create a lot of issues, but I'm glad to be done with it. 
I hope you all found this interesting, and thanks.
*Translated by [PeopleNArthax@github](https://github.com/peoplenarthax) and [SmashyTomaty@github](https://github.com/SmashyTomaty)*
