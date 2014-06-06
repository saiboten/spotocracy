package org.apache.jsp.WEB_002dINF;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
      out.write("<meta charset=\"utf-8\">\r\n");
      out.write("<title>Spotocracy</title>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"http://code.jquery.com/ui/1.8.21/themes/base/jquery-ui.css\" type=\"text/css\" media=\"all\" />\r\n");
      out.write("\r\n");
      out.write("<style type=\"text/css\" title=\"currentStyle\" media=\"screen\">\r\n");
      out.write("\t@import \"/spotocracy/static/style.css\";\r\n");
      out.write("</style>\r\n");
      out.write("\r\n");
      out.write("<script type=\"text/javascript\" src=\"/spotocracy/static/jquery-1.7.1.min.js\"></script>\r\n");
      out.write("\r\n");
      out.write("<script src=\"http://code.jquery.com/ui/1.8.21/jquery-ui.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"/spotocracy/static/script.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("\tvar playlist = '");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${playlist}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("';\r\n");
      out.write("</script>\r\n");
      out.write("\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\t<div id=\"wrapper\">\r\n");
      out.write("\t<div id=\"header\">\r\n");
      out.write("\t\t<div id=\"logo\">\r\n");
      out.write("\t\t\t<h1><a href=\"#\">Spotocracy</a></h1>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div id=\"slogan\">\r\n");
      out.write("\t\t\t<h2 id=\"slogantitle\">Spotocracy - Spotify den demokratiske måten</h2>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<div id=\"page\">\r\n");
      out.write("\t\t<div id=\"content\">\r\n");
      out.write("\t\t\t<div class=\"box\" id=\"content-box1\">\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\t<h3>Tilgjengelige stemmer: <span id=\"availableVotes\">");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${user.availableVotes}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("</span></h3>\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t\t<h3>Stem på låt</h3>\r\n");
      out.write("\t\t\t\t<ul class=\"list songs\">\r\n");
      out.write("\t\t\t\t\t\r\n");
      out.write("\t\t\t\t</ul>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t\t<div class=\"box\" id=\"content-box1\">\r\n");
      out.write("\t\t\t\t<p id=\"feedback\"></p>\r\n");
      out.write("\t\t\t\t<h3 id=\"searchResultText\">Søkeresultat</h3>\r\n");
      out.write("\t\t\t\t<ul id=\"searchResult\">\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t</ul>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t\t<br class=\"clearfix\" />\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div id=\"sidebar\">\r\n");
      out.write("\t\t<div class=\"box\" id=\"sidebarbox\">\r\n");
      out.write("\t\t\t<h3>Søk etter låt</h3>\r\n");
      out.write("\t\t\t<input type=\"text\" id=\"trackname\" class=\"inputField\" /><br /><input type=\"button\" class=\"inputButton\" id=\"tracksubmit\" value=\"Søk etter låtnavn\" />\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t\t<br class=\"clearfix\" />\r\n");
      out.write("\t</div>\r\n");
      out.write("\t\r\n");
      out.write("\t<div id=\"page-bottom\">\r\n");
      out.write("\t\t<div id=\"page-bottom-content\">\r\n");
      out.write("\t\t\t<h3>Om Spotocracy</h3>\r\n");
      out.write("\t\t\t<p>\r\n");
      out.write("\t\t\t\tSpotocracy er laget av Tobias Rusås Olsen. Fungerer egentlig bare på min maskin, inntil videre.\r\n");
      out.write("\t\t\t</p>\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\t<div id=\"dialog-modal\" title=\"\">\r\n");
      out.write("\t\t\t\t<p><img src=\"static/images/ajax-loader.gif\" /></p>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<br class=\"clearfix\" />\r\n");
      out.write("\t</div>\r\n");
      out.write("</div>\r\n");
      out.write("<div id=\"footer\">\r\n");
      out.write("\tCopyright (c) 2012 saiboten.com. All rights reserved. Design by <a href=\"http://www.freecsstemplates.org\">FCT</a>. Photos by <a href=\"http://fotogrph.com/\">Fotogrph</a>.\r\n");
      out.write("</div>\r\n");
      out.write("</body>\r\n");
      out.write("</html>\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
