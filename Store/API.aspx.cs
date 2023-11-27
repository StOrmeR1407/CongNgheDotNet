using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Deployment.Internal;
using Money;
using Newtonsoft.Json;
using System.Data.SqlTypes;

namespace Money
{
    public partial class API : System.Web.UI.Page
    {
        class Reply
        {
            public bool ok;
            public string msg;
        }

        protected void Page_Load(object sender, EventArgs e)
        {           
            string action = Request["action"];
            switch(action)
            {
                case "check_login":
                case "login":
                case "signup":
                case "modify":
                    {
                        user_action(action);
                        break;
                    }

                case "list_income":
                    {
                        money(action);
                        break;
                    }
            }
        }

        void user_action(string action) {
            string json;
            Reply reply = new Reply();
            try
            {
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_User", action);
                switch(action)
                {
                    case "login":
                        {
                            cm.Parameters.Add("@username", SqlDbType.VarChar, 100).Value = Request["username"];
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

        void money(string action)
        {
            string json;
            Reply reply = new Reply();
            try
            {
                SqlServer db = new SqlServer();
                SqlCommand cm = db.GetCmd("SP_Money", action);
                switch (action)
                {
                    case "list_income":
                        {
                            cm.Parameters.Add("@id", SqlDbType.VarChar, 100).Value = Request["id"];
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