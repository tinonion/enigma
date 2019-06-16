import {useState} from "react";
import * as React from "react";
import styled, {StyledComponent} from "styled-components";
import { DragSource } from "react-dnd";
import {ItemTypes} from "./Constants";
import {DragSourceConnector, DragSourceMonitor, useDrag} from "react-dnd/lib/esm";

interface ITileProps {
    id: number
}


interface ITileState {
    style: StyledComponent<"div", any>;
}

const GameTile = styled.div`
    background-color: lightblue;
    outline: none;
    display: flex;
`;

const Pressed = styled(GameTile)`
    min-height: 23px;
    max-height; 23px;
    min-width: 23px;
    max-width: 23px;
    
    background-color: grey;
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    border-color: #000000;
`;

const Unpressed = styled(GameTile)`
    min-height: 23px;
    max-height: 23px;
    min-width: 23px;
    max-width: 23px;
    
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    border-color: #90b9c8;
`;

export default function Tile(props: ITileProps) {
    const [pressed, setPressed] = useState(false);
    /*const [{ isDragging }, drag] = useDrag({
        item: { id: props.id, type: ItemTypes.GAME_TILE },

        end: (dropResult?: { id: string }) => {
            if (dropResult) {
                alert(`You dropped ${props.id} into ${dropResult.id}!`)
            }
        },

        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });*/

    function handleClick(e: any) {
        e.preventDefault();
        setPressed(true);
    }

    //console.log(typeof drag)
    return (
        <GameTile
            as={pressed ? Pressed : Unpressed}
            onClick={e => handleClick(e)}
            />
    );
}

