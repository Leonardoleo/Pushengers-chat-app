// const { Component } = require("react")
import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, emojiIndex } from 'emoji-mart';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null,
            loadingChats: false,
            emojiPicker: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
      }

       async componentDidMount() {
          this.setState({ readError: null, loadingChats: true });
          const chatArea = this.myRef.current;
          try {
              db.ref("chats").on("value",snapshot => {
                  let chats = [];
                  snapshot.forEach((snap) => {
                      chats.push(snap.val());
                  });
                  chats.sort(function (a, b) {return a.timestamp - b.timestamp})
                  this.setState({ chats });
                  chatArea.scrollBy(0, chatArea.scrollHeight);
                  this.setState({ loadingChats: false });
              });
            } catch (error) {
                this.setState({ readError: error.message, loadingChats: false });
            }
      }
      
       handleChange = (event) => {
          this.setState({
              [event.target.name]: event.target.value
          });
      };

      handleKeyDown = (event) => {
          if (event.KeyCode === 13) {
              this.sendMessage();
          }
        }

        // const { message } = this.state;
      
        handleTogglePicker = () => {
          this.setState({ emojiPicker: !this.state.emojiPicker });
      }

        handleAddEmoji = (emoji) => {
          const oldMessage = this.state.message;
          const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons} `);
          this.setState({ message: newMessage, emojiPicker: false });
          setTimeout(() => this.messageInputRef.focus(), 0);
      };

      colonToUnicode = (message) => {
          return message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
            x = x.replace(/:/g, "");
            let emoji =emojiIndex.emojis[x];
            if (typeof emoji !== "undefined") {
                let unicode = emoji.native;
            if (typeof unicode !== "undefined") {
                return unicode;
            }
        }
        x = ":" + x + ":";
        return x;

          });
      }
          
      
       addEmoji = e => {
        //   let sym = e.unified.split('-')
        //   let codesArray = []
        //   sym.forEach(el => codesArray.push('0x' + el))
        // String.fromCodePoint(...codesArray)
          let emoji = e.native
          this.setState({ 
              text: this.state.text + emoji
            })}

        // handleChange = e => {
        //     let validation = validate(e.target.value);
        //     //console.log(validation)
        //     this.setState({
        //         text: e.target.value,
        //         errors: validation
        //     });
        // }

        // handleSubmit = e => {
        //     e.preventDefault();
        //     postMessage(this.state);
        //     this.setState({ text: ""});
        // };

        async handleSubmit(event) {
          event.preventDefault();
          this.setState({ writeError: null });
          const chatArea = this.myRef.current;
          try {
              await db.ref("chats").push({
                  content: this.state.content,
                  timestamp: Date.now(),
                  uid: this.state.user.uid
              });
              this.setState({ content: '' });
              chatArea.scrollBy(0, chatArea.scrollHeight);
          } catch (error) {
              this.setState({ writeError: error.message });
          }
      }

      formatTime(timestamp) {
          const d = new Date(timestamp);
          const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
          return time;
      }
      
      render() {
              
          const { message, emojiPicker } = this.state;
          return (
              <div>
                 
                 <Header />
               
               <div className="chat-area" ref={this.myRef}>
                   {/* loading indicator*/}
                   {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
                   <span className="sr-only">Loading...</span> 
                </div> : ""}
                {/* chat area */}
                      {this.state.chats.map(chat => {
                          return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
                          {chat.content}
                          <br />
                          <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                          </p>
                    })}
                  </div>
                  <form onSubmit={this.handleSubmit} className="mx-3">
                    <textarea className="form-control" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
                    {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                    <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
                    </form>
                    {/* <span>
                        <Picker onSelect={this.addEmoji} />
                    </span> */}
            
               
          
              <div className="message__form">
              {emojiPicker && (
                  <Picker 
                   set="apple"
                   onSelect={this.handleAddEmoji}
                   className="emojipicker"
                   emoji="point_up"   
                  />
              )}
              <input
                fluid
                name="message"
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                value={message}
                ref={(node) => (this.messageInputRef = node)}
                style={{ marginBottom: "0.7em"}}
                label={
                    <button
                    icon={emojiPicker ? "close" : "add"}
                    content={emojiPicker ? "Close" :null}
                    onClick={this.handleTogglePicker}
                    />
                }
              />
                  
                  
                    <div className="py-5 mx-3">
                      Login in as: <strong className="text-info">{this.state.user.email}</strong>
                  </div>
              </div>
            </div>
          );
      }
}

