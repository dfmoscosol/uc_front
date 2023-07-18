import $ from "jquery";

($.leftSideBar = {
  activateSideBar: function () {
    var a = this,
      b = $("body"),
      c = $(".overlay");
    $(window).on("click", function (d) {
      var e = $(d.target);
      "i" === d.target.nodeName.toLowerCase() && (e = $(d.target).parent()),
        !e.hasClass("bars") &&
          a.isOpenSideBar() &&
          0 === e.parents("#leftsidebar").length &&
          (e.hasClass("js-right-sidebar") || c.fadeOut(),
          b.removeClass("overlay-open"));
    }),
      $.each($(".menu .list li.active"), function (a, b) {
        var c = $(b).find("a:eq(0)");
        c.addClass("toggled"), c.next().show();
      }),
      a.checkStatuForResize(!0),
      $(window).resize(function () {
        a.checkStatuForResize(!1);
      });
  },
  isOpenSideBar: function () {
    return $("body").hasClass("overlay-open");
  },
}),
  $(function () {
    $.leftSideBar.activateSideBar();
  });