import React from "react";
import Slider from "react-slick";

import "./Slider.scss";
import {sliderImgs} from '../../utils/images'

const HeaderSlider = () => {
	let settings = {
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div>
			<div className="slider">
				<div className="container">
					<div className="slider-content overflow-x-hidden">
						<Slider {...settings}>
							<div className="slider-item">
								<img src={sliderImgs[0]} alt="" />
							</div>
							<div className="slider-item">
								<img src={sliderImgs[1]} alt="" />
							</div>
						</Slider>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderSlider;
