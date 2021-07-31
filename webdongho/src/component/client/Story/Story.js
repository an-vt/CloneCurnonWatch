import React from 'react';
import PropTypes from 'prop-types';

Story.propTypes = {

};

function Story(props) {
    return (
        <div className="story">
            <div className="grid wide">
                <div className="row">
                    <div className="col story-content">
                        <span className="story-logo">
                            <img src="/imgClient/logo_small-2Xe.svg" alt="" className="story-logo__img" />
                        </span>
                        <h1 className="story-heading">THE STORY OF CURNON</h1>
                        <p className="story-des">Cuối năm 2016, 3 chàng trai đam mê Startup và Đồng hồ quyết định thành
                            lập Curnon,
                            nhưng ngay từ đầu, chúng tôi đã biết rằng: Curnon sinh ra với một sứ mệnh lớn lao hơn,
                            không chỉ dừng lại là một thương hiệu đồng hồ. Chúng tôi muốn mang tới một nguồn cảm
                            hứng,
                            một sự thay đổi về tư duy, về suy nghĩ và chính những cái chúng tôi gọi là trải nghiệm
                            cho người trẻ.
                        </p>
                        <div className="story-picture">
                            <img src="/imgClient/storyLarge-8J9.png" alt="" className="story-img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Story;