import React from 'react';
import PropTypes from 'prop-types';

class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.generateBoard(),
            isLost: false,
            isWon: false
        };
    }
    generateBoard = () => {
        const { width, height } = this.props;
        const board = Array.from({ length: height }, () => Array.from({ length: width }, () => this.generateField()))

        board.forEach((row, y) => {
            row.forEach((field, x) => {
                if (field.isBomb) return;
                let count = 0;

                this.loopFieldsAround(board, x, y, (field) => {
                    if (field && field.isBomb) count++;
                });

                row[x].bombsAround = count;
            });
        });

        return board;
    };
    getField = (arr, x, y) => {
        try {
            return arr[x][y];
        } catch (e) { }
    };
    generateField = () => ({
        isFlagged: false,
        isRevealed: false,
        bombsAround: 0,
        isBomb: Math.random() > (1 - this.props.bombChance)
    });
    loopFieldsAround = (board, x, y, cb) => {
        for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
                cb(this.getField(board, i, j), j, i);
            }
        }
    };
    rightClickField(y,x) {
        return (e) => {
            e.preventDefault();
            const { isLost, isWon } = this.state;
            if (isLost || isWon) return;

            this.setState(prevState => {
                const { board } = prevState;
                const field = board[y][x];
                field.isFlagged = !field.isFlagged;
                return { board };
            });
        };
    }
    leftClickField= (y, x)=> {
        return () => {
            const { board, isLost, isWon } = this.state;
            const { onLose, onWin } = this.props;
            if (isLost || isWon) return;
            const clickedField = board[y][x];
            let fieldsToReveal = [{ x, y }];

            const lookAround = (x, y) => {
                const directions = {
                    top: { x, y: y - 1 },
                    right: { x: x + 1, y },
                    bottom: { x, y: y + 1 },
                    left: { x: x - 1, y },
                };

                for (const prop in directions) {
                    const dir = directions[prop];
                    const field = this.getField(board, dir.y, dir.x);
                    const alreadyExists = fieldsToReveal.find(p =>
                        (p.x === dir.x && p.y === dir.y)
                    );

                    if (field && !field.isBomb && !alreadyExists) {
                        fieldsToReveal.push(dir);
                        if (field.bombsAround === 0) lookAround(dir.x, dir.y);
                    }
                }
            };

            if (clickedField.bombsAround === 0) lookAround(x, y);
            else if (clickedField.isRevealed) {
                let flaggedInRange = 0;
                let unflaggedFields = [];

                this.loopFieldsAround(board, x, y, (field, x, y) => {
                    if (field) {
                        if (field.isFlagged) flaggedInRange++;
                        else unflaggedFields.push({ x, y });
                    }
                });

                if (clickedField.bombsAround === flaggedInRange) {
                    fieldsToReveal = fieldsToReveal.concat(unflaggedFields);
                }
            }

            this.setState(prevState => {
                const { board } = prevState;
                let isLost = false;
                let isWon = false;

                fieldsToReveal.forEach(obj => {
                    const field = board[obj.y][obj.x];
                    field.isRevealed = true;
                    if (field.isBomb) isLost = true;
                });

                if (!isLost) {
                    let unrevealedFields = 0;
                    board.forEach(row => {
                        row.forEach(field => {
                            if (!field.isRevealed && !field.isBomb) {
                                unrevealedFields++;
                            }
                        });
                    });
                    isWon = unrevealedFields === 0;
                }

                if (isLost && onLose) onLose();
                else if (isWon && onWin) onWin();
                return { board, isLost, isWon };
            });

        };
    }
    render() {
        const { board, isLost, isWon } = this.state;
        let classNames = "minesweeper";
        if (isLost) classNames += " minesweeper_lost";
        else if (isWon) classNames += " minesweeper_won";
        else classNames += " minesweeper_active";
        
        return (
            <table className={classNames}>
                <tbody className="minesweeper__body">
                    {board.map((row, y) => (
                        <tr key={y} className="minesweeper__row">
                            {row.map((field, x) => {
                                let classNames = "minesweeper__field minesweeper__field_" + field.bombsAround;
                                if (!(field.isRevealed || isLost)) classNames += " minesweeper__field_cloud";
                                if (field.isFlagged && !isLost) classNames += " minesweeper__field_flag";
                                if (field.isBomb) classNames += " minesweeper__field_bomb";

                                return (
                                    <td
                                        onClick={this.leftClickField(y, x)}
                                        onContextMenu={this.rightClickField(y, x)}
                                        key={x}
                                        className={classNames}
                                    >
                                        {field.bombsAround || ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

Minesweeper.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onWin: PropTypes.func,
    onLose: PropTypes.func,
    bombChance: (props, propName, componentName) => {
        const chance = props[propName];
        if (chance < 0 || chance > 1) {
            return new Error(`Invalid prop "${propName}" with value of ${chance} supplied to "${componentName}". The bomb chance must be a number between 0 and 1.`);
        }
    }
};

Minesweeper.defaultProps = {
    width: 10,
    height: 10,
    bombChance: 0.15,
};

export default Minesweeper;