import React from 'react'
import next from '../../../assets/next.png'


const LeftButton = ( onClick, onDisable ) => {
    return (
        <img
            src={next}
            alt=""
            onClick={onClick}
            onDisable={onDisable}
            width="35px"
            height="35px"
            style={{ float: "left", marginTop: "220px", cursor: "pointer" }}
        />
    )
}

export default LeftButton