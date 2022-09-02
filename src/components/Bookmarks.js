/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _, { keysIn } from 'lodash';
import { getFromLS , setToLS} from '../utils/storage';
import {AiFillPlusCircle} from "react-icons/ai";
import {MdOutlineDelete} from 'react-icons/md';
import {FaPencilAlt} from 'react-icons/fa';



const Wrapper = styled.li`
    padding: 48px;
    width: 100%;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #000;
    list-style: none;
    @media screen and (min-width: 620px){
        max-width: 150px;
    }
    
    
`;

const Container = styled.ul`
    display: grid;
    gap: 1rem;
    margin-top: 3rem;
    padding: 10px;
    width: 100%;

    grid-template-columns: repeat(auto-fill,100px);
    grid-template-columns: repeat(auto-fit,100px);
    grid-template-columns: repeat(auto-fit,minmax(200px, 1fr));


`;

const Header = styled.h2`
    display: flex;
    justify-content: space-around;
`;
const Center = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
// eslint-disable-next-line import/no-anonymous-default-export
const Bookmark = (props) => {
    const bookmarkFromLS = getFromLS('all-bookmarks');
    const [data, setData] = useState(bookmarkFromLS.data);
    const [bookmark, setbookmark] = useState([]);
    const [deleteMode, setDeleteMode] = useState(props.deleteMode);
    const [editMode, setEditMode] = useState(props.editMode);
    const [editkey, setEditKey] = useState();

    useEffect(() => {
        setbookmark(_.keys(data));
        // console.log(data)
        // console.log(bookmark)
        setToLS('all-bookmarks', {'data': data });
    }, [data]);

    useEffect(()=> {
        setDeleteMode(props.deleteMode)
        setEditMode(props.editMode)
    },[props.deleteMode , props.editMode])

    useEffect(() => {
        props.newBookmark &&
            updateBookmarkcard(props.newBookmark);
    }, [props.newBookmark])

    const updateBookmarkcard = Bkm => {
        let key = _.keys(data);
        let index = parseInt(key[key.length - 1]);
        if(index) {key = index + 1} else {key = 1}
        Bkm['id'] = key;
        const updated = {...data, [key]:Bkm};
        setData(updated);
    }


    const editBookmarkcard = Bkm => {
        // const key = _.keys(data).length + 1;
        // Bkm['id'] = key;
        let updated = data
        console.log(data)
        let key = editkey;
        console.log(key)
        Bkm['id'] = key;
        updated[key] = Bkm
        console.log(updated)

        setData(updated);
        setbookmark(_.keys(data));

        setToLS('all-bookmarks', {'data': data });

    }

    useEffect(() => {
        props.editedBookmark &&
        editBookmarkcard(props.editedBookmark);
    }, [props.editedBookmark])



    const deleteBookmark = key => {
        // console.log(data)
        var copyData = data

        var filtered = _.without(bookmark, key.toString());
        setbookmark(filtered)

        // console.log(bookmark)
        delete copyData[key]
        setData(copyData)

        setToLS('all-bookmarks', {'data': data });

    }







    let url = "https://google.com";
    const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=64`


    const changeUrl = link => {
        if (link.indexOf("http://") === 0 || link.indexOf("https://") === 0) {
            window.location.assign(link);
        }
        else{
            window.location.assign(`https://${link}`);
        }
    }


    const editBookmarkSetData = (e) =>{
        setEditKey(e);
        props.editBookmarkPopup();
    }

    const BookmarkCard = props => {
        return(
            <Center>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

<div>

                <div className="relative">
            <Wrapper style={{backgroundColor: `${({ theme }) => theme.colors.body}`, 
                    color: `${({ theme }) => theme.colors.text}`, 
                    fontFamily: `${({ theme }) => theme.font}`}}>
                        
                        {deleteMode ? 
                        <button onClick={() => deleteBookmark(props.id)} className="z-10 block absolute p-1 top-1 right-3 text-black hover:text-white hover:bg-black bg-white border-2 border-white rounded-full">
                        <MdOutlineDelete size="16px"/>
                        </button> : ""
                        }

                        {editMode ? 
                        <button onClick={() => props.editBookmarkPopup(props.id)} className="z-10 block absolute p-1 top-1 right-3 text-black hover:text-white hover:bg-black bg-white border-2 border-white rounded-full">
                        <FaPencilAlt size="16px"/>
                        </button> : ""
                        }
                    <button className=" p-0 outline-none text-inherit bg-inherit" onClick={() => changeUrl(props.bookmark.link)}>
                    <Header><img src = {`https://s2.googleusercontent.com/s2/favicons?domain=${props.bookmark.link}&sz=64`} alt={"no icon"} width={"64px"}></img></Header>             
                    </button>
            </Wrapper>
                        </div>
                    <Header>{props.bookmark.name}</Header>
                        </div>
            </Center>
        )

    }
    return (
        <div>
            <Center>
                
                <Container>
                {
                    bookmark.length > 0 && 
                    bookmark.map(theme =>(
                        <BookmarkCard bookmark={data[theme]} editBookmarkPopup={editBookmarkSetData}  id={data[theme].id} key={data[theme].id} />
                        ))
                    }
                    <Center>
                    <a onClick={() => props.addBookmark()}>
                        <Wrapper style={{
                            background: "linear-gradient(158deg, rgb(2, 106, 122) 0.00%, rgb(242, 78, 163) 100.00%)",
                            color: "rgb(235, 219, 245)", 
                            fontFamily: `${({ theme }) => theme.font}`}}>
                                <Header><AiFillPlusCircle size="64x"/></Header>             
                        </Wrapper>
                                <Header>Add</Header>
                    </a>
                    </Center>
                </Container>
            </Center>
        </div>
    )
}

export default Bookmark;