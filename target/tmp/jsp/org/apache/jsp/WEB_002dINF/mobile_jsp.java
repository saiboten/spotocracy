package org.apache.jsp.WEB_002dINF;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class mobile_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n");
      out.write("<title>Spotocracy</title>\r\n");
      out.write("<style>\r\n");
      out.write("html {\r\n");
      out.write("\tfont-size: 2.2em;\r\n");
      out.write("\tbackground: #CCFFFF repeat fixed center;\r\n");
      out.write("\tbackground-size: 100%;\r\n");
      out.write("\tfont-family: \"Verdana\";\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("h2 {\r\n");
      out.write("\tmargin: 50px 0 30px 0;\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("#left {\r\n");
      out.write("\ttext-align:left;\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("#image {\r\n");
      out.write("\theight: 25px;\r\n");
      out.write("}\r\n");
      out.write("</style>\r\n");
      out.write("\r\n");
      out.write("<link rel=\"stylesheet\"\r\n");
      out.write("\thref=\"/spotocracy/static/jquery.mobile-1.1.0/jquery.mobile-1.1.0.css\" />\r\n");
      out.write("\r\n");
      out.write("<script src=\"/spotocracy/static/jquery.mobile-1.1.0/demos/js/jquery.js\"></script>\r\n");
      out.write("<script src=\"/spotocracy/static/jquery.mobile-1.1.0/demos/docs/_assets/js/jqm-docs.js\"></script>\r\n");
      out.write("<script src=\"/spotocracy/static/jquery.mobile-1.1.0/jquery.mobile-1.1.0.js\"></script>\r\n");
      out.write("<script src=\"http://code.jquery.com/jquery.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"/spotocracy/static/script.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"http://code.jquery.com/ui/1.8.21/jquery-ui.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("\tvar playlist = '");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${playlist}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("';\r\n");
      out.write("</script>\r\n");
      out.write("\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\r\n");
      out.write("\t<div data-role=\"page\" class=\"type-interior\">\r\n");
      out.write("\t\t<div data-role=\"content\">\r\n");
      out.write("\t\t\t<div class=\"content-primary\">\r\n");
      out.write("\t\t\t\t<ul class=\"songs\" data-role=\"listview\">\r\n");
      out.write("\t\t\t\t\r\n");
      out.write("\t\t\t\t</ul>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<!-- /content -->\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t<div id=\"feedback\"></div>\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t<h3 id=\"searchResultText\">Søkeresultat</h3>\r\n");
      out.write("\t\t<ul id=\"searchResult\" data-role=\"listview\"> </ul>\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t<h3>Søk etter låt</h3>\r\n");
      out.write("\t\t<input type=\"text\" id=\"trackname\" class=\"inputField\" /><br /><input type=\"button\" class=\"inputButton\" id=\"tracksubmit\" value=\"Søk etter låtnavn\" />\r\n");
      out.write("\t\t\r\n");
      out.write("\t</div>\r\n");
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
