using SuatAn;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ThucHanh
{
    public partial class api : System.Web.UI.Page
    {
        void xuly_company(string action)
        {
            //kb db .. tv sp action
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_Company", action);

            switch (action)
            {
                case "add_company":
                case "modify_company":                   
                    cm.Parameters.Add("@name", SqlDbType.NVarChar, 255).Value = Request["name"];
                    cm.Parameters.Add("@address", SqlDbType.NVarChar, 255).Value = Request["address"];
                    cm.Parameters.Add("@lat", SqlDbType.Float).Value = Request["lat"];
                    cm.Parameters.Add("@lng", SqlDbType.Float).Value = Request["lng"];
                    cm.Parameters.Add("@phone", SqlDbType.VarChar, 10).Value = Request["phone"];
                    cm.Parameters.Add("@zalo", SqlDbType.NVarChar, 255).Value = Request["zalo"];
                    break;

            }

            switch (action)
            {
                case "modify_company":
                case "delete_company":
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                    break;
            }

            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "add_company":
                case "modify_company":
                case "delete_company":
                case "list_company":
                    xuly_company(action);
                    break;

            }
        }
    }
}