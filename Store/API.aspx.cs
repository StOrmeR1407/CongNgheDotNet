﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Deployment.Internal;
using SuatAn;
using Newtonsoft.Json;
using System.Data.SqlTypes;

namespace Store
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
                    case "list_expense":
                    case "list_target":
                    case "statistic_general":
                        {
                            cm.Parameters.Add("@id_user", SqlDbType.Int).Value = Request["id_user"];
                            break;
                        }

                    case "add_income":
                    case "add_expense":
                        {
                            cm.Parameters.Add("@id_user", SqlDbType.Int).Value = Request["id_user"];
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 100).Value = Request["name"];
                            cm.Parameters.Add("@id_category", SqlDbType.Int).Value = Request["id_category"];
                            cm.Parameters.Add("@money", SqlDbType.Money).Value = Request["money"];
                            cm.Parameters.Add("@time", SqlDbType.DateTime).Value = Request["time"];
                            break;
                        }
                    case "modify_income":
                    case "modify_expense":
                        {
                            cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                            cm.Parameters.Add("@name", SqlDbType.NVarChar,100).Value = Request["name"];
                            cm.Parameters.Add("@id_category", SqlDbType.Int).Value = Request["id_category"];
                            cm.Parameters.Add("@money", SqlDbType.Money).Value = Request["money"];
                            cm.Parameters.Add("@time", SqlDbType.DateTime).Value = Request["time"];
                            break;
                        }
                    case "delete_income":
                    case "delete_expense":
                    case "delete_target":
                        {
                            cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                            break;
                        }

                    case "add_target":
                        {
                            cm.Parameters.Add("@id_user", SqlDbType.Int).Value = Request["id_user"];
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 100).Value = Request["name"];
                            cm.Parameters.Add("@money", SqlDbType.Money).Value = Request["money"];
                            cm.Parameters.Add("@time", SqlDbType.DateTime).Value = Request["time"];
                            break;
                        }
                    case "modify_target":
                        {
                            cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 100).Value = Request["name"];
                            cm.Parameters.Add("@money", SqlDbType.Money).Value = Request["money"];
                            cm.Parameters.Add("@time", SqlDbType.DateTime).Value = Request["time"];
                            break;
                        }
                    case "statistic_income":
                    case "statistic_expense":
                        {
                            cm.Parameters.Add("@id_user", SqlDbType.Int).Value = Request["id_user"];
                            cm.Parameters.Add("@target_month", SqlDbType.Int).Value = Request["target_month"];
                            cm.Parameters.Add("@target_year", SqlDbType.Int).Value = Request["target_year"];
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