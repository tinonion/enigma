import {Component} from "react";
import * as React from "react";
import AutoBind from "../AutoBind";
import './Tile.css';
import styled, {StyledComponent} from "styled-components";

interface ITileProps {
    pressed: boolean
}

interface ITileState {
    style: StyledComponent<"div", any>,
}

const GameTile = styled.div`
    background-color: #998099;
    outline: none;
`;

const Pressed = styled(GameTile)`
    min-height: 23px;
    max-height; 23px;
    min-width: 23px;
    max-width: 23px;
    
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    border-color: #335566;
`;

const Unpressed = styled(GameTile)`
    min-height: 18px;
    max-height; 18px;
    min-width: 18px;
    max-width: 18px;

    border-width: 3px;
    border-style: solid;
    border-color: #99aacc #335566 #335566 #99aacc;
`;

export default class Tile extends Component<ITileProps, ITileState> {
    constructor(props: ITileProps) {
        super(props);

        if (this.props.pressed) {
            this.state = {style: Pressed};

        } else {
            this.state = {style: Unpressed};
        }
    }

    render() {
        let style = this.state.style;

        return (
            <GameTile
                as={style}
                />
        );
    }
}