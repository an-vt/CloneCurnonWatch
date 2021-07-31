import React from 'react';
import PropTypes from 'prop-types';

OurProduct.propTypes = {

};

function OurProduct(props) {
    return (
        <div className="our-prouduct">
            <div className="grid wide">
                <div className="row our-prouduct-row">
                    <div className="col out-product-wrap">
                        <div className="our-product__picture">
                            <img src="/imgClient/bg1-wuA.jpg" alt="" className="our-product__img" />
                        </div>
                        <div className="product-info">
                            <div className="product-info__heading">SẢN PHẨM CỦA CHÚNG TÔI</div>
                            <div className="product-info-list">
                                {/* Cái này xử lí bằng javascript */}
                                <div className="product-info__item ">
                                    <button className="product-info__subheading">
                                        DESIGNED IN VIETNAM
                                        <i className="product-info__icon-normal ti-angle-right" />
                                        <i className="product-info__icon-choose ti-angle-down" />
                                    </button>
                                    <p className="product-info__des">Mỗi chiếc Đồng hồ Curnon được thiết kế phát triển
                                        bởi
                                        chất xám và nỗ lực của những con người Việt Nam,
                                        mang theo cảm hứng và khát khao của tuổi trẻ.</p>
                                </div>
                                <div className="product-info__item product-info__item--choose">
                                    <button className="product-info__subheading">
                                        CHỐNG NƯỚC TIÊU CHUẨN
                                        <i className="product-info__icon-normal ti-angle-right" />
                                        <i className="product-info__icon-choose ti-angle-down" />
                                    </button>
                                    <p className="product-info__des">Mỗi chiếc Đồng hồ Curnon được thiết kế phát triển
                                        bởi
                                        chất xám và nỗ lực của những con người Việt Nam,
                                        mang theo cảm hứng và khát khao của tuổi trẻ.</p>
                                </div>
                                <div className="product-info__item">
                                    <button className="product-info__subheading">
                                        KÍNH SAPPHIRE CHỐNG XƯỚC VƯỢT CHỘI
                                        <i className="product-info__icon-normal ti-angle-right" />
                                        <i className="product-info__icon-choose ti-angle-down" />
                                    </button>
                                    <p className="product-info__des">Mỗi chiếc Đồng hồ Curnon được thiết kế phát triển
                                        bởi
                                        chất xám và nỗ lực của những con người Việt Nam,
                                        mang theo cảm hứng và khát khao của tuổi trẻ.</p>
                                </div>
                                <div className="product-info__item">
                                    <button className="product-info__subheading">
                                        THAY ĐỔI DÂY ĐEO TRONG 30 GIÂY
                                        <i className="product-info__icon-normal ti-angle-right" />
                                        <i className="product-info__icon-choose ti-angle-down" />
                                    </button>
                                    <p className="product-info__des">Mỗi chiếc Đồng hồ Curnon được thiết kế phát triển
                                        bởi
                                        chất xám và nỗ lực của những con người Việt Nam,
                                        mang theo cảm hứng và khát khao của tuổi trẻ.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurProduct;