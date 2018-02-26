import React, { Component } from 'react';

class Selector extends Component{
    render(){
        let allOptions;
        let defOpt;
        if(this.props && this.props.allOptions){
            allOptions = this.props.allOptions;
            defOpt = this.props.defOpt;
            console.log(defOpt, this.props.allOptions);
            allOptions = allOptions.map((indOpt)=>
                <option key={indOpt.id} value={indOpt.id} >
                    {indOpt.name||indOpt.surname}
                </option>
            )
        }
        return(
            <select value={defOpt}>
                {allOptions}
            </select>
        )
    }
}

export default Selector;