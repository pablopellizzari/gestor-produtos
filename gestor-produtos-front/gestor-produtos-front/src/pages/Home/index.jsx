import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api.js'
import { useEffect, useState, useRef } from 'react'

function Home() {

  const [products, setProducts] = useState([]);

  const inputDescription = useRef();
  const inputPrice = useRef();

  async function getProdutos() {
    const APIproducts = await api.get('/produtos')

    setProducts(APIproducts.data);
  }

  async function createProdutos() {
    await api.post('/produtos', {
      description: inputDescription.current.value,
      price: parseFloat(inputPrice.current.value)
    });
    getProdutos();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProdutos()
  }, [])



  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Produtos</h1>
          <input placeholder='Descrição' type='text' ref={inputDescription} />
          <input placeholder='Preço' type='number' ref={inputPrice} />
          <button type='button' onClick={createProdutos}>Cadastrar</button>
        </form>


        {products.map(product => (
          <div key={product.id} className="card">
            <div>
              <p>Description: <span>{product.description}</span></p>
              <p>Price: <span>{product.price}</span></p>
            </div>
            <button>
              <img src={Trash} />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
