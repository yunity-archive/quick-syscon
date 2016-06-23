const formId = 'voteForm';
const Form = Forms.defineModelForm({
  name: formId,
  collection: Votes,
  resetOnSuccess: true,
  hooks: {
    formToDoc: function(doc) {
      doc.proposalId = Form.getTemplate(this.template).data.proposalId;
      return doc;
    },
    formToDocOnUpdate: true
  }
});

Form.helpers({
  choices: function() {
    const proposal = Proposals.findOne({_id: this.proposalId});
    if (!proposal) return;
    const proposals = proposal.choices.map(choice => {
      return {
        label: choice.name,
        value: choice.name
      }
    });
    // proposals.unshift({label: '', value: null});
    return proposals;
  }
});

function routeBack() {
  Router.go('proposals');
}
