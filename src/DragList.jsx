import React, {useContext} from "react";
import Drag from "./Drag";
import logo from "./logo.png";
import DataContext  from './data';



export default () => {
    const items = useContext(DataContext)
console.log(items);
if(items.fileLoaded){
    return (
        <div className="drag-drop-container">
            {Object.keys(items.data[0]).map((key) => (
                <Drag key={key} dataItem={key} dragImage={logo} dropEffect>
                    <div className="item">{key}</div>
                </Drag>
            ))}
        </div>
    );
}
else {return null;}

};
