import axios from "axios"
import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const GlobalContext = createContext()

export const GlobalProvider = props => {
    let navigate = useNavigate()
    const [data, setData] = useState([])
    const [fetchStatus, setFetchStatus] = useState(true)
    const [searchStatus, setSearchStatus] = useState(true)
    const [currentId, setCurrentId] = useState(null)
    const [input, setInput] = useState({
        category: "",
        description: "",
        image_url: "",
        is_android_app: true,
        is_ios_app: true,
        name: "",
        price: 0,
        rating: 0,
        release_year: 2007,
        size: 0
    })

    const fetchData = async () => {
        let result = await axios.get(`https://backendexample.sanbercloud.com/api/mobile-apps`)
        let fetchResult = result.data
        console.log(fetchResult)
        setData(
            fetchResult.map((res) => {
                return {
                    id : res.id,
                    category : res.category,
                    description : res.description,
                    image_url : res.image_url,
                    is_android_app : res.is_android_app,
                    is_ios_app : res.is_ios_app,
                    name : res.name,
                    price : res.price,
                    rating : res.rating,
                    release_year : res.release_year,
                    size : res.size,
                }

            })
        )
    }

    const functionSubmit = () => {
        console.log(input)
        axios.post(`https://backendexample.sanbercloud.com/api/mobile-apps`, {
            category : input.category,
            description : input.description,
            image_url : input.image_url,
            is_android_app : input.is_android_app,
            is_ios_app : input.is_ios_app,
            name : input.name,
            price : input.price,
            rating : input.rating,
            release_year : input.release_year,
            size : input.size,
        }).then((res) => {
            console.log(res)
            setFetchStatus(true)
            navigate('/manage-data')
        }).catch((e) => {
            console.log(e.response.data.message)
            alert(e.response.data.message)
        })
    }

    const functionUpdate = () => {
        axios.put(`https://backendexample.sanbercloud.com/api/mobile-apps/${currentId}`,{
            category : input.category,
            description : input.description,
            image_url : input.image_url,
            is_android_app : input.is_android_app,
            is_ios_app : input.is_ios_app,
            name : input.name,
            price : input.price,
            rating : input.rating,
            release_year : input.release_year,
            size : input.size,
        }).then((e) => {
            setFetchStatus(true)
            navigate('/manage-data')
        })
    }

    const functionEdit = (idMobile) => {
            axios.get(`https://backendexample.sanbercloud.com/api/mobile-apps/${idMobile}`)
            .then((result) => {
                let fetchResult = result.data
                setInput(
                    {
                        category: fetchResult.category,
                        description: fetchResult.description,
                        id: fetchResult.id,
                        image_url: fetchResult.image_url,
                        is_android_app: fetchResult.is_android_app,
                        is_ios_app: fetchResult.is_ios_app,
                        name: fetchResult.name,
                        price: fetchResult.price,
                        rating: fetchResult.rating,
                        release_year: fetchResult.release_year,
                        size: fetchResult.size,
                    }

                )

                setCurrentId(fetchResult.id)
            })
    }
 
    const functionDelete = (idMobile) => {
        axios.delete(`https://backendexample.sanbercloud.com/api/mobile-apps/${idMobile}`)
        .then(() => {
            setFetchStatus(true)
        })
    }

    const handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        let platform = ["is_android_app", "is_ios_app"]

        if (platform.indexOf(name) === -1) {
            setInput({ ...input, [name]: value })
        } else {
            setInput({ ...input, [name]: !input[name] })
        }

    }

    const handleText = (params, max) => {
        if(params === undefined){
            return ""
        }else{
            return params.slice(0, max) + "..."
        }
    }

    const functions = {
        functionDelete,
        functionEdit,
        fetchData,
        handleChange,
        functionSubmit,
        functionUpdate,
        handleText
    }
    let state = {
        data,
        setData,
        input,
        setInput,
        fetchStatus,
        setFetchStatus,
        currentId,
        setCurrentId,
      };
    
    return (
        <GlobalContext.Provider value={{
            data,
            setData,
            fetchStatus,
            setFetchStatus,
            searchStatus, 
            setSearchStatus,
            currentId,
            setCurrentId,
            input,
            setInput,
            functions,
            state,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )


}