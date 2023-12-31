﻿using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq.Expressions;
using System.Net;
using System.Net.Mail;
using System.Net.Sockets;
using System.Reflection.Emit;
using System.Text;
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
                case "dangnhap":
                    dangnhap();
                    break;
                case "quen_mk":
                    quen_mk();
                    break;
                case "playmp3":
                    GetFileMp3();
                    break;
                case "check_gmail":
                    check_gmail();
                    break;
                case "check_connect":
                    check_connect();
                    break;
            }
        }        

        const string cnStr = @"Server=STORMER;Database=Story;User id=hocdepzai;Password=hocdepzai";
        class User : Status_Reply
        {
            public int id;
            public string name_user,email_user,password_user, birthday, gender;
        }
        class Status_Reply
        {
            public bool ok; //true/false => báo thêm thành công hay ko
            public string error; //nếu có lỗi thì chi tiết báo lỗi ở đây
        }
        void them_user()
        {
            //Data_them_user R = new Data_them_user();
            User k = new User();
            try
            {
                //lấy 4 thông số gửi lên
                //gọi sql để thêm kh mới này
                //nếu ok thì gửi về ok=1
                //ngược lại ok=0 kèm error=báo lỗi chi tiết
              
                k.name_user = Request["name_user"];
                k.email_user = Request["email_user"];
                k.password_user = Request["password_user"];
                k.birthday = Request["birthday"];
                k.gender = Request["gender"];

                //gọi sp_ để insert vào

                SqlConnection cn = new SqlConnection(cnStr);
                cn.Open();
                string sql = "SP_User";
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
                    k.ok = true;
                }
                else
                {
                    //n<=0 là sai rồi
                    k.ok = false;
                    k.error = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                k.ok = false;
                k.error = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(k);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }

        void dangnhap()
        {
            User k = new User();
            try
            {

                SqlConnection cn = new SqlConnection(cnStr);
                cn.Open();
                string sql = "SP_User";
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@action", SqlDbType.NVarChar, 50).Value = "dangnhap";
                cm.Parameters.Add("@email_user", SqlDbType.NVarChar, 50).Value = Request["email_user"];
                cm.Parameters.Add("@password_user", SqlDbType.NVarChar, 50).Value = Request["password_user"];

                SqlDataReader dr = cm.ExecuteReader();
               
                if (dr.HasRows)
                {
                    k.ok = true;
                    DataTable dt = new DataTable();
                    dt.Load(dr);                    
                    DataRow r = dt.Rows[0];                  
                    k.id = (int)r["id"];
                    k.name_user = r["name_user"].ToString();
                    k.email_user = r["email_user"].ToString();
                    k.password_user = r["password_user"].ToString();
                    k.birthday = r["birthday"].ToString();
                    k.gender = r["gender"].ToString();
                }
                else
                {
                    k.ok = false;
                    k.error = "Lỗi đăng nhập";
                }

                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db               
                dr.Close();
            }
            catch (Exception ex)
            {
                k.ok = false;
                k.error = ex.Message;

            }
            string json = JsonConvert.SerializeObject(k);

            this.Response.Write(json);
        }

        void quen_mk()
        {
            string sub_action = Request["sub_action"];
            Status_Reply status = new Status_Reply();
            try
            {
                switch (sub_action)
                {
                    case "gui_otp":
                        {
                            String random = new Random().Next(0, 1000000).ToString("D6");

                            // Cho otp vào sql nèo
                            SqlConnection cn = new SqlConnection(cnStr);
                            cn.Open();
                            string sql = "SP_User";
                            SqlCommand cm = new SqlCommand(sql, cn);
                            cm.CommandType = CommandType.StoredProcedure;
                            cm.Parameters.Add("@action", SqlDbType.NVarChar, 50).Value = "nhan_otp";
                            cm.Parameters.Add("@email_user", SqlDbType.NVarChar, 50).Value = Request["email_user"];
                            cm.Parameters.Add("@otp", SqlDbType.VarChar, 6).Value = random;

                            int n = cm.ExecuteNonQuery();
                            if (n == 1)
                            {                                
                                status.ok = true;
                            }
                            else
                            {                                
                                status.ok = false;
                                status.error = "Lỗi gì đó nên ko thêm được";
                            }
                            cm.Dispose(); 
                            cn.Close();   
                            cn.Dispose();

                            MailMessage mail = new MailMessage();
                            mail.To.Add(Request["email_user"]);
                            mail.From = new MailAddress("tranhocpro2@gmail.com");
                            mail.Subject = "Password Reset E-mail";

                            mail.Body = "<h1> Reset Password </h1>" +
                                "<p> This is code reset password for you: </p>" +
                                $"<p style='font-weight: bold;'> {random} </p>";
                            mail.IsBodyHtml = true;

                            SmtpClient smtp = new SmtpClient();
                            smtp.Port = 587;
                            smtp.EnableSsl = true;
                            smtp.UseDefaultCredentials = false;
                            smtp.Host = "smtp.gmail.com";
                            smtp.Credentials = new System.Net.NetworkCredential("tranhocpro2@gmail.com", "vwiq lscg zpyl ujjy");
                            smtp.Send(mail);

                            break;
                        }
                    case "xacnhan_otp":
                        {
                            SqlConnection cn = new SqlConnection(cnStr);
                            cn.Open();
                            string sql = "SP_User";
                            SqlCommand cm = new SqlCommand(sql, cn);
                            cm.CommandType = CommandType.StoredProcedure;
                            cm.Parameters.Add("@action", SqlDbType.NVarChar, 50).Value = "xacnhan_otp";
                            cm.Parameters.Add("@email_user", SqlDbType.NVarChar, 50).Value = Request["email_user"];
                            cm.Parameters.Add("@otp", SqlDbType.VarChar, 6).Value = Request["otp"];
                            SqlDataReader dr = cm.ExecuteReader();
                            if (dr.HasRows)
                            {
                                status.ok = true;
                            }
                            else
                            {
                                status.ok = false;
                                status.error = "Sai OTP là cái chắc";
                            }
                            break;
                        }
                    case "doimk_user":
                        {
                            SqlConnection cn = new SqlConnection(cnStr);
                            cn.Open();
                            string sql = "SP_User";
                            SqlCommand cm = new SqlCommand(sql, cn);
                            cm.CommandType = CommandType.StoredProcedure;
                            cm.Parameters.Add("@action", SqlDbType.NVarChar, 50).Value = "doimk_user";
                            cm.Parameters.Add("@email_user", SqlDbType.NVarChar, 50).Value = Request["email_user"];
                            cm.Parameters.Add("@password_user", SqlDbType.NVarChar, 50).Value = Request["password_user"];
                            int dr = cm.ExecuteNonQuery();
                            if (dr == 1)
                            {
                                status.ok = true;
                            }
                            else
                            {
                                status.ok = false;
                                status.error = "Lỗi đổi mật khẩu";
                            }
                            break;
                        }
                }
                    
            }


            catch(Exception ex) {
                status.ok = false;
                status.error = ex.Message;
            }
            String json2 = JsonConvert.SerializeObject(status);
            this.Response.Write(json2);
        }

        void GetFileMp3()
        {
            string a = Request["text"];
            string line = "";
            try
            {
                ProcessStartInfo startInfo = new ProcessStartInfo()
                {
                    WindowStyle = ProcessWindowStyle.Hidden,
                    FileName = @"E:\Python\venv\Scripts\python.exe",  
                    Arguments = $" E:\\Python\\gen_voice.py \"{a}\" ", 
                    RedirectStandardOutput = true,
                    CreateNoWindow = true,
                    UseShellExecute = false
                };

                Process p = Process.Start(startInfo);
                p.WaitForExit();
                
                while (!p.StandardOutput.EndOfStream)
                {
                    line = p.StandardOutput.ReadLine();                                       
                }
                
            }
            catch(Exception ex)
            {
                line = ex.Message;
            }

            this.Response.Write(line);
        }

        void check_gmail()
        {           
            string mail = Request["gmail"];
            int StatusCode;
            Status_Reply status = new Status_Reply();
            try
            {
                string ResponseString;
                string domain = mail.Split('@')[1];
                string mail_server = locate_mail_server(domain);
                TcpClient tClient = new TcpClient(mail_server, 25);
                string CRLF = "\r\n";
                byte[] dataBuffer;

                NetworkStream netStream = tClient.GetStream();
                StreamReader reader = new StreamReader(netStream);
                reader.ReadLine();

                //// Perform HELO to SMTP Server and get Response 
                dataBuffer = BytesFromString("HELO TranHoc" + CRLF);
                netStream.Write(dataBuffer, 0, dataBuffer.Length);
                reader.ReadLine();

                dataBuffer = BytesFromString("MAIL FROM:<" + Request["gmail"] + ">" + CRLF);
                netStream.Write(dataBuffer, 0, dataBuffer.Length);
                ResponseString = reader.ReadLine();
                StatusCode = GetStatusCheckMail(ResponseString);

                if(StatusCode == 250)
                {
                    status.ok = true;
                }
                else
                {
                    status.ok = false;
                    status.error = "Không tồn tại mail này";
                }

                tClient.Close();
                
            }
            catch(Exception ex)
            {
                status.ok = false;
                status.error = ex.Message;
            }
            string json = JsonConvert.SerializeObject(status);
            this.Response.Write(json);
        }

        private byte[] BytesFromString(string str)
        {
            return Encoding.ASCII.GetBytes(str);
        }
        
        private int GetStatusCheckMail(string a)
        {
            return Int32.Parse(a.Substring(0, 3));
        }

        string locate_mail_server(string domain)
        {
            string line = "";
            try
            {
                // -- Thông tin tiến trình
                ProcessStartInfo startInfo = new ProcessStartInfo()
                {
                    WindowStyle = ProcessWindowStyle.Hidden,    
                    FileName = @"cmd.exe",
                    Arguments = $"/c nslookup -type=MX {domain}",
                    RedirectStandardOutput = true,
                    CreateNoWindow = true,
                    UseShellExecute = false
                };

                Process p = Process.Start(startInfo);
                p.WaitForExit();

                while (!p.StandardOutput.EndOfStream)
                {
                    line = p.StandardOutput.ReadLine();
                }
                int index = line.IndexOf("exchanger");
                line = line.Substring(index, line.Length - index);
                line = line.Replace("exchanger = ", "");
                
            }
            catch (Exception ex)
            {
                line = ex.Message;
            }

            return line;
        }

        void check_connect()
        {
            string result;
            try
            {
                SqlConnection cn = new SqlConnection(cnStr);
                cn.Open();
                result = "true";
            }
            catch (SqlException)
            {
                result = "fasle";
            }
            Response.Write(result);
        }
    }
}