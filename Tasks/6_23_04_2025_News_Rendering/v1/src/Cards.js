function Card(props){
    
    return(
        <div className="card">
            <div className="img">
                <img src={props.obj.urlToImage}/>
            </div>
            <h1>Heading: {props.obj.title}</h1>
            <p className="desc">{props.obj.description}</p>
            <p>{props.obj.content}</p>
            <br></br>
            <p className="Aut">Author:{props.obj.author}</p>
        </div>
    )
}
export default Card

