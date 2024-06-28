export const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    slidesToShow: 9,
    slidesToScroll: 3,
    speed: 300,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2.5,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }
    ]
};
