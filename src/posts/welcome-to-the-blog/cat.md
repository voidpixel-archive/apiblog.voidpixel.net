### blog
Benvinguts?
Porto algún temps volent fer un diari del desenvolupament. Alguns potser us enrecordeu del vídeo que vaig pujar sobre l'antic desenvolupament, allà per 2014-205, encara que deixant clar que aquell joc no res a veure amb el actual.
He creat aquest blog per poder tenir un registre dels avanços que vaig fent de forma semanal.
Moltes vegades, sembla que no hagi fet ningún progrés en els directes de [twitch](https://twitch.tv/voidpixelDev) o en les fotos que publico a [discord](https://discord.gg/Xt9CCeJ) o [twitter](https://twitter.com/voidpixel) degut a que no tenen contexte, aquest blog soluciona aquest problema. 
La meva idea és anar explicant, de forma una mica més técnica, les actualitzacions que vagi fent del joc, ja que la versió **indev** no rebrà ninguna actualització y estic treballant en la **alpha 1**, encara que seguramente veureu **alpha preview** en les imatges actuals del joc. 

Aquest blog està creat amb **react** i per a la api, utilitzant un **express** simple. Podeu trobar el codi i fer les vostres aportacions per millorar el codi en els següents repositoris de github:
- [voidpixel.net](https://github.com/voidpixel/blog.voidpixel.net)
- [apiblog.voidpixel.net](https://github.com/voidpixel/apiblog.voidpixel.net)

### voidpixel
Aquesta setmana no he treballat res del joc com tal, ja que he estat creant aquest blog desde zero, així que explicaré les últimes coses que vaig fer, fa un parell de setmanes.

### Target Position - Pathfinding
Actualment, quan fas click a qualsevol regió a la pantalla dins del joc, l'usuario envia una petició al servidor per informar-lo que vol anar a aquell destí.

Abans, el client calculaba el **pathfinding** pero poder fer el desplaçament dels jugadors.

Problemes:
-  Quan un client no tenia la posició de algún jugador actualitzada, el pathfinding es calculava en relació a on es trobés el jugador y no a la posició real.
- No sempre hi havia una coordinació entre els moviments del jugador i el que un client arribava a veure, podent haver salts en el espai i veient com atravessava llocs que no podia passar.
- El jugador podia arribar a mirar cap un lloc al que realment no estaba mirant per que el pathfinding era diferent entre clients.
- No estar segur de que el client estigués calculant correctament el pathfinding i podent estar fent trampes, tinguen que verificar cada posició interrumpida o al arribar a destí.

La solució a aquests problemes estaba clara, si el servidor tenia que verificar el pathfinding per saber que l'usuari no estaba fent trampes, calcular el pathfinding en el servidor.
Funciona bé, pensava que aniria més lent, pero va realmente bé. Òbviament quedarà optimitza quan hagi més cosas en el joc, però pel moment, entre que el client fa click en un lloc i la resposta del servidor amb el pathfinding, es ràpida i precisa. Tots els clients que perteneixen a aquests chunks queden notificats.

Sobre el pertànyer a un chunk, ocurreix que no hauries d'enviar el nou pathfinding, ni ningún event, de un jugador a altres que no es trobin en un rang de posicions properes, pel que, quan un jugador es desplaça, se li assigna una **"sala"** en la que es troba, que venen a ser els chunks. A nivell visual, això serà completament invisible.
Queda encara, assignar les sales correctes quan l'usuari **està** movent-se, ja que aquestes sales s'assignen una vegada que s'ha completat el pathfinding i no durant.

![](https://media.discordapp.net/attachments/401750633440608266/744724089117343774/unknown.png)
Com es pot apreciar en la imatge, els chunks queden diferenciats en 2d per 128 pixels d'ample i 128 pixels d'alt, encara que a nivell del joc, es una cuadricula isometrica. Això és degut a que no es pràctic fer imatges isomètriques superposades, va ésser un dels experiments durant la indev, ja que les imatges tenen que ser rectangles.

Gracies i benvingut! :D
