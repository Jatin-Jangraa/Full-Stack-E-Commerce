import React, { useEffect, useState } from 'react'
import "../../Style/Search.scss"
import { homepagedata } from '../../assets/Data/data'
import { productapi } from '../../api'
import { useDispatch } from 'react-redux'
import { addtocart } from '../../redux/orderfeature'
homepagedata


const Search = () => {

  const dispatch = useDispatch()


  const [data, setdata] = useState(null)
  const [cate, setcate] = useState(null)
  const [search, setsearch] = useState("");
  const [sort, setsort] = useState("");
  const [maxprice, setmaxprice] = useState("");
  const [category, setcategory] = useState("")


  const categoryapi = async () => {
    const category = await productapi.get(`category/`)
    setcate(category.data)
  }
  useEffect(() => {
    categoryapi()
  }, [])




  const allproductapi = async () => {

    try {



      const res = await productapi.get(`/search/?${category ? `category=${category}&` : ""}${search ? `name=${search}&` : ""}${maxprice ? `price=${maxprice}&` : ""}${sort ? `sort=${sort}&` : ""}`)

      setdata(res.data)


    } catch (error) {
      console.log(error);

    }



  }


  useEffect(() => {
    allproductapi()
    setmaxprice("")
  }, [category])

  useEffect(() => {
    allproductapi()
    setmaxprice("")
  }, [search])

  useEffect(() => {
    allproductapi()
    setmaxprice("")
  }, [sort])


  useEffect(() => {
    allproductapi()
  }, [maxprice])


  const addtocarthandler = () => {

  }

  return (
    <div className="search">
      <div className="searchside">

        <div className="searchsidedate">
          <h1 className='searchhead'>FILTERS</h1>

          <div className="searchsort">
            <p>Sort</p>
            <select value={sort} onChange={(e) => setsort(e.target.value)}>
              <option value="">Defualt</option>
              <option value="asc">Price(Low to High)</option>
              <option value="dsc">Price(High to Low)</option>


            </select>
          </div>

          <div className="searchsort">
            <p>Max Range : {maxprice || ""}</p>
            <input className='setrange' type="range"

              min={100}
              max={100000}
              value={maxprice}
              onChange={(e) => setmaxprice(Number(e.target.value))} />
          </div>

          <div className="searchsort">
            <p>Category</p>
            <select
              value={category} onChange={(e) => setcategory(e.target.value)}
            >
              <option value={""}>All</option>

              {cate ? cate.map((cat) => {
                for (let i = 0; i < cate.length; i++) {
                  return <option value={`${cat}`} >{cat}</option>

                }
              }) : null}

            </select>
          </div>


        </div>

      </div>

      <div className="searchmain">
        <div className='searchmainhead'>
          <h1>Products</h1>
        </div>


        <div className="searchmaininput">
          <input type="text" placeholder='Search by Name...' value={search} onChange={(e) => { setsearch(e.target.value) }} />
        </div>


        <div className="searchmainitembox">
          {data ? data.map((itm) => {
            return (
              <div className="searchproduct">
                <img src={itm.photo} alt="" />
                <div className="searchproductheading"><p className="searchproductpara">{itm.name}</p></div>
                <div className="searchproductheading"><p className="searchproductpara">Rs.{itm.price}</p></div>
                <div className="searchproductbutton"><button onClick={() => {


                  {
                    itm.stock > 0 ? dispatch(addtocart({
                      price: itm.price,
                      productid: itm._id,
                      name: itm.name,
                      image: itm.photo,
                      stock: itm.stock,
                      quantity: 1,
                    })) : ""
                  }



                  { itm.stock > 0 ? "" : toast.error("Not Available in Stock") }
                }}>Add to cart</button></div>
              </div>
            )
          }) : null}
        </div>
      </div>
    </div>
  )
}

export default Search