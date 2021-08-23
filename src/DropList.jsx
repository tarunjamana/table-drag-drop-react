import React, {useContext} from "react";
import DropTarget from "./DropTarget";
import DataContext  from './data';
import Table from './table';

export default () => {
    const targetItems = useContext(DataContext);
    const [items, setItems] = React.useState([]);
    const itemDropped = item => setItems([...items, item]);
    console.log(items);

    if(targetItems.fileLoaded){
        return (
            <DropTarget onItemDropped={itemDropped} dropEffect="link">
                <div className="drag-drop-container">

                        <Table data={items} />

                </div>
            </DropTarget>
        );
    }

    else{
        return null;
    }
};
