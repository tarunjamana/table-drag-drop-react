import React,{useContext} from "react";
import DataContext  from './data';



function Table (props){
const filedata = useContext(DataContext);
console.log(filedata);
 var columnHeader = props.data;
 var uniqHeaders  = [...new Set(columnHeader)];
 const finalData = filedata.data.map(item => uniqHeaders.reduce((obj, curr) => { obj[curr] = item[curr]; return obj }, {}))
 console.log(finalData);
 console.log(columnHeader);
 console.log(uniqHeaders);
if(columnHeader.length > 0){
    return(
         <table className="file-data">
             <tr>
                 {Object.keys(finalData[0]).map((item) =>(
                     <th>{item}</th>
                 ))}
             </tr>
             {finalData.map((item) =>(
                  <tr>
                      {Object.values(item).map((val) =>(
                          <td>{val}</td>
                      ))}
                  </tr>
             ))}
         </table>
         
    )

}

else{
    return null;
}
}


export default Table;
