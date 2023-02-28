import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link  , Navigate } from "react-router-dom";

import { shopping_cart } from "../../utils/images";
import { formatPrice } from "../../utils/fn";
import {
	removeFromCart,
	clearCart,
	getCartTotal,
	toggleCartQty,
} from "../../store/cartSlice";
import "./CartPage.scss";

function CartPage() {
	const { carts, itemsCount, totalAmount } = useSelector(state => state.cart);

	const dispatch = useDispatch();

	if (itemsCount === 0) {
		return (
			<div className="container my-5">
				<div className="empty-cart flex justify-center align-center flex-column font-manrope">
					<img src={shopping_cart} alt="" />
					<span className="fw-6 fs-15 text-gray">
						You shopping cart is empty
					</span>
					<Link
						to="/"
						className="shopping-btn bg-orange text-white fw-5"
					>
						Go shopping Now
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="cart bg-whitesmoke">
			<div className="container">
				<div className="cart-ctable">
					<div className="cart-chead bg-white">
						<div className="cart-ctr fw-6 font-manrope fs-15">
							<div className="cart-cth">
								<span className="cart-ctxt">S.N</span>
							</div>
							<div className="cart-cth">
								<span className="cart-ctxt">Product-Image</span>
							</div>
							<div className="cart-cth">
								<span className="cart-ctxt">Product</span>
							</div>
							<div className="cart-cth">
								<span className="cart-ctxt">Unit Price</span>
							</div>
							<div className="cart-cth">
								<span className="cart-ctxt">Quantity</span>
							</div>
							<div className="cart-cth">
								<span className="cart-ctxt">Total Price</span>
							</div>
							<div className="cart-cth">
								<span className="cart-ctxt">Actions</span>
							</div>
						</div>
					</div>

					<div className="cart-cbody bg-white">
						{carts.map((cart, idx) => {
							// console.log(cart);
							return (
								<Link to={`/product/${cart.id}`} className="cart-ctr py-4" key={cart?.id}>
									<div className="cart-ctd">
										<span className="cart-ctxt">
											{idx + 1}
										</span>
									</div>
									<div className="cart-ctd">
										<span className="cart-ctxt">
											
											<img src={cart.thumbnail} alt="" className="thumbnail" />
										</span>
									</div>

									<div className="cart-ctd">
										<span className="cart-ctxt">
											{cart?.title}
										</span>
									</div>
									<div className="cart-ctd">
										<span className="cart-ctxt">
											{formatPrice(cart?.discountedPrice)}
										</span>
									</div>
									<div className="cart-ctd">
										<div className="qty-change flex align-center">
											<button
												type="button"
												className="qty-decrease flex align-center justify-center"
												onClick={(e) =>{
														e.stopPropagation();
														e.preventDefault();
														dispatch(
															toggleCartQty({
																id: cart?.id,
																type: "DEC",
															}),
														)
													}
												}
											>
												<i className="fas fa-minus"></i>
											</button>

											<div className="qty-value flex align-center justify-center">
												{cart?.quantity}
											</div>

											<button
												type="button"
												className="qty-increase flex align-center justify-center"
												onClick={(e) =>{
													e.stopPropagation();
													e.preventDefault();
													dispatch(
														toggleCartQty({
															id: cart?.id,
															type: "INC",
														}),
													)
													}
												}
											>
												<i className="fas fa-plus"></i>
											</button>
										</div>
									</div>

									<div className="cart-ctd">
										<span className="cart-ctxt text-orange fw-5">
											{formatPrice(cart?.totalPrice)}
										</span>
									</div>

									<div className="cart-ctd">
										<button
											type="button"
											className="delete-btn text-dark"
											onClick={(e) =>{
												e.preventDefault()
												dispatch(
													removeFromCart(cart?.id),
												)
											}}
										>
											Delete
										</button>
									</div>
								</Link>
							);
						})}
					</div>

                    <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                        <div className='cart-cfoot-l'>
                        <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4' onClick={() => dispatch(clearCart())}>
                            <i className='fas fa-trash'></i>
                            <span className='mx-1'>Clear Cart</span>
                        </button>
                        </div>

                        <div className='cart-cfoot-r flex flex-column justify-end'>
                        <div className='total-txt flex align-center justify-end'>
                            <div className='font-manrope fw-5'>Total ({itemsCount}) items: </div>
                            <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalAmount)}</span>
                        </div>

                        <button type = "button" className='checkout-btn text-white bg-orange fs-16'>Check Out</button>
                        </div>
                    </div>
				</div>

			</div>
		</div>
	);
}

export default CartPage;
