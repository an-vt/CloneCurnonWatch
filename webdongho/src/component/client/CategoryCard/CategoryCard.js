import React from 'react';
import PropTypes from 'prop-types';

CategoryCard.propTypes = {

};

function CategoryCard(props) {
    return (
        <div className="categoryCard">
            <div className="categoryCard-list">
                <div className="categoryCard-wrap">
                    <div className="categoryCard__item">
                        <a href className="categoryCard__link">
                            <div className="categoryCard__img" style={{ backgroundImage: 'url(/imgClient/dong-ho-nam-category.webp)' }} />
                            <div className="categoryCard__content">
                                <h4 className="categoryCard__heading">ĐỒNG HỒ NAM</h4>
                                <p className="categoryCard__text">MUA NGAY <span className="categoryCard__icon"><i className="ti-arrow-right" /></span></p>
                            </div>
                        </a>
                    </div>
                    <div className="categoryCard__item">
                        <a href className="categoryCard__link">
                            <div className="categoryCard__img" style={{ backgroundImage: 'url(/imgClient/dong-ho-nu-category.webp)' }} />
                            <div className="categoryCard__content">
                                <h4 className="categoryCard__heading">ĐỒNG HỒ NAM</h4>
                                <p className="categoryCard__text">MUA NGAY <span className="categoryCard__icon"><i className="ti-arrow-right" /></span></p>
                            </div>
                        </a>
                    </div>
                    <div className="categoryCard__item">
                        <a href className="categoryCard__link">
                            <div className="categoryCard__img" style={{ backgroundImage: 'url(/imgClient/phu-kien-nam-category.webp)' }} />
                            <div className="categoryCard__content">
                                <h4 className="categoryCard__heading">ĐỒNG HỒ NAM</h4>
                                <p className="categoryCard__text">MUA NGAY <span className="categoryCard__icon"><i className="ti-arrow-right" /></span></p>
                            </div>
                        </a>
                    </div>
                    <div className="categoryCard__item">
                        <a href className="categoryCard__link">
                            <div className="categoryCard__img" style={{ backgroundImage: 'url(/imgClient/phu-kien-nu-category.webp)' }} />
                            <div className="categoryCard__content">
                                <h4 className="categoryCard__heading">ĐỒNG HỒ NAM</h4>
                                <p className="categoryCard__text">MUA NGAY <span className="categoryCard__icon"><i className="ti-arrow-right" /></span></p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;