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
                case "logout":
                case "checkmail":
                case "check2FA":
                case "changepw":
                    {
                        user_action(action);
                        break;
                    }

                case "add_review_question":
                case "modify_review_question":
                case "add_review":
                case "modify_review":
                case "add_detail_review":
                case "delete_detail_review":
                case "add_detail_cos_review":
                case "delete_detail_cos_review":
                case "score":
                case "statistic_general":
                case "list_review_for_student":
                case "list_detail_cos_review":
                case "list_detail_review":
                case "list_review_for_admin":
                case "list_review_question_for_student":
                case "save_answer":
                case "statistic_general_detail":
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
                    case "add_review_question":
                        {
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 1000).Value = Request["name"];
                            cm.Parameters.Add("@id_rc", SqlDbType.Int).Value = Request["id_rc"];
                            break;
                        }
                    case "modify_review_question":
                        {
                            cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 1000).Value = Request["name"];
                            cm.Parameters.Add("@id_rc", SqlDbType.Int).Value = Request["id_rc"];
                            break;
                        }
                    case "add_review":
                        {
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 1000).Value = Request["name"];
                            cm.Parameters.Add("@deadline", SqlDbType.Date).Value = Request["deadline"];
                            break;
                        }
                    case "modify_review":
                        {
                            cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                            cm.Parameters.Add("@name", SqlDbType.NVarChar, 1000).Value = Request["name"];
                            cm.Parameters.Add("@deadline", SqlDbType.Date).Value = Request["deadline"];
                            break;
                        }
                    case "add_detail_review":
                        {
                            cm.Parameters.Add("@id_rv", SqlDbType.Int).Value = Request["id_rv"];
                            cm.Parameters.Add("@id_rq", SqlDbType.Int).Value = Request["id_rq"];
                            break;
                        }
                    case "delete_detail_review":
                    case "delete_detail_cos_review":
                        {
                            cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                            break;
                        }
                    case "add_detail_cos_review":
                        {
                            cm.Parameters.Add("@id_rv", SqlDbType.Int).Value = Request["id_rv"];
                            cm.Parameters.Add("@id_cos", SqlDbType.Int).Value = Request["id_cos"];
                            break;
                        }
                    case "score":
                    case "statistic_general_detail":

                        {
                            cm.Parameters.Add("@id_rc", SqlDbType.Int).Value = Request["id_rc"];
                            cm.Parameters.Add("@id_cos", SqlDbType.Int).Value = Request["id_cos"];
                            cm.Parameters.Add("@tt_score", SqlDbType.Float).Value = Request["tt_score"];
                            break;
                        }
                    case "statistic_general":
                    case "list_review_for_admin":
                        {
                            break;
                        }
                    case "list_review_for_student":
                        {
                            cm.Parameters.Add("@id_user", SqlDbType.Int).Value = Request["id_user"];
                            break;
                        }
                    case "list_review_question_for_student":
                    case "list_detail_review":
                    case "list_detail_cos_review":
                        {
                            cm.Parameters.Add("@id_rv", SqlDbType.Int).Value = Request["id_rv"];
                            break;
                        }
                    case "save_answer":
                        {
                            cm.Parameters.Add("@id_user", SqlDbType.Int).Value = Request["id_user"];
                            cm.Parameters.Add("@id_rv", SqlDbType.Int).Value = Request["id_rv"];
                            cm.Parameters.Add("@id_cos", SqlDbType.Int).Value = Request["id_cos"];
                            cm.Parameters.Add("@answer", SqlDbType.VarChar, 1000).Value = Request["answer"];
                            cm.Parameters.Add("@time", SqlDbType.Date).Value = Request["time"];
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