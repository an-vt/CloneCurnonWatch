import React from 'react';
import PropTypes from 'prop-types';

Caipaign.propTypes = {

};

function Caipaign(props) {
    return (
        <div className="campaign">
            <div className="campaign__img">
                <div className="grid wide">
                    <div className="row campaign-row">
                        <div className="col campaign__content">
                            <p className="campaign__hastag">#whynotgirls</p>
                            <h2 className="campaign__heading">CHANGMAKEUP x CURNON</h2>
                            <p className="campaign__subheading">Những cô gái thời đại mới</p>
                            <a href="" className="campaign__link">KHÁM PHÁ BỘ SƯU TẬP</a>
                            <a href="https://www.youtube.com/watch?v=l0dCd_9_5Yo" className="campaign__link-video">
                                <span className="campaign__link-video-text">XEM VIDEO</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={10} height={16} viewBox="0 0 10 16" fill="none">
                                    <path d="M2.00781 15.1406L9.21484 8.51953C9.41016 8.36328 9.50781 8.14844 9.50781 7.875C9.50781 7.60156 9.41016 7.38672 9.21484 7.23047C9.21484 7.23047 9.19531 7.23047 9.15625 7.23047C9.15625 7.19141 9.15625 7.17188 9.15625 7.17188L2.00781 0.609375C1.53906 0.179688 1.05078 0.179688 0.542969 0.609375V0.667969C0.347656 0.824219 0.25 1.03906 0.25 1.3125V14.4375C0.25 14.7109 0.367188 14.9453 0.601562 15.1406H0.542969C1.05078 15.5703 1.53906 15.5703 2.00781 15.1406Z" fill="white" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Caipaign;