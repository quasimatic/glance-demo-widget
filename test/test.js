console.log(glanceDom)
glanceDom.addExtension({
    labels: {
        "birthdate": {
            locate: function(label, scope, data) {
                return data.glance("Date of birth > span")
            }
        }
    }
});

glanceDom("input");