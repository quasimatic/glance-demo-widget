glanceSelector.addExtension({
    labels: {
        "birthdate": {
            locate: function(label, scope, data){
                return data.glance("Date of birth")
            }
        }
    }
});

glanceSelector("name")