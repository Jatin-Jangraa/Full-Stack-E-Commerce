import React, { useState } from 'react'
import "../../Style/Login.scss"
import { signapi } from '../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logininto } from '../../redux/feature';


const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [login, setlogin] = useState({
        email: "",
        passward: ""
    })

    const [signup, setsignup] = useState({
        name: "",
        email: "",
        passward: "",
        gender: ""
    })



    const [form, setform] = useState(true);


    const loginhandler = async (e) => {

        e.preventDefault();




        try {

            const res = await signapi.post("/signin", login)

            console.log(res);

            setTimeout(() => {
                dispatch(logininto(
                    {
                        user: res.data.user.role,
                        userid: res.data.user._id,
                        name: res.data.user.name
                    }))
            }, 500);





            toast.success("Successfully Login")

            setTimeout(() => {
                navigate("/")
            }, 500);











        } catch (error) {

            toast.error(error.response.data.message)

        }

    }

    const signuphandler = async (e) => {

        e.preventDefault();


        try {

            const res = await signapi.post("/signup", signup)

            console.log(res);


            setTimeout(() => {
                dispatch(logininto(
                    {
                        user: res.data.user.role,
                        userid: res.data.user._id,
                        name: res.data.user.name
                    }))
            }, 500);


            toast.success("Signup Successfully")

            setTimeout(() => {
                navigate("/")
            }, 500);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="login">

            <div className="loginbox">

                {form === true ? <><form className='loginform' onSubmit={loginhandler}>

                    <h1>Login Page</h1>
                    <div className="loginboxdata">
                        <label >E-Mail</label>:
                        <input type="text" required onChange={(e) => { setlogin({ ...login, email: e.target.value }) }} />
                    </div>


                    <div className="loginboxdata">
                        <label >Passward</label>:
                        <input type="passward" required onChange={(e) => { setlogin({ ...login, passward: e.target.value }) }} />
                    </div>



                    <div className="loginboxsign">


                        <button className='loginsignbtn' onClick={() => setform(prev => !prev)}>

                            <span className='loginflex'>New User Sign up here</span>
                        </button>
                    </div>


                    <div className="loginsubmit">
                        <button type='submit' >Submit</button>
                    </div></form>
                </>

                    : <><form onSubmit={signuphandler} className='loginform'>

                        <h1>Signup Page</h1>
                        <div className="loginboxdata">
                            <label >Name</label>:
                            <input type="text" required onChange={(e) => { setsignup({ ...signup, name: e.target.value }) }} />
                        </div>

                        <div className="loginboxdata">
                            <label >E-Mail</label>:
                            <input type="text" required onChange={(e) => { setsignup({ ...signup, email: e.target.value }) }} />
                        </div>


                        <div className="loginboxdata">
                            <label >Passward</label>:
                            <input type="passward" required onChange={(e) => { setsignup({ ...signup, passward: e.target.value }) }} />
                        </div>

                        <div className="loginboxdata">
                            <select required onChange={(e) => { setsignup({ ...signup, gender: e.target.value }) }}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="loginboxsign">


                            <button className='loginsignbtn' onClick={() => setform(prev => !prev)}>

                                <span className='loginflex'>Signin here</span>
                            </button>
                        </div>


                        <div className="loginsubmit">
                            <button type='submit'>Submit</button>
                        </div></form>
                    </>}


            </div>

        </div>
    )
}

export default Login

