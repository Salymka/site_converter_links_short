import React, { useContext, useState} from "react";
import "materialize-css"
import {useHttp} from "../hooks/http.hook";
import {authContext} from "../context/authContext";

export const AuthPage = () => {
    const authContx = useContext(authContext)
    const {loading,  request} = useHttp()
    const [form, setForm] = useState({
            email:'',
            password:''
        })
        const changeHandler = event => {
            setForm({
                ...form,
                [event.target.id]: event.target.value
            })

        }

        const registerHandle = async () => {
            try {
                const data = await request('/registration', "POST", {...form})

                console.log('data', data.message)
            }catch (e){}
        }

        const loginHandler = async () => {

        try {
            const data = await request('/login', "POST", {...form})
            authContx.login(data.token, data.userId)

        }catch (e) {

        }


        }

    return (
        <div className='row '>
            <div className=' col s6 offset-s3'>
                <h2 style={{textAlign: 'center'}}>
                    Authentication
                </h2>
                <div className="card pink darken-4">
                    <div className="card-content white-text ">
                        <span className="card-title">Authentication Guest</span>

                        <input placeholder="Your Email"
                               id="email"
                               type="text"
                               value={form.email}
                               onChange={changeHandler}/>

                        <input placeholder=" Password"
                               id="password"
                               type="password"
                               value={form.password}
                               style={{marginTop: 20}}
                               onChange={changeHandler}/>

                    </div>
                    <div className="card-action" style={{marginTop: 50}}>
                        <button className='btn teal lighten-1'
                                style={{marginLeft: 20}}
                                onClick={loginHandler}
                                disabled={loading}>
                            Log in
                        </button>
                        <button className='btn teal lighten-1'
                                style={{marginLeft: 20}}
                                onClick={registerHandle}
                                disabled={loading}>
                            Sing up
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
