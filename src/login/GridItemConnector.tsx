import React, { Component, useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap";
import Table from "react-bootstrap/Table";

class GridItemConnector extends React.Component<{}, {error: any, isLoaded: boolean, result:any, complaintId: string, column: boolean, row: boolean}> {


  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          result: null,
          complaintId: props.complaintId,
          column: props.column,
          row: props.row
      };
      this.componentDidMount = this.componentDidMount.bind(this);
      this.reload = this.reload.bind(this);
  }

  reload() {
    this.setState({
      complaintId: this.state.complaintId,
      isLoaded: false
    })
    fetch("http://localhost:8080/app/v3/defects/test/grid-item/" + this.state.complaintId)  
        .then(result => result.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                result:result
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        );
  }


    async componentDidMount() {
        await fetch("http://localhost:8080/app/v3/defects/test/grid-item/" + this.state.complaintId)  
        .then(result => result.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                result:result
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        );
    }

    render() {
        const { error, isLoaded, complaintId, result } = this.state;
        if (!isLoaded) {
          return <div style={{alignItems:"center"}}><img style={{marginTop:"50px", marginLeft:"100px", height:"100px", width:"100px"}} src="../loading.gif"/></div>;
        } else if (error || result.errorMessage) {
          return <div style={{"color":"red"}}>Something went wrong <a href="#" onClick={this.reload}>Reload the page</a>
          </div>
        } else {
          return (
            <Table style={{"borderWidth":"1px", height:"100%", width:"100%", borderBottom:"1px solid black", position:"relative",
            boxLines:'multiple',
             marginTop:"-10px", borderInline:"trie", 'borderStyle':'solid', borderRadius:'5px'}} bordered hover>
               <thead>
                <tr>
                  <th style={{borderBottom:"1px solid black"}} colSpan={2}> INWARRANTY DEFECTIVE ITEMS </th>
                </tr>
              </thead>
              <tbody>
              <tr >
                  <td style={{borderBottom:"1px solid black"}}>
                    Branch Name
                  </td>
                  <td style={{borderBottom:"1px solid black"}}>
                    {result.branchName}
                  </td>
                </tr>
                <tr >
                  <td style={{borderBottom:"1px solid black"}}>
                    Complaint No
                  </td>
                  <td style={{borderBottom:"1px solid black"}}>
                    {result.complaintNumber}
                  </td>
                </tr>
                <tr>
                  <td style={{borderBottom:"1px solid black"}}>
                    Date
                  </td>
                  <td style={{borderBottom:"1px solid black"}}>
                    {result.date}
                  </td>
                </tr>
                <tr>
                  <td style={{borderBottom:"1px solid black"}}>
                    Product
                  </td>
                  <td style={{borderBottom:"1px solid black"}}>
                  {result.product}
                  </td>
              </tr>
              <tr>
                <td style={{borderBottom:"1px solid black"}}>
                  ModelName
                </td>
                <td style={{borderBottom:"1px solid black"}}>
                  {result.model}
                </td>
              </tr>
              <tr>
                <td style={{borderBottom:"1px solid black"}}>
                  Serial Number
                </td>
                <td style={{borderBottom:"1px solid black"}}>
                  {result.serialNumber}
                </td>
              </tr>
              <tr>
                <td style={{borderBottom:"1px solid black"}}>
                  DOP
                </td>
                <td style={{borderBottom:"1px solid black"}}>
                  {result.dop}
                </td>
              </tr>
              <tr>
                <td style={{borderBottom:"1px solid black"}}>
                  Spare Name
                </td>
                <td style={{borderBottom:"1px solid black"}}>
                  {result.spareName}
                </td>
              </tr>
              <tr>
                <td style={{borderBottom:"1px solid black"}}>
                  Actual Fault
                </td>
                <td style={{borderBottom:"1px solid black"}}>
                  {result.actualFault}
                </td>
              </tr>
              <tr>
                <td >
                  Tech Name
                </td>
                <td >
                  {result.techName}
                </td>
              </tr>
              </tbody>
            </Table>)
            // <table style={{"borderWidth":"1px", borderBottom:"1px solid black", position:"relative",
            // boxLines:'multiple',
            //  marginTop:"-10px", borderInline:"trie", 'borderStyle':'solid', borderRadius:'5px'}}>
            //   <tr aria-colspan={2}><th>InWarrantyDefectiveParts</th></tr>
            //   <tr>
            //     <td width="20%" style={{width:"20px", border: "1px solid black"}}>Branch Name</td>
            //     <td style={{border: "1px solid black"}}>{result.branchName}</td>
            //   </tr>
            //   <tr>
            //     <td style={{border: "1px solid black"}}>Complaint No</td>
            //     <td style={{border: "1px solid black"}}>{result.complaintNumber}</td>
            //   </tr>
              {/*<tr>
                <td style={{border: "1px solid black"}}>Date</td>
                <td style={{border: "1px solid black"}}>{result.date}</td>
              </tr>
              <tr>
                <td style={{border: "1px solid black"}}>Product</td>
                <td style={{border: "1px solid black"}}>{result.product}</td>
              </tr>
              <tr>
                <td style={{border: "1px solid black"}}>ModelName</td>
                <td style={{border: "1px solid black"}}>{result.model}</td>
              </tr>
              <tr>
                <td style={{border: "1px solid black"}}>Serial Number</td>
                <td style={{border: "1px solid black"}}>{result.serialNumber}</td>
              </tr>
              <tr>
                <td style={{border: "1px solid black"}}>DOP</td>
                <td style={{border: "1px solid black"}}>{result.dop}</td>
              </tr>
              <tr>
                <td style={{border: "1px solid black"}}>Spare Name</td>
                <td style={{border: "1px solid black"}}>{result.spareName}</td>
              </tr>
              <tr>
                <td style={{border: "1px solid black"}}>Actual Fault</td>
                <td style={{border: "1px solid black"}}>{result.actualFault}</td>
              </tr>
              <tr>
                <td style={{border: "1px solid black"}}>Tech Name</td>
                <td style={{border: "1px solid black"}}>{result.techName}</td>
              </tr> */}
          //   </table>
          // );
        }
      }
};

export default GridItemConnector;

