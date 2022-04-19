import React from 'react'

import './About.css'
import { About } from '../../assets/images'

export default function () {
  return (
    <div className="about wrap-content">
      <div className="container">
        <h3>ABOUT REI</h3>
        <img src={About} alt="" />
        <div className="about-article">
          Hiện nay, nhu cầu đi du lịch cùng với gia đình, bạn bè và người thân đang ngày càng tăng
          cao. Những website đặt tour du lịch có vai trò quan trọng giúp người dùng tìm kiếm thông
          tin và đặt được một tour du lịch chất lượng và giá cả phải chăng nhất. Bạn đang lên kế
          hoạch về một chuyến du lịch nhưng lại không biết nên đặt tour ở đâu? Để có thể tìm kiếm
          được những website online đặt tour du lịch không phải là dễ dàng gì.
        </div>
        <div className="about-article">
          Rei là một đơn vị hoạt động kinh doanh trong lĩnh vực truyền thông và du lịch tại Việt
          Nam. Kể từ khi thành lập tới giờ, công ty Rei đã tạo cho mình những bước tiến vượt bậc.
          Đội ngũ nhân viên của Rei không chỉ giỏi mà còn đam mê, nhiệt tình được đào tạo trong nước
          và ngoài nước. Bên cạnh đó, Rei có nhiều hướng dẫn viên có nhiều năm kinh nghiệm trong
          lĩnh vực du lịch.Ngoài các dịch vụ như đặt visa, đặt vé máy bay, thuê xe du lịch, đặt nhà
          hàng, khách sạn được công ty thực hiện một cách chuyên nghiệp, đảm bảo luôn đặt lợi ích
          của khách hàng lên đầu chắc chắn sẽ không khiến bạn phải thất vọng.
        </div>
        <div className="about-article">
          <strong>Website Rei nổi tiếng với những cuộc thi thú vị</strong> mang đến cho giới trẻ có
          nhiều cơ hội trải ngiệm và khám phá nhiều vùng đất mới trên thế giới. Một số cuộc thi hiện
          nay đang được nhiều người săn đón phải kể đến “chương trình vào hạ tỏa nắng yêu thương với
          giải thưởng như tặng 1000 vé trại hè, 5000 quà tặng gia đình và ưu đãi dành cho mỗi tour
          lên đến 10 triệu đồng.
        </div>
      </div>
    </div>
  )
}
