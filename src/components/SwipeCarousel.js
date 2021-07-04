import { useEffect, useRef } from 'react'
const SwipeCarousel = (props) => {

    const carouselRef = useRef()

    const doSwipe = (event, direction, distance, duration, fingerCount, fingerData) => {
        console.log("doing swipeeeeeeee")
        alert("swipe!")
    }

    useEffect(() => {
    }, [])

    return (
        <div className="container bg-dark text-warning">
            <div id="swiper" className="carousel slide" data-bs-ride="carousel" data-bs-interval="false" ref={carouselRef}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="list-group">
                            <button className="btn list-group-item" onClick={()=>{alert('clicked do this')}}>
                                Do this
                            </button>
                            <button className="btn list-group-item">
                                Do that
                            </button>
                            <button className="btn list-group-item">
                                Do the other
                            </button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <h1>Slide2</h1>
                    </div>
                    <div className="carousel-item">
                        <h1>Slide3</h1>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#swiper" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#swiper" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default SwipeCarousel
