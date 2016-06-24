const formId = 'proposalForm';
const Form = Forms.defineModelForm({
  name: formId,
  collection: Proposals,
  onRender: function() {
    // TODO(aramk) Prevent displaying old content from a previous edit.
    if (!this.data.doc) {
      AutoForm.resetForm(formId);
    }
  },
  onSuccess: function() {
    routeBack();
  },
  onCancel: function() {
    routeBack();
  },
  hooks: {
    formToDoc: function(doc) {
      // Removed items in the choices inputs are undefined, so this removes them.
      doc.choices = _.compact(doc.choices);
      return doc;
    },
    formToDocOnUpdate: true
  }
});

function routeBack() {
  Router.go('topics');
}
