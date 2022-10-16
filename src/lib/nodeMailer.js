const nodemailer = require("nodemailer");
const sendMail = async (to, subject, text, html) => {
  let transporter = nodemailer.createTransport({
    // config mail server
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAILACC, //Tài khoản gmail vừa tạ
      pass: process.env.GMAILPASS, //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  let content = "";
  content += `
    <div id=":os" class="a3s aiL ">
      <h5 style="color:#4caf50">Dear anh/chị Nguyễn Đình Hiến,</h5>
      <h5 style="color:#4caf50">
        Bài làm về nhà của anh chị cho buổi số 4 của lớp SQ53B6L1 đã được phản hồi bởi giảng viên
        như sau:
      </h5>

      <p>Feedback:</p>
      <p>a</p>
      <p></p>
      <p>Score: 10</p>

      <a> Anh chị vui lòng kiểm tra tại:</a>
      <a
        href="https://mcivietnam.com/hocvien/homework-list/"
        target="_blank"
        data-saferedirecturl="https://www.google.com/url?q=https://mcivietnam.com/hocvien/homework-list/&amp;source=gmail&amp;ust=1665940268691000&amp;usg=AOvVaw3GksgfEPEsBBweAzQc1IdG"
        >Link</a
      >
      <hr />

      <h5 style="color:red">
        Lưu ý: Đây là EMAIL thông báo từ Hệ thống, Anh Chị vui lòng đừng reply lại email này nhé.
      </h5>
      <h5 style="color:#4caf50">Học viện Đào tạo Lập trình MCI Việt Nam:</h5>
      <h5 style="color:#4caf50">
        Warmest Regards, <br />
        Lecturer: Bùi Thanh Tú<br />
        Email:
        <a href="mailto:buithanhtu110694@gmail.com" target="_blank">buithanhtu110694@gmail.com</a
        ><br />
        MCI Vietnam Consultant Joint Stock Company (MCI) <br />
        Headquarter: No. 5/23/165, Thai Ha Street, Dong Da, Hanoi <br />
        Branch: No. 284A, Nam Ki Khoi Nghia Street, District 3, HCM <br />
      </h5>
      <img
        src="https://ci6.googleusercontent.com/proxy/skEQTeAXjlpYJIpClcm3-0rLIedRC29M_eljd0kTPIWsipSdXECfeSKqrXRJa9fk_Zf0C4rlHauzu7mGz4MN7aDgLaXmSpiX62j5a2Eo07u5O7U_2oe-1IwCit0hb3JcIwnMoPSwSYRhs8gSIYiQz00OFRh_UStY-tlZP0CQdvY0tBM3N0hYE7xXz0TuOGlwNOExisXefEvoExPNLC61GyXmDyqx3eJhh_MqvSasGxtQP9AeimQzZKhYo6VNYnQl50-G1GFHpUFO1JbNtFttrpTQYwkO4GMvuFu8mkExq4Ezg5KvPBrTiTlkBrKGNXNmKmF1WJKH8xcGO5jF_wIzA6HnhWHvM5tyAEWj1l7sQhfrWN417rWWvvIwy7YaOlP2sNjae6-WeUiLCZBfPkO4KLTRZQz51uMnmctA4Yvgm8HTMpWEarP7VGrve3fcFQ21NjpSYp43ezcQ7iFL5VbfsKeUl7q8MNFuRC-E5hhNiDEzKFcbRFVp-lM9uYIzELs5sQCSeEbLYr-WiD2a6GgGw-O06ph4X4FquMy6jU5JTJ82s1oM-NhTNJzHInfCMwn33mo=s0-d-e1-ft#https://u15041485.ct.sendgrid.net/wf/open?upn=ywlrkegYAoh3-2FBq787jHK9I-2FdK28GQiqVrAyiQ5adxSBmFMcnWFe7wn0Wht-2F7mnSjT3dtNf97Zsb-2Bx3vE1Fq-2BDZjc3oPdIvaMcySg4YVbUu0fCvnT-2BjczVpW0R6bpuz4n2HLGy2G6riuNOnVijzj4n18-2FjtYSdnfMGJHf8A-2FK2o7BFvHkkiNpiHKYB41nBNROdk2XuTg7bbvaL08gbHPMi5ZmvSEEZVSSD4Xkb7iLaO6g1jPLxxVDFmDA3N2hjaIZ7URzWMhiwePPm4N4rVlUvXHVPwCvM3-2ByaUgLut-2BW2mHWxAwc2nQA9J5ixRNJ1GoqIR4Glgkrpiw1tL3RPiEoQ-3D-3D"
        alt=""
        width="1"
        height="1"
        border="0"
        style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important"
        class="CToWUd"
        data-bit="iit"
      />
      <div class="yj6qo"></div>
      <div class="adL"></div>
    </div>
  `;
  let mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "NQH-Test nodemailer",
    to,
    subject,
    text, //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
    html: content, //Nội dung html mình đã tạo trên kia :))
  };
  let status = await transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      status = { status: "failed", mess: err };
    } else {
      status = { status: "success", mess: info };
    }
  });
  return status;
};
export default sendMail;
