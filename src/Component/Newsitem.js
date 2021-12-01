import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class Newsitem extends Component {
    render() {
        let { title, description, imgurl, url, author, publish, source} = this.props;
        return (
            <div>
                <div className="card">
                <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger" style={{top:"15px",zIndex:"1",left:"84%"}}>
                            {source}
                        </span>
                    <img src={imgurl ? imgurl : "https://www.cartoq.com/wp-content/uploads/2021/11/huawei-electric-car-featured.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body" >
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">Published by {author} at {publish}</small></p>
                        <Link to={url} target="_blank" className="btn btn-sm btn-primary">Read full news</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
