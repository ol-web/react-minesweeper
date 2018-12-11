import "../../../lib/minesweeper.css";

import React from 'react';
import { render } from 'react-dom';
import Minesweeper from "../../../lib/dist/Minesweeper";

class App extends React.Component {
    state = {
        msg: "GAME IN PROGRESS",
        minesweeperKey: 0,
        bombChance: 15,
        width: 10,
        height: 10
    };
    onWin = () => {
        this.setState({
            msg: "YOU WON!"
        });
    };
    onLose = () => {
        this.setState({
            msg: "GAME OVER!",
        });
    };
    restartMinesweeper = () => {
        this.setState(prevState => ({
            minesweeperKey: prevState.minesweeperKey + 1,
            msg: "GAME IN PROGRESS"
        }));
    };
    updateStateProp = (prop) => (e) => {
        const value = Number(e.target.value);
        this.setState(prevState => {
            prevState[prop] = value;
            prevState.minesweeperKey += 1;
            return prevState;
        });
    };
    render() {
        const { msg, minesweeperKey, bombChance, height, width } = this.state;

        return (
            <React.Fragment>
                <h1>
                    <a href="https://github.com/oL-web/react-minesweeper">
                        react-minesweeper
                    </a>
                </h1>
                <p>{msg}</p>
                <div className="container">
                    <div className="minesweeper__header">
                        <button className="minesweeper__restart" onClick={this.restartMinesweeper}>😂</button>
                    </div>
                    <Minesweeper
                        key={minesweeperKey}
                        onWin={this.onWin}
                        onLose={this.onLose}
                        bombChance={bombChance / 100}
                        width={width}
                        height={height}
                    />

                    <div className="minesweeper__options">
                        <div>
                            <label htmlFor="bomb-chance">Bomb chance (0-100%): </label>
                            <input onChange={this.updateStateProp("bombChance")} id="bomb-chance" type="number" max="100" min="0" defaultValue={bombChance} />
                        </div>

                        <div>
                            <label htmlFor="fields-horizontally">Fields horizontally: </label>
                            <input onChange={this.updateStateProp("width")} id="fields-horizontally" type="number" defaultValue={width} />
                        </div>

                        <div>
                            <label htmlFor="fields-vertically">Fields vertically: </label>
                            <input onChange={this.updateStateProp("height")} id="fields-vertically" type="number" defaultValue={height} />
                        </div>
                    </div>
                </div>

                <footer>
                    <p>Made by Michał Olejniczak. | <a href="https://ol-web.github.io">My GitHub page</a></p>
                    <p>Icons made by Freepik and Bogdan Rosu from www.flaticon.com </p>
                </footer>
            </React.Fragment>
        );
    }
}

render(<App />, document.querySelector("#app"));