import {Component} from "react";
import * as React from "react";
import Tile from "./Tile";
import styled from "styled-components";
import AutoBind from '../AutoBind';
import {DragDropContextProvider} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

interface IGameBorder {
    children?: any,
    className: string,
    height: number,
    width: number
}

interface IBoardProps {
    height: number,
    width: number,
}

const SGameEdge = styled(GameEdge)`
    min-height: ${props => props.height + "px"};
    max-height: ${props => props.height + "px"};
    min-width: ${props => props.width + "px"};
    max-width: ${props => props.width + "px"};
    
    display: flex;
    border-style: solid;
    border-width: 5px;
    border-color: #335566;
`;

const SBoardBorder = styled(SGameEdge)`
    border-width: 0px 5px 5px 5px;
`;

function GameEdge(props: IGameBorder) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
}

export default class Board extends Component<IBoardProps> {
    constructor(props: IBoardProps) {
        super(props);
        AutoBind.autoBind(this);
    }

    generateGameTiles(): Array<JSX.Element> {
        let gameTiles: Array<JSX.Element> = [];
        let id = 0;

        for (let column = 0; column < this.props.width; ++ column) {
            let col: Array<JSX.Element> = [];

            for (let row = 0; row < this.props.height; ++row) {
                col.push(<Tile key={id} id={id}/>);
                id++;
            }

            gameTiles.push(
                (<div key={"div" + id}>{col}</div>)
            );
        }

        return gameTiles;
    }

    render() {
        let headerWidth = (this.props.width * 24);
        let headerHeight = 50;

        let gameBoardWidth = headerWidth;
        let gameBoardHeight = (this.props.height * 24);

        let gameWidth = headerWidth;
        let gameHeight = headerHeight + gameBoardHeight;

       return  (
           <>
               <SGameEdge width={headerWidth}
                          height={headerHeight}
                          className={"SHeaderBorder"}>

               </SGameEdge>
               <SBoardBorder width={gameBoardWidth}
                             height={gameBoardHeight}
                             className={"SBoardBorder"}>
                   {this.generateGameTiles()}
               </SBoardBorder>
           </>
       );
    }
}