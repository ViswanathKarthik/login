import React, { useState } from "react";
import LoginRequest from "./LoginRequest";
import LoginRequestConnector from "./LoginRequestConnector";
import { ReactDOM } from "react";
import axios from "axios";
import GridItemConnector from "./GridItemConnector.tsx";
import { Card } from "react-bootstrap";
import {Button} from "react-bootstrap";

import styles from './App.css';

class LoginPageConnector extends React.Component<{}, {error: any, isLoaded: boolean, result: any, loginSuccess?:boolean, loginRequest?: LoginRequest}> {


  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          result: null,
      };
    this.handleInput = this.handleInput.bind(this); 
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.print = this.print.bind(this);
  }


    componentDidMount() {
        fetch("http://localhost:8080/app/v3/defects/test")  
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

    loginRequest(loginRequest: LoginRequest) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest)
      };
      console.log(JSON.stringify(loginRequest))
      axios("http://localhost:8080/app/v3/defects/test/login", options)  
      .then((result) => {
            this.setState({
              isLoaded: true,
              result:result.data,
              loginSuccess: result.data.loginSuccess
          })
        },
      (error) => {
          this.setState({
              isLoaded: true,
              error
          });
          }
      );
  }

    handleOnSubmit(event) {
      event.preventDefault();
      var loginRequest:LoginRequest;
      if (!this.state.loginRequest) {
        loginRequest = {
          serverId: this.state.result.serverId,
          sessionId: this.state.result.sessionId
        };
      } else {
        loginRequest = this.state.loginRequest!
      }
      console.log(JSON.stringify(loginRequest));
      this.loginRequest(loginRequest);
    }
    
    handleInput(event) {
      event.preventDefault();
      const target = event.target;
      const localLoginRequest:LoginRequest = {};
      if (this.state.loginRequest) {
        localLoginRequest.username = this.state.loginRequest!.username;
        localLoginRequest.password = this.state.loginRequest!.password;
        localLoginRequest.captcha = this.state.loginRequest!.captcha;
      }
      this.setState({
        loginRequest: {
          username: localLoginRequest.username,
          password: localLoginRequest.password,
          captcha: localLoginRequest.captcha,
          sessionId: this.state.result.sessionId,
          serverId: this.state.result.serverId,
          [target.name]: target.value
        },
        result: this.state.result
      })

      
    }

    loginForm(result) {
      return (
        <html>
          <body>
            <Card style={{border: `1.4px solid black`, position: 'relative', marginTop:'15%', marginLeft:'40%', marginRight:'60%',
              right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', width:'310px',
               height:'225px',  fontSize:'12px'}}>
                <Card.Title  style={{position:'relative', marginTop:'0%', marginLeft:'35%', fontSize:'25px'}}>Login</Card.Title>
                <Card.Body>
                  <Card.Text>
                  <form style={{position:'relative', marginTop:'15%', marginLeft:'25%'}} onSubmit={this.handleOnSubmit}>
                    <input type="text" name="username" onChange={this.handleInput} placeholder="Enter username"></input><br></br><br></br>
                    <input type="password" name="password" onChange={this.handleInput} placeholder="Enter password"></input><br></br>
                    <img src={result.captchaImageUrl}></img><br></br>
                    <input type="text" name="captcha" onChange={this.handleInput} placeholder="Enter captcha"></input><br></br><br></br>
                    <button style={{marginLeft:'23%'}} type="submit" name="Login" value="login">Login</button>
                  </form>
                  </Card.Text>
                </Card.Body>
            </Card>
            
        </body>
        </html>
      );
    }

    print() {
      if (this.state.isLoaded) {
        window.print();
      } else {
        alert("Please wait");
      }
    }

    render() {
        const { error, isLoaded, loginSuccess, result } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div><img style={{position: 'relative', marginTop:'15%', marginLeft:'40%',height:"100px", width:"100px"}} src="../loading.gif"/></div>;
        } else if (result.errorMessage != null) {
          return <div>{result.errorMessage}<LoginPageConnector></LoginPageConnector></div>
        } else if (loginSuccess) {
          let output = new Array(result.size);
          let j=0;
          for (let i=0;i<result.size;i++) {
            let column = j<3;
            let row = j==3;
            if (row) {
              j=0;
            }
            output.push(<GridItemConnector complaintId={result.complaintIds[i]} column={true} row={false}></GridItemConnector>)
            j++;
          }
          let finalOutput = new Array(result.size*2);
          let i=0;
          let jj=0;
          finalOutput.push(<div>Welcome {result.loggedInUser}({result.userId})&nbsp;
          <button onClick={this.print}>Print this whole page</button></div>) 
          output.forEach(o => {finalOutput.push (
              <Card style={{position: 'absolute', top: `${50+jj*240}px`, left: `${10+i*320}px`, 
              right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', width:'310px',
               height:'225px',  fontSize:'12px'}}>{/*border: `1.4px solid black`,*/}
                <Card.Body>
                  <Card.Text>
                    {o}
                  </Card.Text>
                </Card.Body>
              </Card>
              )
              
          
              if (i==2) {
                jj++;
                i=-1;
              }
              if (jj%4==0) {
                finalOutput.push(<div className='pagebreak'></div>)
              }
              i++;

        }
        );   
        return finalOutput;
        } else {
          return this.loginForm(result);
        }
      }
};

export default LoginPageConnector;

