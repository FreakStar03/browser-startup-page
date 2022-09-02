/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { useState , useRef , useEffect} from 'react'

export default function SearcBox(props) {
   const [searchengine , setSearchEngine] = useState('Google.com/search?q=');
   const [tab , setTab] = useState('bookmark');
   const [typed , setTyped] = useState(null);
   const [scanEvent , setScanEvent] = useState(true);
   const createRef = useRef(null);
   const setSE = e => setSearchEngine(e);
   const setTabFunc = e => setTab(e);
   let handleChange = (event) => {
    // console.log(typed)
    setTyped(event.target.value);
  }  
  useEffect(()=>{
    props.changeTab(tab)
  }, [tab])

  useEffect(()=>{
    setScanEvent(props.toggleEventScanner)
  }, [props.toggleEventScanner])

  useEffect(() => {
    console.log(typed)
    const keyDownHandler = event => {
    createRef.current.focus();

      console.log('User pressed: ', event.key);
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
    }
    };

    if (scanEvent){ document.addEventListener('keydown', keyDownHandler) }
    else {document.removeEventListener('keydown', keyDownHandler)}
    
    const handleSubmit =()=>{
        props.clicked({"text" : typed , "engine": searchengine});

    }
    return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }, [props, searchengine, typed, scanEvent]);


   return (
    <div className="flex justify-center items-center">
    <div className="center p-4 w-96 rounded-md">
        <div className="flex justify-evenly space-x-2  items-center">
        <a onClick={() => setSE('Google.com/search?q=')}  className={ searchengine === 'Google.com/search?q=' ? "text-2xl font-bold" : "text-lg hover:font-bold"}>Google</a>
        <a onClick={() => setSE('DuckDuckGo.com/')}  className={ searchengine === 'DuckDuckGo.com/' ? "text-2xl font-bold" : "text-lg hover:font-bold"}>DuckDuckGo</a>
        <a onClick={() => setSE('Youtube.com/search?q=')}  className={ searchengine === 'Youtube.com/search?q=' ? "text-2xl font-bold" : "text-lg hover:font-bold"}>Youtube</a>
        </div>
        <div className="mt-5 mb-2 border-2 py-1 px-3 flex justify-between rounde-md rounded-md">
            <input ref={createRef}  onChange={handleChange} className="flex-grow outline-none text-gray-600 focus:text-blue-600" type="text" placeholder="Search..." />
            <span onClick={() => props.clicked({"text" : typed , "engine": searchengine})}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-blue-400 transition duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </span>
        </div>

        {/* tab */}
        <div className="flex pt-8 justify-evenly space-x-2  items-center">
        <a onClick={() => setTabFunc('theme')}  className={ tab === 'theme' ? "text-lg font-bold" : "text-base "}>Theme</a>
        <a onClick={() => setTabFunc('bookmark')}  className={ tab === 'bookmark' ? "text-lg font-bold" : "text-base "}>Bookmarks</a>
        {/* <a onClick={() => setTabFunc('recent')}  className={ tab === 'recent' ? "text-lg font-bold" : "text-base "}>Recent</a> */}
        </div>
    </div>
    </div>
  )
}
