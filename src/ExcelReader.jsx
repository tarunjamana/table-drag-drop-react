import React, { Component } from 'react';
import XLSX from 'xlsx';
import {make_cols} from './utils/makeColumns'
import { SheetJSFT } from './utils/types';
import DataContext  from './data';
import DragList from './DragList';
import DropList from './DropList';
import Charts from './Charts';

class ExcelReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: [],
            fileLoaded: false
        }

        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const files = e.target.files;
        if(files && files[0]){
            this.setState({file: files[0]});
        }
    };

    handleFile() {

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {

        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {type: rABS ? 'binary' :'array',bookVBA: true});

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        this.setState({ data:data , cols: make_cols(ws['!ref'])  } , () => {
            console.log(JSON.stringify(this.state.data,null,2));
        });

        this.setState({fileLoaded:true})


        };

        if(rABS) {
          reader.readAsBinaryString(this.state.file)
        } else {
            reader.readAsArrayBuffer(this.state.file)
        };
    }

    render() {
        return(
        <div>
        <input type="file" className="form-control custom-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <input
         className="generate-btn"
        type='submit' 
          value="Generate Table"
          onClick={this.handleFile} />
          <DataContext.Provider value={this.state}>
          <div className="row" style={{ height: "100%" }}>
                <div className="col-2" style={{ height: "100%", padding: "20px" }}>
                    <DragList />
                </div>
                <div className="col-10" style={{ height: "100vh", padding: "20px" }}>
                    <DropList />
                </div>
            </div>
            <div className="row" style={{ height: "100"}}>
               <Charts/>
            </div>
          </DataContext.Provider>

        </div>
        )
    }

}

export default ExcelReader;