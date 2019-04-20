import {Component} from "react";
import * as React from "react";
import Tile from "./Tile";
import styled from "styled-components";
import AutoBind from '../AutoBind';

interface IBoardProps {
    height: number,
    width: number,
    spritePath: string
}

interface IBoardState {
    mouseDown: boolean,
    tileMatrix: boolean[][];
}

const TileRow = styled.div`
    display: flex;
    margin: auto;
    width: 57%;
`;

export default class Board extends Component<IBoardProps, IBoardState> {
    constructor(props: any) {
        super(props);

        let tileMatrix = new Array(this.props.height);
        let tileMatrixRow = new Array(this.props.width);
        tileMatrixRow.fill(false);
        tileMatrix.fill(tileMatrixRow);

        this.state = {mouseDown: false, tileMatrix: tileMatrix};

        AutoBind.autoBind(this);
    }

    handleMouseDown() {
        this.setState({mouseDown: true});
    }

    handleMouseUp() {
        this.setState({mouseDown: false});
    }

    pressTile(press: Function) {
        if (this.state.mouseDown) {
            press();
        }
    }

    generateRow(sprite: string): Array<JSX.Element> {
        let row: Array<JSX.Element> = [];
        let spritePath = this.props.spritePath + sprite + ".png";
        let keyID = 0;

        for (let column = 0; column < this.props.width; ++column) {
            row.push(<img src={spritePath} key={sprite + keyID} />);
            keyID++;
        }

        return row;
    }

    generateBoard(): Array<JSX.Element> {
        let board: Array<JSX.Element> = [];
        let spritePath = this.props.spritePath;
        const barVertical = spritePath + "bar_vertical.png";

        // Generate top border
        board.push((
           <TileRow
                key={"top_border_div"}>
                <img src={spritePath + "corner_topleft.png"}
                     key={"corner_topleft"} />
               {this.generateRow("bar_horizontal")}
               <img src={spritePath + "corner_topright.png"}
                    key={"corner_topright"} />
           </TileRow>
        ));

        // Generate header blank rows
        const blankRows = 3;
        let rowKey = 0;
        for (let row = 0; row < blankRows; ++row) {
            board.push((
               <TileRow
                    key={"left_div" + rowKey}>
                   <img src={barVertical}
                        key={"left_bar" + rowKey} />
                   {this.generateRow("blank")}
                   <img src={barVertical}
                        key={"right_bar" + rowKey} />
               </TileRow>
            ));

            rowKey++;
        }

        // Generate middle border
        board.push((
           <TileRow key={"div_middle_border"}>
               <img src={spritePath + "joint_left.png"}
                    key={"joint_left"} />
               {this.generateRow("bar_horizontal")}
               <img src={spritePath + "joint_right.png"}
                    key={"joint_right"} />
           </TileRow>
        ));

        // Generate game tile rows
        for (let row = 0; row < this.props.height; row++) {
            let row: Array<JSX.Element> = [];

            for (let column = 0; column < this.props.width; column++) {
                row.push(<Tile key={"tile" + rowKey}
                               pressed={false}
                               />);
                rowKey++;
            }

            let barVertical = spritePath + "bar_vertical.png";
            board.push((
                <TileRow key={"row_div" + rowKey}>
                    <img src={barVertical}
                         key={"bar_vertical_left" + rowKey} />
                    {row}
                    <img src={barVertical}
                         key={"bar_vertical_right" + rowKey} />
                </TileRow>
            ));
        }

        // Generate bottom border
        board.push((
            <TileRow key={"bottom_div"}>
                <img src={spritePath + "corner_bottomleft.png"}
                     key={"corner_bottomleft"} />
                {this.generateRow("bar_horizontal")}
                <img src={spritePath + "corner_bottomright.png"}
                     key={"corner_bottomright"} />
            </TileRow>
        ));

        return board;
    }

    render() {
        return (
            <div
                key={"board"}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}>
                {this.generateBoard()}
            </div>
        );
    }
}