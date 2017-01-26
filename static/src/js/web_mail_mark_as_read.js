openerp.web_mail_mark_as_read = function (instance) {
    var QWeb = instance.web.qweb,
        _t = instance.web._t;

    instance.web.ListView.include({
      load_list: function(data) {
          var self = this;
          if (this.sidebar && this.options.$sidebar && self.is_mail_thread()) {
              var other = this.sidebar.items['other'];
              var label = _t("Mark all as read");
              for (item in other) {
                  if (other[item].label == label) { // avoid duplicated entries
                      return this._super(data);
                  }
              }
              this.sidebar.add_items('other', 
                _.compact([{ label: label, callback: this.do_mark_as_read_selected }]));
          }
          return this._super(data);
      },
      is_mail_thread: function () {
          var self = this;
          this.dataset._model.call('is_mail_thread').then(function (result) { 
            self.dataset.context.is_mail_thread = result;
          });
          return self.dataset.context.is_mail_thread;
      },
      do_mark_as_read: function (ids) {
          var self = this;
          return this.dataset._model.call('message_mark_as_read', [ids]).done(function () {
              self.reload();
          });
      },
      do_mark_as_read_selected: function () {
          var ids = this.groups.get_selection().ids;
          if (ids.length) {
              this.do_mark_as_read(this.groups.get_selection().ids);
          } else {
              this.do_warn(_t("Warning"), _t("You must select at least one record."));
          }
      },
  });
}
