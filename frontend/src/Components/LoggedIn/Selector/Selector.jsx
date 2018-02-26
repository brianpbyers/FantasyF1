import React, { Component } from 'react';

class Selector extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.defOpt
        }
    }
    handleChange=(e)=>{
        this.setState({
            value:e.target.value
        })
    }
    render(){
        let allOptions;
        let defOpt;
        if(this.props && this.props.allOptions){
            allOptions = this.props.allOptions;
            defOpt = this.props.defOpt;
            allOptions = allOptions.map((indOpt)=>
                <option key={indOpt.id} value={indOpt.id} >
                    {indOpt.name||indOpt.surname}
                </option>
            )
        }
        return(
            <select defaultValue={defOpt} onChange={this.handleChange}>
                {allOptions}
            </select>
        )
    }
}

export default Selector;