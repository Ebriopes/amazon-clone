import React from 'react'
import Product from 'components/Product'
import background from 'images/background.jpg'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" alt="background" src={background} />
        <div className="home_row">
          <Product
            id="1234232344"
            image="https://img.pngio.com/portal-gun-png-portal-2-atlas-portal-gun-transparent-png-portal-gun-png-920_656.png"
            price={55000}
            rating={5}
            title="Portal gun replica from Portal videogame"
          />
          <Product
            id="123423412"
            image="https://images-na.ssl-images-amazon.com/images/I/51vWGNQMICL._AC_SY741_.jpg"
            price={800.5}
            rating={5}
            title="Gantz Yamazaki's sculture"
          />
        </div>
        <div className="home_row">
          <Product
            id="123423432"
            image="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/09/02/15990624914067.jpg"
            price={1600}
            rating={5}
            title="PlaySation 5 new and anticipate console"
          />
          <Product
            id="123423423"
            image="https://images-na.ssl-images-amazon.com/images/I/71D5EdHS2qL._AC_SL1500_.jpg"
            price={200}
            rating={3}
            title="Straw hat similar to Luffy's hat from One Piece"
          />
          <Product
            id="123423442"
            image="https://images-na.ssl-images-amazon.com/images/I/41nvg6s%2BOdL._AC_.jpg"
            price={11000}
            rating={5}
            title="Yamato blade, property of Virgil descendent of Sparda"
          />
        </div>
        <div className="home_row">
          <Product
            id="123423454"
            image="https://steelcrewblog.files.wordpress.com/2013/10/prince_of_persia_sands_of_time_dagger_uc2679.jpg"
            price={15000}
            rating={4}
            title="Dagger of Time from Prince of Persia"
          />
          <Product
            id="123412341"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ2NYzpTBYXaPzKth_bMScotO2nr___jcFvMg&usqp=CAU"
            price={20000}
            rating={2}
            title="Piedra filosofal para vencer a Voldemort en la nuca del profe"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
