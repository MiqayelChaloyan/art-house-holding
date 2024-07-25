import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const reviewData = [
  {
    id: 1,
    imgSrc: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, saepe provident dolorem a quaerat quo error facere nihil deleniti eligendi ipsum adipisci, fugit, architecto amet asperiores doloremque deserunt eum nemo.',
    name: 'Marnie Lotter',
  },
  {
    id: 2,
    imgSrc: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, saepe provident dolorem a quaerat quo error facere nihil deleniti eligendi ipsum adipisci, fugit, architecto amet asperiores doloremque deserunt eum nemo.',
    name: 'Marnie Lotter',
  },
  {
    id: 3,
    imgSrc: 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, saepe provident dolorem a quaerat quo error facere nihil deleniti eligendi ipsum adipisci, fugit, architecto amet asperiores doloremque deserunt eum nemo.',
    name: 'Marnie Lotter',
  },
];

const ReviewsSlider = () => {
  return (
    <section className="containers">
      <div className="testimonial mySwiper">
        <Swiper
          slidesPerView={1}
          grabCursor={true}
          loop={true}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Navigation, Pagination]}
          className="swiper-wrapper"
        >
          {reviewData.map((review) => (
            <SwiperSlide key={review.id} className="slide swiper-slide">
              <img src={review.imgSrc} alt="" className="image" />
              <p>{review.text}</p>
              <i className="bx bxs-quote-alt-left quote-icon"></i>
              <div className="details">
                <span className="name">{review.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-next nav-btn">
          <MdKeyboardArrowRight color='white' size={20} />
        </div>
        <div className="swiper-button-prev nav-btn">
          <MdKeyboardArrowLeft color='white' size={20} />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default ReviewsSlider;
