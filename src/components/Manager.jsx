import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("password");
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])



    const showPassword = async (params) => {
        passwordref.current.type = "text"
        if (ref.current.src.includes("icons/cross.png")) {
            ref.current.src = "icons/password.png"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "icons/cross.png";
            passwordref.current.type = "text"
        }

    }

    const savePassword = () => {
        // console.log(form)
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log(passwordArray, form)
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Credentials Not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }



    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete?")
        if (c) {
            let k = passwordArray.filter(item => {
                return item.id !== id
            });
            setPasswordArray(k)
            localStorage.setItem("password", JSON.stringify(k))
        }
        toast('Password Deleted Sucessfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });



    }

    const editPassword = (id) => {
        console.log("editing password with id", id)
        let t = passwordArray.filter(item => item.id === id)
        setform(t[0])
        let z = passwordArray.filter(item => {
            return item.id !== id
        })
        setPasswordArray(z)


    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce" />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className=" p-2 md:p-0 md:mycontainer min-h-[89vh]">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-700'> &lt;</span>
                    CRed
                    <span className='text-green-700'> OP/&gt;</span></h1>
                <p className='text-green-900 text-xl text-center'>Your own Personal Credential Manager</p>
                <div className='text-black flex flex-col p-4 gap-5'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 px-4 py-1 hover:border hover:border-purple-500' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full w-full border border-green-500 p-4 py-1 hover:border hover:border-purple-500' type="text" name='username' id='username' />
                        <div className='relative w-1/2'>
                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full w-full border border-green-500 p-4 py-1 hover:border hover:border-purple-500' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}><img ref={ref} className='p-1 h-7' src="icons/password.png" alt="password" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex gap-2 justify-center items-center mx-auto bg-green-600 w-fit rounded-full p-2 px-4 hover:font-bold hover:bg-green-500 hover:border-2 hover:border-green-900 border-2 border-green-900'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>Save</button>
                </div>
                <div className="passwords">
                    <h2 className='text-2xl font-bold py-3'>Your Credentials</h2>
                    {passwordArray.length == 0 && <div className='flex justify-center items-center font-bold text-2xl text-green-700 mt-10'>No Credentials to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-xl overflow-hidden">
                            <thead className='bg-green-900 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center hover:font-bold hover:underline'><div className='flex items-center justify-center'><a href={item.site} target='_blank'>{item.site}</a>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}><lord-icon
                                                style={{ "width": "25px", "height": "25px" }} src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover"
                                            >
                                            </lord-icon></div></div></td>
                                        <td className='py-2 border border-white text-center'><div className='flex items-center justify-center'><span>{item.username}</span><div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}><lord-icon
                                            style={{ "width": "25px", "height": "25px" }} src="https://cdn.lordicon.com/depeqmsz.json"
                                            trigger="hover"
                                        >
                                        </lord-icon></div></div></td>
                                        <td className='py-2 border border-white text-center'><div className='flex items-center justify-center'><span>{item.password}</span><div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}><lord-icon
                                            style={{ "width": "25px", "height": "25px" }} src="https://cdn.lordicon.com/depeqmsz.json"
                                            trigger="hover"
                                        >
                                        </lord-icon></div></div></td>
                                        <td className='py-2 border border-white text-center'><div className='flex gap-2 items-center justify-center'><span className='cursor-pointer' onClick={() => { editPassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/exymduqj.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}
                                        >
                                        </lord-icon></span><span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}
                                        >
                                        </lord-icon></span></div></td>

                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div >
        </>

    )
}

export default Manager