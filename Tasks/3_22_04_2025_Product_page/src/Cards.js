import "./cards.css"

function Card(props){
    let prod=props.obj
    return(
        <div className="card">
            <div className="img">
                <img src={prod.image}/>
            </div>
            <h1>{prod.title}</h1>
            <p className="desc">{prod.description}</p>
            <p>Price:{prod.price}</p>
            <p>Rating:{prod.rating.rate}</p>
            <button>AddCart</button>
        </div>
    )
}
export default Card