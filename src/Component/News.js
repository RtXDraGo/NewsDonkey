import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            total: 0,
            loading: false
        }
        document.title = `NewsDonkey Today-${this.props.category}`;
    }
    async update() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af183ac4ad884c598249f4a9ae1ae2cf&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parseddata = await data.json();
        this.props.setProgress(70)
        this.setState({
            total: parseddata.totalResults,
            articles: parseddata.articles,
            loading: false
        }
        )
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.update();
    }
    Next = async () => {
        this.setState({ page: this.state.page + 1 })
        this.update();
    }
    Prev = async () => {
        this.setState({ page: this.state.page - 1 })
        this.update();
    }
    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af183ac4ad884c598249f4a9ae1ae2cf&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parseddata = await data.json();
        this.setState({
            total: parseddata.totalResults,
            articles: this.state.articles.concat(parseddata.articles),
        }
        )
      };
    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{ margin: "40px 0px" }}>News Donkey Top headlines from {this.props.category}</h2>
                 {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.total}
                    loader={<Spinner/>}
                >   
                <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 97) : ""} imgurl={element.urlToImage} url={element.url} author={element.author} publish={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
