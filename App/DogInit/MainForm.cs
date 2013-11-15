using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace DogInit
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();

            btn_Init.Click += btn_Init_Click;
        }

        void btn_Init_Click(object sender, EventArgs e)
        {
            // 初始化加密狗中的密钥
            // 7629637A551D5C04F401954287E5DEDD
            SoftKey dog = new SoftKey();

            string dogPath = "";
            int ret = -1;

            for (int n = 0; n < 255; n++)
            {
                ret = dog.FindPort(n, ref dogPath);
                if (ret == 0)
                {
                    break;
                }
            }

            if (ret == 0)
            {
                dog.SetCal_2("7629637A551D5C04F401954287E5DEDD", dogPath);
                MessageBox.Show("初始化成功!", "消息", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                MessageBox.Show("无法找到加密狗!", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
