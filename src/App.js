import {Component} from "react"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Contact from "./Components/Contact";
import Alphabet from "./Components/Alphabet"
import './App.css';

const alphabets=[{id:"a",letter:"a"},{id:"b",letter:"b"},{id:"c",letter:"c"},{id:"d",letter:"d"},{id:"e",letter:"e"},{id:"f",letter:"f"},{id:"g",letter:"g"},{id:"h",letter:"h"},{id:"i",letter:"i"},{id:"j",letter:"j"},{id:"k",letter:"k"},{id:"l",letter:"l"},{id:"m",letter:"m"},{id:"n",letter:"n"},{id:"o",letter:"o"},{id:"p",letter:"p"},{id:"q",letter:"q"},{id:"r",letter:"r"},{id:"s",letter:"s"},{id:"t",letter:"t"},{id:"u",letter:"u"},{id:"v",letter:"v"},{id:"w",letter:"w"},{id:"x",letter:"x"},{id:"y",letter:"y"},{id:"z",letter:"z"}]

class App extends Component{
  state={
    isToggle:true,
    contacts:[],
    searchinput:"",
    activeAplhabetId:alphabets[0].letter
  }

  onSearchContact=event=>{
    this.setState({searchinput:event.target.value})
  }

  getFilterAplhabetData=()=>{
    const{activeAplhabetId,contacts}=this.state
    const filteredAlpha = contacts.filter(x=>x.name.toLowerCase()[0]===activeAplhabetId)
    return filteredAlpha
  }

  updateActiveId=(id)=>{
    this.setState({activeAplhabetId:id})
  }

  onToggle=()=>{
    this.setState(prevstate=>({isToggle:!prevstate.isToggle}))
  }

  DeleteUser=(id)=>{
    const{contacts}=this.state
    const filteredUser=contacts.filter(x=>x.id!==id)
    this.setState({contacts:filteredUser})
  }

  componentDidMount(){
    this.getContacts()
  }

  getContacts=async()=>{
    const url="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    const options={
      method:"GET"
    }
    const response=await fetch(url,options)
    const fetchedData=await response.json()
    const updatedData=fetchedData.sort((a,b)=>{
      if(a.name.toLowerCase()<b.name.toLowerCase()){
          return -1
      }
      if(a.name.toLowerCase()>b.name.toLowerCase()){
          return 1
      }
      return 0
  })
    this.setState({contacts:updatedData})
  }

  render(){
    const{isToggle,searchinput,activeAplhabetId}=this.state
    const filteredAlpha=this.getFilterAplhabetData()
    const searchResults=filteredAlpha.filter(x=>x.name.toLowerCase().includes(searchinput))
    return(
      <div className="main-container">
        {isToggle?<div className="contact-container">
          <div className="container">
          <h1 className="contactlist">All Contacts</h1>
          <button type="button" className="downbutton" onClick={this.onToggle}>
            <IoIosArrowUp className="downbutton1"/>
          </button>
          </div>
          <input type="search" placeholder="Search" value={searchinput} onChange={this.onSearchContact} className="inputE"/>
          <ul className="letter-container">
            {alphabets.map(x=>(<Alphabet Letter={x} key={x.id} updateActiveId={this.updateActiveId} isActive={activeAplhabetId===x.id}/>))}
          </ul>
          <ul className="list-container">
            {searchResults.map(x=>(<Contact Details={x} key={x.id} DeleteUser={this.DeleteUser}/>))}
          </ul>
        </div>:<div>
        <div className="container">
          <h1 className="contactlist">All Contacts</h1>
          <button type="button" className="downbutton" onClick={this.onToggle}>
            <IoIosArrowDown className="downbutton1"/>
          </button>
        </div>
        </div>}
        
      </div>
    )
  }
}

export default App;
