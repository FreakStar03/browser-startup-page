/* eslint-disable react-hooks/exhaustive-deps */
// 1: Import
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import {useTheme} from './theme/useTheme';
import ThemeSelector from './components/ThemeSelector';
import SearcBox from './components/SearcBox';
import Dialog from './components/Dialog';
import CreateThemeContent from './components/createCustomTheme';
import Bookmark from './components/Bookmarks';
import CreateBookmark from './components/CreateBookmark';

import { Settings } from './components/settings';
// 2: Create a cotainer
const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App() {
  // 3: Get the selected theme, font list, etc.
  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [tab , setTab] = useState('bookmark');
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog2, setShowDialog2] = useState(false);
  const [showDialog3, setShowDialog3] = useState(false);
  const [newTheme, setNewTheme] = useState();
  const [newBookmark, setNewBookmark] = useState();
  const [editedBookmark, setEditedBookmark] = useState();
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const manageDialog = () => {
    setShowDialog(!showDialog);
  }
  const manageDialog2 = () => {
    setShowDialog2(!showDialog2);
  }
  const manageDialog3 = () => {
    setShowDialog3(!showDialog3);
  }

  const createTheme = newTheme => {
    console.log(newTheme);
    setShowDialog(false);
    setNewTheme(newTheme);
  }

  const createBookmark = newBkM => {
    console.log(newBkM);
    setShowDialog2(false);
    setNewBookmark(newBkM);
  }

  const editBookmark = newBkM => {
    console.log(newBkM);
    setShowDialog3(false);
    setEditedBookmark(newBkM);
  }

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });
  const search = (e) => {
    window.location.href = "https://" +  e.engine + e.text
  }
  const changeTab = (e) => setTab(e);

  const checkforDialog = () => {
    if (showDialog || showDialog2 || showDialog3){
      return false
    } else {
      return true
    }
  }
  // 5: Render if the theme is loaded.

 const toggleDeleteMode = () => {
  setEditMode(false)
  setDeleteMode(!deleteMode)
}
 const toggleEditMode = () => {
  setDeleteMode(false)
  setEditMode(!editMode)
}

  return (
    <>
    <Settings  deleteMode={toggleDeleteMode} editMode={toggleEditMode}/>
    {
      themeLoaded && <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles/>
        <Container style={{fontFamily: selectedTheme.font}}>

          <SearcBox clicked={(e) => search(e)} toggleEventScanner={ checkforDialog } changeTab={(e) => changeTab(e)} />

{
  tab === 'theme' ? <ThemeSelector setter={ setSelectedTheme } newTheme={ newTheme } addTheme={manageDialog} /> : ''
}
{
  tab === 'bookmark' ? <Bookmark deleteMode={deleteMode} editedBookmark={editedBookmark} editMode={editMode} newBookmark={ newBookmark }  addBookmark={manageDialog2} editBookmarkPopup={manageDialog3} /> : ''
}
        </Container>

        <Dialog 
            header="Create a Theme"
            body={ <CreateThemeContent create={ createTheme }/> }
            open={ showDialog } 
            callback = { manageDialog }
        />


        {/* bookmark */}

        <CreateBookmark
          create={ createBookmark }
          open={ showDialog2 }    
          callback = { manageDialog2 }
        />

        <CreateBookmark
          create={ editBookmark }
          open={ showDialog3 }    
          callback = { manageDialog3 }
        />
      </ThemeProvider>
    }
    </>
  );
}

export default App;