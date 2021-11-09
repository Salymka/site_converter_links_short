import React, {useContext} from "react";
import {useState} from "react";
import {useHttp} from "../hooks/http.hook";
import "materialize-css"
import {authContext} from "../context/authContext";




export const CreateLink = () => {
    const {request} = useHttp()
    const auth = useContext(authContext)
    const [link, setLink] = useState("")
    const linkHandler = (event) => {
        setLink(event.target.value)
    }
    const pressHandler = async (event) => {
        if (event === "ENTER" || event.target.id === "btnCreate") {
            try {

                const data = await request("/generate", "POST", {originLink: link}, {
                    Authorization : `Bearer ${auth.token}`
                })
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }


    }
    return (

        <div className="row" style={{marginTop: 80}}>
            <div className="col s8 offset-s2">
                <div className="card pink darken-4 ">
                    <div className="card-content white-text">
                        <h3>
                            Paste yours link
                        </h3>
                        <input placeholder="Your link"
                               id="originLink"
                               type="text"
                               value={link}
                               onChange={linkHandler}
                               onKeyPress={pressHandler}/>
                        <button className="btn"
                                style={{marginTop: 20}}
                                id="btnCreate"
                                onClick={pressHandler}>

                            Create short link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
