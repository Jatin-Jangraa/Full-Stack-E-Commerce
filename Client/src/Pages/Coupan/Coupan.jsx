import React, { useEffect, useState, FormEvent } from "react";
import Sidebar from "../../components/Side/Sidebar";
import "./coupan.css";
import { MdDeleteForever } from "react-icons/md";
import { paymentapi } from "../../api";
import toast from "react-hot-toast";


const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {


  const [list, setlist] = useState(null)

  console.log(list);


  const allcoupanapi = async () => {

    const res = await paymentapi.get("/coupan/all")

    if (res) {
      setlist(res.data)
    }


  }

  useEffect(() => {
    allcoupanapi()
  }, [])



  const [size, setSize] = useState(8);
  const [prefix, setPrefix] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [coupon, setCoupon] = useState("");

  const [coupandetail, setcoupandetail] = useState({
    coupan: "",
    amount: "",
  })

  console.log(coupandetail);


  const copyText = async (coupon) => {
    await window.navigator.clipboard.writeText(coupon);
    toast.success("Copied to Clipboard")
  };




  const submitHandler = (e) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result = prefix || "";
    const loopLength = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
    setcoupandetail({ ...coupandetail, coupan: result })

  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <>
      <div className="coupanmmainn">
        <div className="coupanside">
          <Sidebar />

        </div>

        <div className="coupanmain">
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="contain barcharty  listofcoupan"
          >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h1 style={{ fontSize: "1.7rem", fontWeight: "600", marginBottom: "40px" }}>Coupan Generator</h1>

              <section>
                <form className="coupan-form" onSubmit={submitHandler}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <input className="textin" style={{ height: "45px", border: "1.2px solid black" }}
                      type="text "
                      placeholder="Text to include"
                      maxLength={size}
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                    />

                    <input className="textlen" style={{ height: "45px", border: "1.2px solid black", fontSize: ".9rem" }}
                      type="number "
                      placeholder="Coupan Length"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      min={8}
                      max={25}
                    /></div>

                  <fieldset style={{ width: "100%", marginTop: "10px", minHeight: "60px", display: "flex", gap: "5px", alignItems: "center", justifyContent: "center", border: "1.2px solid black" }}>
                    <legend style={{ marginLeft: "25px" }}>Include</legend>

                    <input style={{ border: "1.2px solid black" }}
                      type={"checkbox"}
                      checked={includeNumbers}
                      onChange={() => setIncludeNumbers((prev) => !prev)}
                    />
                    <span>Number</span>

                    <input style={{ border: "1.2px solid black" }}
                      type={"checkbox"}
                      checked={includeSymbols}
                      onChange={() => setIncludeSymbols((prev) => !prev)}
                    />
                    <span>Symbols</span>

                    <input style={{ border: "1.2px solid black" }}
                      type={"checkbox"}
                      checked={includeCharacters}
                      onChange={() => setIncludeCharacters((prev) => !prev)}
                    />
                    <span>Charactor</span>


                  </fieldset>
                  <div className="coupanbtn">
                    <button type="submit" className="coupanbtnn">Generate</button></div>
                </form>
                <div className="jangra " onClick={() => copyText(coupon)}> {coupon && (
                  <code style={{ display: "flex", gap: "25px" }} >
                    {coupon}

                  </code>
                )



                }
                </div>


                <div className="coupandetail">
                  <input type="number" placeholder="Set Amount" onChange={(e) => {
                    setcoupandetail({ ...coupandetail, amount: e.target.value })
                  }} />
                  <button onClick={async () => {



                    try {

                      const res = await paymentapi.post("/coupan/new", coupandetail)

                      if (res) {
                        toast.success("Coupan generated Successfully..")
                        allcoupanapi()
                      }

                    } catch (error) {
                      toast.error(error.response.data.message)
                    }


                  }}>Save coupan</button>

                </div>


              </section>

            </div> <div className="listcoupan">
              <div className="mycoupans">
                <p className="mycoupanname">Name</p>
                <p className="mycoupanamount">Amount</p>
                <button className="mycoupandelete"></button>
              </div>


              {list ? list.map((itm) => {
                return (

                  <div className="mycoupans">
                    <p className="mycoupannames" onClick={async () => {
                      await window.navigator.clipboard.writeText(itm.coupan);
                      toast.success("Copied to Clipboard")
                    }}>{itm.coupan}</p>
                    <p className="mycoupanamounts">{itm.amount}</p>
                    <button className="mycoupandeletes" onClick={async () => {

                      try {

                        const confirm = window.confirm("Are you sure to delete coupan Permanentally ")
                        if (confirm) {
                          const res = await paymentapi.delete(`/coupan/delete/?id=${itm._id}`)

                          if (res) {
                            toast.success("Coupan Deleted Successfully.")

                            allcoupanapi()
                          }
                        }
                      } catch (error) {

                      }


                    }}  ><MdDeleteForever /></button>
                  </div>
                )
              }) : ""}


            </div>
          </div>


        </div>
      </div>


    </>
  );
};

export default Coupon;
