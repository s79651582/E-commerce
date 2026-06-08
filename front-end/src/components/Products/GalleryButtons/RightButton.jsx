import React from 'react'
import prev from '../../../assets/prev.png'


const RightButton = ( onClick, onDisable ) => {
    return (
        <img
            src={prev}
            alt=""
            onClick={onClick}
            onDisable={onDisable}
            height="35px"
            width="35px"
            style={{ float: "right", marginTop: "220px", cursor: "pointer" }}
        />
    )
}


export default RightButton