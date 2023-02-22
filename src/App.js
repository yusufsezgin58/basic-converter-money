import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [selectValue1, setSelectValue1] = useState("")
  const [selectValue2, setSelectValue2] = useState("")
  const [amount, setAmount] = useState("")
  const [informations, setInformations] = useState()
  const [output, setOutput] = useState("")

  const onClickFunc = () => {

    setInformations({ amount: amount, fromValue: selectValue1, toValue: selectValue2 })

    const options = {
      method: 'GET',
      url: 'https://currency-exchange.p.rapidapi.com/exchange',
      params: { from: `${selectValue1}`, to: `${selectValue2}`, q: `${amount}` },
      headers: {
        'X-RapidAPI-Key': '9452a09c0bmsh844d338fef42946p1419c1jsnb844a2c88c9d',
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setOutput(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    console.log(selectValue1);
    console.log(selectValue2);
  })

  return (
    <div className="App shadow-lg">
      <div className='top'>
        <h3 className='text-white fw-bold'>Convert Your Money</h3>
      </div> <hr />
      <div className='bottom'>
        <div className='from'>
          <h5 className='text-white'>From:</h5>
          <select class="form-select" value={selectValue1} onChange={(e) => {
            setSelectValue1(e.target.value)
          }} id='selectArea' aria-label="Default select example">
            <option selected value={"TRY"}>TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value={"JPY"}>JPY</option>
          </select>
        </div>
        <div className='to'>
          <h5 className='text-white'>To:</h5>
          <select class="form-select" value={selectValue2} onChange={(e) => {
            setSelectValue2(e.target.value)
          }} id='selectArea2' aria-label="Default select example">
            <option selected value={selectValue1} defaultValue={"USD"}>USD</option>
            <option value="TRY" draggable>TRY</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value={"JPY"}>JPY</option>
          </select>
        </div>
        <div className='amount'>
          <h5>Amount of money:</h5>
          <input placeholder='50$' className='form-control' value={amount} onChange={(e) => {
            setAmount(e.target.value)
          }} type={"number"} />
        </div>
        <div className='button'>
          <button className='btn btn-light px-3' onClick={onClickFunc}>
            Convert
          </button>
        </div>
      </div>
      <div className='show'>
        <h5 className='text-white mt-5'>{
          output
        }</h5>
      </div>
    </div>
  );
}

export default App;
