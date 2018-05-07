using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ofx.Startup))]
namespace ofx
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
