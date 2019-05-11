import {Component, FormEvent} from "react";
import AutoBind from "../AutoBind";
import * as React from "react";

interface IFlavorFormState {
    flavor: string;
}

export default class FlavorForm extends Component<any, IFlavorFormState> {
    constructor(props: any) {
        super(props);
        this.state = {flavor: 'grapefruit'};

        AutoBind.autoBind(this);
    }

    handleChange(event: any) {
        this.setState({flavor: event.target.flavor});
    }

    handleSubmit(event: any) {
        alert('Your favorite flavor is: ' + this.state.flavor);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select value={this.state.flavor} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

}