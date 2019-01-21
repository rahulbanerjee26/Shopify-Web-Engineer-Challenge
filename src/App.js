import React, { Component } from 'react';
import './App.css';
import SearchField from "react-search-field";
import Display from "./Display"



class App extends Component {
      state ={
        items : [], //Stores all the items
        filteredItems: [], //Stores the search result items
        isLoaded : false,  //Variable to check if data is fetched or not
        count : 0, //kepp track of items
        favs : 0 //keep count of favorites
      }

      constructor(props){
       super(props);
       this.Change=this.Change.bind(this);
       this.toggleFav=this.toggleFav.bind(this);
       this.renderFavs=this.renderFavs.bind(this);
       this.clear=this.clear.bind(this);
     }


  componentDidMount(){
    let Items =[];
      const url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
      //fetching data using the fetch method
      fetch(url).then((obj) =>  obj.json()) //returns a json file
        .then(OBJ => OBJ.map( item =>{
            Items.push({
              body : item.body,
              category : item.category,
              title: item.title,
              keywords : item.keywords,
              favorite: false,
              id: this.state.count+1
            })
            this.setState({
              items: Items,
              isLoaded : true,
              count: this.state.count+1
            })
          })
        )
        .catch(function(err){ //In case of an error

          alert(err);

        });
  }

toggleFav(item){
  let Items = [];
  let favs = this.state.favs;
   this.state.items.map(i => {
    if(i === item ){
      if(item.favorite){
        item.favorite = false
        favs--;
      }
      else{
        item.favorite = true
        favs++;
      }
    }
    Items.push(i);
  });
  this.setState({
    items: Items,
    favs : favs
  })
}

clear(e){
  if(e==="")
    this.setState({
       filteredItems : []
     })
}

Change (e){
  let filteredItems = [];
     let Items = this.state.items;
     let query = e;
      Items.filter(item=>{
       let Keys = item.keywords.split(" ");
       Keys = Keys.join();
       Keys = Keys.replace(/[^a-z0-9]/gi,'');
       query = query.replace(/[^a-z0-9]/gi,'');
         if(Keys.includes(query.toLowerCase()) && query !== "" && !filteredItems.includes(item)){
          filteredItems.push(item);
        }
     })
     if(filteredItems ===  undefined || filteredItems.length === 0 && query !== "")
      alert("No match found. Try searching for keywords like takeout,plastic,water etc")
    if(query === "")
      alert("Please enter a value");
     this.setState({
       filteredItems : filteredItems
     })
}

 renderFavs (){
   if(this.state.favs > 0){
     let favItems = []
     this.state.items.map(item=>{
       if(item.favorite)
         favItems.push(item);
     })
     return(
       <div className="Favorites">
        <h1 style={{color: "green"}}> Favorites</h1>
        {favItems.map((item,index) => (
          <Display item={item}
                   toggleFav={this.toggleFav}
                   />
        ))}
       </div>
     )
   }
 }

  render() {
    let Items = this.state.filteredItems;
    return(
      <div className ="App">
        <h1 className="header"> Toronto Waste Lookup </h1>
        <SearchField placeholder="Search..." searchText=""
         classNames="searchBar" onChange ={this.clear}onEnter={this.Change} onSearchClick ={this.Change} />
           {Items.map((item,index) => (
             <Display item={item}
                      toggleFav={this.toggleFav}
                      />
           ))}
           {this.renderFavs()}
      </div>
    );
  }
}

export default App;
