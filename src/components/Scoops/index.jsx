import  { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../Card';



const Scoops = () => {
  const [data, setData] = useState([])
  const [basket, setBasket] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3030/scoops')
    .then((res) => setData(res.data));
  }, []);

 console.log(basket);
  return (
    <div className="container my-5">
    <h1></h1>
    <p> Tanesi : <span className="text-success"> 50 ₺ </span></p>
    <h3>Çeşitler Ücreti <span className="text-success">{basket.length * 50} ₺</span></h3>

    <div className='row gap-5 justify-content-between mt-4 p-3'>
    {data.map((i) => <Card basket={basket} setBasket={setBasket} item={i} key={i.name} />)}
     </div>
    </div>
  )
}

export default Scoops



