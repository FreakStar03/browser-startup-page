// import React from 'react'
import { getFromLS , setToLS  } from '../utils/storage';

export const downloadjson = () => {
    let bookmarkFromLS = getFromLS('all-bookmarks');
    let themesFromLS = getFromLS('all-themes');
    
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    

    const file = {
        "bookmarks" : bookmarkFromLS,
        "themes": themesFromLS
    }
    let link = document.createElement('a')
    let bookmark = new File([JSON.stringify(file)], cDate + "-backup.json", {
        type: 'application/json',
      })
    let url1 = URL.createObjectURL(bookmark)      
    link.href = url1
    link.download = bookmark.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url1)


}

export const uploadJson = _ => {    
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {     
       var file = e.target.files[0]; 
       var reader = new FileReader();
       reader.readAsText(file,'UTF-8');
    
       reader.onload = readerEvent => {
          let content = JSON.parse(readerEvent.target.result); 
          let bookmark = content['bookmarks']
          let theme = content['themes']
          
          setToLS('all-bookmarks', bookmark);
          setToLS('all-themes', theme);
          window.location.reload();
       }
    }

    input.click();

}
