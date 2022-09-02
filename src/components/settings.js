import React from 'react'
import {FaPencilAlt , FaCloudDownloadAlt ,FaCloudUploadAlt} from 'react-icons/fa';
import {MdOutlineDelete} from 'react-icons/md';
import {downloadjson , uploadJson} from '../data/downloadjson'

export const Settings = (props) => {
  return (
    <div className=" fixed z-40 w-fit h-fit md:top-5 bottom-5 right-5">
<div class="flex items-center -space-x-4 hover:space-x-1">
<button
  onClick={uploadJson}
    class="z-10 block p-4 text-green-700 bg-green-100 border-2 border-white rounded-full transition-all active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
    type="button"
  >
<FaCloudUploadAlt size="16px"/>
  </button>

  <button
  onClick={downloadjson}
  data-hover="Download Backup"
    class="z-10 block p-4 text-yellow-700 bg-yellow-100 border-2 border-white rounded-full transition-all active:bg-yellow-50 hover:scale-110 focus:outline-none focus:ring"
    type="button"
  >
<FaCloudDownloadAlt size="16px"/>
  </button>

  <button
  onClick={props.deleteMode}
    class="z-20 block p-4 text-blue-700 bg-blue-100 border-2 border-white rounded-full transition-all active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
    type="button"
  >
<MdOutlineDelete size="16px"/>
  </button>

  <button
  onClick={props.editMode}
    class="z-30 block p-4 text-red-700 bg-red-100 border-2 border-white rounded-full transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
    type="button"
  >
<FaPencilAlt size="16px"/>
  </button>
</div>

    </div>



  )
}
