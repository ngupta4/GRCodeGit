/* require "jquery-1.7.1"
 * require "jquery.cookie" # https://github.com/carhartl/jquery-cookie
 * require "omniture-H.20.3.js" (aka s_code.js)
 *
 * Class Cps
 *
 * Used to retrieve landing page configuration and view data from a cdef-cps REST service.
 */
function Cps(options) {
  if ($.cookie("Cps.download_attempted") == null) $.cookie("Cps.download_attempted", "false", { expires: 3 });
  var self = this; // needed for closure in AJAX callbacks
  $.ajax({
    url: "/dynamic/carts",
    dataType: "json",
    data: self.queryParameters(),
    async: false, // unfortunate but necessary for Vertser and Omniture since they depend on the data returned here
    success: function(data) {
      self.cart_data   = data.cart;
      self.source_code = data.marketing_effort.source_code;
    }
  });
}

Cps.prototype = {
  queryParameters: function() {
    if (this.query_parameters == undefined) {
      var qp = {};
      // We want the Cps object to be initialized consistently across a landing site.
      if ($.cookie("Cps.initial_query_parameters") == null)
        $.cookie("Cps.initial_query_parameters", window.location.search, { expires: 3 });
      var parameters = $.cookie("Cps.initial_query_parameters").substring(1).split('&');
      if (parameters.length > 1) {
        for (var i = 0; i < parameters.length; i++) {
          pair = parameters[i].split('=');
          qp[pair[0]] = pair[1];
        }
      }
      this.query_parameters = qp;
      this.query_parameters.domain = window.location.hostname.replace(/(.*?)([^.]+\.[^.]+)$/,'$2');
    }
    return this.query_parameters;
  },
  countDownload: function() {
    // SiteCatalyst (Omniture) tracking code for downloads
    s.campaign = this.source_code;
    s.events = "event10,event22:"+window.scSerial; //Edit SapientNitro: Added event22 to the function
    var s_code=s.t();if(s_code)document.write(s_code);
  },//Edit SapientNitro: Function no longer needed
  sendContactUsEmail: function(name, email, phone, topic, feedback) {
   $.ajax({
      url: "/dynamic/contact_us_email",
      dataType: "json",
      async: true,
      data: { "name": name, "email": email, "phone": phone, "topic": topic, "feedback": feedback },
      success: function(data) {
        alert("Your feedback has been submitted successfully");
        $.cookie("feedback", email, { expires: 2 });
        resetFields();
      },
      error: function(data) {
        alert("An error occurred");
        resetFields();
      }
    });
  },
  setProductsLink: function(sku, id) {
    $.ajax({
      url: "/dynamic/product_download_url",
      dataType: "json",
      data: { "source_code": this.source_code, "sku": sku },
      async: false,
      success: function(data) {
        $("a#" + id).attr("href", data.product_download_url);
        $("a#" + id).attr("target", "_blank");
      }
    });
   },
  setDownloadProductLinks: function(sku) {
    if ($.cookie("Cps.product_download_url") == null) {
      $.ajax({
        url: "/dynamic/product_download_url",
        dataType: "json",
        data: { "source_code": this.source_code, "sku": sku },
        async: false,
        success: function(data) {
          $.cookie("Cps.download_attempted", "true", { expires: 3 });
          $.cookie("Cps.product_download_url", data.product_download_url);
        }
      });
    }
    $("a.download").attr("href", $.cookie("Cps.product_download_url"));
    /*
    Reverting ECOM-2865
    $("a.download").attr("target", "_blank");
    $('a.download-instructions-button').attr('href',$.cookie("Cps.product_download_url")); 
    $("a.download").attr("onclick", "$.colorbox({href: 'download-instructions.html', onComplete: function() { $('a.download-instructions-button').attr('href', $.cookie('Cps.product_download_url')); }});");
    */
  },
  cartView: function(format, context) {
    var result = null
    $.each(this.cart_data.cart_views, function(i, view) {
      if (view.format == format && view.context == context) {
        result = view.view;
        return false;
      }
    });
    return result;
  }
};

var cps = new Cps();

function resetFields(){
  $('#name').val('')
  $('#email').val('')
  $('#phone').val('')
  $('#feedback').val('')
}
