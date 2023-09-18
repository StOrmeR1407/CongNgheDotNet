using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SrORy
{
    public partial class api : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];

            //tùy theo action mà gọi hàm tương ứng để xử lý
            switch (action)
            {
                case "them_user":
                    them_user();
                    break;               
            }
        }

        const string cnStr = @"Data Source=STORMER;Initial Catalog=Story;Integrated Security=True";
        class User
        {
            public string name_user,email_user,password_user, birthday, gender;
        }
        class Data_them_user
        {
            public bool ok; //true/false => báo thêm thành công hay ko
            public string error; //nếu có lỗi thì chi tiết báo lỗi ở đây
        }
        void them_user()
        {
            Data_them_user R = new Data_them_user();
            try
            {
                //lấy 4 thông số gửi lên
                //gọi sql để thêm kh mới này
                //nếu ok thì gửi về ok=1
                //ngược lại ok=0 kèm error=báo lỗi chi tiết

                User k = new User();
                k.name_user = Request["name_user"];
                k.email_user = Request["email_user"];
                k.password_user = Request["password_user"];
                k.birthday = Request["birthday"];
                k.gender = Request["gender"];

                //gọi sp_ để insert vào

                SqlConnection cn = new SqlConnection(cnStr);
                cn.Open();
                string sql = "SP_user";
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@action", SqlDbType.NVarChar, 50).Value = "them_user";
                cm.Parameters.Add("@name_user", SqlDbType.NVarChar, 50).Value = k.name_user;
                cm.Parameters.Add("@email_user", SqlDbType.NVarChar, 50).Value = k.email_user;
                cm.Parameters.Add("@password_user", SqlDbType.NVarChar, 50).Value = k.password_user;
                cm.Parameters.Add("@birthday", SqlDbType.Date).Value = k.birthday;
                cm.Parameters.Add("@gender", SqlDbType.NVarChar, 10).Value = k.gender;
                //loại action này ko trả về dữ liệu dạng bảng
                //mà trả về số bản ghi bị tác động
                int n = cm.ExecuteNonQuery();

                if (n > 0)
                {
                    //thêm đc 1 bản ghi thành công thì n==1
                    R.ok = true;
                }
                else
                {
                    //n<=0 là sai rồi
                    R.ok = false;
                    R.error = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.error = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
    }
}