using SuatAn;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

namespace ReviewTeacher
{
    public partial class api : System.Web.UI.Page
    {
        class Reply
        {
            public bool ok;
            public string msg;
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "checklogin":
                case "login":
                case "signup":
                case "modify":
                case "logout":
                case "changepw":
                    {
                        user_action(action);
                        break;
                    }

                case "list_income":
                case "add_income":
                case "modify_income":
                case "delete_income":
                case "list_expense":
                case "add_expense":
                case "modify_expense":
                case "delete_expense":
                case "list_target":
                case "add_target":
                case "modify_target":
                case "delete_target":
                case "statistic_general":
                case "statistic_income":
                case "statistic_expense":
                    {
                        review(action);
                        break;
                    }
            }
        }
        void user_action(string action)
        {
            string json;
            Reply reply = new Reply();
            try
            {
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_User", action);
                switch (action)
                {
                    case "login":
                        {
                            cm.Parameters.Add("@email", SqlDbType.VarChar, 100).Value = Request["email"];
                            cm.Parameters.Add("@password", SqlDbType.VarChar, 100).Value = Request["password"];
                            break;
                        }
                    case "signup":
                        {
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 100).Value = Request["name"];
                            cm.Parameters.Add("@username", SqlDbType.VarChar, 100).Value = Request["username"];
                            cm.Parameters.Add("@password", SqlDbType.VarChar, 100).Value = Request["password"];
                            cm.Parameters.Add("@email", SqlDbType.VarChar, 100).Value = Request["email"];
                            break;
                        }
                    case "modify":
                        {
                            cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 100).Value = Request["name"];
                            cm.Parameters.Add("@email", SqlDbType.VarChar, 100).Value = Request["email"];
                            break;
                        }
                    case "checklogin":
                        {
                            cm.Parameters.Add("@id_user", SqlDbType.Int).Value = Request["id_user"];
                            cm.Parameters.Add("@cookie", SqlDbType.VarChar, 100).Value = Request["cookie"];
                            break;
                        }
                    case "logout":
                        {
                            cm.Parameters.Add("@id_user", SqlDbType.Int).Value = Request["id_user"];
                            cm.Parameters.Add("@cookie", SqlDbType.VarChar, 100).Value = Request["cookie"];
                            break;
                        }
                    case "changepw":
                        {
                            cm.Parameters.Add("@email", SqlDbType.VarChar, 100).Value = Request["email"];
                            cm.Parameters.Add("@password", SqlDbType.VarChar, 100).Value = Request["password"];
                            cm.Parameters.Add("@newpassword", SqlDbType.VarChar, 100).Value = Request["newpassword"];
                            break;
                        }
                }
                json = (string)db.Scalar(cm);

            }
            catch (Exception ex)
            {
                reply.ok = false;
                reply.msg = ex.Message;
                json = JsonConvert.SerializeObject(reply);
            }
            this.Response.Write(json);
        }

        void review(string action)
        {
            string json;
            Reply reply = new Reply();
            try
            {
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_Review", action);
                switch (action)
                {

                }
                json = (string)db.Scalar(cm);

            }
            catch (Exception ex)
            {
                reply.ok = false;
                reply.msg = ex.Message;
                json = JsonConvert.SerializeObject(reply);
            }
            this.Response.Write(json);
        }
    }
}