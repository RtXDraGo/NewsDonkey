import React,{useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
const News=(props)=>{
    const [articles,setArticles]=useState([])
    const [page,setPage]=useState(1)
    const [total,setTotal]=useState(0)
    const [loading,setLoading]=useState(false)
    // document.title = `NewsDonkey Today-${props.category}`;
    const  update=async()=> {
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=af183ac4ad884c598249f4a9ae1ae2cf&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parseddata = await data.json();
        props.setProgress(70)
        setArticles( parseddata.articles)
        setLoading(false)
        setTotal(parseddata.totalResults)
        props.setProgress(100)
    }
    useEffect(() => {
        update();
    }, [])
    const fetchMoreData = async() => {
        setPage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=af183ac4ad884c598249f4a9ae1ae2cf&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parseddata = await data.json();
        setTotal(parseddata.totalResults)
        setArticles(articles.concat(parseddata.articles))
      };
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{ marginTop: "69px" , marginBottom:"40px"}}>News Donkey Top headlines from {props.category}</h2>
                 {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!==total}
                    loader={<Spinner/>}
                >   
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
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
export default News