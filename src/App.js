// import logo from './logo.svg';
//add also useState and useEffect
import React,{useState,useEffect} from 'react'
//import axios
import axios from 'axios'
import './App.css';
import Coin from './Components/Coin.js'



function App() {

    //make coin array
    const [coins,setCoins]=useState([])
    const [search,setSearch]=useState('')

  //define useEffect
  useEffect(()=>{
    //getting api
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      //getting data
      setCoins(res.data)
      //checking data in console
      //console.log(res.data)


    }).catch(error=>alert('error is there in getting api'))
  },[]);


  const handleChange=e=>{
    setSearch(e.target.value)
  }


  const filteredCoins=coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  )

  // const coin_container_style={
  //   display: "flex",
  //   justify_: "center"
  // };

  // const coin_row_style={
  //   display: "flex",
  //   flex-direction: "row",
  //   justify-content: "start",
  //   align-items: "center",
  //   height: "80px",
  //   border-bottom: "1px solid #d7d7d7",
  //   width: "900px"
  // };


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search Currency</h1>
        <form>
          <input type="text" placeholder="search" className="coin-input" onChange={handleChange}/>
        </form>
      </div>

      <div className='app_coin_container'>
                <div className='app_coin_row'>
                    <h3 style={{paddingRight: "120px"}}>Name</h3>
                    <h3 style={{paddingRight: "90px"}}>Symbol</h3>
                    <h3 style={{paddingRight: "60px"}}>Current Price</h3>
                    <h3 style={{paddingRight: "60px"}}>Volume</h3>
                    <h3 style={{paddingRight: "90px"}}>Price Change%</h3>
                    <h3 style={{paddingRight: "90px"}}>Market Cap</h3>
                </div>

      </div>

    {filteredCoins.map(coin=>{
      return(
        <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap}
         price={coin.current_price} 
         priceChange={coin.price_change_percentage_24h} volume={coin.total_volume}/>
      )
    })}
    </div>
  );
}

export default App;
