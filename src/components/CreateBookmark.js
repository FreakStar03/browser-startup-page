import React, { useState, useEffect } from 'react'

export default function CreateBookmark(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");


    const onChangeName = (e) =>{
        setName(e)
    }
    const onChangeUrl = (e) =>{
        setUrl(e)
    }
    useEffect(() => {
        setShow(props.open);
    }, [props.open]);

    const closeDialog = () => {
        setShow(false);
        props.callback()
    }

  return (
    <>
    {show ? 
        <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
        <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center rounded-lg text-left overflow-hidden shadow-2xl border transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label>Name</label>
                <input type="text" class="w-full border rounded-md p-2 mt-2 mb-3"  onChange={(e) => onChangeName(e.target.value)}/>
                <label>Url</label>
                <input type="text" class="w-full border  rounded-md  p-2 mt-2 mb-3"  onChange={(e) => onChangeUrl(e.target.value)}/>
            </div>
            <div class=" px-4 py-3 text-right">
                <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={ closeDialog }><i class="fas fa-times"></i> Cancel</button>
                <button type="button" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2" onClick={ () => props.create({ "name": name, "link": url }) }><i class="fas fa-plus"></i> Create</button>
            </div>
            </div>
        </div>
        </div>
        : ""    }
    </>
  )
}
