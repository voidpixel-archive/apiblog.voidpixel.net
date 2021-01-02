### Capas de ceba
L'altre dia vaig intentar arreglar un bug respecte al moviment del personatge,
em vaig disposar a arreglar-lo, pero vaig trobar un altre bug, aquesta vegada relacionat
amb el servidor i vaig probar a arreglar-ho, ja que no podia arreglar els altres
dos en capes superiors.

En aquest últim bug, vaig trobar una sorpresa pasada, uns números màgics que estan 
allà des de la **indev** i no vaig refactoritzar durant el pas de la **indev** a la "alpha"

4, 8, 15, 16, 23, 42... **128, 160**

Aquests dos últims números m'han estat tornant boig des de fa alguns mesos,
encara que m'havia oblidat completament d'ells fins fa una setmana.


### Com funciona?

#### Sprite
El primer que crearem és un spirte que representa al chunk que anem a dibuixar.
En la imatge d'exemple podem veure el chunk `x: 0 y: 0`.

La primera imatge del sprite correspon al pathfinding, on cada pixel negre representa que no es pot caminar,
la part blanca la que si. El punt gris que veurem, representa el spawn.
La resta de imatges son las composiciones del chunk, representades en el spritesheet pel seu zindex.
![](https://media.discordapp.net/attachments/586914620451848234/780925752157798439/Screenshot_2020-11-24_at_23.36.05.png)

Com podreu imaginar, aquesta representació de punts no correpon mes que a un array de 128 pixels d'ample
per un altre de 128 pixels d'alt, com vam veure en el [post anterior](./welcome-to-the-blog).
El problema es que no representa mes que això, un pla 2D d'una imatge amb representació isometrica,
per tant, no podem deixar de treballar amb tota aquesta informació.
- No te una representació realista de la isometrica del joc.
- Conté molts mes punts (en l'eix, el doble), del que realment volem processar,
  seria perdre el temps procesar el doble de posicions, ja que l'usuari no podrà viatjar a aquests hipotetics
  punts en el pla 2D.

#### pixeles a 2d isométrico
![](https://media.discordapp.net/attachments/586914620451848234/780925754622869514/Screenshot_2020-11-24_at_23.39.00.png)

Aquesta imatge representa la solució al problema presentant anteriorment. El problema es que per representar tots
els chunks, és te que establir quants chunks, d'alt i ample, es volen representar.
En aquest cas, he estat treballant amb una reixa de 5 d'ample per 3 d'alt.

### Problemas

Quan vaig prendre la decisió d'utilitzar aquests dos valors per representar per on es podia desplaçar
l'usuari, vaig establir unes normes. Tenia l'obligació de desplaçar els punts d'entrada del 
pathfinding per poder fer correctament la cerca, una vegada calculat, havia de tornar a deixar-ho de forma correcta.

Be.

Tot era fantastic, pero aquestes normes només s'aplicaben en el grid de 5x2, qualsevol modificació del grid,
fotia tot el pathfinding, ja que vaig posar en el codi aquests numeros (128x160) sense documentar d'on sortian.

He pasat les últimes dues setmanes, en els directes i fora d'ells, intentan treure d'on sortien,
proban tot el que he pogut, pero m'he complicat molt més del que hauría.
[cout970@github](https://github.com/cout970) va acabar donant amb la solució graces a la representació grafica que va fer.

![](https://cdn.discordapp.com/attachments/586914620451848234/780931084426805268/Screenshot_2020-11-25_at_00.01.06.png)

Quan vaig veure la imatge, em vaig enrecordar perfectamente de las raons, completament desactualitzades,
pero no podia arreglar-ho perquè no sabía d'on sortia.
Basicament, el primer chunk que es representa és el `x: 0 y: -1`, encara que aquest chunk pasa a ser representat
com el número `x: 3 y: 0` per a que no hi hagi negatius entres les filas dels chunks.

Perquè tots entenguem que merdes parlo:
- El chunk del centre, el representat com a chunk on es troba l'usuari en tot moment.
- El chunk del centre a la vegada, es representa amb els valors `x: 0 y: 0`.
- El chunk del centre a la vegada, es torna a representar, amb aquesta correcció, com a chunk `x: 1 y: 2`, 
  y aquí, es on es posa la cosa lletja.

Per rectificar aquestes posiciones respecte al punt de partida i punt de final, és restaba **128** a la x y **160** a la y.

![](https://media.discordapp.net/attachments/586914620451848234/780932867424387072/Screenshot_2020-11-25_at_00.08.04.png)

Algú pot pensar que això és un nyap, pero heu de tenir en compte que això formaban part de les meves proves durant la indev,
i en aquell moment tenia tot el sentit del món, pero em vaig oblidar de portar-ho al nou sistema i així es va quedar.

Esper-ho que us hagi resultat interesant i moltes graces per ajudar, tant en els directes com amb les traduccions. <3

Sóc català natiu, pero fa anys que no escric, així que si veieu alguna nyapa, us agrairia l'ajuda! 
