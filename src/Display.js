import React, { Component } from 'react';
import './App.css';
import renderHTML from 'react-render-html';

export default class Display extends Component {
  constructor(props){
   super(props);
   this.click=this.click.bind(this);

 }


 click(){
   this.props.toggleFav(this.props.item);
 }

parse(string){
     var e = document.createElement('div');
     e.innerHTML = string;
     // handle case of empty input
     return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

  render() {
    let item = this.props.item;
    if(item.favorite) {
    return (
      <div id={item.id} className="display">
      {/*
        source: https://fontawesome.com/icons/star?style=solid
      */}
      <div className= "left">
        <button  id ={"icon"+item.id} onClick ={this.click} className="fa fa-star fav">
        </button>
        <span className="title">   {item.title} </span>
      </div>
        <div className= "right" >
        {renderHTML(this.parse(item.body))}
        </div>
        </div>
    );
  } else {
    return (
      <div id={item.id} className="display">
      {/*
        source: https://fontawesome.com/icons/star?style=solid
      */}
      <div className="left">
        <button  id ={"icon"+item.id} onClick ={this.click} className="fa fa-star notfav">
        </button>
        <span className="title">   {item.title} </span>
      </div>
        <div className= "right" >
        {renderHTML(this.parse(item.body))}
        </div>
        </div>
    );
  }

  }
}
