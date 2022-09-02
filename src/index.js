import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as themes from './theme/scheme.json';
import * as bookmarks from './data/bookmark.json';
import { setToLS ,getFromLS  } from './utils/storage';

const Index = () => {
  if(getFromLS('all-themes')){
  }else{
  setToLS('all-themes', themes.default);
  }

  
  if(getFromLS('all-bookmarks')){
  }else{
    setToLS('all-bookmarks', bookmarks.default);
  }

  return(
    <App />
  )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);


