/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from 'lodash';
import {useTheme} from '../theme/useTheme';
import { getFromLS , setToLS} from '../utils/storage';
const ThemedButton = styled.button`
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    width: 100%;
    cursor: pointer;
`;

const Wrapper = styled.li`
    padding: 48px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #000;
    list-style: none;
`;

const Container = styled.ul`
    display: grid;
    gap: 1rem;
    margin-top: 3rem;
    padding: 10px;

    grid-template-columns: repeat(auto-fill,100px);
    grid-template-columns: repeat(auto-fit,100px);
    grid-template-columns: repeat(auto-fit,minmax(200px, 1fr));


`;

// const Header = styled.h2`
//     display: flex;
//     justify-content: space-around;
// `;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const themesFromStore = getFromLS('all-themes');
    const [data, setData] = useState(themesFromStore.data);
    const [themes, setThemes] = useState([]);
    const {setMode} = useTheme();

    const themeSwitcher = selectedTheme => {
        console.log(selectedTheme);
        setMode(selectedTheme);
        props.setter(selectedTheme);
        // setToLS('all-themes', data.default);
    };
    
    useEffect(() => {
        setThemes(_.keys(data));
        console.log(data)
        console.log(themes)
        setToLS('all-themes', {'data': data });
    }, [data]);

    useEffect(() => {
        props.newTheme &&
            updateThemeCard(props.newTheme);
    }, [props.newTheme])

    const updateThemeCard = theme => {
        const key = _.keys(theme)[0];
        const updated = {...data, [key]:theme[key]};
        setData(updated);
        
    }

    const ThemeCard = props => {
        return(
            <Wrapper style={{backgroundColor: `${data[_.camelCase(props.theme.name)].colors.body}`, 
                    color: `${data[_.camelCase(props.theme.name)].colors.text}`, 
                    fontFamily: `${data[_.camelCase(props.theme.name)].font}`}}>
                    <span>Click on the button to set this theme</span>
                <ThemedButton onClick={ (theme) => themeSwitcher(props.theme) }
                    style={{backgroundColor: `${data[_.camelCase(props.theme.name)].colors.button.background}`, 
                    color: `${data[_.camelCase(props.theme.name)].colors.button.text}`,
                    fontFamily: `${data[_.camelCase(props.theme.name)].font}`}}>
                    {props.theme.name}
                </ThemedButton>
            </Wrapper>
        )
    }

    return (
        <div>
            <Container>
            {
                themes.length > 0 && 
                    themes.map(theme =>(
                        <ThemeCard theme={data[theme]} key={data[theme].id} />
                    ))
            }
            <Wrapper style={{
                    background: "linear-gradient(158deg, rgb(2, 106, 122) 0.00%, rgb(242, 78, 163) 100.00%)",
                    color: "rgb(235, 219, 245)", 
                    fontFamily: "Abel"}}>
                    <span>Click on the button to create new theme</span>
                <ThemedButton onClick={ () => props.addTheme() }
                    style={{backgroundColor: "rgb(235, 219, 245)", 
                    color: "rgb(106, 27, 154)",
                    fontFamily: "Abel"}}>
                    Create Theme
                </ThemedButton>
            </Wrapper>
            </Container>
        </div>
    )
}