using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CongNgheDotNet
{
    public partial class test : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Double a = Convert.ToDouble(TextBox1.Text);
            Double b = Convert.ToDouble(TextBox2.Text);

            MathTool.Cong c = new MathTool.Cong();
            Double d = c.Cong2So(a, b);

            kq.InnerHtml = $"Kết quả: {a} + {b} = {d}";
        }
    }
}