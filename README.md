# react-minesweeper

react-minesweeper is a classic minesweeper game written as a React component. You can set the amount of fields and a bomb chance. Styles are only applied by CSS classes so it's easy to customize.

* * *

### Installation:

`npm install --save react-minesweeper`  

### Usage:

```javascript
 <Minesweeper
    onWin={() => console.log("GAME WON")}
    onLose={() => console.log("GAME LOST")}
    bombChance={0.15} // 15% chance that a field will contain a bomb
    width={10} // amount of fields horizontally
    height={10} // amount of fields vertically
/>
```

* * *

### Is there something wrong?

Please tell me!