import React, { useState, useEffect } from 'react'
import viewSearchProductsHook from '../products/view-search-products-hook';

const NavbarSearchHook = () => {
    const [ items, pageCount, getPage, getProduct ] = viewSearchProductsHook()

    const [searchWord, setSearchWord] = useState('');

    // user write search word
    const OnChangeSearch = (e) => {
        //console.log(e.target.value)
        localStorage.setItem("searchWord", e.target.value);
        setSearchWord(e.target.value);
    }

    useEffect(()=>{
        setTimeout(() => {
            getProduct();
        }, 1000);
        
    }, [searchWord])


    return [OnChangeSearch, searchWord];

}

export default NavbarSearchHook