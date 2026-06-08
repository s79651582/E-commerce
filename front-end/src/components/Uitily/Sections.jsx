// SubTiltle.js
import { Link } from 'react-router-dom';
import './style/NavbarLogin.css';

const Sections = ( { title, btntitle, pathText } )=> {

    return(
        <div className="d-flex justify-content-between pt-4">
            <div className="sub-tile">{title}</div>
            {btntitle ? (
                <Link  to={`${pathText}`} style={{ textDecoration: 'none' }}>
                    <div className="shopping-now">{btntitle}</div>
                </Link>
            ) : null}
        </div>
    )
}


export default Sections ;