using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Store
{
    public partial class API : System.Web.UI.Page
    {
        const string cnStr = @"Server=STORMER;Database=Money;User id=hocdepzai;Password=hocdepzai";

        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch(action)
            {
                case "check_login":
                case "login":
                case "signup":
                    {
                        user_action();
                        break;
                    }
            }
        }

        void user_action() {
            string action = Request["action"];
            if (action == "login")
            {

            }
        }
    }
}